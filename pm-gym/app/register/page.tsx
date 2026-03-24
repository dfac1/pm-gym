'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import Input from '@/components/auth/Input'
import Button from '@/components/auth/Button'
import SocialAuthButtons from '@/components/auth/SocialAuthButtons'
import PasswordStrength from '@/components/auth/PasswordStrength'
import { track } from '@/lib/amplitude'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (generalError) {
      setGeneralError('')
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) {
      newErrors.name = 'Имя обязательно'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Введите имя (минимум 2 символа)'
    } else if (formData.name.length > 50) {
      newErrors.name = 'Имя не может быть длиннее 50 символов'
    }

    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Пароль должен быть минимум 8 символов'
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Необходимо согласиться с условиями'
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
    setGeneralError('')

    try {
      const { authApi } = await import('@/lib/api')
      
      await authApi.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        agreeToTerms: formData.agreeToTerms
      })

      track('User Registered')

      // Success - redirect to onboarding
      router.push('/onboarding')
    } catch (error: any) {
      track('Registration Failed', { error: error.message })
      setGeneralError(error.message || 'Ошибка регистрации. Попробуйте снова.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Начни прокачку за 2 минуты" 
      subtitle="Бесплатно, без кредитной карты"
    >
      {/* General Error */}
      {generalError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
          <span className="text-base">⚠️</span>
          <div className="flex-1">
            {generalError}
            {generalError.includes('зарегистрирован') && (
              <div className="mt-2 flex gap-2">
                <Link 
                  href="/login" 
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Войти в аккаунт
                </Link>
                <span>или</span>
                <Link 
                  href="/forgot-password" 
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Восстановить пароль
                </Link>
              </div>
            )}
          </div>
          <button 
            onClick={() => setGeneralError('')}
            className="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Social Auth */}
      <SocialAuthButtons />

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <Input
          label="Имя"
          type="text"
          name="name"
          placeholder="Как тебя зовут?"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => {
            if (formData.email && !validateEmail(formData.email)) {
              setErrors(prev => ({ ...prev, email: 'Введите корректный email' }))
            }
          }}
          error={errors.email}
          autoComplete="email"
          required
        />

        <div className="mb-5">
          <Input
            label="Пароль"
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

        {/* Terms Agreement */}
        <div className="mb-8">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">
              Я согласен с{' '}
              <Link 
                href="/terms" 
                target="_blank"
                className="text-indigo-600 hover:underline"
              >
                Terms of Service
              </Link>
              {' '}и{' '}
              <Link 
                href="/privacy" 
                target="_blank"
                className="text-indigo-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <span>⚠️</span>
              {errors.agreeToTerms}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
        >
          Создать аккаунт бесплатно
        </Button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Уже есть аккаунт?{' '}
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
