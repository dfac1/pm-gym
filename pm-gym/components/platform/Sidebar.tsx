'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Module definitions
const modules = [
  { id: 'analytics', icon: '📊', title: 'Analytics & Metrics', slug: 'analytics-metrics', inProgress: true, lessons: 3 },
  { id: 'artifacts', icon: '📝', title: 'Product Artifacts', slug: 'product-artifacts', inProgress: false },
  { id: 'collaboration', icon: '👥', title: 'Collaboration', slug: 'collaboration', inProgress: false },
  { id: 'frameworks', icon: '🧪', title: 'Frameworks & Tools', slug: 'frameworks-tools', isNew: true },
  { id: 'lifecycle', icon: '🚀', title: 'Lifecycle Management', slug: 'lifecycle-management', inProgress: false },
  { id: 'stakeholders', icon: '💼', title: 'Stakeholder Management', slug: 'stakeholder-management', inProgress: false },
  { id: 'advanced', icon: '🎯', title: 'Advanced Topics', slug: 'advanced-topics', inProgress: false },
  { id: 'career', icon: '🏆', title: 'Career & Leadership', slug: 'career-leadership', inProgress: false },
]

interface SidebarProps {
  user?: {
    name: string
    email: string
    image?: string
    level?: number
    progress?: number
  }
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [modulesExpanded, setModulesExpanded] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/')

  const level = user?.level || 5
  const progress = user?.progress || 68

  if (collapsed) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-50">
        {/* Logo */}
        <Link href="/dashboard" className="mb-8 text-2xl">
          🎯
        </Link>

        {/* Collapsed Menu Icons */}
        <nav className="flex-1 flex flex-col items-center gap-2 w-full">
          <NavIconButton href="/dashboard" icon="🏠" active={isActive('/dashboard')} tooltip="Dashboard" />
          <NavIconButton href="/modules" icon="📚" active={isActive('/modules')} tooltip="Обучение" />
          <NavIconButton href="/progress" icon="📈" active={isActive('/progress')} tooltip="Мой прогресс" />
          <NavIconButton href="/achievements" icon="🏆" active={isActive('/achievements')} tooltip="Достижения" />
          <NavIconButton href="/library" icon="📋" active={isActive('/library')} tooltip="Библиотека" />
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-2 border-t border-gray-200 pt-4 w-full">
          <NavIconButton href="/settings" icon="⚙️" active={isActive('/settings')} tooltip="Настройки" />
          <NavIconButton href="/help" icon="❓" active={isActive('/help')} tooltip="Помощь" />
          
          {/* Avatar */}
          <Link href="/settings" className="mt-2">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </Link>
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setCollapsed(false)}
          className="mt-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Expand sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </aside>
    )
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto z-50">
      {/* Header with Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="text-xl font-bold text-gray-900">PM Gym</span>
        </Link>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="Collapse sidebar"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {/* Dashboard */}
        <NavItem
          href="/dashboard"
          icon="🏠"
          label="Dashboard"
          active={isActive('/dashboard')}
        />

        {/* Modules Section */}
        <div className="mt-6">
          <button
            onClick={() => setModulesExpanded(!modulesExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>📚</span>
              <span>Обучение</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${modulesExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Modules List */}
          {modulesExpanded && (
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 pl-2">
              {modules.map((module) => (
                <Link
                  key={module.id}
                  href={`/modules/${module.slug}`}
                  className={`
                    block px-3 py-2 rounded-lg text-sm transition-colors
                    ${isActive(`/modules/${module.slug}`)
                      ? 'bg-indigo-50 text-indigo-700 font-medium border-l-2 border-indigo-600 -ml-2 pl-[10px]'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{module.icon}</span>
                      <span className="text-xs">{module.title}</span>
                    </div>
                    {module.inProgress && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-medium">
                        {module.lessons}
                      </span>
                    )}
                    {module.isNew && (
                      <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] rounded font-medium">
                        New
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Other Menu Items */}
        <div className="mt-6 space-y-1">
          <NavItem
            href="/progress"
            icon="📈"
            label="Мой прогресс"
            active={isActive('/progress')}
          />
          <NavItem
            href="/achievements"
            icon="🏆"
            label="Достижения"
            active={isActive('/achievements')}
            badge={2}
          />
          <NavItem
            href="/library"
            icon="📋"
            label="Библиотека"
            active={isActive('/library')}
          />
        </div>

        {/* Utilities */}
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-1">
          <NavItem
            href="/settings"
            icon="⚙️"
            label="Настройки"
            active={isActive('/settings')}
          />
          <NavItem
            href="/help"
            icon="❓"
            label="Помощь"
            active={isActive('/help')}
          />
        </div>
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/settings"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Пользователь'}
            </div>
            <div className="text-xs text-gray-500">
              Level {level}
            </div>
          </div>
        </Link>
        {/* Progress Bar */}
        <div className="mt-2 px-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{progress}%</span>
            <span>до Level {level + 1}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}

// Helper Components
interface NavItemProps {
  href: string
  icon: string
  label: string
  active: boolean
  badge?: number
}

function NavItem({ href, icon, label, active, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
        ${active
          ? 'bg-indigo-50 text-indigo-700 font-medium border-l-2 border-indigo-600 -ml-2 pl-[10px]'
          : 'text-gray-700 hover:bg-gray-50'
        }
      `}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      {badge && badge > 0 && (
        <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
          {badge}
        </span>
      )}
    </Link>
  )
}

interface NavIconButtonProps {
  href: string
  icon: string
  active: boolean
  tooltip: string
}

function NavIconButton({ href, icon, active, tooltip }: NavIconButtonProps) {
  return (
    <Link
      href={href}
      className={`
        w-12 h-12 flex items-center justify-center rounded-lg transition-colors group relative
        ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}
      `}
      title={tooltip}
    >
      <span className="text-xl">{icon}</span>
      {/* Tooltip */}
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
        {tooltip}
      </div>
    </Link>
  )
}
