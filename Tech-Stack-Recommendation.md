# Tech Stack Recommendation — PM Gym MVP

**Дата:** 20 февраля 2026  
**Версия:** 1.0  
**Для проекта:** PM Gym (Учебный SaaS/EdTech платформа)

---

## 📋 Executive Summary

**TL;DR:** Современный TypeScript fullstack на Next.js 15 + tRPC + Neon PostgreSQL + Bun

### Ключевые решения:

| Компонент | Выбор | Почему |
|-----------|-------|--------|
| **Frontend** | Next.js 15 + shadcn/ui | Best-in-class DX, SSR, type-safe |
| **Backend** | Server Actions + tRPC | End-to-end типизация, меньше кода |
| **Database** | Neon PostgreSQL | Serverless, branching, scale-to-zero |
| **Auth** | Better Auth | Modern, type-safe, гибкий |
| **Hosting** | Vercel + Neon | Zero-config, автодеплой, CDN |
| **Dev Tools** | Bun + Biome + Lefthook | В 3-10x быстрее alternatives |
| **Analytics** | GA4 + PostHog + Amplitude | Для практики PM навыков (отдельно) |

### Ключевые метрики стека:

- ⚡ **Время до MVP:** 4-5 недель
- 💰 **Стоимость старта:** $0/месяц
- 📈 **Масштабируемость:** до 10K+ пользователей без переписывания
- 🎯 **Type Safety:** 100% (от БД до UI)
- 🚀 **Developer Experience:** ⭐⭐⭐⭐⭐ (Bun + Biome + tRPC = лучший DX 2026)
- 📚 **Learning Value:** Полный цикл product development + аналитика

### Что делает этот стек особенным:

1. **End-to-end type safety** — TypeScript from database to UI, ошибки ловятся на compile time
2. **Modern 2026 tools** — Bun, Biome, tRPC — в 3-10x быстрее traditional tools
3. **Zero infrastructure** — Vercel + Neon, фокус на продукте, не на DevOps
4. **Analytics for learning** — GA4 + PostHog + Amplitude как отдельный блок для практики PM skills
5. **Cost-effective** — $0 старт, ~$70/мес при 5-10K users (vs $100-200 традиционный стек)

---

## 🎯 Принципы выбора стека

Выбранный стек оптимизирован под:
1. ⚡ **Быстрая разработка MVP** — готовые решения и библиотеки
2. 📚 **Легкость изучения** — популярные технологии с отличной документацией
3. 🔧 **Гибкость** — возможность быстро итерировать и менять функционал
4. 💰 **Cost-effective** — бесплатные тиры для старта
5. � **Масштабируемость** — возможность роста от MVP до production
6. 🏗️ **Современность** — актуальные технологии и best practices 2026 года
7. 🛡️ **Type Safety** — максимальная типизация для предотвращения ошибок
8. 🎯 **Developer Experience** — удобство и скорость разработки

---

## 🏗️ Рекомендуемый технический стек

### **Frontend**

#### ⚛️ **Next.js 15 (App Router)** — фреймворк
**Почему:**
- React-based — самый популярный UI фреймворк
- SSR/SSG из коробки — отличное SEO для landing page
- App Router — современная архитектура с серверными компонентами
- File-based routing — быстрое создание страниц
- API Routes — бэкенд функционал без отдельного сервера
- Vercel deployment — бесплатный хостинг для MVP
- Отличная документация и community

**Альтернативы:**
- Remix (более сложный, но мощный)
- Vite + React (легче, но без SSR из коробки)

#### 🎨 **shadcn/ui + Tailwind CSS** — UI компоненты
**Почему:**
- shadcn/ui — готовые, кастомизируемые React компоненты
- Tailwind CSS — utility-first подход, быстрая разработка
- Radix UI под капотом — accessibility из коробки
- Современный дизайн
- Copy-paste компоненты — полный контроль над кодом
- Нет vendor lock-in

**Альтернативы:**
- Chakra UI (больше из коробки, менее гибкие)
- Material UI (тяжелее, устаревший дизайн)
- Ant Design (хорош, но менее кастомизируемый)

#### 📋 **React Hook Form + Zod** — формы и валидация
**Почему:**
- React Hook Form — минимум ререндеров, отличный DX
- Zod — TypeScript-first схемы валидации
- Работают вместе идеально (zodResolver)
- Легковесные решения

#### 📊 **Recharts / Tremor** — графики и дашборды
**Почему:**
- Recharts — популярная библиотека для графиков в React
- Tremor — готовые dashboard компоненты на Tailwind
- Для аналитики прогресса пользователя
- Skill tree визуализация

#### 🎮 **Framer Motion** — анимации
**Почему:**
- Плавные анимации для интерактивных кейсов
- Ветвящиеся сценарии с красивыми переходами
- Gamification эффекты
- Production-ready

---

### **Backend**

#### 🔥 **Next.js Server Actions + tRPC** — API layer
**Почему Server Actions:**
- Прямые вызовы серверных функций из клиента без REST API
- Автоматическая сериализация и валидация
- Встроенная защита от CSRF
- Progressive enhancement — работает без JS
- Меньше boilerplate кода

**+ tRPC (настоятельно рекомендуется):**
- End-to-end type safety от клиента до БД
- Автокомплит и type checking в реальном времени
- Нет необходимости в code generation
- Легкая интеграция с Next.js Server Actions
- Лучший DX для fullstack TypeScript

**Архитектура:**
```typescript
// server/routers/scenario.ts
export const scenarioRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.scenario.findUnique({ where: { id: input.id } })
    }),
  completeScenario: protectedProcedure
    .input(z.object({ scenarioId: z.string(), decisions: z.array(z.any()) }))
    .mutation(async ({ input, ctx }) => {
      // Type-safe mutation
    })
})
```

**Альтернативы:**
- Чистые Server Actions (без tRPC) — проще, но меньше type safety
- REST API Routes — старый подход, больше boilerplate
- GraphQL (Apollo/Urql) — overkill для MVP

**Когда расширяться:**
Если понадобится микросервисная архитектура:
- Hono (современный, очень быстрый edge-first фреймворк)
- NestJS (enterprise-ready, много boilerplate)
- Fastify (легковесный, производительный)

#### 🗄️ **PostgreSQL** — основная база данных
**Почему:**
- Реляционная БД — хорошо для структурированных данных
- Пользователи, прогресс, кейсы, достижения
- JSONB — хранение complex objects (ветвящиеся сценарии)
- Proven, надёжная, масштабируемая
- Бесплатные хостинги: Supabase, Neon, Railway

**Структура данных:**
```sql
users
scenarios (кейсы)
user_progress
skills
user_skills
achievements
user_achievements
decisions (история выборов пользователя)
```

#### 🔐 **Better Auth** или **Supabase Auth** — аутентификация

**Рекомендация 2026: Better Auth (новое решение)**
**Почему:**
- Современная TypeScript-first auth библиотека
- Полностью type-safe API
- Встроенная поддержка Next.js Server Actions
- Гибче чем Supabase Auth
- Multi-session support
- Email/Password + Social OAuth из коробки
- MFA/2FA support
- Open source, нет vendor lock-in

