# PM Gym — UI Component Guide (Минималистичный подход)

**Версия:** 1.0  
**Дата:** 20 февраля 2026  
**Принцип:** Простота. Быстрота. Функциональность.

---

## 🎯 Философия дизайна

**Правила:**
1. ⚡ Никаких сложных анимаций — только базовые transitions
2. 🎨 Минимум цветов — 3 основных + оттенки серого
3. 📦 Готовые компоненты — copy/paste и работает
4. 🚫 Без иллюстраций в MVP — только текст и базовые иконки
5. 📱 Mobile-first — сначала мобилка, потом desktop
6. ⚙️ Utility-first CSS — маленькие переиспользуемые классы

---

## 🎨 Цветовая палитра (упрощённая)

### Основные цвета (только 3!)

```css
/* Primary — для главных действий */
--primary: #0066FF;
--primary-hover: #0052CC;
--primary-light: #E6F0FF;

/* Success — для прогресса и успеха */
--success: #10B981;
--success-light: #D1FAE5;

/* Danger — для ошибок */
--danger: #EF4444;
--danger-light: #FEE2E2;

/* Neutral — оттенки серого */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-500: #6B7280;
--gray-700: #374151;
--gray-900: #111827;

/* Base */
--white: #FFFFFF;
--black: #000000;
```

**Всё. Больше цветов не используем.**

---

## 📐 Spacing (8px система)

```css
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
```

---

## 🔤 Typography (1 шрифт!)

### Один шрифт для всего

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", 
             "Roboto", "Helvetica Neue", Arial, sans-serif;
```

**Почему:** Системный шрифт — нулевое время загрузки, отличная читаемость.

### Размеры

```css
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;
```

### Веса

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 🧱 Base Styles (глобальные)

```css
/* Reset + Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--gray-900);
  background: var(--gray-50);
}

/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  color: var(--gray-900);
}

h1 { font-size: 36px; margin-bottom: 16px; }
h2 { font-size: 30px; margin-bottom: 12px; }
h3 { font-size: 24px; margin-bottom: 12px; }
h4 { font-size: 20px; margin-bottom: 8px; }

/* Links */
a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}
```

---

## 🎨 Utility Classes

Маленькие переиспользуемые классы (как Tailwind, но проще):

```css
/* Margin */
.m-0 { margin: 0; }
.m-1 { margin: 4px; }
.m-2 { margin: 8px; }
.m-3 { margin: 12px; }
.m-4 { margin: 16px; }
.m-6 { margin: 24px; }
.m-8 { margin: 32px; }

.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mt-6 { margin-top: 24px; }
.mb-2 { margin-bottom: 8px; }
.mb-4 { margin-bottom: 16px; }
.mb-6 { margin-bottom: 24px; }

/* Padding */
.p-0 { padding: 0; }
.p-2 { padding: 8px; }
.p-3 { padding: 12px; }
.p-4 { padding: 16px; }
.p-6 { padding: 24px; }

/* Text */
.text-xs { font-size: 12px; }
.text-sm { font-size: 14px; }
.text-base { font-size: 16px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }
.text-2xl { font-size: 24px; }

.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* Colors */
.text-gray-500 { color: var(--gray-500); }
.text-gray-700 { color: var(--gray-700); }
.text-gray-900 { color: var(--gray-900); }
.text-primary { color: var(--primary); }
.text-success { color: var(--success); }
.text-danger { color: var(--danger); }

/* Background */
.bg-white { background-color: var(--white); }
.bg-gray-50 { background-color: var(--gray-50); }
.bg-gray-100 { background-color: var(--gray-100); }
.bg-primary { background-color: var(--primary); }
.bg-success { background-color: var(--success); }

/* Flex */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }

/* Display */
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }

/* Width */
.w-full { width: 100%; }
.max-w-sm { max-width: 640px; }
.max-w-md { max-width: 768px; }
.max-w-lg { max-width: 1024px; }
.max-w-xl { max-width: 1280px; }

/* Rounded */
.rounded { border-radius: 4px; }
.rounded-md { border-radius: 8px; }
.rounded-lg { border-radius: 12px; }
.rounded-full { border-radius: 9999px; }

