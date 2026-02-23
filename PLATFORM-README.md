# PM Gym — Платформа обучения для Product Managers

## ✅ Реализованные функции

### 🎯 Основная инфраструктура

#### База данных (Prisma + SQLite)
- ✅ Расширена схема БД для платформы
- ✅ Модули (Module) и секции (Section)
- ✅ Уроки (Lesson) с типами и контентом
- ✅ Интерактивные сценарии (Scenario)
- ✅ Квизы (Quiz) и практические задания
- ✅ Ресурсы (Resource) - шаблоны, инструменты, гайды
- ✅ Достижения (Achievement) с категориями и редкостью
- ✅ Прогресс пользователей (UserModuleProgress, UserLessonProgress)
- ✅ Статистика (UserStats) с навыками и уровнями
- ✅ Активности (UserActivity) для трекинга

#### Компоненты
- ✅ Sidebar Navigation (фиксированный + коллапсируемый)
- ✅ Platform Layout (обёртка для всех страниц)
- ✅ Email verification banner
- ✅ Progress bars и status indicators
- ✅ Interactive cards и модалы

---

### 📄 Реализованные страницы

#### 1. Dashboard (`/dashboard`)
- ✅ Приветствие пользователя
- ✅ Quick Stats (4 метрики: уровень, баллы, часы, кейсы)
- ✅ Continue Learning card (последний модуль в прогрессе)
- ✅ Recommended For You (3 персональные рекомендации)
- ✅ Recent Activity feed (последние 5-7 активностей)
- ✅ Skill Progress Chart (8 навыков)
- ✅ Leaderboard Widget (топ-5 за неделю)
- ✅ Achievements Preview (последние 5 badges)
- ✅ Email verification banner (для неподтверждённых пользователей)

#### 2. Modules (`/modules`)
**Список модулей:**
- ✅ Фильтры: Все / В процессе / Не начато / Завершено
- ✅ Featured модули (рекомендуемые)
- ✅ Grid с модулями (8 модулей)
- ✅ Progress bars для каждого модуля
- ✅ Badges "New" для новых модулей

**Детальная страница модуля (`/modules/[slug]`):**
- ✅ Breadcrumbs навигация
- ✅ Module header с иконкой, названием, описанием
- ✅ Progress bar (общий прогресс по модулю)
- ✅ **4 таба:**
  - **📚 Обзор:** цели, структура, статистика, prerequisites
  - **📖 Lessons:** список уроков по секциям, статусы (✅/🔄/🔒)
  - **🧪 Practice:** квизы, hands-on задания, сценарии
  - **📚 Resources:** справочные материалы, видео, инструменты
- ✅ Continue button (следующий незавершённый урок)

#### 3. Lesson Page (`/modules/[slug]/lessons/[lessonId]`)
- ✅ Progress bar (скролл прогресс)
- ✅ Navigation bar (Back to module, Next lesson)
- ✅ Lesson content (markdown-подобный парсинг)
- ✅ Completion tracking (кнопка "Отметить как пройденное")
- ✅ Table of Contents (sidebar на desktop)
- ✅ Prev/Next lesson buttons
- ✅ Auto-complete при скролле до конца

#### 4. My Progress (`/progress`)
- ✅ Overall Stats (Level, Points, Badges, Hours)
- ✅ Skills Development (8 навыков с progress bars)
- ✅ Modules Progress (прогресс по всем 8 модулям)
- ✅ Activity Over Time (график за последние 7 дней)
- ✅ Completed Scenarios (список с оценками A-C)
- ✅ Learning Streak (текущая серия, лучшая серия)
- ✅ Time Statistics (всего часов, среднее, предпочитаемое время)

#### 5. Achievements (`/achievements`)
- ✅ Header с количеством (25/100 badges)
- ✅ Фильтры: Все / Получено / Заблокировано
- ✅ Фильтры по категориям: Learning, Scenario, Streak, Time, Social, Special
- ✅ Recent Achievements (последние 5)
- ✅ Progress to Next (близкие к получению)
- ✅ Badges Grid с 25 достижениями
- ✅ Rarity система (Common, Rare, Epic, Legendary)
- ✅ Detail Modal (click на badge → подробности)
- ✅ Share функция для разблокированных достижений

