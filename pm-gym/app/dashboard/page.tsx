'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatformLayout from '@/components/platform/PlatformLayout'
import Link from 'next/link'
import { identifyUser } from '@/lib/amplitude'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const { authApi, userApi } = await import('@/lib/api')
      
      if (!authApi.isAuthenticated()) {
        router.push('/login')
        return
      }
      
      try {
        const response = await userApi.getMe()
        setUser(response.user)
        identifyUser(response.user.id, { email: response.user.email, name: response.user.name })
      } catch (error) {
        console.error('Failed to load user:', error)
        const userData = authApi.getCurrentUser()
        setUser(userData)
      } finally {
        setLoading(false)
      }
    }
    
    loadUser()
  }, [router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-xl text-gray-600">
          Добро пожаловать, {user.name}! 👋
        </p>
      </div>

      {/* Email Verification Banner */}
      {!user.emailVerified && (
        <VerificationBanner user={user} />
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon="📚" label="Модулей пройдено" value="3" subtitle="из 8 модулей" />
        <StatCard icon="🎯" label="Кейсов решено" value="12" subtitle="интерактивных сценариев" />
        <StatCard icon="⏱️" label="Часов обучения" value="6.5h" subtitle="времени на платформе" />
        <StatCard 
          icon="🏆" 
          label="Уровень" 
          value="5" 
          subtitle="68% до Level 6"
          progress={68}
        />
      </div>

      {/* Continue Learning Card */}
      <div className="mb-8">
        <ContinueLearningCard />
      </div>

      {/* Recommended For You */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Рекомендуем тебе</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecommendationCard
            icon="🧪"
            title="RICE Framework"
            category="Приоритизация"
            duration="20 min"
            href="/library/rice-calculator"
          />
          <RecommendationCard
            icon="📝"
            title="PRD Writing"
            category="Артефакты"
            duration="30 min"
            href="/modules/product-artifacts/lessons/prd-writing"
          />
          <RecommendationCard
            icon="🎯"
            title="OKRs Setting"
            category="Стратегия"
            duration="25 min"
            href="/modules/frameworks-tools/lessons/okrs"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Недавняя активность</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <ActivityFeed />
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Skill Progress */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Развитие навыков</h3>
          <SkillProgressChart />
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Топ на этой неделе</h3>
          <Leaderboard currentUser={user.name} />
        </div>
      </div>

      {/* Achievements Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Последние достижения</h2>
          <Link href="/achievements" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            Все достижения →
          </Link>
        </div>
        <AchievementsPreview />
      </div>
    </PlatformLayout>
  )
}

// Component: Email Verification Banner
function VerificationBanner({ user }: { user: any }) {
  const [resending, setResending] = useState(false)
  const [message, setMessage] = useState('')
  const [showDevToken, setShowDevToken] = useState(false)
  const [verificationUrl, setVerificationUrl] = useState('')

  const handleResend = async () => {
    setResending(true)
    setMessage('')
    
    try {
      const { userApi } = await import('@/lib/api')
      const response = await userApi.resendVerification()
      setMessage(response.message || 'Письмо отправлено!')
    } catch (error: any) {
      setMessage(error.message || 'Ошибка при отправке письма')
    } finally {
      setResending(false)
    }
  }

  const handleShowDevToken = async () => {
    try {
      const response = await fetch(`/api/dev/get-verification-token?email=${encodeURIComponent(user.email)}`)
      const data = await response.json()
      
      if (data.success) {
        setVerificationUrl(data.verificationUrl)
        setShowDevToken(true)
      }
    } catch (error) {
      console.error('Failed to get dev token:', error)
    }
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-yellow-700">
            Пожалуйста, подтвердите ваш email адрес. Мы отправили письмо с подтверждением на <strong>{user.email}</strong>
          </p>
          <div className="mt-3 flex items-center gap-4 flex-wrap">
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600 underline disabled:opacity-50"
            >
              {resending ? 'Отправка...' : 'Отправить письмо повторно'}
            </button>
            
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={handleShowDevToken}
                className="text-sm font-medium text-yellow-700 hover:text-yellow-600 underline"
              >
                📋 Показать ссылку для верификации
              </button>
            )}
            
            {message && <span className="text-sm text-yellow-600">{message}</span>}
          </div>
          
          {showDevToken && verificationUrl && (
            <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-300">
              <p className="text-xs text-yellow-800 mb-2">🔧 Режим разработки: скопируйте ссылку</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={verificationUrl}
                  readOnly
                  className="flex-1 text-xs px-2 py-1 bg-white border border-yellow-300 rounded"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(verificationUrl)
                    alert('Ссылка скопирована!')
                  }}
                  className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                >
                  Копировать
                </button>
                <a
                  href={verificationUrl}
                  className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                >
                  Открыть
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Component: Stat Card
interface StatCardProps {
  icon: string
  label: string
  value: string
  subtitle: string
  progress?: number
}

function StatCard({ icon, label, value, subtitle, progress }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-3">{icon}</span>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{subtitle}</div>
      {progress !== undefined && (
        <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  )
}

// Component: Continue Learning Card
function ContinueLearningCard() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl p-8 text-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">📊</span>
            <h3 className="text-2xl font-bold">Analytics & Metrics Mastery</h3>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-semibold">60%</span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
          
          <p className="text-indigo-100 mb-1">Next lesson: Cohort Analysis практика</p>
          <p className="text-indigo-200 text-sm">Estimated time: 25 min</p>
        </div>
        
        <Link
          href="/modules/analytics-metrics/lessons/cohort-analysis"
          className="ml-4 px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Продолжить →
        </Link>
      </div>
    </div>
  )
}

// Component: Recommendation Card
interface RecommendationCardProps {
  icon: string
  title: string
  category: string
  duration: string
  href: string
}

function RecommendationCard({ icon, title, category, duration, href }: RecommendationCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer h-full">
        <div className="text-5xl mb-4">{icon}</div>
        <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 mb-3">{category}</p>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {duration}
        </div>
        <div className="mt-4 text-indigo-600 font-medium text-sm">Start →</div>
      </div>
    </Link>
  )
}

// Component: Activity Feed
function ActivityFeed() {
  const activities = [
    { icon: '✅', text: 'Завершён кейс "Retention Challenge"', time: '2 часа назад' },
    { icon: '🏆', text: 'Получен badge "First A/B Test"', time: 'вчера' },
    { icon: '📊', text: 'Прогресс в Analytics +15%', time: '2 дня назад' },
    { icon: '📝', text: 'Создан PRD для проекта', time: '3 дня назад' },
    { icon: '🚀', text: 'Начат модуль Lifecycle Management', time: 'неделю назад' },
  ]

  return (
    <ul className="space-y-3">
      {activities.map((activity, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">{activity.icon}</span>
          <div className="flex-1">
            <p className="text-gray-900">{activity.text}</p>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

// Component: Skill Progress Chart
function SkillProgressChart() {
  const skills = [
    { name: 'Analytics', level: 80, color: 'bg-blue-500' },
    { name: 'Artifacts', level: 60, color: 'bg-green-500' },
    { name: 'Frameworks', level: 70, color: 'bg-purple-500' },
    { name: 'Collaboration', level: 40, color: 'bg-yellow-500' },
    { name: 'Lifecycle', level: 20, color: 'bg-red-500' },
  ]

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{skill.name}</span>
            <span className="text-sm text-gray-500">{skill.level}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${skill.color} transition-all duration-300`}
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Component: Leaderboard
function Leaderboard({ currentUser }: { currentUser: string }) {
  const leaders = [
    { name: 'Алексей', points: 1250, rank: 1 },
    { name: 'Мария', points: 1180, rank: 2 },
    { name: currentUser, points: 1050, rank: 3, isCurrentUser: true },
    { name: 'Дмитрий', points: 980, rank: 4 },
    { name: 'Елена', points: 920, rank: 5 },
  ]

  return (
    <div>
      <ul className="space-y-2">
        {leaders.map((leader) => (
          <li
            key={leader.rank}
            className={`flex items-center justify-between p-3 rounded-lg ${
              leader.isCurrentUser ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-500 w-6">{leader.rank}.</span>
              <span className="font-medium text-gray-900">
                {leader.name}
                {leader.isCurrentUser && ' ⭐'}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-700">{leader.points} pts</span>
          </li>
        ))}
      </ul>
      <Link
        href="/progress#leaderboard"
        className="block mt-4 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
      >
        Полная таблица →
      </Link>
    </div>
  )
}

// Component: Achievements Preview
function AchievementsPreview() {
  const achievements = [
    { icon: '🏅', name: 'First A/B Test' },
    { icon: '🎯', name: 'RICE Pro' },
    { icon: '📊', name: 'GA4 Setup' },
    { icon: '🧪', name: 'Framework Expert' },
    { icon: '🚀', name: 'Quick Learner' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex gap-6 justify-center">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 hover:scale-110 transition-transform cursor-pointer"
            title={achievement.name}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
              {achievement.icon}
            </div>
            <span className="text-xs text-gray-600 text-center">{achievement.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
