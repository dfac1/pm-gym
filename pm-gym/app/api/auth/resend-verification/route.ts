import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken, generateRandomToken } from '@/lib/auth'
import { sendEmail, emailVerificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Требуется авторизация' },
        { status: 401 }
      )
    }

    // Verify JWT token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Неверный токен' },
        { status: 401 }
      )
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: 'Email уже подтверждён' },
        { status: 400 }
      )
    }

    // Delete old verification tokens for this user
    await prisma.verificationToken.deleteMany({
      where: { userId: user.id }
    })

    // Create new verification token
    const verificationToken = generateRandomToken()
    const expires = new Date()
    expires.setHours(expires.getHours() + 24)

    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        identifier: user.email,
        token: verificationToken,
        expires
      }
    })

    // Send verification email
    const emailTemplate = emailVerificationEmail(user.name, verificationToken)

    await sendEmail({
      to: user.email,
      ...emailTemplate
    })

    return NextResponse.json({
      success: true,
      message: 'Письмо с подтверждением отправлено'
    })

  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Ошибка при отправке письма' },
      { status: 500 }
    )
  }
}
