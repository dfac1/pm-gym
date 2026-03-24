'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PlatformLayout from '@/components/platform/PlatformLayout'
import { track } from '@/lib/amplitude'

// Mock achievements data
const achievements = [
  // Getting Started
  { id: 1, icon: '👋', title: 'First Login', description: 'Первый вход в платформу', category: 'learning', status: 'unlocked', date: '3 недели назад', rarity: 'common' },
  { id: 2, icon: '✅', title: 'Profile Complete', description: 'Заполнил профиль', category: 'learning', status: 'unlocked', date: '3 недели назад', rarity: 'common' },
  { id: 3, icon: '📚', title: 'First Lesson', description: 'Завершил первый урок', category: 'learning', status: 'unlocked', date: '21 день назад', rarity: 'common' },
  { id: 4, icon: '🎯', title: 'First Scenario', description: 'Завершил первый сценарий', category: 'scenario', status: 'unlocked', date: '2 недели назад', rarity: 'common' },
  
  // Learning Progress
  { id: 5, icon: '📊', title: 'Analytics Beginner', description: 'Завершил 5 уроков по аналитике', category: 'learning', status: 'unlocked', date: '5 дней назад', rarity: 'common' },
  { id: 6, icon: '🏅', title: 'First A/B Test', description: 'Провёл свой первый A/B тест', category: 'learning', status: 'unlocked', date: '2 недели назад', rarity: 'common' },
  { id: 7, icon: '🎯', title: 'RICE Pro', description: 'Освоил RICE Framework', category: 'learning', status: 'unlocked', date: '1 неделю назад', rarity: 'rare' },
  { id: 8, icon: '📝', title: 'PRD Master', description: 'Написал 3 качественных PRD', category: 'learning', status: 'locked', progress: 1, total: 3, rarity: 'rare' },
  
  // Scenarios
  { id: 9, icon: '🎯', title: '5 Scenarios', description: 'Завершил 5 сценариев', category: 'scenario', status: 'unlocked', date: '3 дня назад', rarity: 'common' },
  { id: 10, icon: '🎯', title: '10 Scenarios', description: 'Завершил 10 сценариев', category: 'scenario', status: 'locked', progress: 7, total: 10, rarity: 'rare' },
  { id: 11, icon: '🏆', title: 'Perfect Score', description: 'Получил 100/100 в сценарии', category: 'scenario', status: 'locked', rarity: 'epic' },
  { id: 12, icon: '🌟', title: 'Explorer', description: 'Прошёл все пути в одном сценарии', category: 'scenario', status: 'locked', rarity: 'epic' },
  
  // Streaks
  { id: 13, icon: '🔥', title: '3 Day Streak', description: '3 дня подряд на платформе', category: 'streak', status: 'unlocked', date: '1 неделю назад', rarity: 'common' },
  { id: 14, icon: '🔥', title: '7 Day Streak', description: '7 дней подряд на платформе', category: 'streak', status: 'unlocked', date: 'сегодня', rarity: 'rare' },
  { id: 15, icon: '🔥', title: '14 Day Streak', description: '14 дней подряд на платформе', category: 'streak', status: 'locked', progress: 7, total: 14, rarity: 'epic' },
  { id: 16, icon: '🔥', title: '30 Day Streak', description: '30 дней подряд на платформе', category: 'streak', status: 'locked', rarity: 'legendary' },
  
  // Time-based
  { id: 17, icon: '⏱️', title: '10 Hours', description: '10 часов на платформе', category: 'time', status: 'unlocked', date: '3 дня назад', rarity: 'common' },
  { id: 18, icon: '⏱️', title: '50 Hours', description: '50 часов на платформе', category: 'time', status: 'locked', progress: 45, total: 50, rarity: 'rare' },
  { id: 19, icon: '⏱️', title: '100 Hours', description: '100 часов на платформе', category: 'time', status: 'locked', rarity: 'epic' },
  
  // Competition
  { id: 20, icon: '🏆', title: 'Top 10 This Week', description: 'Попал в топ-10 за неделю', category: 'social', status: 'unlocked', date: 'вчера', rarity: 'rare' },
  { id: 21, icon: '🏆', title: 'Top 100 All Time', description: 'В топ-100 всех времён', category: 'social', status: 'locked', rarity: 'epic' },
  { id: 22, icon: '👥', title: 'Team Player', description: 'Пригласил 5 друзей', category: 'social', status: 'locked', progress: 0, total: 5, rarity: 'rare' },
  
  // Special
  { id: 23, icon: '🌟', title: 'Early Adopter', description: 'Присоединился в первых 100', category: 'special', status: 'unlocked', date: '3 недели назад', rarity: 'legendary' },
  { id: 24, icon: '🧪', title: 'Beta Tester', description: 'Тестировал бета-версию', category: 'special', status: 'unlocked', date: '3 недели назад', rarity: 'legendary' },
  { id: 25, icon: '🎂', title: '1 Year Anniversary', description: 'Год на платформе', category: 'special', status: 'locked', rarity: 'legendary' },
]

