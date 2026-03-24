'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import { track } from '@/lib/amplitude'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Токен верификации не найден')
      return
    }

    // Verify email
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success')
          setMessage(data.message)
          track('Email Verified')
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(data.error || 'Ошибка при подтверждении email')
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Ошибка сервера. Попробуйте позже.')
      })
  }, [searchParams, router])

  return (
    <AuthLayout
      title={
        status === 'loading' 
          ? 'Подтверждение email...' 
          : status === 'success'
          ? 'Email подтверждён!'
          : 'Ошибка подтверждения'
      }
      subtitle={
        status === 'loading'
          ? 'Пожалуйста, подождите...'
          : status === 'success'
          ? 'Через несколько секунд вы будете перенаправлены на дашборд'
          : 'Что-то пошло не так'
      }
    >
      <div className="text-center space-y-6">
        {status === 'loading' && (
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p className="text-gray-700">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <p className="text-red-600">{message}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 text-purple-600 hover:text-purple-700 font-medium underline"
            >
              Вернуться на страницу входа
            </button>
          </div>
        )}
      </div>
    </AuthLayout>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Подтверждение email..." subtitle="Пожалуйста, подождите...">
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AuthLayout>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
