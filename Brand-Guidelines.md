# PM Gym — Brand Guidelines

**Версия:** 1.0  
**Дата:** 20 февраля 2026  
**Статус:** Draft для утверждения

---

## 🎯 Brand Essence

### Позиционирование
**PM Gym — это Duolingo для продуктового мышления.**

Безопасная симуляционная среда, где продакт-менеджеры прокачивают навыки через практику, получают системную обратную связь и видят свой рост.

### Brand Promise
> "Стань уверенным продактом через практику, а не теорию"

### Mission
Сделать обучение продуктовому менеджменту практичным, измеримым и увлекательным.

### Vision
Каждый продакт-менеджер в мире проходит через PM Gym, чтобы стать лучше.

---

## 🎨 Visual Identity

### Logo Concept

#### Primary Logo: "PM Gym"

**Концепция:**
- **PM** — Product Management (профессиональность)
- **Gym** — тренировка, рост, сила (ассоциация с физическим развитием применительно к интеллекту)

**Визуальные элементы:**
- 💪 **Иконка:** Стилизованная гантель, трансформирующаяся в мозг или лампочку
  - Символизирует "прокачку мозга"
  - Может быть анимированной (прогресс-бар в виде набора веса)
  
- 🎯 **Альтернативная иконка:** Мишень с траекторией роста
  - Точность в принятии решений
  - Видимый прогресс к цели

**Стиль логотипа:**
- **Wordmark:** Современный, bold sans-serif
- **"PM"** — крупнее, жирнее (primary focus)
- **"Gym"** — легче, но читаемо
- Возможен gradient для ощущения динамики

**Варианты использования:**
```
[PM] GYM        ← Полный (landing, documents)
[PM]            ← Сокращённый (favicon, mobile app icon)
PM GYM          ← Текстовый (когда нет возможности использовать иконку)
```

---

## 🌈 Color Palette

### Primary Colors

#### 🔵 Primary Blue — "Growth Blue"
```
Main:    #006EFF  (Brand Blue)
Light:   #4D9CFF
Dark:    #0052C4
Darker:  #003A8C
```
**Использование:**
- Primary CTA buttons
- Links & interactive elements
- Progress bars (начало градиента)
- Key metrics highlights

**Психология:** Доверие, профессионализм, стабильность, технологичность

---

#### 🟣 Secondary Purple — "Achievement Purple"
```
Main:    #8B5CF6  (Achievement Purple)
Light:   #A78BFA
Dark:    #7C3AED
```
**Использование:**
- Achievements & badges
- Gamification elements
- Premium features highlights
- Skill level indicators

**Психология:** Креативность, достижения, премиальность

---

#### 🟢 Success Green — "Progress Green"
```
Main:    #10B981  (Success Green)
Light:   #34D399
Dark:    #059669
```
**Использование:**
- Completed tasks ✅
- Positive metrics (рост retention, engagement)
- Success messages
- Skill progress indicators

**Психология:** Рост, успех, правильное решение

---

#### 🟠 Energy Orange — "Action Orange"
```
Main:    #F59E0B  (Action Orange)
Light:   #FBBF24
Dark:    #D97706
```
**Использование:**
- Warnings (не критичные)
- Hints & tips
- "In progress" состояния
- Call-to-action элементы (альтернатива к blue)

**Психология:** Энергия, действие, мотивация

---

#### 🔴 Alert Red — "Critical Red"
```
Main:    #EF4444  (Alert Red)
Light:   #F87171
Dark:    #DC2626
```
**Использование:**
- Errors & critical warnings
- Negative metrics (падение retention)
- Wrong decisions feedback
- Destructive actions

**Психология:** Внимание, критичность, ошибка

---

### Neutral Colors

#### Grayscale
```
Gray-50:   #F9FAFB  (Backgrounds, subtle sections)
Gray-100:  #F3F4F6  (Light backgrounds)
Gray-200:  #E5E7EB  (Borders, dividers)
Gray-300:  #D1D5DB  (Disabled states)
Gray-400:  #9CA3AF  (Placeholders)
Gray-500:  #6B7280  (Secondary text)
Gray-600:  #4B5563  (Body text)
Gray-700:  #374151  (Headings)
Gray-800:  #1F2937  (Dark headings)
Gray-900:  #111827  (Primary text, high emphasis)
```

