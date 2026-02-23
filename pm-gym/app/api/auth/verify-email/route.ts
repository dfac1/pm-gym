import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Токен не предоставлен' },
        { status: 400 }
      )
    }

    // Find verification token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        expires: {
          gt: new Date() // Token not expired
        }
      }
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Неверный или истёкший токен' },
        { status: 400 }
      )
    }

    // Update user email verification status
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { 
        emailVerified: new Date() 
      }
    })

    // Delete used token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Email успешно подтверждён!'
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'Ошибка при подтверждении email' },
      { status: 500 }
    )
  }
}