**Альтернатива: Supabase Auth**
**Почему:**
- Email/Password из коробки
- Social OAuth (Google, GitHub) — быстрая настройка
- Email verification встроена
- Row Level Security (RLS) — безопасность на уровне БД
- PostgreSQL база данных включена
- Бесплатный тир: 50,000 MAU

**Другие альтернативы:**
- **Clerk** — лучший UX, но платный ($25/мес после 10K MAU)
- **NextAuth v5 (Auth.js)** — гибкий, но сложнее настройка
- **Lucia** — легковесный, но больше ручной работы

**Рекомендация для MVP:** 
- **Better Auth** если хочешь максимальную гибкость и type safety
- **Supabase Auth** если нужна максимальная скорость запуска и уже используешь Supabase для БД

#### 🚀 **Prisma ORM** — работа с БД
**Почему:**
- Type-safe database queries из коробки
- Автогенерация TypeScript типов
- Миграции с полным контролем
- Prisma Studio — GUI для просмотра и редактирования данных
- Отличная поддержка Supabase PostgreSQL
- Зрелая экосистема и большое сообщество
- Prisma Accelerate — connection pooling и кэширование (опционально)

**Альтернативы для рассмотрения:**
- **Drizzle ORM** — новее, легче, быстрее Prisma. SQL-like синтаксис. Отлично если важна производительность
- **Kysely** — type-safe SQL query builder, меньше магии

**Рекомендация для MVP:** Prisma — лучший баланс DX и функционала

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  progress  UserProgress[]
  skills    UserSkill[]
  achievements UserAchievement[]
}

model Scenario {
  id          String   @id @default(cuid())
  title       String
  description String
  content     Json     // Ветвящиеся сценарии
  difficulty  String
  skills      String[] // Какие навыки развивает
}

model UserProgress {
  id          String   @id @default(cuid())
  userId      String
  scenarioId  String
  completed   Boolean  @default(false)
  decisions   Json     // История выборов пользователя
  createdAt   DateTime @default(now())
  
  user        User     @relation(fields: [userId], references: [id])
  scenario    Scenario @relation(fields: [scenarioId], references: [id])
}
```

---

### **Хостинг и деплой**

#### ▲ **Vercel** — для Next.js приложения
**Почему:**
- Создатели Next.js — нативная интеграция
- Zero-config deployment из коробки
- Preview deployments для каждого PR
- Edge Network — CDN по всему миру
- Automatic HTTPS
- В 2026 - лучшая платформа для Next.js

**Бесплатный план Vercel (Hobby):**
- 100 GB bandwidth/месяц
- Unlimited deployments
- 100 GB-hours serverless function runtime
- Достаточно для 5-10K пользователей

**Альтернативы:**
- **Cloudflare Pages** — бесплатный unlimited bandwidth, но сложнее настройка
- **Netlify** — похож на Vercel, но медленнее build time
- **Railway** — если нужен Docker/контейнеры
- **SST (Serverless Stack)** — если хочешь AWS infrastructure

**Рекомендация:** Vercel — оптимальный выбор для Next.js MVP

#### 🗄️ **Neon PostgreSQL** или **Supabase** — база данных

**Рекомендация 2026: Neon (Serverless Postgres)**
**Почему:**
- Serverless Postgres — платишь только за использование
- Branching — копии БД для dev/staging (как git branches)
- Автоматический scale to zero — экономия на dev окружении
- Отличная производительность
- Generous free tier: 0.5 GB storage, 3 GB datarefer/month
- Prisma напрямую поддерживает

**Альтернатива: Supabase**
**Почему:**
- All-in-one: PostgreSQL + Auth + Storage + Realtime
- Встроенный Dashboard для управления
- Auto-generated REST API
- Realtime subscriptions из коробки
- Бесплатный тир: 500MB database, 2GB file storage

**Другие варианты:**
- **Turso** — edge SQLite, очень быстрый для чтения
- **Railway** — если нужны дополнительные сервисы (Redis, etc)
- **AWS RDS** — если нужен enterprise-grade

**Рекомендация для MVP:**
- **Neon** если нужна только БД и максимальная гибкость
- **Supabase** если хочешь all-in-one решение с Auth и Storage

---

### **📊 Аналитика (для практики PM навыков)**

> **Важно:** Это отдельный блок инструментов, которые ты будешь подключать и настраивать **как часть обучения продуктовой аналитике**. Это не обязательно для работы MVP, но критично для практики PM skills.

#### **Цель подключения аналитики:**
- ✅ Практика настройки product analytics с нуля
- ✅ Event tracking архитектура
- ✅ Построение воронок и когорт
- ✅ A/B тестирование на живом продукте
- ✅ Data-driven decision making

#### **Рекомендуемые инструменты для практики:**

**1️⃣ Google Analytics 4 (GA4)**
- **Для чего:** Web-аналитика, источники трафика, базовые метрики
- **Практика:** Настройка событий, конверсионных целей, отчётов
- **Бесплатно:** Да, полностью

**2️⃣ Amplitude или Mixpanel**
- **Для чего:** Product analytics, когортный анализ, retention
- **Практика:** Event taxonomy, user segmentation, retention curves
- **Бесплатно:** Amplitude до 10M events/month, Mixpanel до 100K MAU

**3️⃣ PostHog (рекомендуется)**
- **Для чего:** Product analytics + A/B testing + Feature flags + Session replay
- **Практика:** Полный цикл экспериментов, feature rollout, debugging
- **Бесплатно:** 1M events/month + unlimited flags
- **Почему:** Open-source, все-в-одном решение

**4️⃣ Yandex Metrica (опционально)**
- **Для чего:** Русскоязычная аудитория, тепловые карты, session replay
- **Практика:** Поведенческий анализ, вебвизор
- **Бесплатно:** Да, полностью

#### **Архитектура подключения аналитики:**

```typescript
// lib/analytics/index.ts - Unified analytics wrapper
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // Google Analytics
    if (typeof window.gtag !== 'undefined') {
      gtag('event', event, properties);
    }
    
    // Amplitude или Mixpanel
    if (typeof window.amplitude !== 'undefined') {
      amplitude.track(event, properties);
    }
    
    // PostHog
    if (typeof window.posthog !== 'undefined') {
      posthog.capture(event, properties);
    }
  },
  
  identify: (userId: string, traits?: Record<string, any>) => {
    // Identify user across all platforms
  }
}

// Использование в приложении
analytics.track('scenario_completed', {
  scenario_id: 'retention-challenge',
  time_spent_seconds: 892,
  decisions_made: 12,
  score: 85
});
```

#### **События для трекинга (пример):**

```typescript
// lib/analytics/events.ts
export const AnalyticsEvents = {
  // Auth
  USER_REGISTERED: 'user_registered',
  USER_LOGGED_IN: 'user_logged_in',
  
  // Scenarios
  SCENARIO_STARTED: 'scenario_started',
  DECISION_MADE: 'decision_made',
  SCENARIO_COMPLETED: 'scenario_completed',
  
  // Skills
  SKILL_LEVELED_UP: 'skill_leveled_up',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  
  // Engagement
  DASHBOARD_VIEWED: 'dashboard_viewed',
} as const;
```

#### **Когда подключать:**
- **Неделя 5-6** — после запуска базового MVP
- Сначала GA4 (самый простой setup)
- Затем PostHog (основной инструмент для практики)
- Amplitude/Mixpanel по желанию (для сравнения подходов)

> 💡 **Learning Goal:** Через настройку аналитики ты освоишь event tracking, воронки, когорты, A/B тесты — ключевые навыки любого PM.

---

### **🛡️ Мониторинг и Error Tracking**

### **�️ Мониторинг и Error Tracking**

#### **Sentry** — отлов ошибок и performance monitoring
**Почему:**
- Автоматический отлов ошибок в production
- Source maps для Next.js — показывает реальные места ошибок
- Performance monitoring — медленные запросы и эндпоинты
- Session replay — видео воспроизведение сессии с ошибкой
- Breadcrumbs — что делал пользователь до ошибки
- Alerts в Slack/Email
- Бесплатный тир: 5K errors/month

**Интеграция:**
```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Альтернативы:**
- **Highlight.io** — open-source, session replay + errors
- **LogRocket** — more expensive, но мощнее
- **Rollbar** — проще Sentry