#### Pure
```
White:     #FFFFFF  (Cards, main backgrounds)
Black:     #000000  (Deep accents, shadows)
```

---

### Gradient Combinations

#### Progress Gradient (для прогресс-баров, success states)
```css
background: linear-gradient(90deg, #006EFF 0%, #10B981 100%);
```

#### Premium Gradient (для Pro features)
```css
background: linear-gradient(135deg, #8B5CF6 0%, #006EFF 100%);
```

#### Energy Gradient (для CTA buttons)
```css
background: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);
```

---

## 🔤 Typography

### Font Families

#### Primary — **Inter** (UI, body text)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
**Почему Inter:**
- Отличная читаемость в UI
- Современный, профессиональный
- Variable font (гибкость в весах)
- Бесплатный, отличная поддержка кириллицы

**Использование:**
- Весь UI интерфейс
- Описания, body text
- Кнопки, навигация
- Формы, инпуты

---

#### Secondary — **Manrope** (Headings, emphasis)
```css
font-family: 'Manrope', 'Inter', sans-serif;
```
**Почему Manrope:**
- Чуть более геометрический и современный
- Хорошо смотрится в заголовках
- Дружелюбный, но профессиональный
- Отличная поддержка кириллицы

**Использование:**
- H1, H2, H3 заголовки
- Section titles
- Logo text (если используем wordmark)

---

#### Monospace — **JetBrains Mono** (code, data)
```css
font-family: 'JetBrains Mono', 'Courier New', monospace;
```
**Использование:**
- Code snippets
- Technical specs
- Metrics (числа)
- API examples

---

### Type Scale

#### Desktop
```
H1:  48px / 56px  (Head-1, Landing hero)
H2:  36px / 44px  (Head-2, Section titles)
H3:  28px / 36px  (Head-3, Subsections)
H4:  24px / 32px  (Head-4, Cards titles)
H5:  20px / 28px  (Head-5, Small headings)
H6:  16px / 24px  (Head-6, Overlines)

Body-L:  18px / 28px  (Large body, важные параграфы)
Body-M:  16px / 24px  (Main body text)
Body-S:  14px / 20px  (Secondary text, captions)

Caption: 12px / 16px  (Meta info, labels)
Overline: 11px / 16px  (ALL CAPS, категории)
```

#### Mobile
```
H1:  36px / 44px
H2:  28px / 36px
H3:  24px / 32px
H4:  20px / 28px
H5:  18px / 24px
H6:  16px / 24px

Body-L:  16px / 24px
Body-M:  15px / 22px
Body-S:  14px / 20px

Caption: 12px / 16px
```

---

### Font Weights

```
Thin:       100  (не используем в UI)
Light:      300  (subtle text, возможно для больших цифр)
Regular:    400  (основной body text)
Medium:     500  (подчеркивание, навигация)
Semi-Bold:  600  (кнопки, важный текст)
Bold:       700  (заголовки, акценты)
Extra-Bold: 800  (Hero headings, числа метрик)
Black:      900  (очень редко, только для эффектов)
```

**Основные связки:**
- **Headings:** Bold (700) или Extra-Bold (800)
- **Body:** Regular (400)
- **UI Elements:** Medium (500) или Semi-Bold (600)
- **Buttons:** Semi-Bold (600)

---

## 📐 Spacing & Layout

### Spacing Scale (8px base)
```
xs:   4px   (плотные элементы, иконки)
sm:   8px   (элементы в группе)
md:   16px  (между компонентами)
lg:   24px  (между секциями карточки)
xl:   32px  (между крупными блоками)
2xl:  48px  (между секциями страницы)
3xl:  64px  (между крупными секциями landing)
4xl:  96px  (hero sections, major separations)
```

### Grid System
- **Desktop:** 12 columns, 24px gutter, max-width 1280px
- **Tablet:** 8 columns, 16px gutter
- **Mobile:** 4 columns, 16px gutter

