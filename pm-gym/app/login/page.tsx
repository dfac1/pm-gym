'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthLayout from '@/components/auth/AuthLayout'
import Input from '@/components/auth/Input'
import Button from '@/components/auth/Button'
import SocialAuthButtons from '@/components/auth/SocialAuthButtons'
import { track, identifyUser } from '@/lib/amplitude'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
      
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      })

      if (response.user) {
        identifyUser(response.user.id, { email: response.user.email, name: response.user.name })
      }
      track('User Logged In')

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      track('Login Failed', { error: error.message })
      setGeneralError(error.message || 'Неверный email или пароль')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Вход в PM Gym" 
      subtitle="Продолжи прокачку навыков"
    >
      {/* General Error */}
      {generalError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
          <span className="text-base">⚠️</span>
          <div className="flex-1">
            {generalError}
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

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit}>
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

        <Input
          label="Пароль"
          type="password"
          name="password"
          placeholder="••••••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          showPasswordToggle
          required
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between mb-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Запомнить меня</span>
          </label>

          <Link 
            href="/forgot-password" 
            className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            Забыли пароль?
          </Link>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          loading={loading}
          disabled={loading}
        >
          Войти
        </Button>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Нет аккаунта?{' '}
          <Link 
            href="/register" 
            className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