#### **Vercel Speed Insights** — Web Vitals
**Что даёт:**
- Автоматический трекинг Core Web Vitals
- Real User Monitoring
- Бесплатно включено в Vercel

#### **Better Uptime** или **UptimeRobot** — uptime monitoring
**Для чего:**
- Проверка доступности сайта каждые 1-5 минут
- Alerts если сайт упал
- Status page для пользователей
- Бесплатные тиры доступны

**Рекомендация:** Sentry обязателен для production, остальное опционально

---

### **🛠️ Developer Tools**

#### **Bun** — JavaScript runtime и package manager
**Почему (Best Practice 2026):**
- В 3-4 раза быстрее npm/pnpm
- Встроенный bundler и transpiler
- Совместим с Node.js и npm пакетами
- Нативная поддержка TypeScript
- Встроенный test runner
- К 2026 — стандарт для новых проектов

**Альтернативы:**
- **pnpm** — экономит место на диске, fast
- **npm** — стандарт, но медленнее

#### **TypeScript 5.x** — язык разработки
**Почему:**
- Обязателен для любого серьезного проекта
- Type safety предотвращает 80% ошибок
- Лучший DX с autocomplete и IntelliSense
- Strict mode для максимальной безопасности

#### **Biome** — линтинг и форматирование
**Best Practice 2026:**
**Почему:**
- Заменяет ESLint + Prettier одним инструментом
- В 100+ раз быстрее
- Zero config для большинства проектов
- Лучшие сообщения об ошибках
- Написан на Rust

**Альтернатива (классика):**
- **ESLint + Prettier** — если нужна более тонкая настройка

#### **Lefthook** — Git hooks менеджер
**Best Practice 2026:**
**Почему lefthook вместо husky:**
- Намного быстрее (написан на Go)
- Параллельное выполнение хуков
- Проще конфигурация (один YAML файл)
- Работает на Windows без проблем

```yaml
# lefthook.yml
pre-commit:
  parallel: true
  commands:
    lint:
      run: bun run lint
    types:
      run: bun run type-check
```

#### **GitHub Actions** — CI/CD
**Почему:**
- Бесплатно для публичных репозиториев
- 2000 минут/месяц для приватных
- Автотесты на каждый PR
- Автоматический deploy на Vercel
- Огромная библиотека готовых actions

#### **Vitest** — тестирование (опционально для MVP)
**Почему:**
- Совместим с Jest API
- В 10x быстрее Jest
- Нативная поддержка ESM и TypeScript
- Встроенный UI для тестов
- Best choice для Vite/Next.js проектов 2026 года

---

### **📧 Email сервисы**

#### **Resend** — email отправка
**Почему (Best Choice 2026):**
- Современный DX-first email API
- React Email — пишешь письма на React компонентах
- Автоматическая оптимизация для всех клиентов
- Бесплатный тир: 3,000 emails/month, затем $20/100K
- Отличная deliverability из коробки
- Built by Next.js ecosystem

**Использование:**
```tsx
// emails/welcome.tsx
import { Button, Html } from '@react-email/components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <h1>Привет, {name}!</h1>
      <Button href="https://app.pmgym.com">Начать обучение</Button>
    </Html>
  );
}

// app/actions/send-email.ts
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  await resend.emails.send({
    from: 'PM Gym <hello@pmgym.com>',
    to: email,
    subject: 'Добро пожаловать!',
    react: WelcomeEmail({ name }),
  });
}
```

**Альтернативы:**
- **SendGrid** — более старый, но очень надежный
- **Amazon SES** — дешевле на масштабе ($0.10 за 1000 emails)
- **Plunk** — похож на Resend, но меньше
- **Postmark** — специализируется на transactional emails

**Пример:**
```tsx
// emails/WelcomeEmail.tsx
import { Html, Button } from '@react-email/components';

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <Html>
      <h1>Привет, {name}! 👋</h1>
      <p>Добро пожаловать в PM Gym!</p>
      <Button href="https://pmgym.com/scenarios">
        Начать первый кейс
      </Button>
    </Html>
  );
}
```

---

### **🎨 Дизайн и прототипирование**

#### **Figma** — дизайн
**Почему:**
- Индустриальный стандарт
- Бесплатный план для личных проектов
- Collaboration
- Плагины для экспорта в код

#### **v0.dev (Vercel)** — AI code generation (optional)
**Почему:**
- Генерация shadcn/ui компонентов из описания
- Ускорение разработки UI
- Экспериментальный инструмент

---

## 📦 Итоговый стек MVP (2026 Best Practices)

### **Core Stack (Required for MVP)**
```yaml
Frontend:
  Framework: Next.js 15 (App Router) + React Server Components
  UI: shadcn/ui + Tailwind CSS v4
  Components: Radix UI (accessibility из коробки)
  Forms: React Hook Form + Zod
  Charts: Recharts / Tremor
  Animation: Framer Motion
  State: Zustand (легковесный, если нужен глобальный стейт)

Backend:
  API: Next.js Server Actions + tRPC (type-safe API)
  Database: Neon PostgreSQL (serverless) или Supabase
  ORM: Prisma (или Drizzle для performance)
  Auth: Better Auth (или Supabase Auth)

Hosting:
  App: Vercel (Edge Network + CDN)
  Database: Neon (serverless Postgres с branching)
  Assets: Vercel CDN / Cloudflare R2 (если нужны файлы)

Monitoring & Errors:
  Error Tracking: Sentry
  Performance: Vercel Speed Insights
  Uptime: Better Uptime / UptimeRobot

Communication:
  Email: Resend + React Email

Development:
  Runtime: Bun (вместо Node.js)
  Language: TypeScript 5.x (strict mode)
  Linting & Formatting: Biome (замена ESLint + Prettier)
  Git Hooks: Lefthook (быстрее Husky)
  CI/CD: GitHub Actions
  Testing: Vitest + Playwright (опционально для MVP)
  
Tooling:
  Package Manager: Bun
  Monorepo: Не нужен для MVP (но Turborepo если расширяться)
```

### **Analytics Stack (для практики PM навыков — подключается отдельно)**
```yaml
Analytics (для обучения):
  Web Analytics: Google Analytics 4 (базовые метрики, источники)
  Product Analytics: Amplitude или Mixpanel (когорты, retention)
  Experiments & Flags: PostHog (A/B тесты, feature flags, session replay)
  RU Market: Yandex Metrica (опционально, для практики)
  
Цель:
  ✅ Практика настройки product analytics
  ✅ Event tracking архитектура
  ✅ Построение воронок и когорт
  ✅ A/B тестирование
  ✅ Data-driven decision making
```