### Border Radius
```
sm:   4px   (инпуты, маленькие элементы)
md:   8px   (кнопки, карточки)
lg:   12px  (крупные карточки, модальные окна)
xl:   16px  (hero блоки)
2xl:  24px  (особо выделяющиеся элементы)
full: 9999px (pills, badges, аватары)
```

### Shadows
```css
/* Elevation levels */
shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
shadow-md:  0 4px 6px rgba(0, 0, 0, 0.07);
shadow-lg:  0 10px 15px rgba(0, 0, 0, 0.1);
shadow-xl:  0 20px 25px rgba(0, 0, 0, 0.15);
shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);

/* Colored shadows (для акцентов) */
shadow-blue:   0 8px 16px rgba(0, 110, 255, 0.2);
shadow-purple: 0 8px 16px rgba(139, 92, 246, 0.2);
shadow-green:  0 8px 16px rgba(16, 185, 129, 0.2);
```

---

## 🎭 Tone of Voice

### Характеристики голоса бренда

#### 🎯 Мотивирующий
- Вдохновляем на рост и развитие
- Подчёркиваем достижения пользователя
- Фокус на прогрессе, а не на неудачах

**Примеры:**
- ✅ "Отличный выбор! Ты думаешь как опытный продакт"
- ✅ "Ещё +15% к аналитическому мышлению 📊"
- ❌ "Неправильно, попробуй ещё раз"

---

#### 🤝 Дружелюбный и неформальный
- Обращаемся на "ты"
- Без академического занудства
- Как друг-ментор, а не строгий преподаватель

**Примеры:**
- ✅ "Давай разберём, почему это решение сработало"
- ✅ "Этот кейс — чистая практика, как в реальной жизни"
- ❌ "В данном случае необходимо осуществить анализ..."

---

#### 💪 Практичный и конкретный
- Без воды и общих фраз
- Чёткие действия и takeaways
- Объясняем "почему", а не только "что"

**Примеры:**
- ✅ "Retention упал на 15% → проверь onboarding. Вот чек-лист из 5 шагов"
- ✅ "RICE score: Impact 8, Reach 5K users, Confidence 80%, Effort 3 weeks = 10.67"
- ❌ "Это важный аспект, который следует учитывать"

---

#### 🎮 С элементами геймификации
- Используем игровую лексику (achievement, level up, unlock)
- Визуализируем прогресс
- Создаём азарт и вовлечение

**Примеры:**
- ✅ "🏆 Achievement unlocked: Data Ninja"
- ✅ "Level up! Analytical Thinking: 65% → 77%"
- ✅ "До следующего уровня осталось пройти 2 кейса"

---

#### 🧠 Профессиональный (но не занудный)
- Используем продуктовую терминологию правильно
- Объясняем сложное простым языком
- Поддерживаем авторитет, но без высокомерия

**Примеры:**
- ✅ "North Star метрика — это компас твоего продукта. Выбери одну ключевую"
- ✅ "Cohort analysis покажет, какие пользователи возвращаются, а какие — нет"
- ❌ "Необходимо произвести сегментацию пользовательской базы..."

---

### Языковые паттерны

#### Глаголы действия (используем часто)
Прокачай, реши, выбери, построй, запусти, проанализируй, определи, создай, оптимизируй, измерь

#### Эмоциональные триггеры
- **Прогресс:** "Уже +8% к навыку", "Ты на верном пути"
- **Достижение:** "Отлично!", "Ты справился", "Level up!"
- **Азарт:** "Попробуй другой подход", "А что если...?"
- **Безопасность:** "Здесь можно ошибаться", "Это симуляция — экспериментируй"

#### Избегаем
- ❌ Канцелярит ("осуществить", "произвести", "в данном случае")
- ❌ Пассивные конструкции ("было сделано", "должно быть выполнено")
- ❌ Негатив без конструктива ("Это плохое решение")
- ❌ Снисходительность ("Даже джун должен это знать")

---

## 🎨 UI/UX Principles

### Core Principles

#### 1. **Clarity over Cleverness**
Понятность важнее крутизны. Пользователь всегда должен понимать:
- Где он находится
- Что может сделать
- Каковы последствия действий

