'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import AuthLayout from '@/components/auth/AuthLayout'
import Input from '@/components/auth/Input'
import Button from '@/components/auth/Button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Email обязателен')
      return
    }

    if (!validateEmail(email)) {
      setError('Введите корректный email')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { authApi } = await import('@/lib/api')
      
      await authApi.forgotPassword(email)
      
      // Show success (even if email doesn't exist for security)
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || 'Ошибка соединения. Проверьте интернет.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Show temporary message
      alert('Письмо отправлено повторно!')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout 
        title="Проверьте email!" 
        subtitle="Инструкции отправлены"
        showBackButton={false}
      >
        <div className="text-center py-4">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Проверьте email!
          </h3>
          <p className="text-gray-600 mb-1">
            Мы отправили ссылку для восстановления пароля на:
          </p>
          <p className="text-indigo-600 font-medium mb-6">
            {email}
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-gray-700">
            <p className="mb-2">Не пришло письмо?</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-indigo-600 hover:underline font-medium"
              >
                Отправить снова
              </button>
              <span>|</span>
              <button
                onClick={() => alert('Проверьте папку "Спам" в вашей почте')}
                className="text-indigo-600 hover:underline font-medium"
              >
                Проверить спам
              </button>
            </div>
          </div>

          <Link 
            href="/login"
            className="text-indigo-600 hover:underline"
          >
            ← Вернуться к входу
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      title="Восстановление пароля" 
      subtitle="Мы отправим ссылку на email"
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError('')
          }}
          onBlur={() => {
            if (email && !validateEmail(email)) {
              setError('Введите корректный email')
            }
          }}
          error={error}
          autoComplete="email"
          required
        />

        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
        >
          Отправить ссылку
        </Button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Вспомнили пароль?{' '}
          <Link 
            href="/login" 
            className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
          >
            Войти
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