> 💡 **Важно:** Аналитика не нужна для работы MVP, но критична для практики PM навыков. Подключается на неделе 5-6 после запуска базовой версии.

---

## 💰 Стоимость стека (MVP этап)

### 🎉 Бесплатно на старте:

**Инфраструктура:**
- ✅ **Vercel** — Hobby план (100 GB bandwidth, достаточно для 5-10K пользователей)
- ✅ **Neon** — Free tier (0.5 GB storage, 3 GB data transfer)
- ✅ **Resend** — 3K emails/month, потом $20/100K
- ✅ **Sentry** — 5K errors/month
- ✅ **Better Uptime** — 10 monitors бесплатно

**Development Tools:**
- ✅ **Bun** — Open source, бесплатно
- ✅ **Biome** — Open source, бесплатно
- ✅ **GitHub** — Бесплатно (2K CI/CD минут для приватных репо)
- ✅ **VS Code** — Бесплатно
- ✅ **Figma** — Бесплатно для личных проектов (или Penpot - open source)

**Analytics (для практики PM навыков):**
- ✅ **Google Analytics 4** — Полностью бесплатно
- ✅ **Amplitude** — 10M events/month бесплатно
- ✅ **Mixpanel** — 100K MAU бесплатно (альтернатива Amplitude)
- ✅ **PostHog** — 1M events/month + unlimited feature flags бесплатно
- ✅ **Yandex Metrica** — Полностью бесплатно

**Итого для MVP: $0/месяц** 🎉

> 💡 Все аналитические инструменты бесплатны на старте и останутся бесплатными до 5-10K пользователей

### 📈 При росте до 1000+ активных пользователей:

**Вариант 1: Максимально бюджетный (~$20-30/мес)**
- Vercel Hobby (бесплатно) — можно дольше оставаться
- Neon Scale ($19/мес) — больше storage и compute
- Resend бесплатный тир может хватить
- Все остальное бесплатно

**Вариант 2: Комфортный (~$50-70/мес)**
- Vercel Pro ($20/мес) — больше bandwidth, лучшая поддержка
- Neon Scale ($19/мес) — 10 GB storage
- Resend ($20/мес если >3K emails)
- Sentry ($29/мес если >5K errors)

**Вариант 3: Оптимальный для 5-10K пользователей (~$100-150/мес)**
- Vercel Pro ($20/мес)
- Neon Business ($69/мес) — больше performance
- Resend (~$20-40/мес)
- Sentry Team ($29/мес)
- Better Auth self-hosted (бесплатно) или Auth.js

### 💡 Экономия по сравнению с альтернативами:

**Если бы использовали традиционный стек (AWS/GCP):**
- EC2/Compute Engine: ~$20-40/мес
- RDS PostgreSQL: ~$50-100/мес  
- Load Balancer: ~$18/мес
- CloudFront CDN: ~$10-30/мес
- **Итого: $100-200/мес** + сложная настройка

**Наш стек экономит:**
- ✅ 100% стоимости на старте
- ✅ 50-70% при масштабировании
- ✅ 90% времени на DevOps

---

## 🏗️ Архитектура приложения

```
┌─────────────────────────────────────────────────┐
│                  USERS                          │
│            (Browser / Mobile Web)               │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              VERCEL CDN / EDGE                  │
│         (Global distribution + caching)         │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           NEXT.JS APPLICATION                   │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │  App Router  │  │ API Routes / │            │
│  │  (Pages)     │  │Server Actions│            │
│  └──────┬───────┘  └──────┬───────┘            │
│         │                  │                     │
│         │                  │                     │
│  ┌──────▼──────────────────▼───────┐            │
│  │    React Components              │            │
│  │  (shadcn/ui + Tailwind)          │            │
│  └──────────────────────────────────┘            │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────┐  ┌──────────┐  ┌─────────────┐
│   NEON   │  │  SENTRY  │  │   RESEND    │
│          │  │ (Errors) │  │   (Email)   │
│ Serverless│ └──────────┘  └─────────────┘
│ Postgres │
│ + Auth   │
└────┬─────┘
     │
     ▼
┌──────────┐
│ PRISMA   │
│  (ORM)   │
└──────────┘
```

---

## 📂 Структура проекта

```
pm-gym/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth группа маршрутов
│   │   ├── login/
│   │   ├── register/
│   │   └── verify-email/
│   ├── (platform)/               # Платформа (требует auth)
│   │   ├── dashboard/
│   │   ├── scenarios/
│   │   │   └── [id]/            # Динамический роут кейса
│   │   ├── progress/
│   │   └── settings/
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # shadcn/ui компоненты
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── scenario/                 # Специфичные компоненты кейсов
│   │   ├── DecisionNode.tsx
│   │   ├── ConsequenceView.tsx
│   │   └── FeedbackPanel.tsx
│   ├── progress/
│   │   ├── SkillTree.tsx
│   │   ├── ProgressChart.tsx
│   │   └── AchievementBadge.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Sidebar.tsx
├── lib/
│   ├── db/                       # Database
│   │   ├── client.ts            # Prisma client singleton
│   │   ├── schema.ts            # Database helpers
│   │   └── queries/             # Reusable queries
│   ├── auth/                     # Authentication
│   │   ├── config.ts            # Better Auth config
│   │   ├── session.ts           # Session management
│   │   └── middleware.ts        # Auth middleware
│   ├── email/                    # Resend + React Email
│   │   ├── client.ts            # Resend client
│   │   └── templates/           # Email templates
│   ├── api/                      # tRPC routers
│   │   ├── trpc.ts              # tRPC instance
│   │   ├── routers/
│   │   │   ├── scenario.ts
│   │   │   ├── user.ts
│   │   │   └── progress.ts
│   │   └── root.ts              # Root router
│   └── utils/                    # Utilities
│       ├── cn.ts                # Tailwind merge
│       ├── validation.ts        # Zod schemas
│       └── constants.ts         # App constants
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/
├── emails/                       # React Email templates
│   ├── WelcomeEmail.tsx
│   └── WeeklyDigest.tsx
├── public/                       # Static assets
├── types/                        # TypeScript types
│   ├── scenario.ts
│   ├── user.ts
│   └── analytics.ts
├── .env.local                    # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 План внедрения (пошаговый)

### **Неделя 1: Инфраструктура и основа**

#### День 1-2: Setup проекта
```bash
# Создание Next.js проекта
bun create next-app pm-gym --typescript --tailwind --app

cd pm-gym

# Установка основных зависимостей
bun add @prisma/client better-auth
bun add -d prisma

# UI компоненты
bun add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
bun add class-variance-authority clsx tailwind-merge lucide-react

# Формы и валидация
bun add react-hook-form @hookform/resolvers zod

# Анимации
bun add framer-motion

# tRPC для type-safe API
bun add @trpc/server @trpc/client @trpc/react-query @trpc/next
bun add @tanstack/react-query

# shadcn/ui init
bunx shadcn@latest init

# Prisma init
bun prisma init