**Применение:**
- Чёткие labels на кнопках ("Начать кейс", не "Далее")
- Breadcrumbs в сложных флоу
- Tooltips для непонятных терминов

---

#### 2. **Progressive Disclosure**
Не перегружаем пользователя информацией. Показываем сложность постепенно.

**Применение:**
- Onboarding: сначала простой кейс, потом сложнее
- Dashboard: ключевые метрики на первом экране, детали — по клику
- Настройки: базовые сверху, advanced — в разделе "Дополнительно"

---

#### 3. **Immediate Feedback**
Пользователь всегда видит результат действия.

**Применение:**
- Кнопка нажата → визуальная реакция
- Выбрал решение → показываем последствия
- Прошёл кейс → сразу обновляется прогресс
- Ошибка → понятное сообщение + как исправить

---

#### 4. **Progress Visualization**
Прогресс должен быть виден везде.

**Применение:**
- Progress bar в каждом кейсе
- Skill tree с уровнями
- "Пройдено 3 из 5 кейсов" — конкретные цифры
- Визуализация роста навыков (графики, charts)

---

#### 5. **Celebrate Wins**
Даже маленькие победы заслуживают признания.

**Применение:**
- Конфетти при завершении кейса 🎉
- Badge unlocked animation
- "+12% к Analytical Thinking" — показываем рост
- "Ты в топ 10% по этому навыку" — сравнение

---

#### 6. **Forgiveness & Safety**
Пользователь не боится ошибиться.

**Применение:**
- "Вернуться к предыдущему шагу" всегда доступно
- "Ты уверен?" перед критичными действиями
- Ошибки объясняются конструктивно: "Вот почему это не сработало бы в реальности"
- Можно пересдать кейсы для улучшения результата

---

### UI Patterns

#### Buttons

**Primary Button** (главное действие на странице)
```css
background: #006EFF;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
font-size: 16px;

hover: background: #0052C4;
active: background: #003A8C;
```

**Secondary Button**
```css
background: transparent;
color: #006EFF;
border: 2px solid #006EFF;
padding: 12px 24px;
border-radius: 8px;

hover: background: rgba(0, 110, 255, 0.05);
```

**Destructive Button**
```css
background: #EF4444;
color: #FFFFFF;
/* остальное как у primary */
```

**Ghost Button**
```css
background: transparent;
color: #6B7280;
border: none;

hover: color: #374151;
hover: background: #F3F4F6;
```

---

#### Cards

**Standard Card**
```css
background: #FFFFFF;
border: 1px solid #E5E7EB;
border-radius: 12px;
padding: 24px;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

hover: box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
hover: border-color: #D1D5DB;
```

**Interactive Card** (кликабельная карточка кейса)
```css
background: #FFFFFF;
border: 2px solid #E5E7EB;
border-radius: 12px;
padding: 24px;
cursor: pointer;
transition: all 0.2s;

hover: border-color: #006EFF;
hover: box-shadow: 0 8px 16px rgba(0, 110, 255, 0.1);
hover: transform: translateY(-2px);
```

**Achievement Card**
```css
background: linear-gradient(135deg, #8B5CF6 0%, #006EFF 100%);
color: #FFFFFF;
border-radius: 12px;
padding: 24px;
box-shadow: 0 8px 16px rgba(139, 92, 246, 0.2);
```

---

#### Progress Bars

```css
/* Container */
background: #E5E7EB;
height: 8px;
border-radius: 9999px;
overflow: hidden;

/* Fill */
background: linear-gradient(90deg, #006EFF 0%, #10B981 100%);
height: 100%;
border-radius: 9999px;
transition: width 0.3s ease;
```

**С процентом:**
```html
<div class="progress-container">
  <div class="progress-bar" style="width: 65%"></div>
  <span class="progress-label">65%</span>
</div>
```

---

#### Badges

**Skill Level Badge**
```css
/* Level 1-3: Beginner */
background: #E5E7EB;
color: #6B7280;

/* Level 4-6: Intermediate */
background: #DBEAFE;
color: #1E40AF;

/* Level 7-9: Advanced */
background: #DDD6FE;
color: #6D28D9;

/* Level 10: Expert */
background: linear-gradient(135deg, #F59E0B, #EF4444);
color: #FFFFFF;
```