/* Shadow */
.shadow-sm { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
.shadow { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); }
.shadow-md { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
```

---

## 🔘 Buttons

### HTML + CSS

```html
<!-- Primary Button -->
<button class="btn btn-primary">Начать бесплатно</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Узнать больше</button>

<!-- Danger Button -->
<button class="btn btn-danger">Удалить</button>

<!-- Ghost Button -->
<button class="btn btn-ghost">Отмена</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Загрузка...</button>
```

### CSS

```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Primary */
.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

/* Secondary */
.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary-light);
}

/* Danger */
.btn-danger {
  background: var(--danger);
  color: white;
}

.btn-danger:hover {
  background: #DC2626;
}

/* Ghost */
.btn-ghost {
  background: transparent;
  color: var(--gray-700);
}

.btn-ghost:hover {
  background: var(--gray-100);
}

/* Size variants */
.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
}

.btn-lg {
  padding: 16px 32px;
  font-size: 18px;
}
```

---

## 📦 Cards

### HTML

```html
<!-- Standard Card -->
<div class="card">
  <h3>Заголовок карточки</h3>
  <p class="text-gray-700">Описание карточки с текстом.</p>
</div>

<!-- Clickable Card -->
<div class="card card-hover">
  <h4>Retention Challenge</h4>
  <p class="text-sm text-gray-500">Intermediate • 15 min</p>
  <div class="mt-2">
    <span class="badge">Analytics</span>
  </div>
</div>

<!-- Card with Header -->
<div class="card">
  <div class="card-header">
    <h4>Ваш прогресс</h4>
  </div>
  <div class="card-body">
    <p>Пройдено кейсов: <strong>3/5</strong></p>
  </div>
</div>
```

### CSS

```css
.card {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.card-hover {
  cursor: pointer;
  transition: all 0.2s;
}

.card-hover:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 6px rgba(0, 102, 255, 0.1);
  transform: translateY(-2px);
}

.card-header {
  padding-bottom: 16px;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: 16px;
}

.card-header h4 {
  margin: 0;
}

.card-body {
  padding: 0;
}
```

---

## 📝 Forms & Inputs

### HTML

```html
<!-- Text Input -->
<div class="form-group">
  <label for="email">Email</label>
  <input type="email" id="email" class="input" placeholder="you@example.com">
</div>

<!-- Input with Error -->
<div class="form-group">
  <label for="password">Пароль</label>
  <input type="password" id="password" class="input input-error" placeholder="••••••••">
  <span class="input-help error">Пароль должен содержать минимум 8 символов</span>
</div>

<!-- Textarea -->
<div class="form-group">
  <label for="comment">Комментарий</label>
  <textarea id="comment" class="input" rows="4"></textarea>
</div>

<!-- Select -->
<div class="form-group">
  <label for="level">Ваш уровень</label>
  <select id="level" class="input">
    <option>Junior PM</option>
    <option>Middle PM</option>
    <option>Senior PM</option>
  </select>
</div>

<!-- Checkbox -->
<div class="form-group">
  <label class="checkbox-label">
    <input type="checkbox" class="checkbox">
    <span>Я согласен с условиями использования</span>
  </label>
</div>
```

### CSS

```css
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 6px;
}

.input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid var(--gray-300);
  border-radius: 8px;
  background: white;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
}

.input-error {
  border-color: var(--danger);
}

.input-help {
  display: block;
  font-size: 12px;
  color: var(--gray-500);
  margin-top: 4px;
}

.input-help.error {
  color: var(--danger);
}

/* Checkbox */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
```

---

## 📊 Progress Bar

### HTML

```html
<!-- Simple Progress -->
<div class="progress">
  <div class="progress-bar" style="width: 65%"></div>
</div>

<!-- With Label -->
<div class="progress-container">
  <div class="flex justify-between mb-1">
    <span class="text-sm font-medium">Analytical Thinking</span>
    <span class="text-sm text-gray-500">65%</span>
  </div>
  <div class="progress">
    <div class="progress-bar" style="width: 65%"></div>
  </div>
</div>
```

### CSS

```css
.progress {
  width: 100%;
  height: 8px;
  background: var(--gray-200);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--primary);
  border-radius: 9999px;
  transition: width 0.5s ease;
}

/* Success variant */
.progress-bar.success {
  background: var(--success);
}

/* Striped (optional) */
.progress-bar.striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 16px 16px;
}
```

---

## 🏷️ Badges

### HTML

```html
<span class="badge">Analytics</span>
<span class="badge badge-success">Completed</span>
<span class="badge badge-primary">New</span>
<span class="badge badge-gray">Draft</span>
```

### CSS

```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 9999px;
  background: var(--gray-200);
  color: var(--gray-700);
}