# Biome для линтинга
bun add -d @biomejs/biome
bun biome init

# Lefthook для git hooks
bun add -d @evilmartians/lefthook
bunx lefthook install
```

**Задачи:**
- ✅ Инициализация Next.js проекта
- ✅ Настройка Tailwind CSS v4
- ✅ Настройка Biome (вместо ESLint + Prettier)
- ✅ Настройка Lefthook
- ✅ Подключение к Neon PostgreSQL
- ✅ Настройка Prisma
- ✅ Настройка tRPC
- ✅ Создание начальной структуры папок
- ✅ Git repository + GitHub
- ✅ Deploy на Vercel (первый deploy)

#### День 3-4: Database Schema
```prisma
// prisma/schema.prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  avatar      String?
  createdAt   DateTime @default(now())
  
  progress    UserProgress[]
  skills      UserSkill[]
  achievements UserAchievement[]
}

model Scenario {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  difficulty  String
  content     Json     // Структура ветвящегося сценария
  skills      String[] // Навыки, которые прокачивает
  estimatedTime Int    // Минут на прохождение
  
  progress    UserProgress[]
}

model UserProgress {
  id          String   @id @default(cuid())
  userId      String
  scenarioId  String
  completed   Boolean  @default(false)
  decisions   Json     // История выборов
  timeSpent   Int      // Секунд на прохождение
  score       Int?     // Оценка (опционально)
  createdAt   DateTime @default(now())
  completedAt DateTime?
  
  user        User     @relation(fields: [userId], references: [id])
  scenario    Scenario @relation(fields: [scenarioId], references: [id])
  
  @@unique([userId, scenarioId])
}

model Skill {
  id          String   @id @default(cuid())
  name        String   @unique
  description String
  category    String   // analytics, strategy, execution, etc.
  
  userSkills  UserSkill[]
}

model UserSkill {
  id          String   @id @default(cuid())
  userId      String
  skillId     String
  level       Int      @default(0) // 0-100
  xp          Int      @default(0) // Experience points
  
  user        User     @relation(fields: [userId], references: [id])
  skill       Skill    @relation(fields: [skillId], references: [id])
  
  @@unique([userId, skillId])
}

model Achievement {
  id          String   @id @default(cuid())
  slug        String   @unique
  name        String
  description String
  icon        String
  rarity      String   // common, rare, epic, legendary
  
  users       UserAchievement[]
}

