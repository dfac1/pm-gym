'use client'

import { useState, FormEvent, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import Input from '@/components/auth/Input'
import Button from '@/components/auth/Button'
import PasswordStrength from '@/components/auth/PasswordStrength'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [tokenError, setTokenError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Validate token on mount
    if (!token) {
      setTokenError('invalid')
    }
    // TODO: Add API call to validate token
  }, [token])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен быть минимум 8 символов'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const { authApi } = await import('@/lib/api')
      
      await authApi.resetPassword(token!, formData.password)

      // Success
      setSuccess(true)
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } catch (error: any) {
      if (error.message.includes('expired') || error.message.includes('устарела')) {
        setTokenError('expired')
      } else if (error.message.includes('invalid') || error.message.includes('Неверная')) {
        setTokenError('invalid')
      } else {
        setTokenError('server')
      }
    } finally {
      setLoading(false)
    }
  }

  // Token error states
  if (tokenError === 'invalid') {
    return (
      <AuthLayout 
        title="Неверная ссылка" 
        subtitle="Проверьте ссылку из письма"
        showBackButton={false}
      >
        <div className="text-center py-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Неверная ссылка
          </h3>
          <p className="text-gray-600 mb-6">
            Проверьте ссылку из письма или запросите новую.
          </p>
          <Button onClick={() => router.push('/forgot-password')}>
            Запросить восстановление
          </Button>
        </div>
      </AuthLayout>
    )
  }

  if (tokenError === 'expired') {
    return (
      <AuthLayout 
        title="Ссылка устарела" 
        subtitle="Запросите новую ссылку"
        showBackButton={false}
      >
        <div className="text-center py-4">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ссылка устарела
          </h3>
          <p className="text-gray-600 mb-6">
            Запросите новую ссылку для восстановления пароля.
          </p>
          <Button onClick={() => router.push('/forgot-password')}>
            Запросить снова
          </Button>
        </div>
      </AuthLayout>
    )
  }

  if (success) {
    return (
      <AuthLayout 
        title="Пароль изменён!" 
        subtitle="Перенаправляем на страницу входа"
        showBackButton={false}
      >
        <div className="text-center py-4">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Пароль изменён!
          </h3>
          <p className="text-gray-600 mb-6">
            Сейчас вы будете перенаправлены на страницу входа...
          </p>
          <div className="flex items-center justify-center gap-2 text-indigo-600">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span>Загрузка...</span>
          </div>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout 
      title="Создайте новый пароль" 
      subtitle="Введите новый надёжный пароль"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <Input
            label="Новый пароль"
            type="password"
            name="password"
            placeholder="••••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
            showPasswordToggle
            required
          />
          <PasswordStrength password={formData.password} />
        </div>

        <Input
          label="Подтвердите пароль"
          type="password"
          name="confirmPassword"
          placeholder="••••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={() => {
            if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
              setErrors(prev => ({ ...prev, confirmPassword: 'Пароли не совпадают' }))
            }
          }}
          error={errors.confirmPassword}
          autoComplete="new-password"
          showPasswordToggle
          required
        />

        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
        >
          Сохранить пароль
        </Button>
      </form>
    </AuthLayout>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Загрузка..." subtitle="" showBackButton={false}>
        <div className="flex justify-center py-8">
          <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