#### 6. Library (`/library`)
- ✅ Search bar (полнотекстовый поиск)
- ✅ Фильтры по типу: Template / Tool / Checklist / Guide
- ✅ Фильтры по категории: Analytics / Artifacts / Frameworks / Planning / Research
- ✅ Featured Resources (топ-3)
- ✅ Resource Grid (14 ресурсов)
- ✅ Resource Cards с форматом (PDF, Interactive, Figma, etc.)
- ✅ Bookmark функция
- ✅ Categories Overview

---

### 🎨 UI/UX Features

#### Sidebar Navigation
- ✅ Fixed позиция (260px ширина)
- ✅ Collapsible (64px в свёрнутом виде)
- ✅ Expandable "Обучение" секция с 8 модулями
- ✅ Badges для модулей (в процессе, новые)
- ✅ Active state highlighting
- ✅ User profile widget внизу (аватар, имя, level, progress)
- ✅ Smooth transitions и hover effects
- ✅ Tooltips в collapsed режиме

#### Design System
- ✅ Consistent color palette (Indigo primary)
- ✅ Gradient backgrounds
- ✅ Shadow system (md, lg, xl, 2xl)
- ✅ Border radius (lg: 8px, xl: 12px, 2xl: 16px)
- ✅ Icon system (emoji)
- ✅ Typography hierarchy
- ✅ Responsive grids
- ✅ Hover & active states

#### Interactive Elements
- ✅ Progress bars (animated)
- ✅ Loading spinners
- ✅ Modal dialogs
- ✅ Tabs navigation
- ✅ Filters & search
- ✅ Cards (hover effects, shadows)
- ✅ Buttons (multiple variants)
- ✅ Badges & pills

---

## 🚀 Технологический стек

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite (через Prisma ORM)
- **Authentication:** JWT-based auth (уже реализовано ранее)
- **Deployment:** Vercel-ready

---

## 📁 Структура проекта

