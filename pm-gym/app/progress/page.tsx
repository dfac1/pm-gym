'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatformLayout from '@/components/platform/PlatformLayout'

export default function ProgressPage() {
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

  const skills = [
    { name: 'Analytics & Metrics', level: 80, color: 'bg-blue-500' },
    { name: 'Product Artifacts', level: 60, color: 'bg-green-500' },
    { name: 'Collaboration', level: 40, color: 'bg-yellow-500' },
    { name: 'Frameworks & Tools', level: 70, color: 'bg-purple-500' },
    { name: 'Lifecycle Management', level: 20, color: 'bg-red-500' },
    { name: 'Stakeholder Management', level: 30, color: 'bg-pink-500' },
    { name: 'Advanced Topics', level: 10, color: 'bg-orange-500' },
    { name: 'Career & Leadership', level: 25, color: 'bg-indigo-500' },
  ]

  const activityData = [
    { day: 'Пн', hours: 1.2 },
    { day: 'Вт', hours: 2.5 },
    { day: 'Ср', hours: 1.8 },
    { day: 'Чт', hours: 3.2 },
    { day: 'Пт', hours: 2.1 },
    { day: 'Сб', hours: 0.5 },
    { day: 'Вс', hours: 1.5 },
  ]

  const completedScenarios = [
    { title: 'Retention Challenge', score: 85, grade: 'A', date: '5 дней назад' },
    { title: 'North Star Selection', score: 78, grade: 'B+', date: '1 неделю назад' },
    { title: 'Feature Prioritization', score: 92, grade: 'A', date: '2 недели назад' },
    { title: 'A/B Test Design', score: 88, grade: 'A-', date: '3 недели назад' },
  ]

  return (
    <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Мой прогресс</h1>
        <p className="text-lg text-gray-600">
          Детальная аналитика твоего обучения
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard icon="🏆" label="Level" value="5" subtitle="68% до Level 6" progress={68} />
        <StatCard icon="⭐" label="Всего баллов" value="1,250" subtitle="+150 за неделю" />
        <StatCard icon="🏅" label="Достижений" value="25" subtitle="из 100 возможных" />
        <StatCard icon="⏱️" label="Часов обучения" value="12h" subtitle="в этом месяце" />
      </div>

      {/* Skills Radar */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Развитие навыков</h2>
        <div className="space-y-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                  <span className="text-xs text-gray-500">
                    Level {Math.floor(skill.level / 20) + 1}
                  </span>
                </div>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${skill.color} transition-all duration-500`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Progress */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Прогресс по модулям</h2>
        <div className="space-y-4">
          <ModuleProgressBar module="Analytics & Metrics" progress={80} icon="📊" />
          <ModuleProgressBar module="Product Artifacts" progress={60} icon="📝" />
          <ModuleProgressBar module="Collaboration" progress={40} icon="👥" />
          <ModuleProgressBar module="Frameworks & Tools" progress={70} icon="🧪" />
          <ModuleProgressBar module="Lifecycle Management" progress={0} icon="🚀" />
          <ModuleProgressBar module="Stakeholder Management" progress={20} icon="💼" />
          <ModuleProgressBar module="Advanced Topics" progress={0} icon="🎯" />
          <ModuleProgressBar module="Career & Leadership" progress={0} icon="🏆" />
        </div>
      </div>

      {/* Activity Over Time */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Активность за последние 7 дней</h2>
        <div className="flex items-end justify-between gap-4 h-64">
          {activityData.map((day, index) => {
            const maxHours = Math.max(...activityData.map(d => d.hours))
            const height = (day.hours / maxHours) * 100
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative flex-1 w-full flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg hover:from-indigo-700 hover:to-indigo-500 transition-all cursor-pointer group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.hours}ч
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 font-medium">{day.day}</span>
              </div>
            )
          })}
        </div>
        <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
          <div>Среднее время в день: <span className="font-bold text-gray-900">1.8 часа</span></div>
          <div>Самый продуктивный день: <span className="font-bold text-gray-900">Четверг</span></div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Completed Scenarios */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Пройденные сценарии</h3>
          <p className="text-sm text-gray-600 mb-6">Средний score: 86/100</p>
          <div className="space-y-4">
            {completedScenarios.map((scenario, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{scenario.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    scenario.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                    scenario.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {scenario.grade}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Score: {scenario.score}/100</span>
                  <span className="text-gray-500">{scenario.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Streak */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Learning Streak</h3>
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔥</div>
            <div className="text-4xl font-bold text-gray-900 mb-2">7 дней</div>
            <div className="text-sm text-gray-600">Текущая серия</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Лучшая серия</span>
              <span className="font-bold text-gray-900">14 дней 🏆</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Занятий на этой неделе</span>
              <span className="font-bold text-gray-900">5 из 7 дней</span>
            </div>
          </div>
          <div className="mt-6 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-900">
              <span className="font-bold">Совет:</span> Занимайся каждый день, чтобы не прервать серию!
            </p>
          </div>
        </div>
      </div>

      {/* Time Statistics */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Статистика времени</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Всего часов</div>
            <div className="text-3xl font-bold text-gray-900">45.5h</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Среднее в неделю</div>
            <div className="text-3xl font-bold text-gray-900">8.2h</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Предпочитаемое время</div>
            <div className="text-3xl font-bold text-gray-900">20:00</div>
          </div>
        </div>
      </div>
    </PlatformLayout>
  )
}

function StatCard({ icon, label, value, subtitle, progress }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
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

function ModuleProgressBar({ module, progress, icon }: any) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">{module}</span>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
