'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PlatformLayout from '@/components/platform/PlatformLayout'
import Link from 'next/link'

// Mock module data
const moduleData: any = {
  'analytics-metrics': {
    slug: 'analytics-metrics',
    icon: '📊',
    title: 'Analytics & Metrics Mastery',
    description: 'Научись работать с аналитикой и метриками продукта',
    difficulty: 'Beginner → Intermediate',
    estimatedHours: 6,
    lessonsCount: 18,
    practiceCount: 12,
    progress: 65,
    objectives: [
      'Настраивать аналитические инструменты',
      'Строить воронки и когорты',
      'Проводить A/B тесты правильно',
      'Выбирать и трекать ключевые метрики',
      'Принимать решения на основе данных',
    ],
    sections: [
      {
        id: 1,
        title: 'Введение в аналитику',
        lessonsCount: 3,
        lessons: [
          { id: 1, number: '1.1', title: 'Зачем нужна аналитика PM', duration: 15, status: 'completed' },
          { id: 2, number: '1.2', title: 'Типы метрик и их применение', duration: 20, status: 'completed' },
          { id: 3, number: '1.3', title: 'Data-driven decision making', duration: 25, status: 'in-progress' },
        ],
      },
      {
        id: 2,
        title: 'Аналитические инструменты',
        lessonsCount: 5,
        lessons: [
          { id: 4, number: '2.1', title: 'Google Analytics 4 Setup', duration: 30, status: 'locked' },
          { id: 5, number: '2.2', title: 'События и конверсии в GA4', duration: 35, status: 'locked' },
          { id: 6, number: '2.3', title: 'Amplitude для продактов', duration: 40, status: 'locked' },
          { id: 7, number: '2.4', title: 'Mixpanel альтернатива', duration: 35, status: 'locked' },
          { id: 8, number: '2.5', title: 'Сравнение инструментов', duration: 20, status: 'locked' },
        ],
      },
      {
        id: 3,
        title: 'Метрики и KPI',
        lessonsCount: 6,
        lessons: [
          { id: 9, number: '3.1', title: 'North Star Metric', duration: 30, status: 'locked' },
          { id: 10, number: '3.2', title: 'AARRR Pirate Metrics', duration: 40, status: 'locked' },
          { id: 11, number: '3.3', title: 'Engagement metrics (DAU/MAU)', duration: 35, status: 'locked' },
        ],
      },
    ],
    practices: [
      {
        id: 1,
        type: 'quiz',
        title: 'Quiz: Типы метрик',
        questions: 10,
        duration: 15,
        status: 'completed',
        score: 90,
      },
      {
        id: 2,
        type: 'hands-on',
        title: 'Практика: Настройка событий в GA4',
        duration: 30,
        status: 'in-progress',
        progress: 50,
      },
      {
        id: 3,
        type: 'scenario',
        title: 'Сценарий: Падение retention',
        duration: 45,
        status: 'locked',
        requirement: 'Завершить уроки 3.1-3.3',
      },
    ],
    resources: [
      {
        category: 'Справочные материалы',
        items: [
          { title: 'PM Metrics Cheat Sheet', type: 'PDF', url: '#' },
          { title: 'Google Analytics 4 Guide', type: 'Link', url: '#' },
          { title: 'AARRR Framework Overview', type: 'Article', url: '#' },
        ],
      },
      {
        category: 'Видео',
        items: [
          { title: 'Analytics for PMs by Lenny Rachitsky', type: 'YouTube', url: '#' },
          { title: 'Amplitude Tutorial Series', type: 'Playlist', url: '#' },
        ],
      },
      {
        category: 'Инструменты',
        items: [
          { title: 'RICE Calculator', type: 'Interactive', url: '/library/rice-calculator' },
          { title: 'Sample Size Calculator', type: 'Interactive', url: '/library/sample-size' },
          { title: 'Metrics Dashboard Template', type: 'Figma', url: '#' },
        ],
      },
    ],
  },
}

