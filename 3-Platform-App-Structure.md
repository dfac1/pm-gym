# PM Gym — Структура Платформы (Main App)

**Дата:** 20 февраля 2026  
**Версия:** 1.0  
**Тип документа:** Platform Structure & UI/UX Specification

---

## 📖 Содержание

1. [Общая архитектура](#общая-архитектура)
2. [Sidebar Navigation](#sidebar-navigation)
3. [Dashboard (Главная страница)](#dashboard-главная-страница)
4. [Module Page](#module-page)
5. [Lesson Page](#lesson-page)
6. [Interactive Scenario](#interactive-scenario)
7. [My Progress](#my-progress)
8. [Achievements](#achievements)
9. [Library](#library)
10. [Settings](#settings)
11. [Help & Support](#help--support)
12. [Responsive Design](#responsive-design)
13. [Технические требования](#технические-требования)

---

## Общая архитектура

### High-level Structure

После успешной авторизации пользователь попадает в главное приложение.

```
┌──────────────────────────────────────────────────────────┐
│  SIDEBAR NAVIGATION     │     MAIN CONTENT AREA          │
│  (fixed left)           │     (scrollable)               │
│                         │                                │
│  [Logo]                 │     [HEADER]                   │
│                         │     ─────────────────          │
│  🏠 Dashboard           │                                │
│                         │     [PAGE CONTENT]             │
│  📚 Modules             │     • Dashboard                │
│    📊 Analytics         │     • Module pages             │
│    📝 Artifacts         │     • Progress                 │
│    👥 Collaboration     │     • Settings                 │
│    🧪 Frameworks        │     • Profile                  │
│    ...                  │                                │
│                         │                                │
│  📈 My Progress         │                                │
│  🏆 Achievements        │     [FOOTER (optional)]        │
│  ⚙️ Settings            │                                │
│                         │                                │
│  [User Profile]         │                                │
└──────────────────────────────────────────────────────────┘
```

### Layout Dimensions

**Desktop (> 1024px):**
- Sidebar width: 260px (fixed)
- Content area: calc(100vw - 260px)
- Content max-width: 1400px (с padding)
- Content padding: 32-48px

**Tablet (768px - 1024px):**
- Sidebar: collapsible (overlay)
- Content: full width когда sidebar скрыт
- Hamburger menu вверху

**Mobile (< 768px):**
- Sidebar: drawer (opens as overlay)
- Content: full width
- Bottom tab bar (optional)

---

## Sidebar Navigation

### Позиция
- **Fixed** слева
- **Always visible** на desktop
- **Scrollable** если контент не помещается
- **Width:** 260px

### Структура

```
┌────────────────────┐
│  [LOGO] PM Gym     │
│                    │
│  🏠 Dashboard      │
│                    │
│  📚 Обучение       │ ◄─ Expandable
│  ▶ 📊 Analytics    │
│  ▶ 📝 Artifacts    │
│  ▶ 👥 Collaboration│
│  ▶ 🧪 Frameworks   │
│  ▶ 🚀 Lifecycle    │
│  ▶ 💼 Stakeholders │
│  ▶ 🎯 Advanced     │
│  ▶ 🏆 Career       │
│                    │
│  📈 Мой прогресс   │
│  🏆 Достижения     │
│  📋 Библиотека     │
│                    │
│  ⚙️ Настройки      │
│  ❓ Помощь         │
│                    │
│  ─────────────     │
│  [👤 Avatar]       │
│  Андрей            │
│  Level 5 • 68%     │
└────────────────────┘
```

### Секции меню

#### 1. Logo & Branding
```
┌────────────────────┐
│  [🎯] PM Gym       │
└────────────────────┘
```
- Логотип: иконка + название
- Кликабельный → Dashboard
- Always visible при скролле

---

#### 2. Главные разделы

**🏠 Dashboard**
- URL: `/dashboard` или `/app`
- Active state: highlighted background
- Icon: Home/Dashboard

**📚 Обучение** (Expandable)
- Click → раскрывает список модулей
- Icon: Book/Learning
- Badge: количество модулей "в процессе"

**Подменю (когда раскрыто):**
```
▼ 📚 Обучение
    📊 Analytics & Metrics
    📝 Product Artifacts
    👥 Collaboration
    🧪 Frameworks & Tools
    🚀 Lifecycle Management
    💼 Stakeholder Management
    🎯 Advanced Topics
    🏆 Career & Leadership
```

**Каждый модуль показывает:**
- Название
- Иконка
- Progress bar (если начат)
- Badge "New" (если недавно добавлен)

---

**📈 Мой прогресс**
- URL: `/progress`
- Detailed analytics dashboard
- Icon: Chart/Growth

**🏆 Достижения**
- URL: `/achievements`
- Badges, certificates, leaderboard
- Icon: Trophy/Medal
- Badge: количество новых достижений (красная точка)

**📋 Библиотека**
- URL: `/library`
- Templates, frameworks, resources
- Icon: Library/Books

---

#### 3. Утилиты (внизу)

**⚙️ Настройки**
- URL: `/settings`
- Profile, preferences, notifications

**❓ Помощь**
- URL: `/help`
- FAQ, tutorials, support

---

#### 4. User Profile Widget (footer sidebar)

```
┌────────────────────┐
│  ───────────────   │
│  [👤 Avatar 48px]  │
│  Андрей            │
│  Level 5           │
│  [████████░░] 68%  │
└────────────────────┘
```

**Элементы:**
- Avatar (48x48px круг)
- Имя пользователя
- Current level
- Progress to next level (progress bar)

**Click → Dropdown menu:**
```
┌──────────────────────┐
│  Профиль             │
│  Настройки           │
│  ─────────────       │
│  Выход               │
└──────────────────────┘
```

---

### Интерактивность

**Hover States:**
- Background highlight (subtle)
- Cursor: pointer
- Smooth transition (200ms)

**Active State:**
- Background: primary color (10% opacity)
- Border-left: 3px solid primary
- Bold text

**Expandable Sections:**
- Chevron icon (▶/▼)
- Smooth expand/collapse animation (300ms)
- Remember state (localStorage)

**Badges:**
```
📊 Analytics     [3]  ◄─ "3 уроков в процессе"
📝 Artifacts    [New] ◄─ "Новый контент"
```

---

### Collapsed State (Optional)

**Toggle button** in header:
```
[≡] ◄─ Click to collapse
```

**Collapsed sidebar (64px width):**
```
┌──────┐
│ [🎯] │  ◄─ Logo icon only
│      │
│ 🏠   │
│      │
│ 📚   │  ◄─ Icons only
│      │
│ 📈   │
│ 🏆   │
│ 📋   │
│      │
│ ⚙️   │
│ ❓   │
│      │
│ [👤] │  ◄─ Avatar only
└──────┘
```

**Tooltip on hover:**
- Shows full text
- Positioned to the right
- Delay: 500ms

---

### Mobile Sidebar (< 768px)

**Drawer that slides from left:**
- Overlay dark background (40% opacity)
- Full height
- Width: 80% of screen (max 300px)
- Swipe to close or click outside

**Open trigger:**
- Hamburger icon (☰) in top-left
- Always visible in mobile header

---

## Dashboard (Главная страница)

### URL
`/dashboard` или `/app`

### Цель
Показать текущий прогресс, рекомендации, следующие шаги

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  Dashboard                                               │
│  Добро пожаловать, Андрей! 👋                            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [QUICK STATS - 4 карточки в ряд]                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │ Модулей │ │ Кейсов  │ │ Часов   │ │ Уровень │        │
│  │    3    │ │   12    │ │   6.5   │ │   5     │        │
│  │ пройдено│ │ решено  │ │ обучения│ │ ████░   │        │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘        │
│                                                          │
│  [CONTINUE LEARNING]                                     │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 📊 Analytics & Metrics Mastery                     │  │
│  │ Progress: ████████░░░░░░ 60%                       │  │
│  │ Next: Cohort Analysis практика                     │  │
│  │                          [Продолжить →]            │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [RECOMMENDED FOR YOU - 3 карточки]                      │
│  Рекомендуем тебе:                                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ 🧪 RICE     │ │ 📝 PRD      │ │ 🎯 OKRs     │        │
│  │ Framework   │ │ Writing     │ │ Setting     │        │
│  │ 20 min      │ │ 30 min      │ │ 25 min      │        │
│  │ [Start →]   │ │ [Start →]   │ │ [Start →]   │        │
│  └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                          │
│  [RECENT ACTIVITY]                                       │
│  Недавняя активность                                     │
│  • ✅ Завершён кейс "Retention Challenge" (2 часа назад) │
│  • 🏆 Получен badge "First A/B Test" (вчера)             │
│  • 📊 Прогресс в Analytics +15% (2 дня назад)            │
│                                                          │
│  [TWO COLUMNS]                                           │
│  ┌───────────────────────┐ ┌──────────────────────────┐  │
│  │ SKILL PROGRESS        │ │ LEADERBOARD              │  │
│  │ [Radar chart]         │ │ 1. Алексей    1250 pts   │  │
│  │                       │ │ 2. Мария      1180 pts   │  │
│  │                       │ │ 3. Ты         1050 pts ⭐ │  │
│  └───────────────────────┘ └──────────────────────────┘  │
│                                                          │
│  [ACHIEVEMENTS PREVIEW]                                  │
│  Последние достижения          [Все достижения →]        │
│  🏅 🏅 🏅 🏆 🥇                                            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Компоненты Dashboard

#### 1. Welcome Header

```
Dashboard
Добро пожаловать, Андрей! 👋
```

- **Заголовок:** "Dashboard"
- **Приветствие:** Персональное с именем + эмодзи
- **Date (optional):** Сегодня, 20 февраля 2026

---

#### 2. Quick Stats (4 метрики)

**Карточки с ключевыми метриками:**

```
┌──────────────────┐
│       3          │  ◄─ Large number (48px)
│   Модулей        │  ◄─ Label
│   пройдено       │
└──────────────────┘
```

**Метрика 1: Модулей пройдено**
- Number: 3/8
- Icon: 📚
- Subtitle: "из 8 модулей"

**Метрика 2: Кейсов решено**
- Number: 12
- Icon: 🎯
- Subtitle: "интерактивных сценариев"

**Метрика 3: Часов обучения**
- Number: 6.5h
- Icon: ⏱️
- Subtitle: "времени на платформе"

**Метрика 4: Уровень**
- Number: 5
- Icon: 🏆
- Progress bar: 68% до Level 6
- Subtitle: "68% до Level 6"

**Layout:**
- Desktop: 4 карточки в ряд
- Tablet: 2x2 grid
- Mobile: 2x2 grid (smaller)

**Дизайн карточки:**
- Background: white (light mode) / dark gray (dark mode)
- Border radius: 12px
- Padding: 24px
- Box shadow: subtle
- Hover: slight lift effect

---

#### 3. Continue Learning Card

**Большая prominent карточка:**

```
┌────────────────────────────────────────────────────┐
│ 📊 Analytics & Metrics Mastery                     │
│                                                    │
│ Progress: ████████░░░░░░ 60%                       │
│                                                    │
│ Next lesson: Cohort Analysis практика              │
│ Estimated time: 25 min                             │
│                                                    │
│                          [Продолжить →]            │
└────────────────────────────────────────────────────┘
```

**Элементы:**
- **Module icon + name**
- **Progress bar** (visual progress)
- **Next lesson title**
- **Estimated time**
- **CTA button:** "Продолжить →" (primary)

**Logic:**
- Показывать последний начатый модуль
- Если ничего не начато: показать рекомендованный
- Если всё завершено: поздравление + next steps

---

#### 4. Recommended For You

**3 персональные рекомендации:**

```
┌──────────────────┐
│  🧪              │  ◄─ Large icon
│  RICE Framework  │  ◄─ Title
│  Приоритизация   │  ◄─ Category
│  ⏱️ 20 min       │  ◄─ Duration
│                  │
│   [Start →]      │  ◄─ CTA
└──────────────────┘
```

**Рекомендации based on:**
- Onboarding choices
- Progress в модулях
- Популярность у похожих пользователей
- Недавно добавленный контент

**Layout:**
- Desktop: 3 карточки в ряд
- Tablet: 3 карточки (narrower)
- Mobile: Horizontal scroll carousel

**Дизайн:**
- Compact cards
- Icon prominent
- Short description
- Easy CTA

---

#### 5. Recent Activity Feed

```
Недавняя активность
• ✅ Завершён кейс "Retention Challenge" (2 часа назад)
• 🏆 Получен badge "First A/B Test" (вчера)
• 📊 Прогресс в Analytics +15% (2 дня назад)
• 📝 Создан PRD для проекта (3 дня назад)
• 🚀 Начат модуль Lifecycle Management (неделю назад)
```

**Формат:**
- Icon + Text + Time ago
- Last 5-7 activities
- Real-time updates (WebSocket или polling)

**Activity Types:**
- Lesson completed
- Module completed
- Achievement unlocked
- New skill level reached
- Scenario finished
- Resource bookmarked

**Link to full activity:** "Показать всё →"

---

#### 6. Skill Progress Radar Chart

```
┌───────────────────────────┐
│  Развитие навыков         │
│                           │
│      [Radar Chart]        │
│      с 8 осями            │
│                           │
│  Analytics:     ●●●●○     │
│  Artifacts:     ●●●○○     │
│  Frameworks:    ●●●●●     │
│  ...                      │
└───────────────────────────┘
```

**8 осей навыков:**
1. Analytics & Metrics
2. Artifacts Creation
3. Collaboration
4. Frameworks & Tools
5. Lifecycle Management
6. Stakeholder Management
7. Advanced Topics
8. Career & Leadership

**Features:**
- Interactive: hover to see exact percentage
- Color-coded (gradient)
- Animated on load
- Click axis → go to module

**Library:** Chart.js, Recharts, or D3.js

---

#### 7. Leaderboard Widget

```
┌──────────────────────────────┐
│  Топ на этой неделе          │
│  ──────────────────          │
│  1. Алексей      1250 pts    │
│  2. Мария        1180 pts    │
│  3. Ты (Андрей)  1050 pts ⭐  │  ◄─ Highlighted
│  4. Дмитрий      980 pts     │
│  5. Елена        920 pts     │
│                              │
│  [Полная таблица →]          │
└──────────────────────────────┘
```

**Features:**
- Current user highlighted
- Points this week
- Rank position
- Link to full leaderboard

**Gamification:**
- Weekly reset
- Different leagues (Bronze, Silver, Gold)
- Rewards for top positions

---

#### 8. Achievements Preview

```
Последние достижения         [Все достижения →]
┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
│ 🏅 │ │ 🎯 │ │ 📊 │ │ 🧪 │ │ 🚀 │
│    │ │    │ │    │ │    │ │    │
└────┘ └────┘ └────┘ └────┘ └────┘
```

**Last 5 badges earned:**
- Large icons (64x64px)
- Hover: name + description + date
- Click: open achievement details
- Link to full page

---

### Responsive Behavior

**Desktop (> 1024px):**
- All widgets visible
- 2-column layout where appropriate
- Comfortable spacing

**Tablet (768-1024px):**
- Stack some widgets
- Recommendations: 3 in row (smaller)
- Radar chart + Leaderboard: stack vertically

**Mobile (< 768px):**
- All single column
- Quick stats: 2x2 grid
- Recommendations: horizontal scroll
- Collapse activity feed (show 3, "Show more")
- Leaderboard: top 3 only

---

## Module Page

### URL
`/modules/{module-slug}`

Example: `/modules/analytics-metrics`

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  [Breadcrumbs]                                           │
│  Modules > Analytics & Metrics                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [MODULE HEADER]                                         │
│  📊 Analytics & Metrics Mastery                          │
│  Научись работать с аналитикой и метриками               │
│  Progress: ████████░░░░░░ 65%                            │
│                                                          │
│  [TABS]                                                  │
│  [📚 Обзор] [📖 Lessons] [🧪 Practice] [📚 Resources]    │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [CONTENT - зависит от active tab]                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Module Header

```
📊 Analytics & Metrics Mastery
Научись работать с аналитикой и метриками продукта

Progress: ████████░░░░░░ 65%
12 из 18 уроков завершено
```

**Элементы:**
- **Icon** (large, 64px)
- **Title** (H1, 36px)
- **Description** (18px, 1-2 sentences)
- **Progress bar** with percentage
- **Stats:** "X из Y уроков завершено"

---

### Tabs

```
[ 📚 Обзор ]  [ 📖 Lessons ]  [ 🧪 Practice ]  [ 📚 Resources ]
     ↑ Active
```

**4 tabs:**
1. **Обзор** (Overview) — о модуле
2. **Lessons** — список уроков
3. **Practice** — практические задания
4. **Resources** — дополнительные материалы

**Tab behavior:**
- Click: switch content
- URL updates: `?tab=lessons`
- Smooth transition (fade)
- Keyboard: arrow keys

---

### Tab 1: Обзор (Overview)

```
┌────────────────────────────────────────────────────┐
│  О модуле                                          │
│                                                    │
│  В этом модуле ты научишься:                       │
│  ✅ Настраивать аналитические инструменты          │
│  ✅ Строить воронки и когорты                      │
│  ✅ Проводить A/B тесты правильно                  │
│  ✅ Выбирать и трекать ключевые метрики            │
│  ✅ Принимать решения на основе данных             │
│                                                    │
│  ─────────────────────────────────────             │
│                                                    │
│  Структура модуля                                  │
│  • Section 1: Введение в аналитику (3 урока)       │
│  • Section 2: Инструменты (GA4, Amplitude) (5)     │
│  • Section 3: Метрики и KPI (6 уроков)             │
│  • Section 4: A/B testing (4 урока)                │
│                                                    │
│  ─────────────────────────────────────             │
│                                                    │
│  📊 Статистика                                     │
│  • Время на прохождение: 6-8 часов                 │
│  • Уроков: 18                                      │
│  • Практических заданий: 12                        │
│  • Сложность: Beginner → Intermediate              │
│                                                    │
│  ─────────────────────────────────────             │
│                                                    │
│  Prerequisites                                     │
│  Этот модуль не требует предварительных знаний.    │
│  Начни с первого урока!                            │
│                                                    │
│  [Начать модуль →]                                 │
└────────────────────────────────────────────────────┘
```

**Content:**
- What you'll learn (outcomes)
- Module structure
- Stats (time, lessons count)
- Difficulty level
- Prerequisites
- CTA: "Начать модуль"

---

### Tab 2: Lessons

```
┌────────────────────────────────────────────────────┐
│  Уроки модуля                                      │
│                                                    │
│  📊 Section 1: Введение в аналитику                │
│  ┌──────────────────────────────────────────────┐ │
│  │ ✅ 1.1 Зачем нужна аналитика PM    15 min    │ │
│  │ ✅ 1.2 Типы метрик и их применение 20 min    │ │
│  │ 🔄 1.3 Data-driven decision making 25 min    │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  🛠️ Section 2: Аналитические инструменты          │
│  ┌──────────────────────────────────────────────┐ │
│  │ 🔒 2.1 Google Analytics 4 Setup    30 min    │ │
│  │ 🔒 2.2 События и конверсии в GA4   35 min    │ │
│  │ 🔒 2.3 Amplitude для продактов     40 min    │ │
│  │ 🔒 2.4 Mixpanel альтернатива      35 min    │ │
│  │ 🔒 2.5 Сравнение инструментов      20 min    │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  📈 Section 3: Метрики и KPI                       │
│  ┌──────────────────────────────────────────────┐ │
│  │ 🔒 3.1 North Star Metric           30 min    │ │
│  │ 🔒 3.2 AARRR Pirate Metrics        40 min    │ │
│  │ 🔒 3.3 Engagement metrics (DAU/MAU) 35 min   │ │
│  │ ...                                           │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  [Continue with lesson 1.3 →]                      │
└────────────────────────────────────────────────────┘
```

**Lesson List Features:**

**Status Icons:**
- ✅ Completed
- 🔄 In Progress
- 🔒 Locked (prerequisite not met)

**Each lesson shows:**
- Number (1.1, 1.2, etc.)
- Title
- Duration estimate
- Status icon
- Click: open lesson page

**Grouping:**
- Sections (collapsible)
- Clear visual hierarchy

**CTA:**
- "Continue with lesson X.X" (next incomplete lesson)
- или "Start first lesson"

---

### Tab 3: Practice

```
┌────────────────────────────────────────────────────┐
│  Практические задания                              │
│                                                    │
│  Закрепи знания на реальных задачах               │
│                                                    │
│  [ЗАДАНИЕ 1]                                       │
│  ┌──────────────────────────────────────────────┐ │
│  │ 🧪 Quiz: Типы метрик                         │ │
│  │ 10 вопросов • 15 min                         │ │
│  │ Status: ✅ Пройдено (90%)                    │ │
│  │                                [Пройти снова]│ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  [ЗАДАНИЕ 2]                                       │
│  ┌──────────────────────────────────────────────┐ │
│  │ 📊 Практика: Настройка событий в GA4         │ │
│  │ Hands-on • 30 min                            │ │
│  │ Status: 🔄 В процессе (50%)                  │ │
│  │                                  [Продолжить]│ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  [ЗАДАНИЕ 3]                                       │
│  ┌──────────────────────────────────────────────┐ │
│  │ 🎯 Сценарий: Падение retention               │ │
│  │ Interactive scenario • 45 min                │ │
│  │ Status: 🔒 Заблокировано                     │ │
│  │ Требование: Завершить уроки 3.1-3.3          │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  [Еще практические задания...]                     │
└────────────────────────────────────────────────────┘
```

**Types of Practice:**
1. **Quizzes** — multiple choice questions
2. **Hands-on** — step-by-step guided tasks
3. **Scenarios** — интерактивные симуляции
4. **Projects** — открытые задания

**Each practice shows:**
- Type icon
- Title
- Duration
- Status (completed/in-progress/locked)
- Score (if completed)
- CTA button

---

### Tab 4: Resources

```
┌────────────────────────────────────────────────────┐
│  Дополнительные ресурсы                            │
│                                                    │
│  📄 Справочные материалы                           │
│  • PM Metrics Cheat Sheet (PDF)                    │
│  • Google Analytics 4 Guide (Link)                 │
│  • AARRR Framework Overview (Article)              │
│                                                    │
│  🎬 Видео                                          │
│  • Analytics for PMs by Lenny Rachitsky (YouTube)  │
│  • Amplitude Tutorial Series (Playlist)            │
│                                                    │
│  🔗 Полезные ссылки                                │
│  • Official GA4 Documentation                      │
│  • Amplitude Academy                               │
│  • Mixpanel University                             │
│                                                    │
│  📚 Рекомендуемое чтение                           │
│  • "Lean Analytics" by Alistair Croll             │
│  • "Analytics at Netflix" (Blog post)              │
│                                                    │
│  🛠️ Инструменты                                    │
│  • [RICE Calculator] (interactive tool)            │
│  • [Sample Size Calculator] (for A/B tests)        │
│  • [Metrics Dashboard Template] (Figma)            │
└────────────────────────────────────────────────────┘
```

**Resource Categories:**
- Reference materials (PDFs, guides)
- Videos
- External links
- Recommended reading
- Tools & templates

**Features:**
- Download buttons for files
- External link icon for links
- Preview for some content
- Bookmark functionality

---

## Lesson Page

### URL
`/modules/{module-slug}/lessons/{lesson-slug}`

Example: `/modules/analytics-metrics/lessons/ga4-setup`

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  ← Back to Module                     [Next Lesson →]    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [LESSON HEADER]                                         │
│  Lesson 2.1                                              │
│  Google Analytics 4: Подключение и настройка             │
│  ⏱️ 30 min                                               │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [PROGRESS BAR]                                          │
│  ████████████░░░░░░░░ 60% прочитано                      │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [LESSON CONTENT]                                        │
│                                                          │
│  ## Введение                                             │
│  Google Analytics 4 (GA4) — это обновлённая версия...    │
│                                                          │
│  [Image/Screenshot]                                      │
│                                                          │
│  ## Шаг 1: Создание аккаунта                             │
│  1. Перейди на...                                        │
│  2. Нажми...                                             │
│                                                          │
│  [Video: Демонстрация]                                   │
│                                                          │
│  ## Практика                                             │
│  [Interactive Demo/Sandbox]                              │
│                                                          │
│  ## Проверь себя                                         │
│  [Quiz: 3 вопроса]                                       │
│                                                          │
│  ## Итоги                                                │
│  Сегодня ты научился...                                  │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [Отметить как пройденное]  [Next Lesson →]              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Lesson Header

```
← Back to Module                    [Next Lesson →]

Lesson 2.1
Google Analytics 4: Подключение и настройка
⏱️ 30 min
```

**Navigation:**
- Back link → Module page
- Next lesson button (if exists)
- Sticky при скролле (optional)

**Lesson Meta:**
- Lesson number
- Title (H1)
- Estimated time

---

### Progress Bar

```
████████████░░░░░░░░ 60% прочитано
```

- Tracks scroll progress
- Updates in real-time
- Visual feedback on completion

---

### Lesson Content

**Content types:**

#### 1. Text Content
- Headings (H2, H3, H4)
- Paragraphs
- Bulleted/Numbered lists
- Blockquotes (for key points)
- Code snippets (if needed)
- Tables

**Typography:**
- Font: 18px for readability
- Line height: 1.7
- Max-width: 720px
- Comfortable margins

---

#### 2. Media

**Images:**
```
[Descriptive alt text]
Caption: Пример настройки GA4
```
- High-resolution
- Lazy loading
- Click to zoom
- Captions

**Videos:**
- Embedded player
- Controls (play, pause, speed)
- Subtitles (if available)
- Timestamps for sections

---

#### 3. Interactive Elements

**Expandable sections:**
```
▶ Дополнительная информация
  [Hidden content reveals on click]
```

**Tabs:**
```
[Option A] [Option B] [Option C]
Content changes based on selection
```

**Tooltips:**
```
Analytics [?]  ← Hover for definition
```

---

#### 4. Практические задания

**Sandbox/Demo:**
```
┌────────────────────────────────────┐
│  Try it yourself!                  │
│  [Interactive demo interface]      │
│  [Your code here]                  │
│  [Run] [Reset]                     │
└────────────────────────────────────┘
```

**Step-by-step guides:**
```
✅ Step 1: Create account
⏳ Step 2: Setup tracking (current)
○ Step 3: Verify installation
○ Step 4: Create first report
```

---

#### 5. Knowledge Check (Quiz)

```
┌────────────────────────────────────┐
│  Проверь себя                      │
│                                    │
│  Вопрос 1 из 3:                    │
│  Что такое событие (event) в GA4?  │
│                                    │
│  ○ A) Пользователь на сайте        │
│  ○ B) Действие пользователя        │
│  ○ C) Страница сайта               │
│  ○ D) Метрика                      │
│                                    │
│  [Ответить]                        │
└────────────────────────────────────┘
```

**Quiz features:**
- Multiple choice
- Instant feedback
- Explanation for каждого ответа
- Score tracking
- Retry option

---

### Lesson Footer

```
───────────────────────────────────────

[✓ Отметить как пройденное]  [Next: Lesson 2.2 →]
```

**Completion:**
- Button to mark complete
- Auto-marks after:
  - Scrolled to bottom
  - Quiz passed (if exists)
  - Time spent > 80% of estimate

**Navigation:**
- Next lesson (primary CTA)
- Previous lesson (secondary)

---

### Side Panel (Optional)

**Table of Contents (sticky):**
```
┌──────────────────┐
│  In this lesson  │
│  ─────────────   │
│  → Введение      │
│  → Шаг 1         │
│  → Шаг 2         │
│  → Практика      │
│  → Итоги         │
└──────────────────┘
```

- Sections of lesson
- Click to jump
- Highlight current section
- Desktop only (> 1200px)

---

## Interactive Scenario

### URL
`/scenarios/{scenario-slug}`

Example: `/scenarios/retention-challenge`

### Цель
Ключевая feature платформы — ветвящиеся симуляции

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  ⏸ Pause                                [i] Help         │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [SCENARIO CONTEXT]                                      │
│  ┌────────────────────────────────────────────────────┐  │
│  │ 📉 Retention Challenge                             │  │
│  │                                                    │  │
│  │ Ты PM мобильного фитнес-приложения FitLife.       │  │
│  │ За последний месяц D7 retention упал с 35% до 20%. │  │
│  │                                                    │  │
│  │ Current metrics:                                   │  │
│  │ • DAU: 10,000                                      │  │
│  │ • D1 retention: 60%                                │  │
│  │ • D7 retention: 20% (было 35%) ⚠️                  │  │
│  │ • D30 retention: 8%                                │  │
│  │                                                    │  │
│  │ Что будешь делать?                                 │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  [DECISION OPTIONS]                                      │
│  ┌──────────────────┐ ┌──────────────────┐               │
│  │ 🧪 Option A      │ │ 🎯 Option B      │               │
│  │ Провести user    │ │ Улучшить         │               │
│  │ interviews чтобы │ │ onboarding для   │               │
│  │ понять причину   │ │ первых 3 дней    │               │
│  │                  │ │                  │               │
│  │ Impact: ?        │ │ Impact: Medium   │               │
│  │ Time: 2 weeks    │ │ Time: 2 weeks    │               │
│  │ Cost: Low        │ │ Cost: Medium     │               │
│  │                  │ │                  │               │
│  │ [Выбрать]        │ │ [Выбрать]        │               │
│  └──────────────────┘ └──────────────────┘               │
│                                                          │
│  ┌──────────────────┐ ┌──────────────────┐               │
│  │ 🚀 Option C      │ │ 📊 Option D      │               │
│  │ Запустить        │ │ Углубиться в     │               │
│  │ реактивацию push │ │ аналитику и      │               │
│  │ для churned      │ │ cohort analysis  │               │
│  │ ...              │ │ ...              │               │
│  └──────────────────┘ └──────────────────┘               │
│                                                          │
│  [Progress: ●●●○○○○○○○ 30%]                              │
└──────────────────────────────────────────────────────────┘
```

---

### Scenario Flow

#### 1. Context Setup

```
┌────────────────────────────────────────────────────┐
│ 📉 Retention Challenge                             │
│                                                    │
│ [Background story]                                 │
│ Ты PM мобильного фитнес-приложения...              │
│                                                    │
│ [Current metrics/situation]                        │
│ • Metric 1                                         │
│ • Metric 2                                         │
│ • Problem indicator                                │
│                                                    │
│ [Challenge]                                        │
│ Что будешь делать?                                 │
└────────────────────────────────────────────────────┘
```

**Context includes:**
- Role (твоя роль)
- Company/Product (контекст)
- Current situation (что происходит)
- Data/Metrics (цифры)
- Problem/Opportunity (проблема)

---

#### 2. Decision Point

**2-4 options cards:**

```
┌──────────────────────┐
│ 🧪 Option A          │
│                      │
│ [Title]              │
│ Провести user        │
│ interviews           │
│                      │
│ [Details]            │
│ Узнать почему users  │
│ уходят через опросы  │
│                      │
│ [Tradeoffs]          │
│ Impact: Unknown      │
│ Time: 2 weeks        │
│ Cost: Low            │
│ Risk: Low            │
│                      │
│ [Выбрать]            │
└──────────────────────┘
```

**Each option shows:**
- Icon (visual differentiation)
- Title (short, clear)
- Description (2-3 sentences)
- Expected impact (if known)
- Time required
- Cost
- Risk level
- CTA button

**Hover effect:**
- Slight elevation
- Border highlight
- Cursor: pointer

---

#### 3. Consequence & Feedback

**After choosing:**

```
┌────────────────────────────────────────────────────┐
│ Ты выбрал: Улучшить onboarding                     │
│                                                    │
│ [Implementation phase animation]                   │
│ ⏱️ 2 недели спустя...                              │
│                                                    │
│ 📊 Результаты:                                     │
│ • D7 retention: 20% → 27% (+35%) ✅                │
│ • D1 retention: 60% → 68% (+13%) ✅                │
│ • Development cost: $15K                           │
│ • Team sprint: 2 weeks                             │
│                                                    │
│ ⚠️ Однако:                                         │
│ • Не нашли root cause проблемы                     │
│ • Retention всё ещё ниже таргета (35%)             │
│ • Возможно, проблема глубже                        │
│                                                    │
│ 💡 Feedback:                                       │
│ Хорошее тактическое решение! Onboarding улучшен,   │
│ и retention вырос. Но важно было также провести    │
│ user research, чтобы понять WHY падает retention.  │
│                                                    │
│ Альтернативный подход:                             │
│ Сначала user interviews → понять проблему →        │
│ потом решение. Более data-driven approach.         │
│                                                    │
│ [Продолжить сценарий →]                            │
└────────────────────────────────────────────────────┘
```

**Consequence показывает:**
- What you chose
- Time skip animation
- Results (metrics change)
- Positive outcomes ✅
- Negative outcomes ⚠️
- Tradeoffs
- Detailed feedback (why good/bad)
- Alternative approaches
- What you missed
- Best practices

**Tone:**
- Constructive, не judgmental
- Educational
- Показывает WHY, not only WHAT

---

#### 4. Next Decision

Based on previous choice, scenario branches:

```
Situation evolved...

[New context карточка]

[New decision options (2-4)]
```

**Branching logic:**
- 10-15 decision points в одном сценарии
- Разные пути ведут к разным outcomes
- Some paths converge later
- Multiple endings возможны

---

#### 5. Final Outcome & Summary

**В конце сценария:**

```
┌────────────────────────────────────────────────────┐
│ 🎉 Сценарий завершён!                              │
│                                                    │
│ Итоговый результат:                                │
│ • D7 retention: 20% → 32% (target: 35%)            │
│ • User satisfaction: +15%                          │
│ • Development budget: $45K из $50K                 │
│ • Time: 6 недель из 8 запланированных              │
│                                                    │
│ Grade: B+ (85/100)                                 │
│                                                    │
│ ─────────────────────────────────────              │
│                                                    │
│ 📝 Что было сделано хорошо:                        │
│ ✅ Быстро идентифицировал проблему                 │
│ ✅ Приоритизировал onboarding                      │
│ ✅ Тестировал изменения через A/B                  │
│                                                    │
│ 🔄 Что можно было сделать лучше:                   │
│ ⚠️ Стоило начать с user research                   │
│ ⚠️ Deeper cohort analysis помог бы раньше          │
│ ⚠️ Коммуникация с командой была недостаточной      │
│                                                    │
│ 💡 Альтернативные пути:                            │
│ • Path A: Research-first approach (Grade: A)       │
│ • Path C: Data-driven diagnosis (Grade: A-)        │
│                                                    │
│ ─────────────────────────────────────              │
│                                                    │
│ 🚀 Skills developed:                               │
│ • Analytical Thinking: +15%                        │
│ • Prioritization: +10%                             │
│ • Experiment Design: +8%                           │
│                                                    │
│ [Пройти снова] [Следующий сценарий →]              │
└────────────────────────────────────────────────────┘
```

**Final feedback includes:**
- Overall grade/score
- Final metrics vs. target
- What went well
- What could be better
- Alternative paths (not taken)
- Skills gained
- Replay option
- Next scenario recommendation

---

### Scenario UI Elements

**Progress Bar:**
```
●●●●○○○○○○ 40%
Decision 4 of 10
```

**Pause button:**
- Save progress
- Resume later

**Help button:**
- Hints (if stuck)
- Definitions
- Context reminder

**History/Breadcrumb:**
```
You chose: Option B → Option A → Option C
```

**Timer (optional):**
- Показывать elapsed time
- Add time pressure (optional mode)

---

### Gamification Elements

**Points system:**
- +100 points for completion
- Bonus for optimal path
- Bonus for speed (if relevant)

**Achievements:**
- First scenario complete
- Perfect score
- All alternative paths explored

**Leaderboard:**
Compare score with others who did same scenario

**Replay value:**
- Try different paths
- Achieve better score
- Unlock alternative endings

---

## My Progress

### URL
`/progress`

### Цель
Детальная аналитика личного прогресса

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  Мой прогресс                                            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [OVERALL STATS - 4 карточки]                            │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│  │Level 5 │ │ 1,250  │ │  25    │ │  12h   │            │
│  │ 68% →6 │ │ Points │ │ Badges │ │ Total  │            │
│  └────────┘ └────────┘ └────────┘ └────────┘            │
│                                                          │
│  [SKILL RADAR - большой интерактивный]                   │
│  Развитие навыков                                        │
│  [Radar chart с 8 осями + детали по каждому]             │
│                                                          │
│  [MODULES PROGRESS]                                      │
│  Прогресс по модулям                                     │
│  📊 Analytics & Metrics      ████████░░ 80%              │
│  📝 Product Artifacts        ██████░░░░ 60%              │
│  👥 Collaboration            ████░░░░░░ 40%              │
│  🧪 Frameworks & Tools       ███████░░░ 70%              │
│  🚀 Lifecycle Management     ░░░░░░░░░░ 0%               │
│  💼 Stakeholder Management   ██░░░░░░░░ 20%              │
│  🎯 Advanced Topics          ░░░░░░░░░░ 0%               │
│  🏆 Career & Leadership      ░░░░░░░░░░ 0%               │
│                                                          │
│  [ACTIVITY OVER TIME]                                    │
│  Активность за последние 30 дней                         │
│  [Line/bar chart showing daily activity]                 │
│                                                          │
│  [COMPLETED SCENARIOS]                                   │
│  Пройденные сценарии: 12                                 │
│  [List with dates, scores, grades]                       │
│                                                          │
│  [LEARNING STREAK]                                       │
│  🔥 Текущая серия: 7 дней подряд                         │
│  🏆 Лучшая серия: 14 дней                                │
│                                                          │
│  [TIME STATISTICS]                                       │
│  Статистика времени                                      │
│  • Среднее время в день: 45 минут                        │
│  • Самый продуктивный день: Вторник                      │
│  • Preferred time: 20:00-22:00                           │
└──────────────────────────────────────────────────────────┘
```

---

### Components

#### 1. Overall Stats

4 key metrics (same as Dashboard but expanded):
- Current level + progress
- Total points earned
- Badges collected
- Total hours on platform

---

#### 2. Skills Radar (Big Interactive)

```
      Analytics
         /|\
        / | \
Career /  |  \ Artifacts
      /   |   \
     /____|____\
    Stakeholder  Collaboration
```

**Features:**
- Large, prominent
- Hover each axis → show percentage + level
- Click axis → navigate to that module
- Color-coded (gradient)
- Animation on load
- Comparison toggle: "vs. 1 month ago"

**Detailed breakdown below:**
```
📊 Analytics & Metrics: ████████░░ 80% (Level 4)
   • Events setup: Mastered
   • Funnel analysis: Intermediate
   • A/B testing: Advanced
   
📝 Product Artifacts: ██████░░░░ 60% (Level 3)
   • PRD writing: Intermediate
   • Roadmapping: Beginner
   • User stories: Advanced
```

---

#### 3. Modules Progress

Progress bars for each module with:
- Icon
- Module name
- Progress bar (visual)
- Percentage
- Click → navigate to module

**Sorting options:**
- By progress (default)
- By recently active
- Alphabetical

---

#### 4. Activity Over Time

**Chart showing:**
- X-axis: Last 30 days (or toggle to weeks/months)
- Y-axis: Hours spent or lessons completed
- Type: Line chart or bar chart
- Hover: exact numbers for that day
- Highlight today

**Filters:**
- Last 7 days / 30 days / 3 months / All time
- Type: Hours / Lessons / Scenarios

**Insights:**
- "You're most active on Tuesdays"
- "Best learning time: 8-10 PM"
- "7-day streak 🔥"

---

#### 5. Completed Scenarios

```
┌──────────────────────────────────────────────┐
│ Пройденные сценарии: 12                      │
│ Средний score: 82/100                        │
│                                              │
│ 📉 Retention Challenge          85/100  A    │
│    Completed: 5 days ago                     │
│    [View details] [Retry]                    │
│                                              │
│ 🎯 North Star Selection         78/100  B+   │
│    Completed: 1 week ago                     │
│    [View details] [Retry]                    │
│                                              │
│ ...                                          │
└──────────────────────────────────────────────┘
```

**Each scenario shows:**
- Title
- Score + Grade
- Date completed
- Actions: View details, Retry

---

#### 6. Learning Streak

```
🔥 Текущая серия: 7 дней подряд
🏆 Лучшая серия: 14 дней

[Calendar view showing streak]
Mo Tu We Th Fr Sa Su
✅ ✅ ✅ ✅ ✅ ✅ ✅  ← This week
✅ ✅ ✅ ⚪ ✅ ✅ ✅  ← Last week
```

**Motivation:**
- "Не прерывай серию!"
- "2 дня до нового рекорда!"
- Notifications для поддержания streak

---

#### 7. Time Statistics

- Total hours on platform
- Average per day/week
- Most productive day of week
- Preferred learning time
- Longest session
- Weekly goal progress (if set)

---

#### 8. Comparison (Optional)

```
Сравнение с другими пользователями

Твой уровень: 5
Средний уровень: 3.2

Ты в топ 15% всех пользователей! 🎉

[Show detailed comparison]
```

---

### Filters & Controls

**Date range:**
- Last 7 days
- Last 30 days
- Last 3 months
- All time

**Export data:**
- Download progress report (PDF)
- Export data (CSV)

**Share:**
- Share progress (LinkedIn, Twitter)
- Generate shareable link

---

## Achievements

### URL
`/achievements`

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  Достижения                                              │
│  25 / 100 badges collected                               │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [FILTERS]                                               │
│  [Все] [Получено (25)] [Заблокировано (75)]             │
│                                                          │
│  [CATEGORIES]                                            │
│  [All] [Learning] [Scenarios] [Streak] [Social]          │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [BADGES GRID]                                           │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│  │ 🏅   │ │ 🎯   │ │ 📊   │ │ ❓?  │ │ ❓?  │          │
│  │First │ │RICE  │ │GA4   │ │ ???  │ │ ???  │          │
│  │A/B   │ │Pro   │ │Setup │ │      │ │      │          │
│  │      │ │      │ │      │ │      │ │      │          │
│  │5 days│ │1 week│ │2 weeks│ │🔒   │ │🔒   │          │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │
│  Unlocked  Unlocked  Unlocked   Locked   Locked          │
│                                                          │
│  [More badges grid...]                                   │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [RECENT ACHIEVEMENTS]                                   │
│  📊 GA4 Setup Complete — 2 дня назад                     │
│  🎯 RICE Master — 1 неделю назад                         │
│  🏅 First A/B Test — 2 недели назад                      │
│                                                          │
│  [PROGRESS TO NEXT]                                      │
│  🔥 7 Day Streak — 2 дня осталось (5/7)                  │
│  📝 5 PRDs Written — 2 PRD осталось (3/5)                │
│  🧪 10 Scenarios — 3 сценария осталось (7/10)            │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Badge Types

#### 1. Getting Started
- 👋 First Login
- ✅ Profile Complete
- 📚 First Lesson Complete
- 🎯 First Scenario Complete
- 🎓 Onboarding Master (complete onboarding)

#### 2. Learning Progress
- 📊 Analytics Beginner/Intermediate/Master
- 📝 Artifacts Creator
- 🧪 Framework Expert
- 🚀 Lifecycle Pro
- (one per module at different levels)

#### 3. Scenarios
- 🎯 Complete 5 Scenarios
- 🎯 Complete 10 Scenarios
- 🎯 Complete 25 Scenarios
- 🏆 Perfect Score (100/100 on scenario)
- 🌟 All Alternative Paths (explore all paths in one scenario)

#### 4. Skills
- Each skill at Level 3/5/7
- Subject matter expert badges

#### 5. Streaks
- 🔥 3 Day Streak
- 🔥 7 Day Streak
- 🔥 14 Day Streak
- 🔥 30 Day Streak
- 🔥 100 Day Streak

#### 6. Time-based
- ⏱️ 10 Hours on Platform
- ⏱️ 50 Hours on Platform
- ⏱️ 100 Hours on Platform

#### 7. Social & Competition
- 🏆 Top 10 This Week
- 🏆 Top 100 All Time
- 👥 Invited 5 Friends
- 💬 Community Helper

#### 8. Special
- 🌟 Early Adopter (first 100 users)
- 🧪 Beta Tester
- 🎂 Anniversary (1 year on platform)

---

### Badge Card (Detail View)

**Click на badge → Modal:**

```
┌────────────────────────────────────────┐
│         🏅 First A/B Test              │
│                                        │
│  Провёл свой первый A/B тест           │
│                                        │
│  Unlocked: 5 days ago                  │
│  Rarity: Common (75% of users have it) │
│                                        │
│  [Share]  [Close]                      │
└────────────────────────────────────────┘
```

**For locked badge:**
```
┌────────────────────────────────────────┐
│         ❓ ???                         │
│                                        │
│  Complete 10 scenarios to unlock       │
│                                        │
│  Progress: ███████░░░ 7/10             │
│                                        │
│  [Close]                               │
└────────────────────────────────────────┘
```

---

### Recent Achievements

Timeline of last 5-10 unlocked achievements with dates

---

### Progress to Next

Shows badges you're close to unlocking:
- Badge name
- Progress bar
- What's needed

Motivates to complete actions

---

### Share功能

**Share achievement:**
- Generate image (badge + your name)
- Share to LinkedIn, Twitter
- Copy link

**Example share:**
```
🎉 I just earned "Analytics Master" badge
on PM Gym! #ProductManagement #Learning

[Beautiful image with badge]
```

---

## Library

### URL
`/library`

### Цель
Справочные материалы, шаблоны, инструменты

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  Библиотека                                              │
│  Шаблоны, фреймворки и справочники для PM                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [SEARCH BAR]                                            │
│  🔍 Поиск по библиотеке...                               │
│                                                          │
│  [CATEGORIES]                                            │
│  [📝 Шаблоны] [🧪 Фреймворки] [📋 Чеклисты] [📚 Гайды]  │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  📝 Шаблоны документов                                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ PRD         │ │ User Story  │ │ Roadmap     │        │
│  │ Template    │ │ Template    │ │ Template    │        │
│  │             │ │             │ │             │        │
│  │ [Preview]   │ │ [Preview]   │ │ [Preview]   │        │
│  │ [Download]  │ │ [Download]  │ │ [Download]  │        │
│  └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                          │
│  🧪 Фреймворки и калькуляторы                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ RICE        │ │ ICE         │ │ Sample Size │        │
│  │ Calculator  │ │ Calculator  │ │ Calculator  │        │
│  │             │ │             │ │             │        │
│  │ [Open Tool] │ │ [Open Tool] │ │ [Open Tool] │        │
│  └─────────────┘ └─────────────┘ └─────────────┘        │
│                                                          │
│  📋 Чеклисты                                             │
│  • Launch Checklist (PDF)                                │
│  • A/B Test Setup Checklist                              │
│  • User Interview Guide                                  │
│  • Sprint Planning Checklist                             │
│                                                          │
│  📚 Справочные гайды                                     │
│  • PM Metrics Dictionary                                 │
│  • Analytics Tools Comparison                            │
│  • Framework Quick Reference                             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Content Types

#### 1. Templates
- PRD Template (Google Docs, Notion, Markdown)
- User Story Template
- Roadmap Template (Excel, Figma)
- OKR Template
- Go-to-Market Plan
- A/B Test Brief
- Feature Spec Template
- Interview Script

**Actions:**
- Preview (in-browser)
- Download (various formats)
- Copy to Notion/Docs
- Bookmark

---

#### 2. Frameworks & Calculators

**Interactive Tools:**

**RICE Calculator:**
```
┌────────────────────────────────────────┐
│  RICE Prioritization Calculator        │
│                                        │
│  Reach: [1000] users                   │
│  Impact: [3] (1-5 scale)               │
│  Confidence: [80] %                    │
│  Effort: [5] person-weeks              │
│                                        │
│  RICE Score: 480                       │
│  Priority: High                        │
│                                        │
│  [Calculate] [Reset] [Save]            │
└────────────────────────────────────────┘
```

**ICE Calculator:** Similar interface

**Sample Size Calculator** (for A/B tests):
- Baseline conversion rate
- Expected lift
- Confidence level
- → Required sample size

**Other Tools:**
- Kano Model analyzer
- Retention curve plotter
- LTV calculator
- CAC calculator

---

#### 3. Checklists

**Downloadable PDFs/MD:**
- Launch Checklist (30+ items)
- A/B Test Checklist
- User Research Guide
- Sprint Planning Checklist
- Design Review Checklist
- Data Analysis Checklist

**Format:** PDF, Markdown, Notion template

---

#### 4. Reference Guides

- **PM Metrics Dictionary**
  - All metrics explained
  - How to calculate
  - When to use
  - Benchmarks

- **Analytics Tools Comparison**
  - GA4 vs Amplitude vs Mixpanel
  - Feature comparison table
  - Pricing
  - Use cases

- **Best Practices Guides**
  - PRD writing
  - User interview techniques
  - Prioritization approaches

---

### Search & Filters

**Search:**
- Full-text search
- Fuzzy matching
- Recent searches

**Filters:**
- Type (template/framework/checklist/guide)
- Category (analytics/planning/research)
- Format (PDF/Notion/Excel/Interactive)

**Sorting:**
- Most popular
- Recently added
- Alphabetical

---

### Bookmarks

**Save favorites:**
- Heart icon on each resource
- Access from "My Bookmarks" tab
- Quick access to frequently used

---

## Settings

### URL
`/settings`

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  Настройки                                               │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [TABS]                                                  │
│  [👤 Профиль] [⚙️ Настройки] [🔔 Уведомления] [🔒 Приватность]│
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [CONTENT based on active tab]                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Tab 1: Профиль

```
👤 Профиль

[Avatar Upload Area]
[Изменить фото]

Имя:
[Андрей                          ]

Email:
[andrey@example.com              ] ✅ Verified

Роль:
[Middle PM                       ▼]

Компания: (optional)
[Стартап                         ]

LinkedIn: (optional)
[linkedin.com/in/...             ]

О себе: (optional)
[Text area for bio, 200 chars max]

───────────────────────────────────

Изменить пароль:
[Change Password]

───────────────────────────────────

[Сохранить изменения]
```

**Fields:**
- Avatar (upload image, max 5MB)
- Name (required)
- Email (required, with verification status)
- Role dropdown (Student/Junior/Middle/Senior/Other)
- Company (optional)
- LinkedIn (optional, validation)
- Bio (optional, 200 chars)

**Change password:**
- Click → modal or separate section
- Current password
- New password (with strength indicator)
- Confirm password

---

### Tab 2: Настройки

```
⚙️ Настройки приложения

Язык интерфейса:
[Русский ▼]

Тема:
○ Светлая
● Тёмная
○ Системная (автоматически)

Часовой пояс:
[UTC+3 Moscow Time ▼]

Формат даты:
○ DD.MM.YYYY
○ MM/DD/YYYY
● YYYY-MM-DD

Email для уведомлений:
[andrey@example.com              ]

───────────────────────────────────

Обучение:
☑ Показывать подсказки
☑ Автоматически отмечать уроки как пройденные
☐ Skip scenario introductions (для опытных)

───────────────────────────────────

[Сохранить]
```

---

### Tab 3: Уведомления

```
🔔 Уведомления

Email уведомления:
☑ Новые достижения и badges
☑ Напоминания продолжить обучение
☑ Еженедельный отчёт о прогрессе
☑ Новые модули и контент
☐ Маркетинговые новости и акции

Частота напоминаний:
○ Ежедневно (если не заходил)
● Через день
○ Еженедельно
○ Никогда

Push-уведомления: (если PWA/app)
☑ Достижения
☐ Streak напоминания
☐ Leaderboard updates

───────────────────────────────────

[Сохранить настройки]
```

---

### Tab 4: Приватность

```
🔒 Приватность и безопасность

Видимость профиля:
☑ Показывать в Leaderboard
☑ Делиться прогрессом с другими пользователями
☐ Публичный профиль (доступен по ссылке)

Использование данных:
☑ Улучшение платформы через аналитику (анонимно)
☑ Персонализация рекомендаций

───────────────────────────────────

Управление данными:

[Скачать мои данные] (GDPR compliance)
Получить архив всех данных в формате JSON

[Удалить аккаунт]
Безвозвратно удалить аккаунт и все данные

───────────────────────────────────

Активные сессии:
• Windows PC (Chrome) - Москва - Сейчас
• iPhone (Safari) - Last seen: 2 days ago
  [Завершить сессию]

───────────────────────────────────

[Сохранить]
```

**Features:**
- Leaderboard visibility toggle
- Profile sharing settings
- Data download (GDPR)
- Account deletion
- Active sessions management
- Two-factor authentication (future)

---

## Help & Support

### URL
`/help`

### Структура

```
┌──────────────────────────────────────────────────────────┐
│  Помощь и поддержка                                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [SEARCH FAQ]                                            │
│  🔍 Поиск по частым вопросам...                          │
│                                                          │
│  [QUICK LINKS]                                           │
│  [📖 Начало работы]  [🎓 Гайды]  [💬 Связаться]          │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [FAQ ACCORDION]                                         │
│  ▼ Как начать обучение?                                  │
│    После регистрации пройди onboarding...               │
│                                                          │
│  ▶ Сколько времени занимает модуль?                      │
│  ▶ Можно ли пропустить урок?                             │
│  ▶ Как получить сертификат?                              │
│  ...                                                     │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [CONTACT SUPPORT]                                       │
│  Не нашёл ответ?                                         │
│  📧 Email: support@pmgym.io                              │
│  💬 Live Chat (скоро)                                    │
│  📱 Telegram: @pmgym_support                             │
│                                                          │
│  Обычно отвечаем в течение 24 часов                      │
│                                                          │
│  ───────────────────────────────────────────             │
│                                                          │
│  [VIDEO TUTORIALS]                                       │
│  🎬 Обзор платформы (5 min)                              │
│  🎬 Как проходить сценарии (7 min)                       │
│  🎬 Использование библиотеки (4 min)                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

### Components

#### 1. Search
Full-text search across FAQ and help articles

#### 2. Quick Links
- Getting Started Guide
- Tutorial Videos
- Contact Form

#### 3. FAQ (Accordion)
- Expandable sections
- Categories (Getting started, Learning, Technical, Account)
- Helpful articles

#### 4. Contact Support
- Email
- Live chat (optional)
- Support ticket system
- Expected response time

#### 5. Video Tutorials
- Platform overview
- How to use key features
- Tips & tricks

---

## Responsive Design

### Desktop (>1024px)

- Sidebar: visible, 260px
- Content: max-width 1400px
- Charts: full-width, interactive
- Cards: multi-column grids

### Tablet768-1024px)

- Sidebar: collapsible
- Content: adjusted padding
- Charts: smaller but still visible
- Cards: 2-column grids mostly

### Mobile (<768px)

- Sidebar: drawer (overlay)
- Bottom navigation bar (optional)
- Content: single column
- Charts: simplified or stacked
- Cards: single column
- Horizontal scrolls for card grids
- Larger touch targets (48x48px minimum)

---

## Технические требования

### Performance

**Targets:**
- Initial load: < 2s
- Route transitions: < 300ms
- Smooth 60fps animations
- Lighthouse score: > 90

**Optimization:**
- Code splitting per route
- Lazy loading components
- Image optimization
- CDN for assets
- Service Worker for offline access (PWA)

---

### State Management

**Global state:**
- User authentication
- User profile data
- Current module/lesson state
- Theme preferences
- Notifications

**Tools:** Redux/Zustand/Jotai or React Context

---

### Data Fetching

**Strategy:**
- React Query / SWR for server state
- Optimistic updates
- Caching strategy
- Pagination for large lists
- Infinite scroll где уместно

---

### Analytics

**Events to track:**
Every major user action:
- Page views
- Lesson start/complete
- Scenario decisions
- Skill level ups
- Achievement unlocks
- Feature usage
- Time spent
- Drop-offs

**Tools:**
- Google Analytics 4
- Amplitude / Mixpanel
- Custom events API

---

### Accessibility

- Keyboard navigation всё
- Focus management
- ARIA labels
- Screen reader support
- Color contrast WCAG AA
- Alt text для images
- Skip links
- Focus indicators

---

### Security

- HTTPS only
- JWT для auth
- XSS prevention
- CSRF tokens
- Input sanitization
- Rate limiting
- Secure session management

---

### Testing

**Unit tests:**
- Critical functions
- Utilities
- Validation logic

**Integration tests:**
- User flows
- API interactions

**E2E tests (Playwright/Cypress):**
- Critical paths
- Registration → Onboarding → First lesson
- Scenario completion
- Settings changes

---

### Browser Support

Modern browsers:
- Chrome (latest 2)
- Firefox (latest 2)
- Safari (latest 2)
- Edge (latest 2)

Mobile:
- iOS Safari 14+
- Chrome Android

---

## Следующие шаги

После утверждения Platform structure:

1. ✅ **Figma Design System** — UI kit + components
2. ✅ **High-fidelity mockups** — все страницы
3. ✅ **Prototype** — interactive flow
4. ✅ **Backend API** — endpoints for all features
5. ✅ **Frontend implementation:**
   - React/Next.js setup
   - Routing
   - State management
   - Component library
6. ✅ **Content creation:**
   - Modules content
   - Lessons
   - Scenarios
   - Resources
7. ✅ **Testing:**
   - Unit tests
   - Integration tests
   - E2E tests
   - Usability testing
8. ✅ **Analytics setup** — complete tracking
9. ✅ **Beta launch** — limited users
10. ✅ **Production launch!** 🚀

---

**Готов к работе!** 🎯
