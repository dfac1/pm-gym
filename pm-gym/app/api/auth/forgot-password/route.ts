import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { generateRandomToken } from '@/lib/auth'
import { sendEmail, passwordResetEmail } from '@/lib/email'

const forgotPasswordSchema = z.object({
  email: z.string().email('Неверный формат email')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = forgotPasswordSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email } = validation.data

    // Find user (but don't reveal if they exist for security)
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Если аккаунт существует, вы получите письмо'
      }, { status: 200 })
    }

    // Generate reset token
    const token = generateRandomToken()
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Save token to database
    await prisma.passwordResetToken.create({
      data: {
        email: user.email,
        token,
        expires,
        userId: user.id
      }
    })

    // Send reset email
    const emailTemplate = passwordResetEmail(user.name, token)
    await sendEmail({
      to: user.email,
      ...emailTemplate
    })

    return NextResponse.json({
      success: true,
      message: 'Письмо с инструкциями отправлено'
    }, { status: 200 })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    )
  }
}