export default function ModulePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'practice' | 'resources'>('overview')

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

  const module = moduleData[slug]

  if (!module) {
    return (
      <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Модуль не найден</h1>
          <Link href="/modules" className="text-indigo-600 hover:underline">
            ← Вернуться к модулям
          </Link>
        </div>
      </PlatformLayout>
    )
  }

  return (
    <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
      {/* Breadcrumbs */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/modules" className="hover:text-gray-900">Modules</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">{module.title}</span>
      </div>

      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">{module.icon}</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{module.description}</p>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold">{module.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 transition-all duration-300"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              {Math.round((module.progress / 100) * module.lessonsCount)} из {module.lessonsCount} уроков завершено
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex gap-8">
          <TabButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon="📚"
            label="Обзор"
          />
          <TabButton
            active={activeTab === 'lessons'}
            onClick={() => setActiveTab('lessons')}
            icon="📖"
            label="Lessons"
          />
          <TabButton
            active={activeTab === 'practice'}
            onClick={() => setActiveTab('practice')}
            icon="🧪"
            label="Practice"
          />
          <TabButton
            active={activeTab === 'resources'}
            onClick={() => setActiveTab('resources')}
            icon="📚"
            label="Resources"
          />
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab module={module} />}
      {activeTab === 'lessons' && <LessonsTab module={module} />}
      {activeTab === 'practice' && <PracticeTab module={module} />}
      {activeTab === 'resources' && <ResourcesTab module={module} />}
    </PlatformLayout>
  )
}

// Tab Button Component
function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
        active
          ? 'border-indigo-600 text-indigo-600 font-semibold'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