.badge-primary {
  background: var(--primary-light);
  color: var(--primary);
}

.badge-success {
  background: var(--success-light);
  color: var(--success);
}

.badge-danger {
  background: var(--danger-light);
  color: var(--danger);
}

.badge-gray {
  background: var(--gray-100);
  color: var(--gray-500);
}
```

---

## 🔔 Alerts / Toasts

### HTML

```html
<!-- Success Alert -->
<div class="alert alert-success">
  <strong>Отлично!</strong> Ты завершил кейс.
</div>

<!-- Error Alert -->
<div class="alert alert-danger">
  <strong>Ошибка.</strong> Проверь введённые данные.
</div>

<!-- Info Alert -->
<div class="alert alert-info">
  <strong>Подсказка:</strong> Обрати внимание на retention метрику.
</div>
```

### CSS

```css
.alert {
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
  margin-bottom: 16px;
}

.alert-success {
  background: var(--success-light);
  border-color: var(--success);
  color: #065F46;
}

.alert-danger {
  background: var(--danger-light);
  border-color: var(--danger);
  color: #991B1B;
}

.alert-info {
  background: var(--primary-light);
  border-color: var(--primary);
  color: #1E40AF;
}
```

---

## 📋 Tables

### HTML

```html
<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Metric</th>
        <th>Current</th>
        <th>Target</th>
        <th>Change</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DAU</td>
        <td>1,250</td>
        <td>1,500</td>
        <td class="text-success">+20%</td>
      </tr>
      <tr>
        <td>Retention D7</td>
        <td>28%</td>
        <td>35%</td>
        <td class="text-danger">-5%</td>
      </tr>
    </tbody>
  </table>
</div>
```

### CSS

```css
.table-container {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.table th {
  background: var(--gray-50);
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-700);
  border-bottom: 2px solid var(--gray-200);
}

.table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-200);
}

.table tr:last-child td {
  border-bottom: none;
}

.table tr:hover {
  background: var(--gray-50);
}
```

---

## 🎯 Modal

### HTML

```html
<!-- Modal backdrop + content -->
<div class="modal-backdrop">
  <div class="modal">
    <div class="modal-header">
      <h3>Заголовок модального окна</h3>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <p>Содержимое модального окна здесь.</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost">Отмена</button>
      <button class="btn btn-primary">Сохранить</button>
    </div>
  </div>
</div>
```

### CSS

```css
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--gray-500);
  cursor: pointer;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
}

.modal-close:hover {
  color: var(--gray-700);
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--gray-200);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
```

### JavaScript для показа/скрытия

```javascript
// Показать модалку
function showModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
}

// Скрыть модалку
function hideModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Закрытие по клику на backdrop
document.querySelector('.modal-backdrop').addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-backdrop')) {
    hideModal('modal-id');
  }
});
```

---

## 🔗 Navigation

### Header

```html
<header class="header">
  <div class="container">
    <div class="header-content">
      <div class="logo">PM Gym</div>
      <nav class="nav">
        <a href="#" class="nav-link">Модули</a>
        <a href="#" class="nav-link">Прогресс</a>
        <a href="#" class="nav-link">Профиль</a>
      </nav>
      <button class="btn btn-primary btn-sm">Войти</button>
    </div>
  </div>
</header>
```

### CSS

```css
.header {
  background: white;
  border-bottom: 1px solid var(--gray-200);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
}

.nav {
  display: flex;
  gap: 24px;
}

.nav-link {
  color: var(--gray-700);
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--primary);
  text-decoration: none;
}

.nav-link.active {
  color: var(--primary);
}
```

### Sidebar

```html
<aside class="sidebar">
  <div class="sidebar-item active">
    <span class="sidebar-icon">📊</span>
    <span>Analytics</span>
  </div>
  <div class="sidebar-item">
    <span class="sidebar-icon">📝</span>
    <span>Artifacts</span>
  </div>
  <div class="sidebar-item">
    <span class="sidebar-icon">🧪</span>
    <span>Frameworks</span>
  </div>
  <div class="sidebar-item">
    <span class="sidebar-icon">🚀</span>
    <span>Lifecycle</span>
  </div>
