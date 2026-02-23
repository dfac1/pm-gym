# PM Gym - Authentication Flow (COMPLETED ✅)

## Реализованные страницы

### ✅ Компоненты авторизации
- **Input** - универсальное поле ввода с валидацией
- **Button** - кнопки с состояниями загрузки
- **AuthLayout** - общий layout для auth страниц
- **SocialAuthButtons** - кнопки Google/GitHub OAuth
- **PasswordStrength** - индикатор надёжности пароля

### ✅ Frontend Страницы

1. **Login** (`/login`)
   - Email/Password форма
   - Social auth (Google, GitHub)
   - "Запомнить меня"
   - Ссылка на восстановление пароля
   - Валидация в реальном времени
   - **✅ Интеграция с API**

2. **Register** (`/register`)
   - Имя, Email, Пароль
   - Social auth
   - Индикатор силы пароля
   - Согласие с Terms & Privacy
   - Проверка на существующий email
   - **✅ Интеграция с API**

3. **Forgot Password** (`/forgot-password`)
   - Ввод email
   - Отправка ссылки восстановления
   - Состояние успеха с возможностью повторной отправки
   - **✅ Интеграция с API**

4. **Reset Password** (`/reset-password?token=xxx`)
   - Новый пароль с подтверждением
   - Индикатор силы пароля
   - Валидация токена
   - Обработка ошибок (expired, invalid, used)
   - **✅ Интеграция с API**

5. **Onboarding** (`/onboarding`)
   - Шаг 1: Выбор роли (студент, junior, middle, senior, switching)
   - Шаг 2: Интересы (8 опций, множественный выбор)
   - Шаг 3: Цель обучения
   - Прогресс-бар
   - Возможность пропустить
   - **✅ Интеграция с API**

6. **Dashboard** (`/dashboard`)
   - Welcome секция
   - Персонализированные рекомендации
   - Прогресс обучения
   - Header с logout
   - **✅ Защита роута (требуется авторизация)**

### ✅ Backend API

#### Database (Prisma + SQLite)
- **User** - пользователи с паролями и профилями
- **Account** - OAuth аккаунты (Google, GitHub)
- **Session** - сессии пользователей
- **PasswordResetToken** - токены восстановления пароля
- **VerificationToken** - токены верификации email

#### API Endpoints

1. **POST `/api/auth/register`**
   - Регистрация с email/password
   - Проверка существования email
   - Хеширование пароля (bcrypt)
   - Генерация JWT токена
   - Отправка welcome email

2. **POST `/api/auth/login`**
   - Вход с email/password
   - Верификация пароля
   - Генерация JWT токена
   - Remember me (30 дней vs 7 дней)
   - Обновление lastLoginAt

3. **POST `/api/auth/forgot-password`**
   - Генерация reset токена
   - Сохранение в БД (expires in 1 hour)
   - Отправка email с ссылкой
   - Защита от email enumeration

4. **POST `/api/auth/reset-password`**
   - Валидация токена (exists, not expired, not used)
   - Хеширование нового пароля
   - Обновление пользователя
   - Маркировка токена как used
   - Auto-login (возврат JWT)

5. **POST `/api/user/onboarding`**
   - Сохранение данных онбординга
   - JWT авторизация (Bearer token)
   - Обновление профиля пользователя

#### Utilities

- **`lib/prisma.ts`** - Prisma Client singleton
- **`lib/auth.ts`** - Password hashing, JWT, validation
- **`lib/email.ts`** - Email sending + templates
- **`lib/api.ts`** - Frontend API client

### ✅ Email Templates

1. **Welcome Email** - после регистрации
2. **Password Reset Email** - восстановление пароля
3. **Email Verification Email** - подтверждение email (опционально)

Все шаблоны с HTML styling, responsive, красивые!

## Запуск проекта

### 1. Установка зависимостей

```bash
cd pm-gym
npm install
```

### 2. База данных

База данных SQLite уже создана и мигрирована:
- Файл: `prisma/dev.db`
- Миграции: `prisma/migrations/`

### 3. Конфигурация .env

Файл `.env` уже настроен с базовыми значениями:
- `DATABASE_URL` - SQLite database
- `NEXTAUTH_SECRET` - поменяйте для production!
- `JWT_SECRET` - поменяйте для production!
- Email settings (опционально - для отправки писем)

### 4. Запуск

```bash
npm run dev
```

Приложение: **http://localhost:3001** (или 3000)

## Тестирование Auth Flow

### ✅ Сценарий 1: Новая регистрация (полный flow)

1. Главная → Нажать "Начать" в Header
2. На `/register` заполнить:
   - **Имя:** Иван Тест
   - **Email:** ivan@test.com
   - **Пароль:** Password123!
   - ✓ Согласие с условиями
3. Нажать "Создать аккаунт бесплатно"
4. → API создаст пользователя в БД
5. → Автоматически залогинится (JWT в localStorage)
6. → Перенаправление на `/onboarding`
7. Пройти 3 шага:
   - Выбрать роль
   - Выбрать интересы
   - Выбрать цель
8. → API сохранит данные онбординга
9. → Перенаправление на `/dashboard`
10. ✅ Dashboard показывает имя пользователя!

### ✅ Сценарий 2: Вход существующего пользователя

