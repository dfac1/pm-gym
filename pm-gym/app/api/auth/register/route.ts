import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, validateEmail, validatePassword, generateToken, generateRandomToken } from '@/lib/auth'
import { sendEmail, emailVerificationEmail } from '@/lib/email'

const registerSchema = z.object({
  name: z.string().min(2, 'Имя должно быть минимум 2 символа').max(50),
  email: z.string().email('Неверный формат email'),
  password: z.string().min(8, 'Пароль должен быть минимум 8 символов'),
  agreeToTerms: z.boolean().refine(val => val === true, 'Необходимо согласиться с условиями')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { name, email, password } = validation.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Этот email уже зарегистрирован' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      }
    })

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email
    })

    // Create verification token
    const verificationToken = generateRandomToken()
    const expires = new Date()
    expires.setHours(expires.getHours() + 24) // Token expires in 24 hours

    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        identifier: user.email,
        token: verificationToken,
        expires
      }
    })

    // Send verification email (don't wait for it)
    const emailTemplate = emailVerificationEmail(user.name, verificationToken)
    sendEmail({
      to: user.email,
      ...emailTemplate
    }).catch(console.error)

    // Return success with token
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    )
  }
}