</aside>
```

### CSS

```css
.sidebar {
  width: 240px;
  background: white;
  border-right: 1px solid var(--gray-200);
  padding: 24px 0;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: var(--gray-700);
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-item:hover {
  background: var(--gray-50);
  color: var(--gray-900);
}

.sidebar-item.active {
  background: var(--primary-light);
  color: var(--primary);
  border-left: 3px solid var(--primary);
  font-weight: 600;
}

.sidebar-icon {
  font-size: 20px;
}
```

---

## 📐 Layout Structures

### Container

```html
<div class="container">
  <!-- Content -->
</div>
```

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.container-sm {
  max-width: 640px;
}

.container-md {
  max-width: 768px;
}

.container-lg {
  max-width: 1024px;
}
```

### Grid

```html
<div class="grid">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>
```

```css
.grid {
  display: grid;
  gap: 24px;
}

/* 2 columns */
.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

/* 3 columns */
.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

/* 4 columns */
.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

/* Responsive */
@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

### Two-column layout (sidebar + main)

```html
<div class="app-layout">
  <aside class="sidebar">
    <!-- Sidebar content -->
  </aside>
  <main class="main-content">
    <!-- Main content -->
  </main>
</div>
```

```css
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 32px;
  background: var(--gray-50);
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
  }
}
```

---

## 📱 Responsive (Mobile)

### Breakpoints

```css
/* Mobile first — пишем базовые стили для мобилки */

/* Tablet */
@media (min-width: 768px) {
  /* Стили для планшетов */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Стили для десктопа */
}
```

### Hide/Show на разных экранах

```css
/* Hide on mobile */
.hide-mobile {
  display: none;
}

@media (min-width: 768px) {
  .hide-mobile {
    display: block;
  }
}

/* Hide on desktop */
.hide-desktop {
  display: block;
}

@media (min-width: 768px) {
  .hide-desktop {
    display: none;
  }
}
```

---

## 🎉 Special Components

### Empty State

```html
<div class="empty-state">
  <div class="empty-icon">📭</div>
  <h3>Пока нет завершённых кейсов</h3>
  <p class="text-gray-500">Начни своё обучение прямо сейчас</p>
  <button class="btn btn-primary mt-4">Начать первый кейс</button>
</div>
```

```css
.empty-state {
  text-align: center;
  padding: 64px 24px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}
```

### Loading Spinner

```html
<div class="spinner"></div>
```

```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--gray-200);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Small version */
.spinner-sm {
  width: 20px;
  height: 20px;
  border-width: 2px;
}
```

### Divider

```html
<hr class="divider">
<div class="divider-text">или</div>
```

```css
.divider {
  border: none;
  border-top: 1px solid var(--gray-200);
  margin: 24px 0;
}

.divider-text {
  text-align: center;
  position: relative;
  margin: 24px 0;
  color: var(--gray-500);
}

.divider-text::before,
.divider-text::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: var(--gray-200);
}

.divider-text::before {
  left: 0;
}

.divider-text::after {
  right: 0;
}
```

---

## 🎨 Dark Mode (опционально, для будущего)

```css
/* Auto-detect system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --gray-50: #1F2937;
    --gray-100: #374151;
    --gray-200: #4B5563;
    --gray-300: #6B7280;
    --gray-500: #9CA3AF;
    --gray-700: #D1D5DB;
    --gray-900: #F9FAFB;
    
    --primary: #3B82F6;
    --primary-hover: #2563EB;
    --primary-light: #1E3A5F;
  }
  
  body {
    background: #111827;
    color: #F9FAFB;
  }
}
```

---

## 📄 Complete Page Examples

### Landing Page

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PM Gym — Прокачай продуктовое мышление</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">PM Gym</div>
        <button class="btn btn-primary btn-sm">Войти</button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container container-md">
      <h1 class="text-center">Прокачай продуктовое мышление на практике</h1>
      <p class="text-lg text-center text-gray-700 mt-4">
        Безопасная симуляционная среда для отработки продуктовых решений
      </p>
      <div class="flex justify-center mt-6">
        <button class="btn btn-primary btn-lg">Начать бесплатно</button>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="section">
    <div class="container">
      <div class="grid grid-3">
        <div class="card text-center">
          <div class="text-4xl mb-4">💪</div>
          <h3>Практика</h3>
          <p class="text-gray-700">Реши реальные продуктовые кейсы</p>
        </div>
        <div class="card text-center">
          <div class="text-4xl mb-4">📊</div>
          <h3>Прогресс</h3>
          <p class="text-gray-700">Отслеживай развитие навыков</p>
        </div>
        <div class="card text-center">
          <div class="text-4xl mb-4">🎮</div>
          <h3>Геймификация</h3>
          <p class="text-gray-700">Учись с азартом</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section bg-primary">
    <div class="container container-md text-center">
      <h2 class="text-white">Готов начать?</h2>
      <p class="text-white mt-4">Первый кейс займёт всего 5 минут</p>
      <button class="btn bg-white mt-6">Начать обучение</button>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p class="text-center text-gray-500">© 2026 PM Gym. Все права защищены.</p>
    </div>
  </footer>
</body>
</html>
```

```css
/* Additional styles for landing */
.hero {
  padding: 80px 0;
}

