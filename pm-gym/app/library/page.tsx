'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatformLayout from '@/components/platform/PlatformLayout'
import Link from 'next/link'

// Mock resources data
const resources = [
  // Templates
  {
    id: 1,
    title: 'PRD Template',
    description: 'Полный шаблон Product Requirements Document',
    type: 'template',
    category: 'artifacts',
    format: 'Google Docs',
    url: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'User Story Template',
    description: 'Шаблон для написания user stories',
    type: 'template',
    category: 'artifacts',
    format: 'Notion',
    url: '#',
    featured: false,
  },
  {
    id: 3,
    title: 'Roadmap Template',
    description: 'Визуальный шаблон продуктового roadmap',
    type: 'template',
    category: 'planning',
    format: 'Figma',
    url: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'OKR Template',
    description: 'Шаблон для постановки целей и ключевых результатов',
    type: 'template',
    category: 'planning',
    format: 'Excel',
    url: '#',
    featured: false,
  },
  
  // Tools
  {
    id: 5,
    title: 'RICE Calculator',
    description: 'Интерактивный калькулятор для RICE-приоритизации',
    type: 'tool',
    category: 'frameworks',
    format: 'Interactive',
    url: '#',
    featured: true,
  },
  {
    id: 6,
    title: 'ICE Calculator',
    description: 'Калькулятор для ICE-framework приоритизации',
    type: 'tool',
    category: 'frameworks',
    format: 'Interactive',
    url: '#',
    featured: false,
  },
  {
    id: 7,
    title: 'Sample Size Calculator',
    description: 'Рассчитать необходимый размер выборки для A/B теста',
    type: 'tool',
    category: 'analytics',
    format: 'Interactive',
    url: '#',
    featured: true,
  },
  {
    id: 8,
    title: 'CAC/LTV Calculator',
    description: 'Калькулятор Customer Acquisition Cost и Lifetime Value',
    type: 'tool',
    category: 'analytics',
    format: 'Interactive',
    url: '#',
    featured: false,
  },
  
  // Checklists
  {
    id: 9,
    title: 'Launch Checklist',
    description: '30+ пунктов для успешного запуска продукта',
    type: 'checklist',
    category: 'planning',
    format: 'PDF',
    url: '#',
    featured: false,
  },
  {
    id: 10,
    title: 'A/B Test Checklist',
    description: 'Проверочный список для проведения A/B тестов',
    type: 'checklist',
    category: 'analytics',
    format: 'PDF',
    url: '#',
    featured: false,
  },
  {
    id: 11,
    title: 'User Interview Guide',
    description: 'Гайд по проведению интервью с пользователями',
    type: 'checklist',
    category: 'research',
    format: 'PDF',
    url: '#',
    featured: false,
  },
  
  // Guides
  {
    id: 12,
    title: 'PM Metrics Dictionary',
    description: 'Полный справочник по метрикам продакт-менеджера',
    type: 'guide',
    category: 'analytics',
    format: 'Article',
    url: '#',
    featured: true,
  },
  {
    id: 13,
    title: 'Analytics Tools Comparison',
    description: 'Сравнение GA4, Amplitude, Mixpanel',
    type: 'guide',
    category: 'analytics',
    format: 'Article',
    url: '#',
    featured: false,
  },
  {
    id: 14,
    title: 'Framework Quick Reference',
    description: 'Краткий справочник по продуктовым фреймворкам',
    type: 'guide',
    category: 'frameworks',
    format: 'PDF',
    url: '#',
    featured: false,
  },
]

export default function LibraryPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

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

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || resource.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter
    return matchesSearch && matchesType && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template': return '📝'
      case 'tool': return '🧪'
      case 'checklist': return '✅'
      case 'guide': return '📚'
      default: return '📄'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'template': return 'Шаблон'
      case 'tool': return 'Инструмент'
      case 'checklist': return 'Чеклист'
      case 'guide': return 'Гайд'
      default: return type
    }
  }

  return (
    <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Библиотека</h1>
        <p className="text-lg text-gray-600">
          Шаблоны, фреймворки и справочники для PM
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по библиотеке..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-lg"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <span className="text-sm text-gray-600 font-medium mb-2 block">Тип:</span>
          <div className="flex items-center gap-3 flex-wrap">
            {['all', 'template', 'tool', 'checklist', 'guide'].map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  typeFilter === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {type === 'all' ? 'Все' : getTypeLabel(type)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-600 font-medium mb-2 block">Категория:</span>
          <div className="flex items-center gap-3 flex-wrap">
            {['all', 'analytics', 'artifacts', 'frameworks', 'planning', 'research'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat === 'all' ? 'Все' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      {searchQuery === '' && typeFilter === 'all' && categoryFilter === 'all' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⭐ Популярные ресурсы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources
              .filter(r => r.featured)
              .slice(0, 3)
              .map(resource => (
                <FeaturedResourceCard key={resource.id} resource={resource} getTypeIcon={getTypeIcon} />
              ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {searchQuery || typeFilter !== 'all' || categoryFilter !== 'all' ? 'Результаты поиска' : 'Все ресурсы'}
        </h2>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
            <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} getTypeIcon={getTypeIcon} getTypeLabel={getTypeLabel} />
            ))}
          </div>
        )}
      </div>

      {/* Categories Overview */}
      {searchQuery === '' && typeFilter === 'all' && categoryFilter === 'all' && (
        <div className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Категории ресурсов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategoryCard
              icon="📊"
              title="Analytics"
              count={resources.filter(r => r.category === 'analytics').length}
              onClick={() => setCategoryFilter('analytics')}
            />
            <CategoryCard
              icon="📝"
              title="Artifacts"
              count={resources.filter(r => r.category === 'artifacts').length}
              onClick={() => setCategoryFilter('artifacts')}
            />
            <CategoryCard
              icon="🧪"
              title="Frameworks"
              count={resources.filter(r => r.category === 'frameworks').length}
              onClick={() => setCategoryFilter('frameworks')}
            />
            <CategoryCard
              icon="🗓️"
              title="Planning"
              count={resources.filter(r => r.category === 'planning').length}
              onClick={() => setCategoryFilter('planning')}
            />
            <CategoryCard
              icon="🔍"
              title="Research"
              count={resources.filter(r => r.category === 'research').length}
              onClick={() => setCategoryFilter('research')}
            />
          </div>
        </div>
      )}
    </PlatformLayout>
  )
}

// Featured Resource Card
function FeaturedResourceCard({ resource, getTypeIcon }: any) {
  return (
    <Link href={resource.url}>
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-xl p-6 text-white hover:shadow-2xl transition-all cursor-pointer h-full">
        <div className="text-5xl mb-4">{getTypeIcon(resource.type)}</div>
        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        <p className="text-indigo-100 mb-4 text-sm">{resource.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-indigo-200">{resource.format}</span>
          <span className="font-semibold">Открыть →</span>
        </div>
      </div>
    </Link>
  )
}

// Regular Resource Card
function ResourceCard({ resource, getTypeIcon, getTypeLabel }: any) {
  return (
    <Link href={resource.url}>
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <span className="text-4xl">{getTypeIcon(resource.type)}</span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold">
            {getTypeLabel(resource.type)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{resource.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">{resource.format}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                alert('Добавлено в закладки!')
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-400 hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

// Category Card
function CategoryCard({ icon, title, count, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all text-left"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-indigo-200 text-sm">{count} ресурсов</p>
    </button>
  )
}