**Achievement Badge**
```css
background: #8B5CF6;
color: #FFFFFF;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 600;
```

---

#### Forms & Inputs

**Text Input**
```css
background: #FFFFFF;
border: 2px solid #E5E7EB;
border-radius: 8px;
padding: 12px 16px;
font-size: 16px;
color: #111827;

focus: border-color: #006EFF;
focus: box-shadow: 0 0 0 3px rgba(0, 110, 255, 0.1);

error: border-color: #EF4444;
success: border-color: #10B981;
```

**Label**
```css
font-size: 14px;
font-weight: 500;
color: #374151;
margin-bottom: 8px;
```

---

#### Navigation

**Sidebar Navigation**
```css
/* Active Item */
background: rgba(0, 110, 255, 0.1);
color: #006EFF;
border-left: 3px solid #006EFF;

/* Inactive Item */
color: #6B7280;
hover: background: #F3F4F6;
hover: color: #374151;
```

**Breadcrumbs**
```css
color: #6B7280;
font-size: 14px;

/* Separator */
color: #D1D5DB;
margin: 0 8px;

/* Current page */
color: #111827;
font-weight: 500;
```

---

#### Toasts & Notifications

**Success Toast**
```css
background: #10B981;
color: #FFFFFF;
padding: 16px;
border-radius: 8px;
box-shadow: 0 10px 15px rgba(16, 185, 129, 0.2);

/* Icon: Checkmark ✓ */
```

**Error Toast**
```css
background: #EF4444;
color: #FFFFFF;
/* ... */
```

**Info Toast**
```css
background: #006EFF;
color: #FFFFFF;
/* ... */
```

---

#### Modals

```css
/* Overlay */
background: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(4px);

/* Modal */
background: #FFFFFF;
border-radius: 16px;
padding: 32px;
max-width: 600px;
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
```

---

## 🎯 Iconography

### Icon Style
- **Style:** Outline (не filled для основной навигации)
- **Stroke width:** 2px
- **Corner radius:** 2-3px (слегка скруглённые, современные)
- **Size scale:** 16px, 20px, 24px, 32px, 48px

### Icon Library
Рекомендуемые: **Heroicons** (outline & solid) или **Lucide Icons**

### Key Icons

```
🏠 Home              → Dashboard
📊 Analytics         → Module 1: Analytics
📝 Document          → Module 2: Artifacts
👥 Users             → Module 3: Collaboration
🧪 Beaker            → Module 4: Frameworks
🚀 Rocket            → Module 5: Product Lifecycle
💼 Briefcase         → Module 6: Stakeholder Management
🎓 Academic Cap      → Module 7: Advanced Topics
👤 User Circle       → Profile
⚙️  Cog              → Settings
🏆 Trophy            → Achievements
📈 Chart Up          → Progress
🎯 Target            → Goals/North Star
✓  Check             → Completed
→  Arrow Right       → Next Step
←  Arrow Left        → Previous
⟳  Refresh           → Retry
★  Star              → Favorites/Featured
🔔 Bell              → Notifications
```

---

## 🎬 Motion & Animation

### Animation Principles

#### 1. **Purposeful**
Анимации должны помогать пониманию, а не отвлекать.

#### 2. **Quick**
- **Fast:** 100-200ms (hover states, toggles)
- **Medium:** 200-400ms (page transitions, modals)
- **Slow:** 400-600ms (celebrations, achievements)