.section {
  padding: 64px 0;
}

.footer {
  padding: 32px 0;
  border-top: 1px solid var(--gray-200);
}
```

---

### Dashboard Page

```html
<!-- Dashboard with sidebar -->
<div class="app-layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-item active">
      <span class="sidebar-icon">🏠</span>
      <span>Dashboard</span>
    </div>
    <div class="sidebar-item">
      <span class="sidebar-icon">📊</span>
      <span>Analytics</span>
    </div>
    <div class="sidebar-item">
      <span class="sidebar-icon">📝</span>
      <span>Artifacts</span>
    </div>
    <div class="sidebar-item">
      <span class="sidebar-icon">🏆</span>
      <span>Achievements</span>
    </div>
    <div class="sidebar-item">
      <span class="sidebar-icon">⚙️</span>
      <span>Settings</span>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="main-content">
    <!-- Welcome Section -->
    <div class="mb-6">
      <h1>Добро пожаловать, Андрей!</h1>
      <p class="text-gray-700">Продолжай обучение или начни новый модуль</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-3 mb-6">
      <div class="card">
        <div class="text-sm text-gray-500">Пройдено кейсов</div>
        <div class="text-3xl font-bold mt-2">3/5</div>
      </div>
      <div class="card">
        <div class="text-sm text-gray-500">Средний балл</div>
        <div class="text-3xl font-bold text-success mt-2">82%</div>
      </div>
      <div class="card">
        <div class="text-sm text-gray-500">Уровень</div>
        <div class="text-3xl font-bold text-primary mt-2">Junior</div>
      </div>
    </div>

    <!-- Progress Section -->
    <div class="card mb-6">
      <h3 class="mb-4">Твой прогресс</h3>
      
      <div class="mb-4">
        <div class="flex justify-between mb-1">
          <span class="text-sm font-medium">Analytical Thinking</span>
          <span class="text-sm text-gray-500">65%</span>
        </div>
        <div class="progress">
          <div class="progress-bar" style="width: 65%"></div>
        </div>
      </div>

      <div class="mb-4">
        <div class="flex justify-between mb-1">
          <span class="text-sm font-medium">Prioritization</span>
          <span class="text-sm text-gray-500">45%</span>
        </div>
        <div class="progress">
          <div class="progress-bar" style="width: 45%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between mb-1">
          <span class="text-sm font-medium">Product Strategy</span>
          <span class="text-sm text-gray-500">30%</span>
        </div>
        <div class="progress">
          <div class="progress-bar" style="width: 30%"></div>
        </div>
      </div>
    </div>

    <!-- Available Cases -->
    <h2 class="mb-4">Доступные кейсы</h2>
    <div class="grid grid-2">
      <div class="card card-hover">
        <span class="badge badge-success mb-2">Completed</span>
        <h4>Retention Challenge</h4>
        <p class="text-sm text-gray-500 mt-2">Intermediate • 15 min</p>
        <div class="mt-3">
          <span class="badge">Analytics</span>
          <span class="badge">Metrics</span>
        </div>
      </div>

      <div class="card card-hover">
        <span class="badge badge-primary mb-2">New</span>
        <h4>North Star Metric</h4>
        <p class="text-sm text-gray-500 mt-2">Beginner • 10 min</p>
        <div class="mt-3">
          <span class="badge">Strategy</span>
        </div>
      </div>
    </div>
  </main>