model UserAchievement {
  id            String   @id @default(cuid())
  userId        String
  achievementId String
  unlockedAt    DateTime @default(now())
  
  user          User        @relation(fields: [userId], references: [id])
  achievement   Achievement @relation(fields: [achievementId], references: [id])
  
  @@unique([userId, achievementId])
}
```

**Задачи:**
- ✅ Определить полную схему БД
- ✅ Создать миграции Prisma
- ✅ Seed начальные данные (навыки, достижения)

#### День 5-7: Authentication + Monitoring
**Auth Setup:**
- ✅ Настроить Better Auth (или Supabase Auth)
- ✅ Email/Password регистрация
- ✅ Google OAuth
- ✅ GitHub OAuth  
- ✅ Email verification flow
- ✅ Password reset flow
- ✅ Auth middleware для защищённых роутов
- ✅ Protected tRPC procedures

**Monitoring Setup:**
- ✅ Подключить Sentry
- ✅ Настроить Vercel Speed Insights
- ✅ Error boundaries в Next.js

---

### **Неделя 2: Landing + Core Platform**

#### День 8-10: Landing Page
**Компоненты:**
- Hero section с CTAvalue proposition блоки
- How it works секция
- Features preview
- CTA блок внизу

**Задачи:**
- ✅ Дизайн в Figma (или сразу код)
- ✅ Вёрстка landing page
- ✅ Анимации (Framer Motion)
- ✅ Responsive дизайн
- ✅ SEO мета-теги

#### День 11-14: Platform Dashboard
**Компоненты:**
- Sidebar navigation
- Dashboard с прогрессом
- Skill tree визуализация
- Recent activity
- Next steps recommendations

**Задачи:**
- ✅ Layout платформы с sidebar
- ✅ Dashboard с виджетами прогресса
- ✅ Skill tree component (с Recharts)
- ✅ Achievement showcase

---

### **Неделя 3-4: Первый сценарий (MVP MODULE)**

#### Создание интерактивного кейса

**Структура сценария (JSON):**
```json
{
  "id": "retention-challenge",
  "title": "Падение Retention",
  "description": "Retention упал на 15%. Что делать?",
  "difficulty": "intermediate",
  "estimatedTime": 15,
  "skills": ["analytical_thinking", "prioritization", "experimentation"],
  
  "initialState": {
    "metrics": {
      "retention_d7": 0.35,
      "retention_d30": 0.15,
      "cac": 50,
      "ltv": 120,
      "runway_months": 8
    }
  },
  
  "nodes": [
    {
      "id": "start",
      "type": "situation",
      "content": "Твой SaaS-продукт столкнулся с проблемой...",
      "metrics": {
        "retention_d7": 0.35,
        "retention_d30": 0.15
      },
      "choices": [
        {
          "id": "improve_onboarding",
          "text": "Улучшить onboarding",
          "nextNode": "onboarding_path"
        },
        {
          "id": "reactivation_campaign",
          "text": "Запустить reactivation кампанию",
          "nextNode": "reactivation_path"
        },
        {
          "id": "add_features",
          "text": "Добавить новые фичи",
          "nextNode": "features_path"
        }
      ]
    },
    {
      "id": "onboarding_path",
      "type": "consequence",
      "content": "Через месяц результаты...",
      "metricsChange": {
        "retention_d7": "+0.05",
        "cac": "+20%"
      },
      "feedback": {
        "positive": "Retention вырос...",
        "negative": "Но стоимость привлечения...",
        "learning": "Onboarding важен, но...",
        "alternatives": "Можно было..."
      },
      "skillsGained": {
        "analytical_thinking": 12,
        "prioritization": 8
      },
      "choices": [...]
    }
  ]
}
```

**Компоненты:**
- `<ScenarioPlayer>` — основной компонент прохождения
- `<DecisionNode>` — узел с выбором
- `<ConsequenceView>` — последствия решения
- `<MetricsDisplay>` — визуализация метрик
- `<FeedbackPanel>` — обратная связь
- `<SkillGainNotification>` — уведомление о прокачке навыка

**Задачи:**
- ✅ Создать типы для сценариев (TypeScript)
- ✅ Разработать 1 полный сценарий (retention challenge)
- ✅ Компоненты для отображения сценария
- ✅ Логика навигации по узлам
- ✅ Сохранение прогресса в БД
- ✅ Обновление навыков пользователя
- ✅ Разблокировка достижений

---

### **Неделя 5: Polish & MVP Launch**

#### Финальные доработки

**Email нотификации:**
- ✅ Подключить Resend
- ✅ Создать React Email темплейты:
  - Welcome email
  - Email verification
  - Scenario completion
  - Weekly digest (опционально)

**UX улучшения:**
- ✅ Onboarding flow для новых пользователей
- ✅ Tooltips и hints
- ✅ Loading states (скелетоны)
- ✅ Error boundaries
- ✅ 404 / 500 страницы
- ✅ Toast notifications

**Легал:**
- ✅ Privacy Policy
- ✅ Terms of Service
- ✅ Cookie consent

**SEO & Meta:**
- ✅ Open Graph теги
- ✅ Twitter Cards
- ✅ sitemap.xml
- ✅ robots.txt

#### Testing & QA (2-3 дня)
- ✅ Мануальное тестирование всех флоу
- ✅ Проверка на мобильных устройствах
- ✅ Performance audit (Lighthouse)
  - Target: 90+ на всех метриках
- ✅ Accessibility audit (a11y)
- ✅ SEO audit
- ✅ Cross-browser testing (Chrome, Firefox, Safari, Edge)

#### Soft Launch
- ✅ Production deploy на Vercel
- ✅ Custom domain настройка
- ✅ SSL сертификат (автоматически через Vercel)
- ✅ Приглашение первых 10-20 пользователей (друзья, коллеги)
- ✅ Сбор обратной связи (через форму или интервью)

**Итог после 5 недель:**
- ✅ Рабочий MVP на production
- ✅ 1 полноценный интерактивный сценарий
- ✅ Полный auth flow
- ✅ Dashboard с прогрессом
- ✅ Email нотификации
- ✅ Error tracking setup
- ✅ Первые тестовые пользователи

---

## 📚 Ресурсы для изучения

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn) — интерактивный туториал
- [Next.js App Router Course](https://nextjs.org/learn/dashboard-app)

### shadcn/ui + Tailwind
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/) — красивые примеры

### Supabase
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

### Better Auth
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Better Auth Examples](https://github.com/better-auth/better-auth/tree/main/examples)

### tRPC
- [tRPC Documentation](https://trpc.io/docs)
- [tRPC with Next.js App Router](https://trpc.io/docs/nextjs/app-dir)
- [End-to-end Type Safety](https://trpc.io/docs/concepts)

### Bun
- [Bun Documentation](https://bun.sh/docs)
- [Bun Guide](https://bun.sh/guides)

### Biome
- [Biome Documentation](https://biomejs.dev/)
- [Migrating from ESLint](https://biomejs.dev/guides/migrate-eslint-prettier/)

### Neon
- [Neon Documentation](https://neon.tech/docs/introduction)
- [Database Branching Guide](https://neon.tech/docs/guides/branching)
- [Prisma with Neon](https://neon.tech/docs/guides/prisma)

---

## 🎯 Что этот стек даёт для обучения PM

Работая с этим стеком, ты на практике освоишь:

### � Full Product Lifecycle
- ✅ От идеи до production deploy
- ✅ User research через feedback forms
- ✅ Iterative development (MVP → v1.1 → v2.0)
- ✅ Growth loops (onboarding → activation → retention)
- ✅ Product discovery и validation

### 🎯 Product Management Skills
- ✅ Prioritization на практике (что делать в MVP vs v2?)
- ✅ Technical trade-offs (какой стек выбрать и почему?)
- ✅ Feature scoping (MVP vs полный функционал)
- ✅ Stakeholder management (ты сам для себя стейкхолдер!)
- ✅ Scope management и борьба с feature creep
- ✅ Resource планирование (время, бюджет, сложность)

### 🛠️ Technical Skills
- ✅ Современный web development (React, Next.js, TypeScript)
- ✅ Database design (PostgreSQL, Prisma)
- ✅ API design (tRPC, Server Actions)
- ✅ Authentication и security best practices
- ✅ Deployment и DevOps basics
- ✅ Performance optimization
- ✅ Error tracking и monitoring

### 📊 Product Operations
- ✅ Error tracking и incident response (Sentry)
- ✅ Performance monitoring (Vercel Insights)
- ✅ Email automation (Resend)
- ✅ User feedback loops
- ✅ Production debugging

### 💼 Portfolio & Career
- ✅ Реальный SaaS-продукт в портфолио
- ✅ Можно показать на интервью
- ✅ Case study для Product Manager роли:
  - "Как я построил EdTech платформу с нуля"
  - "Какой tech stack я выбрал и почему"
  - "Как я работал с user feedback"
  - "Полный цикл: discovery → development → launch"

### 🧠 Soft Skills
- ✅ Работа с неопределённостью
- ✅ Self-management и time management
- ✅ Problem-solving на практике
- ✅ Documentation и communication
- ✅ Learning agility (изучение новых технологий)

---

## ⚠️ Риски и митигация

### Риск 1: Ovеrengineering
**Проблема:** Слишком сложный стек для MVP  
**Митигация:** 
- Начать с минимума (Next.js + Supabase + 1 сценарий)
- Подключать аналитику постепенно
- Не внедрять всё сразу

### Риск 2: Performance bottlenecks
**Проблема:** Медленные запросы, ухудшение UX
**Митигация:**
- Использовать Vercel Speed Insights с первого дня
- React Server Components для снижения client bundle
- Database indexing и query optimization
- Image optimization через Next.js Image
- Code splitting и lazy loading

### Риск 3: Security vulnerabilities
**Проблема:** Уязвимости в production
**Митигация:**
- TypeScript strict mode
- Zod validation на всех input
- Row Level Security (RLS) в БД (Neon/Supabase)
- CSRF protection (built-in Server Actions)
- Rate limiting на API
- Dependabot для отслеживания уязвимостей
**Проблема:** Всё делаешь сам, может выгореть  
**Митигация:**
- Использовать готовые компоненты (shadcn/ui)
- Timeboxing задач (не увлекаться перфекционизмом)
- MVP должен быть "good enough", не "perfect"

---

## 🔄 План масштабирования (Post-MVP)

Когда продукт вырастет, стек легко масштабируется:

### Производительность
- Next.js ISR (Incremental Static Regeneration) для статических страниц
- Redis для кеширования (Upstash или Redis Cloud)
- CDN для assets (уже есть в Vercel)

### База данных
- Connection pooling (Prisma Data Proxy или PgBouncer)
- Read replicas для аналитики
- Переход на больший план Supabase

### Backend
- Вынос тяжёлых задач в background jobs (Inngest, QStash)
- Отдельный API сервер (NestJS) при необходимости
- Микросервисная архитектура (постепенно)

### Monitoring
- Более продвинутый мониторинг (Datadog, New Relic)
- Uptime monitoring (UptimeRobot, Better Stack)
- Cost monitoring (чтобы не улететь в расходы)

---

## ✅ Чек-лист готовности к старту

Перед началом разработки убедись, что:

- [ ] Создан GitHub аккаунт
- [ ] Создан Vercel аккаунт (можно через GitHub)
- [ ] Создан Supabase аккаунт
- [ ] Создан Figma аккаунт (для дизайна)
- [ ] Установлен VS Code (или другой редактор)
- [ ] Установлен Node.js (v18+)
- [ ] Установлен Git
- [ ] Есть домен (или будешь использовать *.vercel.app)

### Аккаунты для аналитики (не обязательно сразу):
- [ ] Google Analytics аккаунт
- [ ] Amplitude аккаунт
- [ ] Yandex Metrika аккаунт
- [ ] PostHog аккаунт (self-hosted или cloud)

---

## 🔍 Финальный обзор стека: детальное обоснование выбора

### Почему именно этот стек оптимален для проекта PM Gym

Этот технический стек составлен с учётом:
1. **Реальных задач проекта** — EdTech платформа с интерактивными кейсами
2. **Учебной цели** — максимум практики PM навыков
3. **Best practices 2026 года** — современные технологии и подходы
4. **Баланс сложности и функциональности** — не overengineering, но и не устаревшие решения

---

### ✅ **Frontend: Next.js 15 + shadcn/ui + Tailwind CSS**

**Выбор:** Next.js 15 (App Router)

**Обоснование:**
- ✅ **React Server Components** — снижение client bundle на 30-50%, лучший UX
- ✅ **Встроенный SSR/SSG** — отличное SEO для landing page (критично для роста)
- ✅ **File-based routing** — быстрая разработка без настройки роутинга
- ✅ **Server Actions** — API без REST boilerplate, меньше кода
- ✅ **Vercel integration** — zero-config deployment, preview для каждого PR
- ✅ **Largest ecosystem** — огромное сообщество, решения любых проблем найдутся быстро

**Альтернативы рассмотрены:**
- **Remix** — более сложный, меньше готовых UI библиотек, overkill для MVP
- **Vite + React** — нет SSR из коробки, плохое SEO, больше настройки
- **Astro** — отличен для контента, но слабее для интерактивных SPA

**Вердикт:** Next.js 15 — оптимальный выбор для **EdTech SaaS в 2026**

---

**Выбор:** shadcn/ui + Tailwind CSS

**Обоснование:**
- ✅ **Copy-paste компоненты** — полный контроль, нет vendor lock-in
- ✅ **Radix UI под капотом** — accessibility из коробки (важно для EdTech)
- ✅ **Tailwind CSS v4** — utility-first, быстрая разработка UI
- ✅ **Современный дизайн** — выглядит professional без дизайнера
- ✅ **Type-safe** — TypeScript support, autocomplete
- ✅ **Минимальный bundle** — только код, который используешь

**Альтернативы рассмотрены:**
- **Material UI** — устаревший дизайн, тяжёлый bundle (~200KB)
- **Chakra UI** — хорош, но менее гибкий чем shadcn
- **Ant Design** — enterprise look, не подходит для EdTech

**Вердикт:** shadcn/ui — **лучший выбор для modern SaaS 2026**

---

### ✅ **Backend: Next.js Server Actions + tRPC + Prisma**

**Выбор:** Server Actions + tRPC

**Обоснование:**
- ✅ **End-to-end type safety** — от БД до UI, ошибки ловятся на этапе разработки
- ✅ **Меньше boilerplate** — не нужно писать отдельные REST endpoints
- ✅ **Автокомплит везде** — знаешь что возвращает каждая функция
- ✅ **RPC подход** — вызываешь серверные функции как обычные JS функции
- ✅ **Progressive enhancement** — Server Actions работают без JavaScript
- ✅ **Мгновенный refactoring** — переименовал поле в БД → ошибки сразу видны в UI

**Пример преимущества:**
```typescript
// Традиционный REST подход
const res = await fetch('/api/scenarios/123')
const data = await res.json() // any type 😢

