# PM Gym — Структура Auth и Registration Страниц

**Дата:** 20 февраля 2026  
**Версия:** 1.0  
**Тип документа:** Authentication Flow UI/UX Specification

---

## 📖 Содержание

1. [Общая структура Auth Flow](#общая-структура-auth-flow)
2. [Login Page (Вход)](#login-page-вход)
3. [Register Page (Регистрация)](#register-page-регистрация)
4. [Forgot Password](#forgot-password)
5. [Reset Password](#reset-password)
6. [Email Verification](#email-verification)
7. [Onboarding Flow](#onboarding-flow)
8. [Design System](#design-system)
9. [Технические требования](#технические-требования)

---

## Общая структура Auth Flow

### User Journey Map

```
┌─────────────────────────────────────────────────────────┐
│                    LANDING PAGE                         │
└────────────┬──────────────────────┬─────────────────────┘
             │                      │
      [Войти] ↓              [Начать] ↓
             │                      │
┌────────────▼────────┐   ┌────────▼────────────┐
│   LOGIN PAGE        │   │  REGISTER PAGE      │
│  • Email/Password   │   │  • Name, Email, Pwd │
│  • Social Auth      │   │  • Social Auth      │
└────────────┬────────┘   └────────┬────────────┘
             │                      │
             │              ┌───────▼─────────┐
             │              │  ONBOARDING     │
             │              │  (3 steps)      │
             │              └───────┬─────────┘
             │                      │
             └──────────┬───────────┘
                        │
              ┌─────────▼──────────┐
              │    DASHBOARD       │
              │   (Main App)       │
              └────────────────────┘
```

### Auth Flow Scenarios

**Scenario 1: New User Registration**
1. Landing → Click "Начать бесплатно"
2. Register Page → Fill form → Submit
3. (Optional) Email verification
4. Onboarding (3 steps)
5. Dashboard

**Scenario 2: Returning User Login**
1. Landing → Click "Войти"
2. Login Page → Enter credentials → Submit
3. Dashboard

**Scenario 3: Social Auth (Google/GitHub)**
1. Click "Войти через Google"
2. OAuth flow
3. If new user → Onboarding
4. If returning → Dashboard

**Scenario 4: Forgot Password**
1. Login Page → "Забыли пароль?"
2. Forgot Password Page → Enter email
3. Check email → Click reset link
4. Reset Password Page → Enter new password
5. Auto login → Dashboard

---

## Login Page (Вход)

### URL
`/login`

### Структура страницы

```
┌─────────────────────────────────────────────┐
│  [LOGO]                        [← Назад]    │
│                                             │
│                                             │
│          Вход в PM Gym                      │
│          Продолжи прокачку навыков          │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ [G] Войти через Google                │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │ [GitHub] Войти через GitHub           │  │
│  └───────────────────────────────────────┘  │
│                                             │
│          ───── или ─────                    │
│                                             │
│  Email                                      │
│  ┌───────────────────────────────────────┐  │
│  │ your@email.com                        │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Пароль                                     │
│  ┌───────────────────────────────────────┐  │
│  │ ••••••••••                      [👁]  │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  [✓] Запомнить меня   [Забыли пароль?]     │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │          Войти                        │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Нет аккаунта? [Зарегистрироваться]        │
│                                             │
└─────────────────────────────────────────────┘
```

### Компоненты

#### Header
- **Логотип PM Gym** (слева, кликабельный → Landing)
- **Ссылка "← Назад на главную"** (справа)

#### Заголовки
- **H1:** "Вход в PM Gym"
  - Font: 32px, bold
  - Color: primary text
- **Subtitle:** "Продолжи прокачку навыков"
  - Font: 16px, regular
  - Color: secondary text (70% opacity)

#### Social Auth Buttons (Priority)

**Google Button:**
```
┌─────────────────────────────────────┐
│ [G icon] Войти через Google         │
└─────────────────────────────────────┘
```
- Full width
- Height: 48px
- White background, border
- Google logo слева
- Text: centered
- Hover: slight shadow increase

**GitHub Button:**
```
┌─────────────────────────────────────┐
│ [GitHub icon] Войти через GitHub    │
└─────────────────────────────────────┘
```
- Same styling as Google
- GitHub logo (dark/white dependent on theme)

**Why social auth first?**
- Faster conversion (1-click login)
- Lower friction
- Better UX for returning users

#### Divider
```
────── или ──────
```
- Horizontal line with centered text
- Subtle color (border-color)

#### Email/Password Form

**Email Field:**
- **Label:** "Email" (14px, medium)
- **Input:**
  - Type: email
  - Placeholder: "your@email.com"
  - Autocomplete: email
  - Height: 48px
  - Border: 1px solid neutral
  - Border radius: 8px
  - Font size: 16px (prevent iOS zoom)
- **Validation:**
  - On blur: check email format
  - Error state: red border + error message below
  - Error message: "Введите корректный email"

**Password Field:**
- **Label:** "Пароль"
- **Input:**
  - Type: password (toggle to text)
  - Placeholder: "••••••••••"
  - Autocomplete: current-password
  - Height: 48px
- **Toggle visibility icon:**
  - Icon: 👁 (eye) / 👁‍🗨 (eye slash)
  - Position: absolute right
  - Click: toggle password visibility
- **Validation:**
  - Min length: 8 characters
  - Error: "Пароль должен быть минимум 8 символов"

#### Additional Options

**Remember Me Checkbox:**
```
[✓] Запомнить меня
```
- Checkbox (custom styled)
- Keep session active for 30 days
- Default: unchecked

**Forgot Password Link:**
```
Забыли пароль?
```
- Link styling (underline on hover)
- Color: primary
- → Navigate to `/forgot-password`

#### Submit Button

```
┌─────────────────────────────────────┐
│          Войти                      │
└─────────────────────────────────────┘
```
- **Full width**
- **Height:** 48px
- **Background:** Primary color gradient
- **Text:** White, 16px, medium
- **Border radius:** 8px
- **States:**
  - Default: primary color
  - Hover: slightly darker
  - Active: pressed state
  - Loading: spinner + "Вход..."
  - Disabled: gray, opacity 50%

#### Registration Link

```
Нет аккаунта? [Зарегистрироваться]
```
- Text: 14px
- "Зарегистрироваться" — link (primary color)
- → Navigate to `/register`

### States & Validation

#### Loading State
```
┌─────────────────────────────────────┐
│    [spinner] Вход...                │
└─────────────────────────────────────┘
```
- Button disabled
- Spinner animation
- Form inputs disabled

#### Error States

**Invalid credentials:**
```
┌──────────────────────────────────────┐
│ ⚠️ Неверный email или пароль         │
└──────────────────────────────────────┘
```
- Red background (light)
- Above form or below submit button
- Icon + message
- Close button ×

**Account not found:**
```
⚠️ Аккаунт не найден. Хотите зарегистрироваться?
```

**Too many attempts:**
```
⚠️ Слишком много попыток. Попробуйте через 15 минут.
```

**Network error:**
```
⚠️ Ошибка соединения. Проверьте интернет.
```

#### Success State
- Brief success message (optional)
- Immediate redirect to Dashboard
- Or to Onboarding (if incomplete)

### Keyboard Shortcuts
- **Tab:** Navigate between fields
- **Enter:** Submit form (if valid)
- **Escape:** Clear error messages

### Analytics Events

```javascript
// Page view
gtag('event', 'page_view', {
  page_title: 'Login Page',
  page_path: '/login'
});

// Login attempt
gtag('event', 'login_attempt', {
  method: 'email' | 'google' | 'github'
});

// Login success
gtag('event', 'login', {
  method: 'email' | 'google' | 'github'
});

// Login error
gtag('event', 'login_error', {
  error_type: 'invalid_credentials' | 'not_found' | 'network'
});

// Forgot password click
gtag('event', 'forgot_password_click');

// Register link click
gtag('event', 'register_link_click', {
  location: 'login_page'
});
```

---

## Register Page (Регистрация)

### URL
`/register`

### Структура страницы

```
┌─────────────────────────────────────────────┐
│  [LOGO]                        [← Назад]    │
│                                             │
│                                             │
│       Начни прокачку за 2 минуты            │
│       Бесплатно, без кредитной карты        │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │ [G] Регистрация через Google          │  │
│  └───────────────────────────────────────┘  │
│  ┌───────────────────────────────────────┐  │
│  │ [GitHub] Регистрация через GitHub     │  │
│  └───────────────────────────────────────┘  │
│                                             │
│          ───── или ─────                    │
│                                             │
│  Имя                                        │
│  ┌───────────────────────────────────────┐  │
│  │ Как тебя зовут?                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Email                                      │
│  ┌───────────────────────────────────────┐  │
│  │ your@email.com                        │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Пароль                                     │
│  ┌───────────────────────────────────────┐  │
│  │ ••••••••••                      [👁]  │  │
│  └───────────────────────────────────────┘  │
│  [████████░░░░] Средний                     │
│  💡 Добавь цифру для надёжности             │
│                                             │
│  [✓] Я согласен с [Terms] и [Privacy]      │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │    Создать аккаунт бесплатно          │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Уже есть аккаунт? [Войти]                 │
│                                             │
└─────────────────────────────────────────────┘
```

### Компоненты

#### Header & Titles
- **Логотип + Back link** (same as Login)
- **H1:** "Начни прокачку за 2 минуты"
- **Subtitle:** "Бесплатно, без кредитной карты"
  - Reassurance message
  - Removes friction

#### Social Auth
- Same design as Login page
- Text: "Регистрация через Google/GitHub"

#### Registration Form

**Name Field:**
```
Имя
┌─────────────────────────────────────┐
│ Как тебя зовут?                     │
└─────────────────────────────────────┘
```
- **Label:** "Имя"
- **Placeholder:** "Как тебя зовут?"
- **Validation:**
  - Required
  - Min: 2 characters
  - Max: 50 characters
  - Letters only (optional: allow spaces)
  - Error: "Введите имя (минимум 2 символа)"

**Email Field:**
```
Email
┌─────────────────────────────────────┐
│ your@email.com                      │
└─────────────────────────────────────┘
```
- **Validation:**
  - Email format
  - Async check: email already registered?
    - Error: "Этот email уже зарегистрирован. [Войти?]"
  - Success: green checkmark icon

**Password Field:**
```
Пароль
┌─────────────────────────────────────┐
│ ••••••••••                    [👁]  │
└─────────────────────────────────────┘
[████████░░░░] Средний
💡 Добавь цифру для надёжности
```
- **Password strength indicator:**
  - Progress bar with colors:
    - Red: Слабый (< 8 chars, no variety)
    - Orange: Средний (8+ chars, some variety)
    - Green: Сильный (8+ chars, mixed case, numbers, symbols)
  - Real-time update on type
  
- **Hints/Tips:**
  - "Минимум 8 символов"
  - "Добавь заглавную букву"
  - "Добавь цифру для надёжности"
  - "Отлично! Надёжный пароль"

- **Requirements:**
  - Min: 8 characters
  - Recommended: uppercase, lowercase, number, special char
  - Check against common passwords (optional)

**Password Strength Levels:**

```javascript
// Weak
"test"
[██░░░░░░░░] Слабый
⚠️ Минимум 8 символов

// Medium
"password123"
[█████░░░░░] Средний
💡 Добавь заглавную букву

// Strong
"Password123!"
[██████████] Сильный
✅ Надёжный пароль
```

#### Terms Agreement

```
[✓] Я согласен с [Terms of Service] и [Privacy Policy]
```
- **Checkbox** (required)
- **Links:**
  - "Terms of Service" → `/terms` (new tab)
  - "Privacy Policy" → `/privacy` (new tab)
- **Validation:**
  - Must be checked to submit
  - Error: "Необходимо согласиться с условиями"

#### Submit Button

```
┌─────────────────────────────────────┐
│    Создать аккаунт бесплатно        │
└─────────────────────────────────────┘
```
- Full width, primary button
- Text emphasizes "бесплатно"
- Loading state: "Создаём аккаунт..."

#### Login Link

```
Уже есть аккаунт? [Войти]
```
- Link → `/login`

### Validation Flow

**Real-time validation:**
1. **Name:** on blur
2. **Email:** on blur + async check
3. **Password:** on type (for strength indicator)
4. **Terms:** on submit (if not checked)

**Submit validation:**
1. Check all fields filled
2. Check all validations pass
3. Check terms agreed
4. If any fail: show errors + scroll to first error
5. If all pass: submit

### Success Flow

**After successful registration:**

1. **Show success message** (brief)
   ```
   ✅ Аккаунт создан!
   ```

2. **Send welcome email** (background)
   - Subject: "Добро пожаловать в PM Gym! 🚀"
   - Content: Welcome message + next steps

3. **Redirect to:**
   - **Option A:** Onboarding Flow (recommended)
   - **Option B:** Dashboard with onboarding tooltip

4. **Event tracking:**
   ```javascript
   gtag('event', 'sign_up', {
     method: 'email'
   });
   ```

### Error States

**Email already exists:**
```
⚠️ Этот email уже зарегистрирован.
   [Войти в аккаунт] или [Восстановить пароль]
```

**Network error:**
```
⚠️ Ошибка соединения. Проверьте интернет и попробуйте снова.
```

**Server error:**
```
⚠️ Что-то пошло не так. Попробуйте позже или свяжитесь с поддержкой.
```

### Analytics Events

```javascript
// Page view
gtag('event', 'page_view', {
  page_title: 'Register Page',
  page_path: '/register'
});

// Registration attempt
gtag('event', 'sign_up_attempt', {
  method: 'email' | 'google' | 'github'
});

// Registration success
gtag('event', 'sign_up', {
  method: 'email' | 'google' | 'github'
});

// Registration error
gtag('event', 'sign_up_error', {
  error_type: 'email_exists' | 'validation' | 'network'
});

// Terms click
gtag('event', 'terms_click', {
  link: 'terms' | 'privacy'
});

// Login link click
gtag('event', 'login_link_click', {
  location: 'register_page'
});
```

---

## Forgot Password

### URL
`/forgot-password`

### Структура

```
┌─────────────────────────────────────────────┐
│  [LOGO]                        [← Назад]    │
│                                             │
│                                             │
│          Восстановление пароля              │
│          Мы отправим ссылку на email        │
│                                             │
│  Email                                      │
│  ┌───────────────────────────────────────┐  │
│  │ your@email.com                        │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │    Отправить ссылку                   │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Вспомнили пароль? [Войти]                 │
│                                             │
└─────────────────────────────────────────────┘
```

### Flow

1. **User enters email** → Click "Отправить ссылку"
2. **System sends email** (if account exists)
3. **Show success message:**
   ```
   ✅ Проверьте email!
   
   Мы отправили ссылку для восстановления пароля на:
   your@email.com
   
   Не пришло письмо? 
   [Отправить снова] | [Проверить спам]
   ```
4. **User clicks link in email** → Navigate to Reset Password page

### Security Considerations

**Don't reveal if email exists:**
- Always show success message (even if email not found)
- Prevents email enumeration attack
- Generic message: "Если аккаунт существует, вы получите письмо"

**Rate limiting:**
- Max 3 requests per email per hour
- Max 10 requests per IP per hour

**Token security:**
- Cryptographically secure random token
- Expires in 1 hour (or 24 hours)
- One-time use only
- Invalidate after successful reset

### Email Template

**Subject:** Восстановление пароля PM Gym

**Body:**
```
Привет!

Вы запросили восстановление пароля для аккаунта PM Gym.

Нажмите на кнопку ниже, чтобы создать новый пароль:

[Восстановить пароль]

Ссылка действительна 1 час.

Если это были не вы, проигнорируйте это письмо.

---
PM Gym Team
```

### Analytics

```javascript
gtag('event', 'password_reset_request', {
  email_provided: true
});
```

---

## Reset Password

### URL
`/reset-password?token=xxx`

### Структура

```
┌─────────────────────────────────────────────┐
│  [LOGO]                                     │
│                                             │
│                                             │
│          Создайте новый пароль              │
│                                             │
│  Новый пароль                               │
│  ┌───────────────────────────────────────┐  │
│  │ ••••••••••                      [👁]  │  │
│  └───────────────────────────────────────┘  │
│  [████████░░] Средний                       │
│                                             │
│  Подтвердите пароль                         │
│  ┌───────────────────────────────────────┐  │
│  │ ••••••••••                      [👁]  │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │    Сохранить пароль                   │  │
│  └───────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

### Validation

**Password field:**
- Same requirements as registration
- Strength indicator
- Min 8 characters

**Confirm password field:**
- Must match new password
- Real-time validation on blur
- Error: "Пароли не совпадают"

### Success Flow

1. **Password saved successfully**
2. **Show success message:**
   ```
   ✅ Пароль изменён!
   
   Сейчас вы будете перенаправлены на главную страницу...
   ```
3. **Auto-login** (create session)
4. **Redirect to Dashboard** (3 seconds)

### Error States

**Token expired:**
```
⚠️ Ссылка устарела
Запросите новую ссылку для восстановления пароля.
[Запросить снова]
```

**Token invalid:**
```
⚠️ Неверная ссылка
Проверьте ссылку из письма или запросите новую.
[Запросить восстановление]
```

**Token already used:**
```
ℹ️ Эта ссылка уже использована
Если вы не меняли пароль, запросите новую ссылку.
[Запросить снова]
```

---

## Email Verification

### Purpose
Optional for MVP, but recommended for production

### Flow

1. **After registration** → Send verification email
2. **Show reminder in app:**
   ```
   ⚠️ Подтвердите email
   Мы отправили письмо на your@email.com
   [Отправить снова] | [Изменить email]
   ```
3. **User clicks link** in email
4. **Redirect to verification page**

### Verification Page

#### URL
`/verify-email?token=xxx`

#### Success State
```
┌─────────────────────────────────────────────┐
│                                             │
│  ✅                                         │
│  Email подтверждён!                         │
│                                             │
│  Добро пожаловать в PM Gym                  │
│  Теперь у тебя полный доступ к платформе    │
│                                             │
│  [Перейти к обучению →]                     │
│                                             │
└─────────────────────────────────────────────┘
```

#### Error State (Token expired/invalid)
```
┌─────────────────────────────────────────────┐
│                                             │
│  ⚠️                                         │
│  Ссылка устарела                            │
│                                             │
│  [Отправить новую ссылку →]                 │
│                                             │
└─────────────────────────────────────────────┘
```

### In-App Reminder

**Banner в Dashboard:**
```
┌────────────────────────────────────────────────┐
│ ⚠️ Подтвердите email для полного доступа      │
│ Письмо отправлено на: your@email.com          │
│ [Отправить снова] [Изменить email] [×]        │
└────────────────────────────────────────────────┘
```

**Frequency:**
- Show on every dashboard visit
- Can be dismissed (but shows again on next visit)
- Stop showing after verification

### Email Template

**Subject:** Подтвердите email для PM Gym

**Body:**
```
Привет, {Name}!

Спасибо за регистрацию в PM Gym! 🎉

Подтверди свой email, чтобы получить полный доступ:

[Подтвердить email]

Ссылка действительна 24 часа.

Если это были не вы, проигнорируйте это письмо.

---
Команда PM Gym
```

---

## Onboarding Flow

### Purpose
Персонализировать опыт пользователя сразу после регистрации

### URL
`/onboarding`

### Structure: Multi-step Form (3 steps)

```
Step 1: Роль и опыт
       ↓
Step 2: Цели обучения
       ↓
Step 3: Интересы/Направления
       ↓
Dashboard (персонализированный)
```

---

### Step 1: Расскажи о себе

```
┌─────────────────────────────────────────────┐
│  Шаг 1 из 3                     [Skip →]    │
│  ● ○ ○                                      │
│                                             │
│  Расскажи о себе                            │
│  Это поможет персонализировать обучение     │
│                                             │
│  Твоя текущая роль:                         │
│                                             │
│  ○ Студент / Начинающий                     │
│  ○ Junior PM (< 1 года опыта)               │
│  ○ Middle PM (1-3 года)                     │
│  ○ Senior PM (3+ лет)                       │
│  ○ Другая роль, хочу перейти в продакты     │
│                                             │
│           [Продолжить →]                    │
└─────────────────────────────────────────────┘
```

**Цель:** Понять уровень пользователя

**Data collection:**
- `user_role`: string
- `experience_level`: 'beginner' | 'junior' | 'middle' | 'senior' | 'switching'

**Personalization impact:**
- Рекомендация модулей по уровню
- Complexity filtering
- Content difficulty adjustment

---

### Step 2: Что хочешь прокачать?

```
┌─────────────────────────────────────────────┐
│  Шаг 2 из 3                     [Skip →]    │
│  ● ● ○                                      │
│                                             │
│  Что хочешь прокачать?                      │
│  Выбери 2-3 направления                     │
│                                             │
│  ☑ Аналитика и метрики                      │
│  ☐ Работа с артефактами                     │
│  ☑ Приоритизация                            │
│  ☐ Проведение экспериментов                 │
│  ☑ Product strategy                         │
│  ☐ User research                            │
│  ☐ Работа со стейкхолдерами                 │
│  ☐ Карьерный рост                           │
│                                             │
│           [Продолжить →]                    │
└─────────────────────────────────────────────┘
```

**Цель:** Выявить интересы для персонализации

**Data collection:**
- `interests`: array of strings (multi-select)
- Limit: 2-3 selections recommended (not enforced)

**Personalization impact:**
- Dashboard recommendations
- Module priority
- Email content

**8 Options:**
1. 📊 Аналитика и метрики
2. 📝 Работа с артефактами
3. 🎯 Приоритизация
4. 🧪 Проведение экспериментов
5. 🚀 Product strategy
6. 👥 User research
7. 💼 Работа со стейкхолдерами
8. 🏆 Карьерный рост

---

### Step 3: Какая у тебя цель?

```
┌─────────────────────────────────────────────┐
│  Шаг 3 из 3                     [Skip →]    │
│  ● ● ●                                      │
│                                             │
│  Какая у тебя цель?                         │
│                                             │
│  ○ Подготовиться к интервью PM              │
│  ○ Прокачать навыки на текущей работе       │
│  ○ Изучить PM с нуля                        │
│  ○ Получить оффер в топовую компанию        │
│  ○ Просто интересно, хочу попробовать       │
│                                             │
│           [Начать обучение →]               │
└─────────────────────────────────────────────┘
```

**Цель:** Понять мотивацию для tailored experience

**Data collection:**
- `goal`: string (single select)

**Personalization impact:**
- Onboarding email sequence
- Content recommendations
- Success metrics tracking

**5 Goals:**
1. 🎯 Подготовиться к интервью PM
2. 📈 Прокачать навыки на текущей работе
3. 📚 Изучить PM с нуля
4. 🏆 Получить оффер в топовую компанию
5. 🤔 Просто интересно, хочу попробовать

---

### After Onboarding Complete

**Redirect to Dashboard with:**
1. **Welcome modal:**
   ```
   Отличный старт! 🚀
   
   Мы подготовили для тебя персональные рекомендации
   на основе твоих целей.
   
   [Начать с первого кейса →]
   ```

2. **Personalized recommendations:**
   - Top 3 модуля based on interests
   - Suggested first scenario
   - Quick start guide

3. **Email follow-up:**
   - Subject: "Твой путь в PM Gym готов! 🎯"
   - Personalized learning path
   - Tips for getting started

### Skip Option

**Every step has "Skip" button:**
- Allows users to skip onboarding
- Can complete later from Settings
- Less friction for impatient users

**If skipped:**
- Show generic dashboard
- No personalization (yet)
- Prompt to complete profile later

### Progress Indicators

```
Step 1: ● ○ ○
Step 2: ● ● ○
Step 3: ● ● ●
```

- Visual progress
- Motivates completion
- Shows "almost done"

### Analytics

```javascript
// Onboarding started
gtag('event', 'onboarding_start');

// Step completed
gtag('event', 'onboarding_step_complete', {
  step: 1 | 2 | 3
});

// Onboarding completed
gtag('event', 'onboarding_complete', {
  role: user_role,
  interests: interests_array,
  goal: user_goal
});

// Onboarding skipped
gtag('event', 'onboarding_skip', {
  step: 1 | 2 | 3 | 'all'
});
```

---

## Design System

### Layout

**Centering:**
- Max-width: 440px (optimal for forms)
- Centered horizontally
- Vertical centering (optional, depends on content length)

**Spacing:**
- Padding (container): 24-32px
- Margin below sections: 24px
- Gap between inputs: 20px
- Gap between input and button: 32px

**Responsive:**
- Desktop: centered with max-width
- Mobile: full width with 16px padding

---

### Typography

**Headings:**
- **H1:** 32px, bold, line-height: 1.2
- **H2:** 24px, semibold
- **Subtitle:** 16px, regular, 70% opacity

**Body text:**
- Default: 16px (prevents iOS zoom)
- Small: 14px
- Tiny: 12px

**Links:**
- Color: primary
- Underline on hover
- Font-weight: medium

---

### Colors

**Light Mode:**
- Background: #FFFFFF
- Container: #F9FAFB (subtle gray)
- Text primary: #111827
- Text secondary: #6B7280
- Border: #E5E7EB
- Primary: #6366F1 (indigo)
- Error: #EF4444
- Success: #10B981

**Dark Mode:**
- Background: #111827
- Container: #1F2937
- Text primary: #F9FAFB
- Text secondary: #9CA3AF
- Border: #374151
- Primary: #818CF8 (lighter indigo)
- Error: #F87171
- Success: #34D399

---

### Buttons

**Primary Button:**
```css
background: linear-gradient(135deg, #6366F1, #818CF8);
color: white;
height: 48px;
border-radius: 8px;
font-size: 16px;
font-weight: 500;
box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
transition: all 0.3s ease;

&:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(99, 102, 241, 0.3);
}

&:active {
  transform: translateY(0);
}

&:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Secondary Button (Social Auth):**
```css
background: white;
border: 1px solid #E5E7EB;
color: #111827;
height: 48px;
border-radius: 8px;

&:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}
```

---

### Input Fields

**Default State:**
```css
height: 48px;
padding: 12px 16px;
border: 1px solid #E5E7EB;
border-radius: 8px;
font-size: 16px;
background: white;
transition: all 0.2s ease;

&:focus {
  outline: none;
  border-color: #6366F1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

**Error State:**
```css
border-color: #EF4444;
background: #FEF2F2;

&:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

---

### Form Elements

**Labels:**
```css
font-size: 14px;
font-weight: 500;
color: #111827;
margin-bottom: 6px;
display: block;
```

**Error Messages:**
```css
font-size: 14px;
color: #EF4444;
margin-top: 6px;
display: flex;
align-items: center;
gap: 4px;

&::before {
  content: "⚠️";
}
```

**Hints:**
```css
font-size: 14px;
color: #6B7280;
margin-top: 6px;
```

---

### Animations

**Page Transitions:**
- Fade in: 300ms ease
- Slide up: 400ms cubic-bezier

**Form Interactions:**
- Input focus: 200ms
- Button hover: 300ms
- Error shake: 400ms

**Loading States:**
- Spinner rotation: 800ms linear infinite
- Pulse: 1.5s ease-in-out infinite

---

### Icons

**Size:**
- Small: 16px
- Medium: 20px
- Large: 24px

**Sources:**
- Heroicons (recommended)
- Lucide Icons
- Font Awesome

---

## Технические требования

### Security

**Password Security:**
- Hash algorithm: bcrypt (cost factor: 12)
- Never store plaintext
- Never log passwords
- Min length: 8 characters
- Check against common passwords (optional)

**Session Management:**
- JWT tokens for authentication
- Access token: 15 minutes expiration
- Refresh token: 7 days (30 days with "Remember me")
- HttpOnly cookies for tokens
- CSRF protection

**OAuth Security:**
- State parameter for CSRF protection
- Verify OAuth tokens server-side
- Don't trust client-side data

**Rate Limiting:**
- Login: 5 attempts per 15 minutes per IP
- Registration: 3 attempts per hour per IP
- Password reset: 3 requests per hour per email
- Forgot password: 3 requests per hour per IP

**SQL Injection Prevention:**
- Parameterized queries only
- ORM usage (Prisma, TypeORM, etc.)
- Input sanitization

**XSS Prevention:**
- Sanitize all user inputs
- Content Security Policy headers
- Escape output

---

### Validation

**Client-side (JavaScript):**
- Immediate feedback
- Real-time validation on type/blur
- Disable submit until valid
- Show specific error messages

**Server-side (Backend):**
- Never trust client
- Validate all inputs again
- Return specific error codes
- Log validation failures

**Validation Library:**
- Zod (TypeScript)
- Joi
- Yup
- Validator.js

---

### Email Service

**Transactional Email Provider:**
- SendGrid (recommended)
- Postmark
- AWS SES
- Mailgun

**Email Templates:**
1. Welcome email
2. Email verification
3. Password reset
4. Password changed confirmation
5. Login from new device (optional)

**Template Engine:**
- Handlebars
- Pug
- React Email

**Best Practices:**
- Plain text + HTML versions
- Responsive design
- Clear CTAs
- Unsubscribe link (for marketing)
- SPF, DKIM, DMARC setup

---

### Analytics

**Events to Track:**

**Authentication:**
```javascript
// Registration flow
'registration_page_view'
'registration_attempt' // method: email/google/github
'registration_success'
'registration_error' // error_type

// Login flow
'login_page_view'
'login_attempt'
'login_success'
'login_error'

// Password reset
'forgot_password_click'
'password_reset_request'
'password_reset_success'

// Onboarding
'onboarding_start'
'onboarding_step_complete' // step: 1/2/3
'onboarding_complete'
'onboarding_skip'

// Email verification
'email_verification_sent'
'email_verification_success'
```

**Funnel Analysis:**
```
Landing → Register → Onboarding → Dashboard

Track drop-off at each step:
- Landing view: 1000
- Register page: 300 (30%)
- Registration complete: 150 (50%)
- Onboarding complete: 120 (80%)
- Active on Dashboard: 100 (83%)
```

**Conversion Goals:**
- Landing → Registration: > 20%
- Registration started → Complete: > 60%
- Onboarding started → Complete: > 70%

---

### Performance

**Targets:**
- Page load: < 1.5s
- Time to Interactive: < 2s
- Form submission: < 500ms response

**Optimization:**
- Minimize JavaScript bundle
- Lazy load non-critical components
- Optimize images
- CDN for static assets
- Preconnect to OAuth providers

---

### Accessibility

**WCAG 2.1 AA:**
- Keyboard navigation (Tab, Enter, Esc)
- Focus indicators (visible outline)
- Labels for all inputs
- Error announcements for screen readers
- Color contrast > 4.5:1
- Skip link for keyboard users

**ARIA Attributes:**
```html
<input 
  type="email"
  id="email"
  aria-label="Email address"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  Invalid email format
</span>
```

---

### Testing

**Unit Tests:**
- Validation functions
- Password hashing
- Token generation

**Integration Tests:**
- Registration flow
- Login flow
- Password reset flow
- OAuth flow

**E2E Tests (Playwright/Cypress):**
```javascript
test('User can register with email', async () => {
  await page.goto('/register');
  await page.fill('[name="name"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'SecurePass123!');
  await page.check('[name="terms"]');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/onboarding');
});
```

**Visual Regression Tests:**
- Percy.io
- Chromatic
- BackstopJS

---

### Browser Support

**Target Browsers:**
- Chrome (latest 2)
- Firefox (latest 2)
- Safari (latest 2)
- Edge (latest 2)

**Mobile:**
- iOS Safari 14+
- Chrome Android

**Polyfills:**
- Not needed for modern browsers
- Use feature detection

---

## Следующие шаги

После утверждения Auth structure:

1. ✅ **Figma mockups** — визуальные дизайны всех страниц
2. ✅ **Copy finalization** — финальные тексты
3. ✅ **Email templates** — дизайн писем
4. ✅ **Backend API:**
   - POST `/api/auth/register`
   - POST `/api/auth/login`
   - POST `/api/auth/forgot-password`
   - POST `/api/auth/reset-password`
   - GET `/api/auth/verify-email`
   - OAuth endpoints
5. ✅ **Frontend implementation:**
   - React/Next.js страницы
   - Form validation
   - Error handling
   - Loading states
6. ✅ **Testing:**
   - Unit tests
   - E2E tests
   - Security audit
7. ✅ **Analytics setup** — tracking code
8. ✅ **Staging deploy** — internal testing
9. ✅ **Production launch!** 🚀

---

**Готов к фидбеку и следующим шагам!** 🎯
