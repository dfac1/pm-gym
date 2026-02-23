import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

const onboardingSchema = z.object({
  role: z.string().optional(),
  interests: z.array(z.string()).optional(),
  goal: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Требуется авторизация' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Неверный токен' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate input
    const validation = onboardingSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const { role, interests, goal } = validation.data

    // Update user onboarding data
    const user = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        role,
        interests: interests ? JSON.stringify(interests) : undefined,
        goal
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        interests: user.interests ? JSON.parse(user.interests) : [],
        goal: user.goal
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера. Попробуйте позже.' },
      { status: 500 }
    )
  }
}