// tRPC подход
const scenario = await trpc.scenario.getById.query({ id: '123' }) 
// ✅ Полная типизация, автокомплит, ошибки на этапе компиляции
```

**Альтернативы рассмотрены:**
- **Чистые API Routes** — больше кода, нет типизации между клиентом и сервером
- **GraphQL** — overkill для MVP, сложная настройка, избыточность
- **REST API** — старый подход, много boilerplate, нет type safety

**Вердикт:** tRPC — **must-have для TypeScript fullstack в 2026**

---

**Выбор:** Prisma ORM

**Обоснование:**
- ✅ **Type-safe queries** — автогенерация TypeScript типов из schema
- ✅ **Отличная DX** — Prisma Studio для просмотра данных
- ✅ **Миграции** — полный контроль над изменениями БД
- ✅ **Relations handling** — работа со связями проще чем SQL
- ✅ **Зрелая экосистема** — большое сообщество, много ресурсов
- ✅ **Prisma Accelerate** — готовое масштабирование (connection pooling, caching)

**Альтернатива:** Drizzle ORM
- ✅ Легче и быстрее Prisma
- ✅ SQL-like синтаксис (ближе к "железу")
- ❌ Меньше документации и примеров
- ❌ Не такой удобный для быстрого MVP

**Вердикт:** Prisma для MVP, Drizzle можно рассмотреть при масштабировании

---

### ✅ **Database: Neon PostgreSQL**

**Выбор:** Neon (Serverless Postgres)

**Обоснование:**
- ✅ **Serverless** — платишь за использование, не за постоянную работу
- ✅ **Branching** — копии БД для dev/staging как git branches (уникальная фича!)
- ✅ **Scale to zero** — dev база засыпает когда не используешь
- ✅ **Отличная производительность** — быстрее traditional Postgres
- ✅ **Generous free tier** — 0.5GB storage, 3GB transfer (хватит для старта)
- ✅ **PostgreSQL** — самая популярная open-source БД, огромная экосистема

**Пример использования branching:**
```bash
# Создаёшь ветку БД для новой фичи
neon branches create --name feature/scenarios-v2

