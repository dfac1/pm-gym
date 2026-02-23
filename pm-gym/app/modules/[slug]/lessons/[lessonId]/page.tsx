'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PlatformLayout from '@/components/platform/PlatformLayout'
import Link from 'next/link'

// Mock lesson data
const lessonData: any = {
  '1': {
    id: '1',
    number: '1.1',
    title: 'Зачем нужна аналитика PM',
    duration: 15,
    moduleSlug: 'analytics-metrics',
    moduleTitle: 'Analytics & Metrics Mastery',
    content: `
## Введение

Product Manager без аналитики — это как пилот без приборов. Можно лететь, но куда и на какой высоте — непонятно.

В этом уроке мы разберём:
- Почему аналитика критична для PM
- Какие решения принимаются на основе данных
- Основные типы аналитических инструментов

## Почему Product Manager должен уметь работать с данными?

### 1. **Объективность решений**

Вместо "мне кажется" ты сможешь сказать "данные показывают".

**Пример:**
- ❌ "Мне кажется, пользователям нужна тёмная тема"
- ✅ "68% пользователей в опросе запросили тёмную тему, и это feature с RICE score 8.5"

### 2. **Измеримость результата**

Запустил фичу? Отлично! Но работает ли она?

**Без аналитики:**
- "Запустили новый onboarding"
- "Вроде бы лучше стало"

**С аналитикой:**
- "Запустили новый onboarding"
- "D1 retention вырос с 40% до 52% (+30%)"
- "Time to First Value сократилось с 8 минут до 3 минут"

### 3. **Приоритизация**

Бэклог бесконечен, время ограничено. Что делать первым?

Аналитика помогает:
- Найти bottlenecks в воронке
- Определить самые болезненные проблемы
- Оценить потенциальный impact фичи

## Основные направления использования аналитики

### 📊 Product Analytics
- Behaviour tracking (что делают пользователи)
- Funnels (воронки конверсии)
- Cohort analysis (когортный анализ)
- Retention tracking

**Инструменты:** Amplitude, Mixpanel, Google Analytics 4

### 🧪 Experimentation
- A/B testing
- Multivariate tests
- Feature flags

**Инструменты:** Optimizely, LaunchDarkly, Firebase

### 📈 Business Intelligence
- Dashboards
- Custom reports
- Cross-platform analytics

**Инструменты:** Tableau, Looker, Metabase

## Практический пример

Представь, ты PM мобильного приложения для фитнеса:

**Проблема:** Падает retention на 7-й день

**Без аналитики:**
- Гадаем на кофейной гуще
- "Давайте добавим push-уведомления"
- "Может быть, геймификацию?"

**С аналитикой:**
1. Смотрим когортный анализ → видим, что падение началось 2 недели назад
2. Смотрим funnel analysis → большинство уходят после 3-й тренировки
3. Сегментируем пользователей → проблема только у Android-пользователей
4. Проверяем events → нашли баг в трекинге завершённых тренировок на Android

**Решение:** Фиксим баг → retention восстанавливается

## Итоги

✅ Аналитика — это основа принятия решений PM

✅ Данные помогают быть объективным и измерять результаты

✅ Три основных направления: Product Analytics, Experimentation, BI

✅ Без данных ты летишь вслепую

---

**Следующий шаг:** В следующем уроке разберём основные типы метрик и когда какие использовать.
    `,
    nextLesson: '2',
    prevLesson: null,
  },
}

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const lessonId = params?.lessonId as string
  
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

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

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const trackLength = documentHeight - windowHeight
      const progress = (scrollTop / trackLength) * 100
      
      setScrollProgress(Math.min(progress, 100))
      
      // Auto-complete when scrolled to bottom
      if (progress > 95 && !completed) {
        setCompleted(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [completed])

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

  const lesson = lessonData[lessonId]

  if (!lesson) {
    return (
      <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Урок не найден</h1>
          <Link href={`/modules/${slug}`} className="text-indigo-600 hover:underline">
            ← Вернуться к модулю
          </Link>
        </div>
      </PlatformLayout>
    )
  }

  return (
    <PlatformLayout user={{ ...user, level: 5, progress: 68 }}>
      {/* Progress Bar (fixed at top) */}
      <div className="fixed top-0 left-64 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Bar */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href={`/modules/${lesson.moduleSlug}`}
            className="text-sm text-indigo-600 hover:text-indigo-700 mb-2 inline-block"
          >
            ← Back to {lesson.moduleTitle}
          </Link>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full font-semibold">
              Lesson {lesson.number}
            </span>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
            <span className="text-sm text-gray-500">⏱️ {lesson.duration} min</span>
          </div>
        </div>
        
        {lesson.nextLesson && (
          <Link
            href={`/modules/${slug}/lessons/${lesson.nextLesson}`}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Next Lesson →
          </Link>
        )}
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-xl shadow-md p-8 lg:p-12 max-w-4xl">
        <article className="prose prose-lg max-w-none">
          {lesson.content.split('\n').map((line: string, index: number) => {
            // Simple markdown parser
            if (line.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.slice(3)}</h2>
            }
            if (line.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.slice(4)}</h3>
            }
            if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={index} className="font-bold text-gray-900 mt-4">{line.slice(2, -2)}</p>
            }
            if (line.startsWith('- ')) {
              return <li key={index} className="text-gray-700 ml-6">{line.slice(2)}</li>
            }
            if (line.startsWith('✅') || line.startsWith('❌')) {
              return <p key={index} className="text-gray-700">{line}</p>
            }
            if (line.trim() === '') {
              return <div key={index} className="h-4"></div>
            }
            if (line.startsWith('---')) {
              return <hr key={index} className="my-8 border-gray-200" />
            }
            return <p key={index} className="text-gray-700 leading-relaxed">{line}</p>
          })}
        </article>

        {/* Completion Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCompleted(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                completed
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {completed ? '✓ Отмечено как пройденное' : '✓ Отметить как пройденное'}
            </button>

            <div className="flex gap-3">
              {lesson.prevLesson && (
                <Link
                  href={`/modules/${slug}/lessons/${lesson.prevLesson}`}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors"
                >
                  ← Previous
                </Link>
              )}
              {lesson.nextLesson && (
                <Link
                  href={`/modules/${slug}/lessons/${lesson.nextLesson}`}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Next: Lesson {lesson.number.split('.')[0]}.{parseInt(lesson.number.split('.')[1]) + 1} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents Sidebar (optional, for desktop) */}
      <div className="hidden xl:block fixed right-8 top-32 w-64">
        <div className="bg-white rounded-xl shadow-md p-4 sticky top-32">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">В этом уроке</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">→ Введение</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">→ Почему PM должен уметь работать с данными</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">→ Основные направления</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">→ Практический пример</li>
            <li className="hover:text-indigo-600 cursor-pointer transition-colors">→ Итоги</li>
          </ul>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Прогресс чтения</div>
            <div className="text-2xl font-bold text-indigo-600">{Math.round(scrollProgress)}%</div>
          </div>
        </div>
      </div>
    </PlatformLayout>
  )
}