export default function AchievementsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')
  const [categoryFilter, setCategoryFilter] = useState<'all' | string>('all')
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)

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

  useEffect(() => {
    if (!loading && user) {
      const unlocked = achievements.filter(a => a.status === 'unlocked').length
      track('Achievements Page Viewed', {
        total_unlocked: unlocked,
        total_achievements: achievements.length,
        completion_pct: Math.round((unlocked / achievements.length) * 100),
      })
    }
  }, [loading, user])

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

  const unlockedCount = achievements.filter(a => a.status === 'unlocked').length
  const lockedCount = achievements.filter(a => a.status === 'locked').length

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'unlocked' && achievement.status !== 'unlocked') return false
    if (filter === 'locked' && achievement.status !== 'locked') return false
    if (categoryFilter !== 'all' && achievement.category !== categoryFilter) return false
    return true
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500'
      case 'rare': return 'from-blue-400 to-blue-600'
      case 'epic': return 'from-purple-400 to-purple-600'
      case 'legendary': return 'from-yellow-400 to-orange-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Common'
      case 'rare': return 'Rare'
      case 'epic': return 'Epic'
      case 'legendary': return 'Legendary'
      default: return 'Common'
    }
  }

  return (
    <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Достижения</h1>
        <p className="text-lg text-gray-600">
          {unlockedCount} / {achievements.length} badges collected
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Все ({achievements.length})
          </button>
          <button
            onClick={() => { setFilter('unlocked'); track('Achievement Filter Applied', { filter_type: 'status', filter_value: 'unlocked', results_count: achievements.filter(a => a.status === 'unlocked').length }) }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'unlocked'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Получено ({unlockedCount})
          </button>
          <button
            onClick={() => { setFilter('locked'); track('Achievement Filter Applied', { filter_type: 'status', filter_value: 'locked', results_count: achievements.filter(a => a.status === 'locked').length }) }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'locked'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Заблокировано ({lockedCount})
          </button>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm text-gray-600 font-medium">Категория:</span>
          {['all', 'learning', 'scenario', 'streak', 'time', 'social', 'special'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat)
                if (cat !== 'all') {
                  const results = achievements.filter(a => {
                    const statusMatch = filter === 'all' || a.status === filter
                    return statusMatch && a.category === cat
                  }).length
                  track('Achievement Filter Applied', { filter_type: 'category', filter_value: cat, results_count: results })
                }
              }}
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

      {/* Recent Achievements */}
      {filter === 'all' && categoryFilter === 'all' && (
        <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Последние достижения</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {achievements
              .filter(a => a.status === 'unlocked')
              .slice(0, 5)
              .map(achievement => (
                <div
                  key={achievement.id}
                  className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedAchievement(achievement)
                    track('Achievement Viewed', { achievement_slug: String(achievement.id), achievement_title: achievement.title, achievement_status: achievement.status, rarity: achievement.rarity, source: 'recent_strip' })
                  }}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <div className="text-sm font-medium">{achievement.title}</div>
                  <div className="text-xs text-indigo-200 mt-1">{achievement.date}</div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Progress to Next */}
      {filter === 'all' && categoryFilter === 'all' && (
        <div className="mb-8 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Близко к получению</h2>
          <div className="space-y-4">
            {achievements
              .filter(a => a.status === 'locked' && a.progress !== undefined)
              .slice(0, 3)
              .map(achievement => (
                <div key={achievement.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl opacity-50">{achievement.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <span className={`px-3 py-1 bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white text-xs rounded-full font-semibold`}>
                      {getRarityLabel(achievement.rarity)}
                    </span>
                  </div>
                  {achievement.progress !== undefined && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 transition-all duration-500"
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Badges Grid */}
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {filter === 'all' ? 'Все достижения' : filter === 'unlocked' ? 'Полученные' : 'Заблокированные'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredAchievements.map(achievement => (
            <div
              key={achievement.id}
              onClick={() => {
                setSelectedAchievement(achievement)
                track('Achievement Viewed', { achievement_slug: String(achievement.id), achievement_title: achievement.title, achievement_status: achievement.status, rarity: achievement.rarity, source: 'grid' })
              }}
              className={`cursor-pointer hover:scale-105 transition-transform ${
                achievement.status === 'locked' ? 'opacity-50' : ''
              }`}
            >
              <div className={`relative bg-gradient-to-br ${getRarityColor(achievement.rarity)} p-1 rounded-2xl shadow-lg`}>
                <div className="bg-white rounded-xl p-4 flex flex-col items-center">
                  <div className="text-5xl mb-2">{achievement.icon}</div>
                  <div className="text-xs text-center font-semibold text-gray-900 leading-tight">
                    {achievement.title}
                  </div>
                  {achievement.status === 'unlocked' && achievement.date && (
                    <div className="text-[10px] text-gray-500 mt-1">{achievement.date}</div>
                  )}
                  {achievement.status === 'locked' && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                      🔒
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className={`inline-block bg-gradient-to-br ${getRarityColor(selectedAchievement.rarity)} p-2 rounded-2xl mb-4`}>
                <div className="bg-white rounded-xl p-6">
                  <div className="text-7xl">{selectedAchievement.icon}</div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedAchievement.title}</h2>
              <p className="text-gray-600 mb-4">{selectedAchievement.description}</p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className={`px-4 py-2 bg-gradient-to-r ${getRarityColor(selectedAchievement.rarity)} text-white rounded-full font-semibold`}>
                  {getRarityLabel(selectedAchievement.rarity)}
                </span>
                {selectedAchievement.status === 'unlocked' && (
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                    ✅ Unlocked
                  </span>
                )}
              </div>
              
              {selectedAchievement.status === 'unlocked' && selectedAchievement.date && (
                <p className="text-sm text-gray-500 mb-4">Unlocked: {selectedAchievement.date}</p>
              )}
              
              {selectedAchievement.status === 'locked' && selectedAchievement.progress !== undefined && (
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Progress: {selectedAchievement.progress}/{selectedAchievement.total}
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-500"
                      style={{ width: `${(selectedAchievement.progress / selectedAchievement.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              {selectedAchievement.status === 'locked' && !selectedAchievement.progress && (
                <p className="text-sm text-gray-500 mb-4">Требования для разблокировки не выполнены</p>
              )}
              
              <div className="flex gap-3">
                {selectedAchievement.status === 'unlocked' && (
                  <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Share
                  </button>
                )}
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  )
}