\`\`\`
pm-gym/
├── app/
│   ├── dashboard/page.tsx          # ✅ Главная страница с виджетами
│   ├── modules/
│   │   ├── page.tsx                # ✅ Список всех модулей
│   │   └── [slug]/
│   │       ├── page.tsx            # ✅ Детальная страница модуля (с табами)
│   │       └── lessons/
│   │           └── [lessonId]/page.tsx  # ✅ Страница урока
│   ├── progress/page.tsx           # ✅ Моя прогресс (детальная аналитика)
│   ├── achievements/page.tsx       # ✅ Достижения и badges
│   ├── library/page.tsx            # ✅ Библиотека ресурсов
│   ├── login/page.tsx              # (уже было)
│   ├── register/page.tsx           # (уже было)
│   └── ...
├── components/
│   ├── platform/
│   │   ├── Sidebar.tsx             # ✅ Sidebar Navigation
│   │   └── PlatformLayout.tsx      # ✅ Layout wrapper
│   ├── auth/                       # (уже было)
│   └── ...
├── prisma/
│   └── schema.prisma               # ✅ Расширенная схема БД (21 модель)
└── ...
\`\`\`

---

## 🗄️ Структура базы данных

### Основные модели:

1. **Module** — модули обучения (8 модулей)
2. **Section** — секции внутри модулей
3. **Lesson** — уроки (18+ уроков на модуль)
4. **Scenario** — интерактивные сценарии
5. **Quiz** — квизы и тесты
6. **Resource** — библиотека ресурсов
7. **Achievement** — достижения (100 badges)
8. **UserModuleProgress** — прогресс по модулям
9. **UserLessonProgress** — прогресс по урокам
10. **UserScenarioCompletion** — завершённые сценарии
11. **UserStats** — статистика пользователя (level, points, skills)
12. **UserActivity** — лог активности

---

## 🎯 Что реализовано в деталях?

### Dashboard
- Приветствие персонализированное
- 4 quick stats (модулей, кейсов, часов, уровня)
- Continue Learning card (с прогрессом 60%)
- 3 рекомендации (RICE, PRD, OKRs)
- Activity feed (5 активностей)
- Skill Progress Chart (5 навыков)
- Leaderboard (топ-5, текущий пользователь highlighted)
- Achievements preview (5 badges)

### Modules
- **Список:** 8 модулей, фильтры, featured секция
- **Детальная страница:**
  - Tab "Обзор": objectives (5 пунктов), структура (3 секции), статистика, prerequisites
  - Tab "Lessons": 3 секции, 8 уроков, статусы ✅/🔄/🔒
  - Tab "Practice": 3 задания (quiz, hands-on, scenario) с прогрессом
  - Tab "Resources": 3 категории ресурсов (справочные, видео, инструменты)

### Lesson
- Markdown-подобный контент parsing
- Progress bar (scroll tracking)
- Navigation (back, prev, next)
- Completion tracking
- Table of Contents (desktop)

### Progress
- Overall stats (4 карточки)
- 8 навыков с progress bars
- 8 модулей прогресс
- График активности (7 дней)
- 4 completed scenarios
- Learning streak (7 дней текущая, 14 лучшая)
- Time statistics

### Achievements
- 25 badges (6 unlocked, 19 locked)
- Фильтры (status, category)
- Recent achievements
- Progress to next (3 близких)
- Rarity система (4 уровня)
- Detail modal с share функцией

### Library
- Search (14 ресурсов)
- Фильтры (type, category)
- Featured (3 ресурса)
- Resource cards с bookmark
- Categories overview (5 категорий)

---

## 📊 Mock Data

Все страницы работают с **mock data** (захардкоженные данные):

- ✅ 8 модулей (Analytics, Artifacts, Collaboration, Frameworks, Lifecycle, Stakeholders, Advanced, Career)
- ✅ 1 детальный модуль (Analytics & Metrics) с 3 секциями и 8 уроками
- ✅ 1 урок (Lesson 1.1: "Зачем нужна аналитика PM") с полным контентом
- ✅ 25 достижений (across 6 категорий)
- ✅ 14 ресурсов (templates, tools, checklists, guides)
- ✅ Leaderboard (5 пользователей)
- ✅ Activity feed (5 активностей)
- ✅ Completed scenarios (4 сценария)

**Следующий шаг:** Подключить API endpoints и заполнить БД реальными данными.

---

## 🏃 Как запустить

\`\`\`bash
cd pm-gym

# Установить зависимости (если ещё не установлены)
npm install

# Применить миграции БД (если ещё не применены)
npx prisma migrate dev

# Запустить dev server
npm run dev
\`\`\`

Платформа доступна на: **http://localhost:3000**

---

## 🔐 Авторизация

Используй существующую регистрацию:
1. Перейти на `/register`
2. Зарегистрироваться (email, пароль)
3. Верифицировать email (есть dev-mode кнопка для получения ссылки)
4. После логина → попадаешь в Dashboard

---

## ✨ Что дальше?

### Backend & Data
- [ ] Создать API endpoints для модулей (`/api/modules`)
- [ ] Создать API для прогресса (`/api/progress`)
- [ ] Создать API для достижений (`/api/achievements`)
- [ ] Заполнить БД seed-данными (модули, уроки, достижения)
- [ ] Реализовать User Stats tracking (автоматическое обновление)

### Функциональность
- [ ] Settings page (профиль, настройки, уведомления)
- [ ] Help & Support page (FAQ, контакты)
- [ ] Interactive Scenarios (branching logic, decision trees)
- [ ] Quiz система (вопросы, ответы, scoring)
- [ ] Real-time progress tracking
- [ ] Gamification (experience points, leveling system)

### UX/UI
- [ ] Responsive design (mobile, tablet)
- [ ] Dark mode
- [ ] Animations (Framer Motion)
- [ ] Loading states
- [ ] Error handling
- [ ] Toast notifications

### Advanced
- [ ] Real-time notifications (WebSocket)
- [ ] Social features (invite friends, comments)
- [ ] Certificates generation (PDF)
- [ ] Advanced analytics (user behavior tracking)
- [ ] AI-powered recommendations

---

## 📝 Заметки

- Все страницы используют `PlatformLayout` для единого дизайна
- Sidebar работает в 3 режимах: expanded (260px), collapsed (64px), mobile (drawer)
- Mock data легко заменяется на API calls
- Prisma schema готова к production (21 модель)
- TypeScript используется везде для type safety

---

**Статус:** ✅ Платформа готова к разработке backend и заполнению контентом!

---

**Дата создания:** 22 февраля 2026  
**Разработчик:** PM Gym Team  
**Версия:** 1.0.0 (MVP)
