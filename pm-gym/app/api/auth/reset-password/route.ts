import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Токен обязателен'),
  password: z.string().min(8, 'Пароль должен быть минимум 8 символов')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = resetPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { token, password } = validation.data

    // Find reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: 'invalid', message: 'Неверная ссылка' },
        { status: 400 }
      )
    }

    // Check if token is expired
    if (new Date() > resetToken.expires) {
      return NextResponse.json(
        { error: 'expired', message: 'Ссылка устарела' },
        { status: 400 }
      )
    }

    // Check if token was already used
    if (resetToken.used) {
      return NextResponse.json(
        { error: 'used', message: 'Ссылка уже использована' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(password)

    // Update user password
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    })

    // Mark token as used
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true }
    })

    // Generate new JWT token for auto-login
    const authToken = generateToken({
      userId: resetToken.user.id,
      email: resetToken.user.email
    })

    return NextResponse.json({
      success: true,
      message: 'Пароль успешно изменён',
      token: authToken
    }, { status: 200 })

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: 'server', message: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    )
  }
}