#### 3. **Easing**
```css
/* Стандартный */
transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);

/* Smooth out */
transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);

/* Smooth in */
transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);

/* Bounce (для celebrations) */
transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animation Use Cases

**Hover states:**
```css
transition: all 0.2s ease;
```

**Button click:**
```css
transform: scale(0.95);
transition: transform 0.1s ease;
```

**Page transition:**
```css
opacity: 0 → 1;
transform: translateY(10px) → translateY(0);
transition: all 0.3s ease;
```

**Progress bar update:**
```css
transition: width 0.5s ease-out;
```

**Achievement unlock:**
```css
/* Scale + fade in */
transform: scale(0) → scale(1.1) → scale(1);
opacity: 0 → 1;
animation: bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Confetti (на завершение кейса):**
- Библиотека: canvas-confetti
- Duration: 2s
- Particle count: 100-150

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 639px) { ... }

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Large Desktop */
@media (min-width: 1280px) { ... }
```

### Mobile-First Approach
Дизайним сначала для mobile, потом адаптируем для desktop.

---

## 🖼️ Imagery & Illustrations

### Illustration Style

**Концепция:** 
- **Abstract & Modern** — не реалистичные персонажи, а концептуальные формы
- **Geometric** — использование геометрических фигур для объяснения концепций
- **Colorful but not overwhelming** — 2-3 цвета из палитры, акценты

**Стиль:**
- Flat design с лёгким градиентом
- Минималистичный, современный
- Иллюстрации дополняют, а не перегружают

**Примеры использования:**
- Empty states ("Ещё не пройдено ни одного кейса")
- Onboarding screens
- Achievement unlock модалки
- 404 / Error pages

**Рекомендуемые источники:**
- Создавать кастомные (в стиле бренда)
- Альтернатива: undraw.co (но кастомизировать под наши цвета)
- Иконки-иллюстрации: Storyset (Freepik)

---

### Photography (если используем)

**Стиль:**
- Яркие, с хорошим освещением
- Реальные люди за работой (не stock-а типа "улыбающийся человек в костюме")
- Фокус на действии, а не на позировании
- Diversity — разные возрасты, пол, этничность

**Использование:**
- Landing page (testimonials с фото пользователей)
- Возможно в B2B разделе (команды)

---

## 🎮 Gamification Visual Elements

### Progress Visualization

**Skill Tree:**
```
┌─────────────────┐
│  Analytics      │ ████████░░ 80%
│  Prioritization │ ██████░░░░ 60%
│  Frameworks     │ ███░░░░░░░ 30%
│  Communication  │ █░░░░░░░░░ 10%
└─────────────────┘
```

**Level Badge:**
- Level 1-3: Bronze badge
- Level 4-6: Silver badge
- Level 7-9: Gold badge
- Level 10: Diamond/Platinum badge

**Achievement Cards:**
- Иконка достижения (64x64px)
- Название
- Описание
- Дата получения
- Статистка ("Получили только 12% пользователей")

---

### Leaderboard

```
┌───────────────────────────────────┐
│  🏆 Top Performers This Week      │
├───────────────────────────────────┤
│  1.  🥇 @alex_pm      1,250 pts   │
│  2.  🥈 @maria_prod   1,180 pts   │
│  3.  🥉 @john_doe     1,050 pts   │
│  ...                              │
│  47. 👤 You            680 pts    │
└───────────────────────────────────┘
```

---

## 📄 Page Templates

### Landing Page Structure

```
┌─────────────────────────────────────────────────┐
│  [Logo]               [Войти] [Начать бесплатно]│ ← Header
├─────────────────────────────────────────────────┤
│                                                 │
│           HERO SECTION                          │
│  "Прокачай продуктовое мышление на практике"    │
│  [Начать бесплатно →]                           │
│                                                 │
├─────────────────────────────────────────────────┤
│  VALUE PROPOSITION (3 колонки)                  │
│  [💪 Практика] [📊 Прогресс] [🎮 Геймификация]  │
├─────────────────────────────────────────────────┤
│  HOW IT WORKS (пошаговая инфографика)           │
├─────────────────────────────────────────────────┤
│  FEATURES PREVIEW (скриншоты платформы)         │
├─────────────────────────────────────────────────┤
│  SOCIAL PROOF (статистика + testimonials)       │
├─────────────────────────────────────────────────┤
│  FINAL CTA                                      │
│  [Начать бесплатно →]                           │
├─────────────────────────────────────────────────┤
│  FOOTER (ссылки, соц сети, контакты)            │
└─────────────────────────────────────────────────┘
```

---

### Dashboard Layout

```
┌────────────────────────────────────────────────┐
│  [Logo]  [Search]            [@user] [⚙️] [🔔] │ ← Top Nav
├──────┬─────────────────────────────────────────┤
│      │                                         │
│  📊  │  WELCOME BACK, [Name]!                  │
│  📝  │                                         │
│  🧪  │  ┌─────────────┐  ┌─────────────┐      │
│  👥  │  │ Next Module │  │ Your Stats  │      │
│  🚀  │  │             │  │             │      │
│  🏆  │  └─────────────┘  └─────────────┘      │
│      │                                         │
│ ⚙️   │  CONTINUE LEARNING                      │
│      │  [Card] [Card] [Card]                   │
│      │                                         │
└──────┴─────────────────────────────────────────┘
   ↑ Sidebar
