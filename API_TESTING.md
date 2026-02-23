# PM Gym API Testing Guide

## Base URL
```
http://localhost:3001/api
```

## 1. Register New User

**POST** `/auth/register`

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван Тестовый",
    "email": "ivan@test.com",
    "password": "Password123!",
    "agreeToTerms": true
  }'
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "clxxxx",
    "name": "Иван Тестовый",
    "email": "ivan@test.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Save the token** для дальнейших запросов!

---

## 2. Login

**POST** `/auth/login`

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ivan@test.com",
    "password": "Password123!",
    "rememberMe": true
  }'
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "clxxxx",
    "name": "Иван Тестовый",
    "email": "ivan@test.com",
    "role": "junior",
    "interests": ["analytics", "prioritization"],
    "goal": "improve"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3. Forgot Password

**POST** `/auth/forgot-password`

```bash
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ivan@test.com"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Письмо с инструкциями отправлено"
}
```

**Проверить токен в БД:**
```bash
# Открыть Prisma Studio
npx prisma studio

# Navigator -> PasswordResetToken
# Скопировать token для следующего шага
```

---

## 4. Reset Password

**POST** `/auth/reset-password`

```bash
curl -X POST http://localhost:3001/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "токен-из-базы-данных",
    "password": "NewPassword456!"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Пароль успешно изменён",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 5. Update Onboarding

**POST** `/user/onboarding`

**Требуется авторизация!**

```bash
curl -X POST http://localhost:3001/api/user/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -d '{
    "role": "middle",
    "interests": ["analytics", "prioritization", "strategy"],
    "goal": "offer"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "clxxxx",
    "name": "Иван Тестовый",
    "email": "ivan@test.com",
    "role": "middle",
    "interests": ["analytics", "prioritization", "strategy"],
    "goal": "offer"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Введите корректный email"
}
```

### 401 Unauthorized
```json
{
  "error": "Неверный email или пароль"
}
```

### 500 Server Error
```json
{
  "error": "Ошибка сервера. Попробуйте позже."
}
```

---

## Testing with Prisma Studio

### View Database
```bash
npx prisma studio
```

Откроется http://localhost:5555

### Check Created Users
1. Navigate -> User
2. Видите всех зарегистрированных пользователей
3. Можете редактировать данные вручную

### Check Reset Tokens
1. Navigate -> PasswordResetToken
2. Видите все созданные токены
3. Проверяете expires, used статусы

---

## Quick Test Flow

### 1. Create User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Pass1234!","agreeToTerms":true}'
```

### 2. Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Pass1234!"}'
```

### 3. Save token from response

### 4. Update onboarding
```bash
curl -X POST http://localhost:3001/api/user/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"role":"junior","interests":["analytics"],"goal":"learn"}'
```

---

## Common Issues

### Issue: "Требуется авторизация"
**Fix:** Добавьте заголовок:
```
Authorization: Bearer <your-jwt-token>
```

### Issue: "Этот email уже зарегистрирован"
**Fix:** Используйте другой email или удалите пользователя из БД через Prisma Studio

### Issue: "Неверная ссылка" (reset password)
**Fix:** 
1. Проверьте что токен существует в БД
2. Проверьте что expires > now()
3. Проверьте что used = false

### Issue: 500 Server Error
**Fix:** Проверьте логи в терминале, где запущен `npm run dev`

---

## Database Commands

### Reset Database
```bash
npx prisma migrate reset
```

### View Schema
```bash
npx prisma studio
```

### Generate Client (after schema changes)
```bash
npx prisma generate
```

---

**Happy Testing! 🚀**
