'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatformLayout from '@/components/platform/PlatformLayout'
import Link from 'next/link'

// Mock modules data (will be replaced with API call)
const modules = [
  {
    id: 1,
    slug: 'analytics-metrics',
    icon: '📊',
    title: 'Analytics & Metrics Mastery',
    description: 'Научись работать с аналитикой и метриками продукта',
    difficulty: 'Beginner → Intermediate',
    estimatedHours: 6,
    lessonsCount: 18,
    progress: 60,
    featured: true,
  },
  {
    id: 2,
    slug: 'product-artifacts',
    icon: '📝',
    title: 'Product Artifacts',
    description: 'Создавай PRD, User Stories, и другие документы',
    difficulty: 'Beginner',
    estimatedHours: 5,
    lessonsCount: 15,
    progress: 30,
    featured: false,
  },
  {
    id: 3,
    slug: 'collaboration',
    icon: '👥',
    title: 'Collaboration',
    description: 'Эффективная работа с командой и стейкхолдерами',
    difficulty: 'Intermediate',
    estimatedHours: 4,
    lessonsCount: 12,
    progress: 0,
    featured: false,
  },
  {
    id: 4,
    slug: 'frameworks-tools',
    icon: '🧪',
    title: 'Frameworks & Tools',
    description: 'RICE, ICE, Kano, Jobs-to-be-Done и другие фреймворки',
    difficulty: 'Beginner → Advanced',
    estimatedHours: 7,
    lessonsCount: 20,
    progress: 0,
    featured: true,
    isNew: true,
  },
  {
    id: 5,
    slug: 'lifecycle-management',
    icon: '🚀',
    title: 'Product Lifecycle Management',
    description: 'От идеи до запуска и масштабирования продукта',
    difficulty: 'Intermediate',
    estimatedHours: 8,
    lessonsCount: 22,
    progress: 0,
    featured: false,
  },
  {
    id: 6,
    slug: 'stakeholder-management',
    icon: '💼',
    title: 'Stakeholder Management',
    description: 'Управление ожиданиями и коммуникация с заинтересованными сторонами',
    difficulty: 'Intermediate → Advanced',
    estimatedHours: 5,
    lessonsCount: 14,
    progress: 0,
    featured: false,
  },
  {
    id: 7,
    slug: 'advanced-topics',
    icon: '🎯',
    title: 'Advanced Product Topics',
    description: 'Продвинутые темы: монетизация, growth, платформенное мышление',
    difficulty: 'Advanced',
    estimatedHours: 10,
    lessonsCount: 25,
    progress: 0,
    featured: false,
  },
  {
    id: 8,
    slug: 'career-leadership',
    icon: '🏆',
    title: 'Career & Leadership',
    description: 'Развитие карьеры и лидерских навыков PM',
    difficulty: 'All Levels',
    estimatedHours: 6,
    lessonsCount: 16,
    progress: 0,
    featured: false,
  },
]

export default function ModulesPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'not-started' | 'completed'>('all')

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

  const filteredModules = modules.filter(module => {
    if (filter === 'all') return true
    if (filter === 'in-progress') return module.progress > 0 && module.progress < 100
    if (filter === 'not-started') return module.progress === 0
    if (filter === 'completed') return module.progress === 100
    return true
  })

  return (
    <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Все модули</h1>
        <p className="text-lg text-gray-600">
          Выбери модуль и начни обучение
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex items-center gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Все ({modules.length})
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'in-progress'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          В процессе ({modules.filter(m => m.progress > 0 && m.progress < 100).length})
        </button>
        <button
          onClick={() => setFilter('not-started')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'not-started'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Не начато ({modules.filter(m => m.progress === 0).length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Завершено ({modules.filter(m => m.progress === 100).length})
        </button>
      </div>

      {/* Featured Modules */}
      {filter === 'all' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⭐ Рекомендуем начать с</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.filter(m => m.featured).map(module => (
              <FeaturedModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      )}

      {/* All Modules Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {filter === 'all' ? 'Все модули' : 'Результаты'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </PlatformLayout>
  )
}

// Featured Module Card (larger)
function FeaturedModuleCard({ module }: { module: any }) {
  return (
    <Link href={`/modules/${module.slug}`}>
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl p-8 text-white hover:shadow-2xl transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="text-5xl">{module.icon}</span>
          {module.isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
              NEW
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
        <p className="text-indigo-100 mb-4">{module.description}</p>
        
        <div className="flex items-center gap-4 text-sm mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{module.estimatedHours}ч</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{module.lessonsCount} уроков</span>
          </div>
        </div>
        
        {module.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-semibold">{module.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${module.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-indigo-200">{module.difficulty}</span>
          <span className="font-semibold">
            {module.progress > 0 ? 'Продолжить →' : 'Начать →'}
          </span>
        </div>
      </div>
    </Link>
  )
}

// Regular Module Card
function ModuleCard({ module }: { module: any }) {
  return (
    <Link href={`/modules/${module.slug}`}>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{module.icon}</span>
          {module.isNew && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
              NEW
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{module.description}</p>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{module.estimatedHours}ч</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{module.lessonsCount} уроков</span>
          </div>
        </div>
        
        {module.progress > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span className="font-semibold">{module.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${module.progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-xs text-gray-500">{module.difficulty}</span>
          <span className="text-sm font-semibold text-indigo-600">
            {module.progress > 0 ? 'Продолжить →' : 'Начать →'}
          </span>
        </div>
      </div>
    </Link>
  )
}