```

---

### Case Study Page

```
┌────────────────────────────────────────────────┐
│  [← Back] Case: Retention Challenge            │
├────────────────────────────────────────────────┤
│  Progress: [████████░░] 80%                    │
├────────────────────────────────────────────────┤
│                                                │
│  SCENARIO TEXT                                 │
│  "Retention упал на 15%..."                    │
│                                                │
│  📊 DATA PRESENTED                             │
│  [Chart / Table]                               │
│                                                │
├────────────────────────────────────────────────┤
│  YOUR DECISION:                                │
│                                                │
│  ⚪ A) Улучшить onboarding                     │
│  ⚪ B) Запустить реактивацию                   │
│  ⚪ C) Добавить новые фичи                     │
│                                                │
│  [Выбрать →]                                   │
└────────────────────────────────────────────────┘
```

---

## ✅ Brand Checklist

Используй этот чеклист при создании любого нового UI элемента:

### Visual
- [ ] Использованы цвета из палитры
- [ ] Typography соответствует гайду
- [ ] Spacing кратен 8px
- [ ] Border radius соответствует размеру элемента
- [ ] Shadow level соответствует elevation
- [ ] Icons из одной библиотеки в едином стиле

### UX
- [ ] Понятно, что нужно делать
- [ ] Есть feedback на все действия
- [ ] Прогресс виден
- [ ] Можно вернуться назад (где нужно)
- [ ] Ошибки объяснены конструктивно

### Tone
- [ ] Обращение на "ты"
- [ ] Мотивирующе и дружелюбно
- [ ] Без канцелярита
- [ ] Конкретно и практично

### Accessibility
- [ ] Contrast ratio минимум 4.5:1 (для текста)
- [ ] Все интерактивные элементы минимум 44x44px
- [ ] Keyboard navigation работает
- [ ] Screen reader friendly (alt texts, ARIA labels)

---

## 📦 Design Assets (To Create)

### Минимальный набор для MVP:

- [ ] **Logo** (SVG + PNG в разных размерах)
  - Full logo (horizontal)
  - Icon only
  - Favicon (16x16, 32x32, 48x48)
  
- [ ] **Icons set** (для навигации и основных действий)
  - 24x24px SVG outline
  - 8 module icons
  - UI action icons (20+ штук)

- [ ] **Illustrations**
  - Empty states (3-4 штуки)
  - Onboarding screens (3-5 steps)
  - 404 page
  - Success/Achievement visuals

- [ ] **UI Kit** (в Figma)
  - Component library:
    - Buttons (все состояния)
    - Input fields
    - Cards
    - Badges & Pills
    - Navigation elements
    - Modals & Toasts
    - Progress indicators

- [ ] **Mockups** (ключевые экраны)
  - Landing page
  - Dashboard
  - Case study page
  - Profile & Progress page
  - Settings page

---

## 🎯 Next Steps

1. **Утвердить Brand Guidelines** ✅ Этот документ
2. **Создать Figma Workspace** → UI Kit + Design System
3. **Разработать ключевые экраны** → Wireframes → Hi-Fi
4. **Создать logo & визуальные ассеты**
5. **Начать разработку Frontend** с применением бренд-гайдов

---

**Вопросы для согласования:**

1. Цветовая палитра — всё ок или нужны корректировки?
2. Tone of voice — достаточно дружелюбно или слишком неформально?
3. Typography — Inter + Manrope или рассмотреть альтернативы?
4. Gamification level — достаточно или можно добавить больше игровых элементов?

---

Этот брендбук — living document. По мере разработки он будет дополняться конкретными примерами, компонентами и решениями.
