'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/auth/Button'
import { track, identifyUser } from '@/lib/amplitude'

interface OnboardingData {
  role: string
  interests: string[]
  goal: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    role: '',
    interests: [],
    goal: ''
  })

  const onboardingStartTime = useRef(Date.now())
  const stepStartTime = useRef(Date.now())

  useEffect(() => {
    track('Onboarding Started')
  }, [])

  const roles = [
    { value: 'student', label: 'Студент / Начинающий', icon: '🎓' },
    { value: 'junior', label: 'Junior PM (< 1 года опыта)', icon: '🌱' },
    { value: 'middle', label: 'Middle PM (1-3 года)', icon: '💼' },
    { value: 'senior', label: 'Senior PM (3+ лет)', icon: '🚀' },
    { value: 'switching', label: 'Другая роль, хочу перейти в продакты', icon: '🔄' }
  ]

  const interestOptions = [
    { value: 'analytics', label: 'Аналитика и метрики', icon: '📊' },
    { value: 'artifacts', label: 'Работа с артефактами', icon: '📝' },
    { value: 'prioritization', label: 'Приоритизация', icon: '🎯' },
    { value: 'experiments', label: 'Проведение экспериментов', icon: '🧪' },
    { value: 'strategy', label: 'Product strategy', icon: '🚀' },
    { value: 'research', label: 'User research', icon: '👥' },
    { value: 'stakeholders', label: 'Работа со стейкхолдерами', icon: '💼' },
    { value: 'career', label: 'Карьерный рост', icon: '🏆' }
  ]

  const goals = [
    { value: 'interview', label: 'Подготовиться к интервью PM', icon: '🎯' },
    { value: 'improve', label: 'Прокачать навыки на текущей работе', icon: '📈' },
    { value: 'learn', label: 'Изучить PM с нуля', icon: '📚' },
    { value: 'offer', label: 'Получить оффер в топовую компанию', icon: '🏆' },
    { value: 'explore', label: 'Просто интересно, хочу попробовать', icon: '🤔' }
  ]

  const toggleInterest = (value: string) => {
    setData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value]
    }))
  }

  const stepNames: Record<number, string> = { 1: 'role', 2: 'interests', 3: 'goal' }

  const handleNext = () => {
    const now = Date.now()
    const timeOnStep = Math.round((now - stepStartTime.current) / 1000)
    const totalSoFar = Math.round((now - onboardingStartTime.current) / 1000)
    const selectedValue = step === 1 ? data.role : step === 2 ? data.interests : data.goal

    track('Onboarding Step Completed', {
      step,
      step_name: stepNames[step],
      selected_value: selectedValue,
      time_spent_on_step_sec: timeOnStep,
      total_time_so_far_sec: totalSoFar,
    })

    stepStartTime.current = now
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    try {
      const { userApi } = await import('@/lib/api')
      
      await userApi.updateOnboarding({
        role: data.role,
        interests: data.interests,
        goal: data.goal
      })

      const totalTimeSec = Math.round((Date.now() - onboardingStartTime.current) / 1000)
      track('Onboarding Completed', {
        role: data.role,
        interests: data.interests,
        interests_count: data.interests.length,
        goal: data.goal,
        total_time_sec: totalTimeSec,
      })

      // Persist role/goal as setOnce user properties
      const { authApi } = await import('@/lib/api')
      const currentUser = authApi.getCurrentUser()
      if (currentUser?.id) {
        identifyUser(currentUser.id, {
          role: { value: data.role, operation: 'setOnce' },
          goal: { value: data.goal, operation: 'setOnce' },
          interests: data.interests,
          onboarding_completed: true,
        })
      }

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Onboarding error:', error)
      // Still redirect even if onboarding fails
      router.push('/dashboard')
    }
  }

  const handleSkip = () => {
    track('Onboarding Skipped', {
      skipped_at_step: step,
      steps_completed: step - 1,
      partial_role: data.role || null,
      time_spent_sec: Math.round((Date.now() - onboardingStartTime.current) / 1000),
    })
    router.push('/dashboard')
  }

  const canProceed = () => {
    if (step === 1) return data.role !== ''
    if (step === 2) return data.interests.length > 0
    if (step === 3) return data.goal !== ''
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              PM Gym 💪
            </Link>
            <button 
              onClick={handleSkip}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Пропустить →
            </button>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i <= step ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Шаг {step} из 3</p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Role */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Расскажи о себе
              </h2>
              <p className="text-gray-600 mb-6">
                Это поможет персонализировать обучение
              </p>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Твоя текущая роль:
                </p>
                {roles.map(role => (
                  <button
                    key={role.value}
                    onClick={() => setData(prev => ({ ...prev, role: role.value }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      data.role === role.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mr-3">{role.icon}</span>
                    <span className="text-base font-medium">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Что хочешь прокачать?
              </h2>
              <p className="text-gray-600 mb-6">
                Выбери 2-3 направления
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interestOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleInterest(option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      data.interests.includes(option.value)
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-sm font-medium flex-1">{option.label}</span>
                      {data.interests.includes(option.value) && (
                        <span className="text-indigo-600">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goal */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Какая у тебя цель?
              </h2>
              <p className="text-gray-600 mb-6">
                Это поможет нам подобрать идеальный путь обучения
              </p>

              <div className="space-y-3">
                {goals.map(goal => (
                  <button
                    key={goal.value}
                    onClick={() => setData(prev => ({ ...prev, goal: goal.value }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      data.goal === goal.value
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl mr-3">{goal.icon}</span>
                    <span className="text-base font-medium">{goal.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex gap-4">
            {step > 1 && (
              <Button
                variant="secondary"
                onClick={() => setStep(step - 1)}
                fullWidth={false}
              >
                ← Назад
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === 3 ? 'Начать обучение →' : 'Продолжить →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