# Разрабатываешь, тестируешь
# Если всё ок — мержишь в main branch
# Если нет — удаляешь ветку, main не затронут
```

**Альтернатива:** Supabase
- ✅ All-in-one (БД + Auth + Storage + Realtime)
- ✅ Хорош если нужен комплексный backend
- ❌ Нет branching
- ❌ Больше vendor lock-in

**Вердикт:** Neon — **лучший Postgres для modern SaaS 2026**

---

### ✅ **Auth: Better Auth или Supabase Auth**

**Рекомендация:** Better Auth

**Обоснование:**
- ✅ **Modern TypeScript-first** — написан специально для 2026 realities
- ✅ **Type-safe API** — все методы с полной типизацией
- ✅ **Built for Next.js** — нативная поддержка Server Actions
- ✅ **Гибкость** — больше контроля чем Supabase Auth
- ✅ **Multi-session** — поддержка нескольких сессий из коробки
- ✅ **No vendor lock-in** — open source, можешь перенести куда угодно

**Альтернатива:** Supabase Auth
- ✅ Быстрый setup (5 минут)
- ✅ Интеграция с Supabase БД
- ✅ Row Level Security
- ❌ Меньше гибкости
- ❌ Привязка к Supabase

**Вердикт:** Better Auth для гибкости, Supabase Auth для скорости

---

### ✅ **Developer Tools: Bun + Biome + Lefthook**

**Выбор:** Bun вместо Node.js/npm

**Обоснование:**
- ✅ **В 3-4 раза быстрее npm/pnpm** — install, run, build
- ✅ **All-in-one** — runtime + package manager + bundler + test runner
- ✅ **Native TypeScript** — не нужен отдельный transpiler
- ✅ **Совместимость** — работает с npm пакетами
- ✅ **Modern API** — лучше чем Node.js во многих аспектах
- ✅ **Стандарт 2026** — большинство новых проектов на Bun

**Метрики:**
```
npm install: ~45 секунд
pnpm install: ~25 секунд
bun install: ~8 секунд ✅
```

---

**Выбор:** Biome вместо ESLint + Prettier

**Обоснование:**
- ✅ **Всё в одном** — linting + formatting одним инструментом
- ✅ **В 100x быстрее** — написан на Rust
- ✅ **Zero config** — работает из коробки для большинства проектов
- ✅ **Лучшие error messages** — понятнее что не так
- ✅ **Меньше конфликтов** — один инструмент = нет борьбы ESLint vs Prettier

**Сравнение:**
```
ESLint + Prettier на большом проекте: ~15 секунд
Biome на том же проекте: ~0.2 секунды ✅
```

---

**Выбор:** Lefthook вместо Husky

**Обоснование:**
- ✅ **Намного быстрее** — написан на Go
- ✅ **Параллельное выполнение** — запускает хуки одновременно
- ✅ **Проще настройка** — один YAML файл
- ✅ **Cross-platform** — отлично работает на Windows

---

### ✅ **Hosting: Vercel + Neon**

**Выбор:** Vercel

**Обоснование:**
- ✅ **Создатели Next.js** — нативная интеграция, всё работает идеально
- ✅ **Zero-config deploy** — git push = автодеплой
- ✅ **Preview deployments** — каждый PR = живой preview
- ✅ **Edge Network** — CDN по всему миру из коробки
- ✅ **100GB bandwidth бесплатно** — хватит для 5-10K пользователей
- ✅ **Отличный DX** — лучшая платформа для Next.js в 2026

**Альтернатива:** Cloudflare Pages
- ✅ Unlimited bandwidth бесплатно
- ❌ Сложнее настройка
- ❌ Хуже поддержка Next.js

**Вердикт:** Vercel — **no-brainer для Next.js проектов**

---

### ✅ **Email: Resend**

**Выбор:** Resend

**Обоснование:**
- ✅ **React Email** — пишешь письма на React компонентах (знакомый стек!)
- ✅ **Modern DX** — лучший опыт разработки в индустрии
- ✅ **Отличная deliverability** — письма не попадают в спам
- ✅ **Built by Vercel ecosystem** — интеграция с Next.js из коробки
- ✅ **Generous free tier** — 3K emails/month, потом $20/100K

**Альтернатива:** SendGrid
- ✅ Более зрелый, больше фич
- ❌ Устаревший DX
- ❌ Сложнее настройка

**Вердикт:** Resend — **лучший выбор для modern SaaS 2026**

---

### 📊 **Аналитика: GA4 + Amplitude/Mixpanel + PostHog**

**Важно:** Это для практики PM навыков, не для работы MVP

**Выбор:** Multi-tool подход

**Обоснование:**
- ✅ **GA4** — для web-аналитики и источников трафика (must-have baseline)
- ✅ **Amplitude/Mixpanel** — для product analytics (industry standard)
- ✅ **PostHog** — для A/B тестов и feature flags (all-in-one)
- ✅ **Практика** — ты освоишь разные подходы к аналитике
- ✅ **Portfolio** — сможешь говорить про опыт с enterprise tools

**Почему несколько инструментов:**
- Каждый решает свои задачи
- В реальных компаниях обычно 2-3 инструмента одновременно
- Практика интеграции множества систем — ценный скилл

---

### 🛡️ **Monitoring: Sentry + Vercel Insights**

**Выбор:** Sentry

**Обоснование:**
- ✅ **Industry standard** — используют 90% SaaS компаний
- ✅ **Session replay** — видишь что делал пользователь до ошибки
- ✅ **Performance monitoring** — находишь медленные эндпоинты
- ✅ **Source maps** — показывает реальное место ошибки, не минифицированный код
- ✅ **Бесплатный тир** — 5K errors/month хватит для старта

**Вердикт:** Sentry — **обязателен для production приложения**

---

## 🎯 Итоговая оценка стека

### Критерии оценки:

| Критерий | Оценка | Обоснование |
|----------|--------|-------------|
| **Скорость разработки MVP** | ⭐⭐⭐⭐⭐ | Готовые компоненты, zero-config, отличный DX |
| **Cost-effectiveness** | ⭐⭐⭐⭐⭐ | $0 на старте, дешевле alternatives при масштабировании |
| **Type Safety** | ⭐⭐⭐⭐⭐ | End-to-end типизация от БД до UI |
| **Developer Experience** | ⭐⭐⭐⭐⭐ | Bun, Biome, tRPC — лучший DX в индустрии |
| **Масштабируемость** | ⭐⭐⭐⭐☆ | От MVP до 10K+ users без переписывания |
| **Современность** | ⭐⭐⭐⭐⭐ | Best practices 2026, не устареет 2-3 года |
| **Ecosystem** | ⭐⭐⭐⭐⭐ | Огромные сообщества, много ресурсов |
| **Learning Value** | ⭐⭐⭐⭐⭐ | Освоишь полный стек PM навыков |

### Альтернативные стеки рассмотрены:

**1. Traditional MERN (2024):**
- MongoDB + Express + React + Node
- ❌ Устаревший подход
- ❌ Нет type safety
- ❌ Больше boilerplate

**2. T3 Stack:**
- Next.js + tRPC + Tailwind + Prisma
- ✅ Похож на наш
- ❌ Не включает modern tools (Bun, Biome)
- ❌ Не настолько оптимизирован

**3. Rails/Django:**
- Ruby on Rails или Django
- ✅ Быстрое MVP
- ❌ Устаревшие технологии
- ❌ Хуже для SPA

**Вердикт:** Наш стек — **оптимальный для EdTech SaaS MVP в 2026**

---

## 🎉 Заключение

Этот технический стек:

✅ **Оптимален для MVP** — можно запустить за 4-5 недель  
✅ **Бесплатный на старте** — $0/месяц до достижения тяги  
✅ **Современный** — best practices 2026 года (Bun, Biome, tRPC, Neon)  
✅ **Type-safe** — максимальная типизация от БД до UI  
✅ **Масштабируемый** — от MVP до 10K+ пользователей  
✅ **Учебный** — освоишь полный цикл product development  
✅ **Portfolio-worthy** — можно показать на интервью  
✅ **Отличный DX** — быстрая разработка с минимумом фрустраций

### 🎯 Отличия от традиционного стека

| Критерий | Традиционный (2024) | Наш (2026 Best Practices) |
|---------|-------------------|---------------------------|
| **Frontend** | Next.js + ESLint/Prettier | Next.js + Biome |
| **Backend** | API Routes | Server Actions + tRPC |
| **Database** | Supabase all-in-one | Neon (serverless + branching) |
| **Auth** | NextAuth v4 | Better Auth (type-safe) |
| **Package Manager** | npm/pnpm | Bun (3x быстрее) |
| **Git Hooks** | Husky + lint-staged | Lefthook (параллельный) |
| **Type Safety** | Частичная | End-to-end (DB → UI) |
| **Monitoring** | Только Sentry | Sentry + Vercel Insights |
| **Startup Cost** | $0 | $0 |
| **At Scale** | ~$100/мес | ~$70/мес |

### 🚀 Next Steps

1. **Прочитать Product-Foundation.md** — понять продуктовые цели
2. **MVP Scope Definition** — определить минимальный набор функций
3. **User Journey Map** — детальный путь пользователя 
4. **Database Schema Design** — спроектировать структуру данных
5. **Content Strategy** — план создания контента (сценарии)
6. **Week 1: Start Coding** 🚀 — Setup проекта по плану выше

Удачи! 🚀 Let's build something awesome!
