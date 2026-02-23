# PM Gym - Landing Page

Учебный SaaS/EdTech проект для прокачки продуктового мышления.

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
# или
yarn install
# или
pnpm install
```

### Запуск в режиме разработки

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для продакшена

```bash
npm run build
npm run start
```

## 📁 Структура проекта

```
pm-gym/
├── app/
│   ├── globals.css          # Глобальные стили
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Главная страница (Landing)
├── components/
│   ├── Header.tsx           # Шапка сайта
│   ├── HeroSection.tsx      # Hero секция
│   ├── ValueProposition.tsx # Ценностное предложение
│   ├── HowItWorks.tsx       # Как это работает
│   ├── FeaturesPreview.tsx  # Превью возможностей
│   ├── FinalCTA.tsx         # Финальный CTA
│   └── Footer.tsx           # Подвал
├── public/                  # Статические файлы
├── next.config.js           # Конфигурация Next.js
├── tailwind.config.ts       # Конфигурация Tailwind CSS
└── tsconfig.json            # Конфигурация TypeScript
```

## 🎨 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Язык:** TypeScript
- **Стили:** Tailwind CSS
- **Анимации:** Framer Motion
- **UI:** Минималистичный дизайн с системными шрифтами

## 🎯 Landing Page Секции

1. **Header** - Навигация и CTA кнопки
2. **Hero Section** - Главный экран с заголовком
3. **Value Proposition** - 3 ключевые ценности
4. **How It Works** - 3 шага процесса обучения
5. **Features Preview** - Основные возможности
6. **Final CTA** - Призыв к действию
7. **Footer** - Контакты и ссылки

## 🎨 Цветовая палитра

- **Primary:** #0066FF (основной синий)
- **Success:** #10B981 (зеленый успеха)
- **Danger:** #EF4444 (красный ошибок)
- **Gray Scale:** От #F9FAFB до #111827

## 📝 Следующие шаги

- [ ] Установить зависимости (`npm install`)
- [ ] Запустить dev сервер
- [ ] Проверить адаптивность на разных экранах
- [ ] Добавить страницы `/login` и `/register`
- [ ] Настроить аналитику (GA4, PostHog)
- [ ] Подключить базу данных (Neon PostgreSQL)
- [ ] Реализовать authentication (Better Auth)

## 📚 Документация

Подробная документация проекта находится в корневой папке:
- `Product-Foundation.md` - Базовые концепции продукта
- `Tech-Stack-Recommendation.md` - Обоснование tech stack
- `Brand-Guidelines.md` - Гайдлайны по бренду
- `UI-Component-Guide.md` - Руководство по UI компонентам
- `1-Landing-Page-Structure.md` - Структура landing page

## 🤝 Contributing

Это учебный проект для практики PM навыков.

## 📄 License

Проект создан в образовательных целях.