</div>
```

---

## ⚡ Quick Start Template

Минимальный HTML файл для старта:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PM Gym</title>
  <style>
    /* Вставь сюда все CSS из этого гайда */
  </style>
</head>
<body>
  <!-- Твой контент -->
</body>
</html>
```

---

## 📋 Implementation Checklist

### Шаг 1: Setup
- [ ] Создать index.html
- [ ] Создать styles.css (скопировать все CSS из гайда)
- [ ] Подключить normalize.css или reset.css (опционально)

### Шаг 2: Base Variables
- [ ] Добавить CSS variables ( `--primary`, `--gray-*`, etc.)
- [ ] Настроить base styles (body, headings, links)

### Шаг 3: Utility Classes
- [ ] Добавить spacing utilities (m-*, p-*)
- [ ] Добавить text utilities
- [ ] Добавить flex utilities
- [ ] Добавить color utilities

### Шаг 4: Components
- [ ] Buttons (primary, secondary, ghost)
- [ ] Cards (standard, hover)
- [ ] Forms (input, textarea, select)
- [ ] Progress bars
- [ ] Badges
- [ ] Alerts

### Шаг 5: Layout
- [ ] Header
- [ ] Sidebar (если нужен)
- [ ] Container
- [ ] Grid system

### Шаг 6: Pages
- [ ] Landing page
- [ ] Dashboard
- [ ] Case study page

---

## 🎯 Best Practices

### 1. Consistency
Всегда используй одни и те же классы:
- `.btn-primary` для главных кнопок
- `.card` для карточек
- `.input` для полей ввода

### 2. Spacing
Всегда кратно 8px или используй готовые классы:
- `m-2` = 8px
- `m-4` = 16px
- `m-6` = 24px

### 3. Mobile First
Пиши базовые стили для мобилки, потом добавляй media queries для desktop:

```css
/* Mobile (по умолчанию) */
.grid {
  grid-template-columns: 1fr;
}

/* Desktop */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 4. Reuse
Не создавай новые классы для каждого элемента. Комбинируй существующие:

```html
<!-- Хорошо -->
<div class="card p-6 mb-4">...</div>

<!-- Плохо -->
<div class="custom-card-with-padding-and-margin">...</div>
```

---

## 🚀 Optimization Tips

### 1. Minify CSS
Перед деплоем сожми CSS файл (используй любой minifier онлайн)

### 2. Remove Unused
Удали классы, которые не используешь (вручную или через PurgeCSS)

### 3. Critical CSS
Для landing page можно вставить критичные стили inline в `<head>`

### 4. Load Fonts Efficiently
Если используешь веб-шрифты:
```html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
```

Но мы используем системные шрифты — грузить ничего не нужно! ✅

---

## 📦 File Structure

```
project/
├── index.html           # Landing page
├── dashboard.html       # Dashboard
├── case.html           # Case study page
├── styles.css          # Все стили из этого гайда
├── scripts.js          # JS для модалок, etc.
└── images/            # Картинки (если будут)
```

### Альтернатива (всё в одном файле)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Весь CSS здесь */
  </style>
</head>
<body>
  <!-- HTML -->
  
  <script>
    // JS здесь
  </script>
</body>
</html>
```

---

## ✅ Final Checklist

Перед запуском проверь:

**Функциональность:**
- [ ] Все кнопки работают
- [ ] Формы валидируются
- [ ] Модалки открываются/закрываются
- [ ] Навигация работает

**Адаптивность:**
- [ ] Открыл на мобилке — всё читаемо
- [ ] Открыл на планшете — layout адаптировался
- [ ] Открыл на desktop — всё на месте

**Визуал:**
- [ ] Цвета соответствуют палитре
- [ ] Spacing выглядит ровно
- [ ] Шрифты читаемые
- [ ] Кнопки легко нажимаются (min 44x44px)

**Производительность:**
- [ ] Страница грузится быстро
- [ ] Нет ненужных картинок/шрифтов
- [ ] CSS минифицирован (для прода)

---

## 🎉 Готово!

Всё что нужно для создания UI — в этом документе.

**Подход:**
1. Copy/paste нужные компоненты
2. Комбинируй utility классы
3. Адаптируй под свои нужды
4. Не усложняй!

**Помни:** Лучше простой working UI, чем красивый, но незаконченный.

---

**Следующий шаг:** Начни с одной страницы (dashboard или landing), используя компоненты из этого гайда.