1. Открыть `/login`
2. Ввести:
   - **Email:** ivan@test.com
   - **Пароль:** Password123!
3. Опционально: ✓ Запомнить меня
4. Нажать "Войти"
5. → API проверит пароль
6. → Вернёт JWT токен
7. → Перенаправление на `/dashboard`
8. ✅ Видим профиль с данными из БД!

### ✅ Сценарий 3: Восстановление пароля

1. На `/login` нажать "Забыли пароль?"
2. Ввести email: ivan@test.com
3. Нажать "Отправить ссылку"
4. → API создаст reset токен в БД
5. → Отправит email (если настроен)
6. → Показывает success screen
7. Скопировать токен из БД (для теста)
8. Перейти: `/reset-password?token=<токен>`
9. Ввести новый пароль
10. → API валидирует токен
11. → Обновит пароль
12. → Auto-login с новым JWT
13. → Перенаправление на `/dashboard`
14. ✅ Можно войти с новым паролем!

### ✅ Сценарий 4: Logout

1. На Dashboard нажать "Выйти"
2. → Удаляет JWT из localStorage
3. → Перенаправление на главную
4. При попытке открыть `/dashboard` → редирект на `/login`

### ✅ Проверка защиты роутов

1. Очистить localStorage (удалить auth_token)
2. Попробовать открыть `/dashboard`
3. ✅ Автоматически перенаправит на `/login`

## Что уже работает

### ✅ Security
- ✅ Password hashing (bcrypt, cost 12)
- ✅ JWT tokens для авторизации
- ✅ Token validation
- ✅ Protected routes
- ✅ Password strength validation
- ✅ Email format validation
- ✅ Email enumeration protection
- ✅ Reset token expiration (1 hour)
- ✅ One-time use tokens

### ✅ UX Features
- ✅ Real-time валидация
- ✅ Password strength indicator
- ✅ Show/hide password toggle
- ✅ Loading states
- ✅ Error handling
- ✅ Success states
- ✅ Responsive design
- ✅ Keyboard navigation

### ✅ Database
- ✅ Prisma ORM
- ✅ SQLite (dev)
- ✅ Complete schema (Users, Sessions, Tokens)
- ✅ Migrations
- ✅ Relations

### ✅ Email System
- ✅ Nodemailer setup
- ✅ Welcome email template
- ✅ Password reset template
- ✅ Email verification template
- ✅ Beautiful HTML emails

## Следующие шаги (опционально)

### 🔄 OAuth Integration (Google, GitHub)
Для полной реализации нужно:
1. Настроить NextAuth.js
2. Получить OAuth credentials
3. Создать `/api/auth/[...nextauth]/route.ts`
4. Обновить SocialAuthButtons компонент

### 📧 Email Service
Для отправки реальных писем:
1. Настроить SMTP (Gmail, SendGrid, Postmark)
2. Обновить .env с реальными данными:
   ```
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   ```

### 🚀 Production
1. Переключить на PostgreSQL
2. Настроить secure cookies
3. Добавить rate limiting
4. HTTPS
5. Environment variables
6. Logging & monitoring

### 🧪 Testing
- Unit tests (Jest)
- E2E tests (Playwright)
- Visual regression tests

## Структура файлов

```
pm-gym/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts          ✅
│   │   │   ├── login/route.ts             ✅
│   │   │   ├── forgot-password/route.ts   ✅
│   │   │   └── reset-password/route.ts    ✅
│   │   └── user/
│   │       └── onboarding/route.ts        ✅
│   ├── login/page.tsx                     ✅
│   ├── register/page.tsx                  ✅
│   ├── forgot-password/page.tsx           ✅
│   ├── reset-password/page.tsx            ✅
│   ├── onboarding/page.tsx                ✅
│   └── dashboard/page.tsx                 ✅
├── components/
│   └── auth/
│       ├── Input.tsx                      ✅
│       ├── Button.tsx                     ✅
│       ├── AuthLayout.tsx                 ✅
│       ├── SocialAuthButtons.tsx          ✅
│       └── PasswordStrength.tsx           ✅
├── lib/
│   ├── prisma.ts                          ✅
│   ├── auth.ts                            ✅
│   ├── email.ts                           ✅
│   └── api.ts                             ✅
├── prisma/
│   ├── schema.prisma                      ✅
│   ├── dev.db                             ✅
│   └── migrations/                        ✅
└── .env                                   ✅
```

## Design System

### Colors
- Primary: Indigo (#6366F1)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Background: Gradient (indigo-50 → white → purple-50)

### Typography
- Headings: Bold, various sizes
- Body: 16px (prevents iOS zoom)
- Links: Indigo with underline on hover

### Components
- Inputs: 48px height, rounded-lg
- Buttons: 48px height, gradient primary
- Cards: white, rounded-2xl, shadow-xl
- Spacing: Consistent padding/margins

---

## 🎉 Status: ПОЛНОСТЬЮ ГОТОВО К ИСПОЛЬЗОВАНИЮ!

**Backend:** ✅ Database, API, JWT, Email  
**Frontend:** ✅ All pages, validation, API integration  
**Flow:** ✅ Register → Onboarding → Dashboard → Login/Logout  

**Port:** http://localhost:3001

**Тестовый аккаунт можно создать прямо сейчас!** 🚀