// Overview Tab
function OverviewTab({ module }: { module: any }) {
  return (
    <div className="space-y-8">
      {/* What You'll Learn */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">В этом модуле ты научишься:</h2>
        <ul className="space-y-3">
          {module.objectives.map((objective: string, index: number) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✅</span>
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Module Structure */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Структура модуля</h2>
        <ul className="space-y-2">
          {module.sections.map((section: any) => (
            <li key={section.id} className="text-gray-700">
              • Section {section.id}: {section.title} ({section.lessonsCount} уроков)
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Статистика</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Время на прохождение:</div>
            <div className="text-2xl font-bold text-gray-900">{module.estimatedHours}-{module.estimatedHours + 2} часов</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Уроков:</div>
            <div className="text-2xl font-bold text-gray-900">{module.lessonsCount}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Практических заданий:</div>
            <div className="text-2xl font-bold text-gray-900">{module.practiceCount}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Сложность:</div>
            <div className="text-xl font-semibold text-gray-900">{module.difficulty}</div>
          </div>
        </div>
      </div>

      {/* Prerequisites */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
        <p className="text-gray-700">
          Этот модуль не требует предварительных знаний. Начни с первого урока!
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <Link
          href={`/modules/${module.slug}/lessons/intro`}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          {module.progress > 0 ? 'Продолжить модуль →' : 'Начать модуль →'}
        </Link>
        <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all">
          Добавить в закладки
        </button>
      </div>
    </div>
  )
}

// Lessons Tab
function LessonsTab({ module }: { module: any }) {
  const getStatusIcon = (status: string) => {
    if (status === 'completed') return '✅'
    if (status === 'in-progress') return '🔄'
    return '🔒'
  }

  const nextLesson = module.sections
    .flatMap((s: any) => s.lessons)
    .find((l: any) => l.status === 'in-progress' || l.status === 'locked')

  return (
    <div className="space-y-8">
      {/* Continue Button */}
      {nextLesson && (
        <Link
          href={`/modules/${module.slug}/lessons/${nextLesson.id}`}
          className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-indigo-200 mb-1">Continue with</div>
              <div className="text-xl font-bold">Lesson {nextLesson.number}: {nextLesson.title}</div>
            </div>
            <div className="text-2xl">→</div>
          </div>
        </Link>
      )}

      {/* Lessons List */}
      {module.sections.map((section: any) => (
        <div key={section.id} className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📊 Section {section.id}: {section.title}
          </h3>
          <div className="space-y-2">
            {section.lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                href={lesson.status !== 'locked' ? `/modules/${module.slug}/lessons/${lesson.id}` : '#'}
                className={`block p-4 rounded-lg border-2 transition-all ${
                  lesson.status === 'locked'
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getStatusIcon(lesson.status)}</span>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {lesson.number} {lesson.title}
                      </div>
                      <div className="text-sm text-gray-500">{lesson.duration} min</div>
                    </div>
                  </div>
                  {lesson.status !== 'locked' && (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Practice Tab
function PracticeTab({ module }: { module: any }) {
  const [scenarios, setScenarios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Загружаем сценарии из JSON
    fetch('/data/scenarios.json')
      .then(res => res.json())
      .then(data => {
        // Фильтруем сценарии для текущего модуля
        const scenarioModuleMap: { [key: string]: string } = {
          'retention-falling-case': 'analytics-metrics',
          'roadmap-conflict-case': 'strategy-roadmap',
          'activation-drop-case': 'growth-activation'
        }
        
        const moduleScenarios = data.scenarios.filter((s: any) => 
          scenarioModuleMap[s.id] === module.slug
        )
        
        setScenarios(moduleScenarios)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading scenarios:', err)
        setLoading(false)
      })
  }, [module.slug])

  const getTypeIcon = (type: string) => {
    if (type === 'quiz') return '🧪'
    if (type === 'hands-on') return '📊'
    if (type === 'scenario') return '🎯'
    return '📝'
  }

  const getStatusBadge = (practice: any) => {
    if (practice.status === 'completed') {
      return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">✅ Завершено ({practice.score}%)</span>
    }
    if (practice.status === 'in-progress') {
      return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold">🔄 В процессе ({practice.progress}%)</span>
    }
    return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold">🔒 Заблокировано</span>
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      'easy': 'bg-green-100 text-green-700',
      'medium': 'bg-yellow-100 text-yellow-700',
      'hard': 'bg-red-100 text-red-700'
    }
    const labels: { [key: string]: string } = {
      'easy': 'Легкий',
      'medium': 'Средний',
      'hard': 'Сложный'
    }
    return <span className={`px-3 py-1 ${colors[difficulty] || colors.easy} text-xs rounded-full font-semibold`}>
      {labels[difficulty] || difficulty}
    </span>
  }

  return (
    <div className="space-y-6">
      {/* Интерактивные сценарии */}
      {scenarios.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎮 Интерактивные симуляции</h2>
          <p className="text-gray-600 mb-6">Реалистичные кейсы для тренировки продакт-мышления</p>

          <div className="space-y-4">
            {scenarios.map((scenario: any) => (
              <div key={scenario.id} className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 hover:border-purple-400 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">🎯</span>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{scenario.title}</h4>
                      <p className="text-sm text-gray-700 mb-2">{scenario.description}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {getDifficultyBadge(scenario.difficulty)}
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">
                          {scenario.category}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold">
                          ⏱ ~{scenario.estimatedTime} мин
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {scenario.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-white text-gray-600 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                  <div className="text-sm text-gray-700 mb-2 font-semibold">Что тренирует:</div>
                  <div className="flex flex-wrap gap-1">
                    {scenario.learningGoals.slice(0, 4).map((goal: string, idx: number) => (
                      <span key={idx} className="text-xs text-purple-700">
                        {idx > 0 && '• '}{goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <Link
                    href={`/scenarios/${scenario.id}`}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Начать симуляцию →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Другие практические задания */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📝 Практические задания</h2>
        <p className="text-gray-600 mb-6">Закрепи знания на реальных задачах</p>

        <div className="space-y-4">
          {module.practices.map((practice: any) => (
            <div key={practice.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getTypeIcon(practice.type)}</span>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{practice.title}</h4>
                    <div className="text-sm text-gray-600">
                      {practice.questions && `${practice.questions} вопросов • `}
                      {practice.duration} min
                    </div>
                  </div>
                </div>
                {getStatusBadge(practice)}
              </div>

              {practice.requirement && practice.status === 'locked' && (
                <div className="text-sm text-gray-600 mb-3">
                  Требование: {practice.requirement}
                </div>
              )}

              {practice.status === 'in-progress' && practice.progress && (
                <div className="mb-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300"
                      style={{ width: `${practice.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {practice.status !== 'locked' && (
                  <>
                    <Link
                      href={`/practice/${practice.id}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      {practice.status === 'completed' ? 'Пройти снова' : 'Продолжить'}
                    </Link>
                    {practice.status === 'completed' && (
                      <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors">
                        Посмотреть результат
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Resources Tab
function ResourcesTab({ module }: { module: any }) {
  return (
    <div className="space-y-6">
      {module.resources.map((category: any, index: number) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
          <ul className="space-y-2">
            {category.items.map((item: any, itemIndex: number) => (
              <li key={itemIndex}>
                <Link
                  href={item.url}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 group-hover:text-indigo-600 transition-colors">📄</span>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">{item.type}</div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
