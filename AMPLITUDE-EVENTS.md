# PM Gym — Amplitude Events Map

> Версия: 2.0 | Дата: 24 марта 2026  
> Статус: **✅ Реализован** / **🔲 Нужно добавить**

---

## Принципы именования

- Формат: `Object Action` (Noun Verb), регистр: Title Case
- Пример: `Lesson Completed`, `Scenario Started`, `User Registered`
- Все свойства событий: `snake_case`
- Enum-значения: строго `snake_case` (не `"Beginner → Advanced"`, а `"beginner_to_advanced"`)
- Boolean-свойства: всегда с префиксом `is_` (`is_best_answer`, `is_first_time`)
- Время: всегда в секундах, суффикс `_sec` (`time_spent_sec`, `time_to_decide_sec`)
- Идентификаторы контента: `module_slug` (string), `lesson_slug` (string), `scenario_id` (string)

---

## Amplitude-specific: операции над User Properties

Amplitude поддерживает не только `set`, но и специальные операции:

| Операция | Когда использовать | Пример |
|---|---|---|
| `set` | Текущее значение (перезаписывает) | `plan`, `level`, `current_streak_days` |
| `setOnce` | Первое значение навсегда (не перезаписывается) | `initial_utm_source`, `registration_date`, `initial_role` |
| `add` | Инкремент числовых счётчиков | `total_lessons_completed += 1` |
| `append` | Добавить элемент в массив | `completed_modules.append("analytics-metrics")` |
| `prepend` | Добавить в начало массива | Редко нужно |
| `unset` | Удалить свойство | При удалении аккаунта |

> **Важно:** `setOnce` критичен для атрибуции — первый UTM никогда не должен перезаписываться.

---

## Глобальные свойства событий (Global Context)

Эти свойства должны автоматически добавляться к **каждому** событию через wrapper вокруг `track()`.  
Они дают context для любого чарта и когорты без дополнительных join'ов.

| Свойство | Тип | Пример | Источник |
|---|---|---|---|
| `user_level` | number | `5` | `UserStats.level` |
| `user_plan` | string | `free`, `pro` | `User.plan` |
| `onboarding_completed` | boolean | `true` | `User.goal != null` |
| `days_since_registration` | number | `14` | `now - User.createdAt` |
| `current_streak_days` | number | `7` | `UserStats.currentStreak` |

> **Реализация:** создать `trackWithContext(eventName, props)` — надстройку над `track()`,  
> которая автоматически добавляет эти поля из `localStorage` / `userStore` после логина.

---

---

## User Properties (identifyUser)

Устанавливаются при логине, загрузке дашборда и по мере прогресса пользователя.

### Идентификация и профиль

| Свойство | Amplitude-операция | Тип | Пример | Статус |
|---|---|---|---|---|
| `email` | `set` | string | `user@example.com` | ✅ Реализован |
| `name` | `set` | string | `Андрей Иванов` | ✅ Реализован |
| `plan` | `set` | string | `free`, `pro` | 🔲 Нужно добавить |
| `email_verified` | `set` | boolean | `true` | 🔲 Нужно добавить |

### Онбординг и сегментация

| Свойство | Amplitude-операция | Тип | Пример | Статус |
|---|---|---|---|---|
| `role` | `setOnce` ¹ | string | `student`, `junior`, `middle`, `senior`, `switching` | 🔲 Нужно добавить |
| `goal` | `setOnce` ¹ | string | `interview`, `improve`, `learn`, `offer`, `explore` | 🔲 Нужно добавить |
| `interests` | `set` | string[] | `["analytics", "prioritization"]` | 🔲 Нужно добавить |
| `onboarding_completed` | `set` | boolean | `true` | 🔲 Нужно добавить |

> ¹ `setOnce` — потому что мы хотим знать с какой роли/цели пользователь ПРИШЁЛ, даже если потом изменит в настройках. Для коhорт по ЦА критично.

### Атрибуция (first-touch, никогда не перезаписываются)

| Свойство | Amplitude-операция | Тип | Пример | Статус |
|---|---|---|---|---|
| `initial_utm_source` | `setOnce` | string | `google`, `telegram`, `direct` | 🔲 Нужно добавить |
| `initial_utm_medium` | `setOnce` | string | `cpc`, `organic`, `referral` | 🔲 Нужно добавить |
| `initial_utm_campaign` | `setOnce` | string | `launch_march_2026` | 🔲 Нужно добавить |
| `registration_date` | `setOnce` | string (ISO) | `2026-03-10` | 🔲 Нужно добавить |

### Прогресс и геймификация (обновляются динамически)

| Свойство | Amplitude-операция | Тип | Пример | Источник |
|---|---|---|---|---|
| `level` | `set` | number | `5` | `UserStats.level` |
| `total_xp` | `set` | number | `1240` | `UserStats.experiencePoints` |
| `total_lessons_completed` | `set` | number | `12` | `UserStats.lessonsCompleted` |
| `total_scenarios_completed` | `set` | number | `7` | `UserStats.scenariosCompleted` |
| `total_modules_completed` | `set` | number | `3` | `UserStats.modulesCompleted` |
| `current_streak_days` | `set` | number | `7` | `UserStats.currentStreak` |
| `longest_streak_days` | `set` | number | `14` | `UserStats.longestStreak` |
| `total_time_spent_sec` | `set` | number | `23400` | `UserStats.totalTimeSpent` |
| `completed_modules` | `append` | string[] | `["analytics-metrics"]` | при завершении модуля |

> **Зачем это всё в User Properties, а не только в событиях?**  
> Позволяет строить когорты прямо в Amplitude: "пользователи с уровнем ≥ 5", "пробросившие ≥ 10 уроков", "streak ≥ 7 дней" — без привязки к конкретному событию.

---

## 1. Автоматические события (Amplitude Autocapture)

Настроены в `lib/amplitude.ts` через `autocapture`.

| Событие | Описание | Статус |
|---|---|---|
| `[Amplitude] Page Viewed` | Каждый переход между страницами (autocapture) | ✅ Включён |
| `[Amplitude] Session Start` | Начало сессии | ✅ Включён |
| `[Amplitude] Session End` | Конец сессии | ✅ Включён |

---

## 2. Auth — Аутентификация

### 2.1 `Page Viewed`
**Статус:** ✅ Реализован  
**Триггер:** Каждый переход на любую страницу

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `path` | string | `/login`, `/modules/analytics-metrics` | URL без query params |

> **Улучшение:** добавить `page_name` (human-readable) и `page_type` (`auth`, `platform`, `landing`) для easier grouping в чартах.

---

### 2.2 `User Registered`
**Статус:** ✅ Реализован  
**Триггер:** Успешная регистрация  
**Файл:** [app/register/page.tsx](pm-gym/app/register/page.tsx)

| Свойство | Тип | Пример | Статус |
|---|---|---|---|
| `registration_method` | string | `email`, `google`, `github` | 🔲 Нужно добавить |
| `utm_source` | string | `google`, `direct`, `telegram` | 🔲 Нужно добавить |
| `utm_medium` | string | `cpc`, `organic` | 🔲 Нужно добавить |
| `utm_campaign` | string | `launch_march_2026` | 🔲 Нужно добавить |

> `utm_*` берём из `document.referrer` + URL params при первом посещении (сохранить в `sessionStorage` на лендинге).  
> Это единственный момент, когда мы знаем acquisition source — потом теряем.

---

### 2.3 `Registration Failed`
**Статус:** ✅ Реализован  
**Файл:** [app/register/page.tsx](pm-gym/app/register/page.tsx)

| Свойство | Тип | Пример | Статус |
|---|---|---|---|
| `error_type` | string | `email_already_exists`, `validation_error`, `server_error` | 🔲 Нужно добавить |
| `error_message` | string | `Email уже зарегистрирован` | ✅ (через `error`) |

> Разделяем `error_type` (enum для группировки в чартах) и `error_message` (детали для отладки).  
> Текущий `error` — это сырая строка, по ней нельзя строить нормальные воронки.

---

### 2.4 `User Logged In`
**Статус:** ✅ Реализован  
**Файл:** [app/login/page.tsx](pm-gym/app/login/page.tsx)

| Свойство | Тип | Пример | Статус |
|---|---|---|---|
| `login_method` | string | `email`, `google`, `github` | 🔲 Нужно добавить |
| `is_first_login` | boolean | `false` | 🔲 Нужно добавить |
| `days_since_last_login` | number | `3` | 🔲 Нужно добавить |
| `remember_me` | boolean | `true` | 🔲 Нужно добавить |

> `is_first_login` + `days_since_last_login` — ключевые для D1/D7/D30 retention анализа.  
> `days_since_last_login` = `(now - User.lastLoginAt) / 86400`.

---

### 2.5 `Login Failed`
**Статус:** ✅ Реализован  
**Файл:** [app/login/page.tsx](pm-gym/app/login/page.tsx)

| Свойство | Тип | Пример | Статус |
|---|---|---|---|
| `error_type` | string | `invalid_credentials`, `email_not_verified`, `account_not_found`, `server_error` | 🔲 Нужно добавить |
| `error_message` | string | `Неверный email или пароль` | ✅ (через `error`) |

---

### 2.6 `Email Verified`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/verify-email/page.tsx](pm-gym/app/verify-email/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `hours_since_registration` | number | `2.5` | Насколько быстро верифицировали — метрика качества onboarding |
| `verification_attempt` | number | `1` | 1 = с первого раза, 2+ = повторно |

---

### 2.7 `Verification Email Resent`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/dashboard/page.tsx](pm-gym/app/dashboard/page.tsx) (VerificationBanner)

| Свойство | Тип | Пример |
|---|---|---|
| `source` | string | `dashboard_banner`, `verify_email_page` |

---

### 2.8 `Password Reset Requested`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/forgot-password/page.tsx](pm-gym/app/forgot-password/page.tsx)

_Свойств нет (email в Amplitude не передаём — GDPR/privacy)._

---

### 2.9 `Password Reset Completed`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/reset-password/page.tsx](pm-gym/app/reset-password/page.tsx)

| Свойство | Тип | Пример |
|---|---|---|
| `hours_since_request` | number | `0.5` | Насколько быстро сбросили после запроса |

---

## 3. Onboarding — Онбординг

### 3.1 `Onboarding Started`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/onboarding/page.tsx](pm-gym/app/onboarding/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `seconds_since_registration` | number | `45` | Если < 60 — пришёл сразу после регистрации |

---

### 3.2 `Onboarding Step Completed`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/onboarding/page.tsx](pm-gym/app/onboarding/page.tsx) — `handleNext`

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `step` | number | `1`, `2`, `3` | Номер шага |
| `step_name` | string | `role`, `interests`, `goal` | Semantic label |
| `selected_value` | string \| string[] | `junior` / `["analytics"]` | Выбранное значение |
| `time_spent_on_step_sec` | number | `12` | Время на этом шаге |
| `total_time_so_far_sec` | number | `25` | Суммарное время с начала онбординга |

---

### 3.3 `Onboarding Completed`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/onboarding/page.tsx](pm-gym/app/onboarding/page.tsx) — `handleComplete`

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `role` | string | `junior` | |
| `interests` | string[] | `["analytics", "prioritization"]` | Amplitude supports array filters |
| `interests_count` | number | `2` | Для numeric analysis (avg interests per user) |
| `goal` | string | `interview` | |
| `total_time_sec` | number | `68` | Время прохождения всего онбординга |

> **После этого события** — сразу вызвать `identifyUser` с `setOnce` для `role`, `goal`, `interests` и установить `onboarding_completed: true`.

---

### 3.4 `Onboarding Skipped`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/onboarding/page.tsx](pm-gym/app/onboarding/page.tsx) — `handleSkip`

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `skipped_at_step` | number | `2` | На каком шаге бросил |
| `steps_completed` | number | `1` | Сколько шагов заполнил до пропуска |
| `partial_role` | string \| null | `junior` | Если шаг 1 был заполнен |
| `time_spent_sec` | number | `8` | Бросил быстро или подумав |

---

## 4. Modules — Учебные модули

### 4.1 `Module Viewed`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/modules/[slug]/page.tsx](pm-gym/app/modules/%5Bslug%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `module_slug` | string | `analytics-metrics` | Primary ID |
| `module_title` | string | `Analytics & Metrics Mastery` | |
| `module_difficulty` | string | `beginner`, `intermediate`, `advanced` | Enum, не "Beginner → Advanced" |
| `module_progress_pct` | number | `65` | 0 = новый, 100 = завершён |
| `user_module_status` | string | `not_started`, `in_progress`, `completed` | Из `UserModuleProgress.status` |
| `is_featured` | boolean | `true` | |
| `estimated_hours` | number | `6` | |
| `lessons_count` | number | `18` | |

---

### 4.2 `Module Started`
**Статус:** 🔲 Нужно добавить  
**Триггер:** Первый клик «Начать модуль» (только когда `module_progress_pct === 0`)  
**Файл:** [app/modules/[slug]/page.tsx](pm-gym/app/modules/%5Bslug%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `module_slug` | string | `frameworks-tools` | |
| `module_title` | string | `Frameworks & Tools` | |
| `module_difficulty` | string | `beginner_to_advanced` | snake_case enum |
| `discovered_from` | string | `dashboard_recommendation`, `modules_list`, `direct_link` | Откуда пришёл на модуль |

---

### 4.3 `Module Completed`
**Статус:** 🔲 Нужно добавить  
**Триггер:** `UserModuleProgress.progress` достигает 100%

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `module_slug` | string | `analytics-metrics` | |
| `module_title` | string | `Analytics & Metrics Mastery` | |
| `module_difficulty` | string | `beginner_to_intermediate` | |
| `lessons_count` | number | `18` | |
| `days_to_complete` | number | `14` | От `startedAt` до `completedAt` — метрика темпа |
| `total_time_spent_sec` | number | `21600` | Из `UserModuleProgress` |

---

### 4.4 `Module Tab Switched`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/modules/[slug]/page.tsx](pm-gym/app/modules/%5Bslug%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `module_slug` | string | `analytics-metrics` | |
| `from_tab` | string | `overview` | C какой вкладки |
| `to_tab` | string | `lessons` | На какую вкладку |
| `values` | string[] | `overview`, `lessons`, `practice`, `resources` | |

---

## 5. Lessons — Уроки

### 5.1 `Lesson Started`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/modules/[slug]/lessons/[lessonId]/page.tsx](pm-gym/app/modules/%5Bslug%5D/lessons/%5BlessonId%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `lesson_slug` | string | `why-analytics-pm` | Primary ID |
| `lesson_title` | string | `Зачем нужна аналитика PM` | |
| `lesson_number` | string | `1.1` | Human-readable позиция |
| `lesson_order` | number | `1` | Числовой порядок для sorting |
| `lesson_type` | string | `text`, `video`, `interactive`, `quiz` | Из `Lesson.lessonType` |
| `estimated_duration_min` | number | `15` | |
| `module_slug` | string | `analytics-metrics` | |
| `section_title` | string | `Введение в аналитику` | |
| `is_first_time` | boolean | `true` | false = перечитывает |
| `previous_status` | string | `not_started`, `in_progress`, `completed` | Из `UserLessonProgress` |

---

### 5.2 `Lesson Completed`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/modules/[slug]/lessons/[lessonId]/page.tsx](pm-gym/app/modules/%5Bslug%5D/lessons/%5BlessonId%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `lesson_slug` | string | `why-analytics-pm` | |
| `lesson_title` | string | `Зачем нужна аналитика PM` | |
| `lesson_number` | string | `1.1` | |
| `lesson_type` | string | `text` | |
| `module_slug` | string | `analytics-metrics` | |
| `completion_method` | string | `scroll_auto`, `button_click` | `scroll_auto` = сработало по scroll > 95% |
| `time_spent_sec` | number | `320` | Реальное время на странице |
| `max_scroll_depth_pct` | number | `98` | Максимальная глубина скролла |
| `is_first_completion` | boolean | `true` | false = повторное прохождение |
| `$insert_id` | string | `lesson_why-analytics-pm_user123` | Для дедупликации (см. ниже) |

> **`$insert_id`**: Amplitude использует это поле для deduplification — если одно и то же событие отправить дважды с одинаковым `$insert_id`, оно запишется один раз. Формат: `lesson_{lesson_slug}_{userId}`. Критично, если `scroll_auto` может сфайрить несколько раз.

---

### 5.3 `Lesson Navigation Clicked`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/modules/[slug]/lessons/[lessonId]/page.tsx](pm-gym/app/modules/%5Bslug%5D/lessons/%5BlessonId%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `direction` | string | `next`, `prev`, `back_to_module` | |
| `lesson_slug` | string | `why-analytics-pm` | |
| `module_slug` | string | `analytics-metrics` | |
| `lesson_completion_status` | string | `completed`, `in_progress` | Завершил ли перед переходом |

---

## 6. Scenarios — Интерактивные сценарии

### 6.1 `Scenario Started`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/scenarios/[id]/page.tsx](pm-gym/app/scenarios/%5Bid%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `scenario_id` | string | `retention-drop` | |
| `scenario_title` | string | `Падение Retention` | |
| `category` | string | `analytics`, `prioritization`, `stakeholders` | |
| `difficulty` | string | `easy`, `medium`, `hard` | |
| `tags` | string[] | `["retention", "ab_test", "analytics"]` | Amplitude поддерживает array filters |
| `estimated_time_min` | number | `20` | |
| `attempt_number` | number | `1` | 1 = первый раз, 2+ = retry после `Scenario Restarted` |
| `is_first_attempt` | boolean | `true` | Shortcut для фильтрации |

---

### 6.2 `Scenario Tab Switched`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/scenarios/[id]/page.tsx](pm-gym/app/scenarios/%5Bid%5D/page.tsx)

| Свойство | Тип | Пример |
|---|---|---|
| `scenario_id` | string | `retention-drop` |
| `from_tab` | string | `context` |
| `to_tab` | string | `metrics` |

---

### 6.3 `Scenario Option Selected`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/scenarios/[id]/page.tsx](pm-gym/app/scenarios/%5Bid%5D/page.tsx) — `handleOptionSelect`

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `scenario_id` | string | `retention-drop` | |
| `option_id` | string | `A` | |
| `option_type` | string | `analytical`, `reactive`, `wrong`, `best` | |
| `attempt_number` | number | `1` | |
| `time_to_select_sec` | number | `45` | Время от загрузки страницы до клика — показывает вдумчивость |
| `tabs_viewed_before_select` | string[] | `["context", "metrics"]` | Какие вкладки смотрел перед выбором |

---

### 6.4 `Scenario Submitted`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/scenarios/[id]/page.tsx](pm-gym/app/scenarios/%5Bid%5D/page.tsx) — `handleSubmit`

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `scenario_id` | string | `retention-drop` | |
| `scenario_title` | string | `Падение Retention` | |
| `selected_option_id` | string | `A` | |
| `selected_option_type` | string | `analytical` | |
| `is_best_answer` | boolean | `true` | Основная метрика качества |
| `score` | number | `85` | Из `consequences[optionType].score` |
| `consequence_type` | string | `analytical`, `reactive` | |
| `consequence_verdict` | string | `correct`, `partial`, `wrong` | Human-readable grade |
| `time_to_decide_sec` | number | `120` | От загрузки до submit |
| `attempt_number` | number | `1` | |
| `$insert_id` | string | `scenario_retention-drop_user123_attempt1` | Дедупликация |

---

### 6.5 `Scenario Completed`
**Статус:** 🔲 Нужно добавить  
**Триггер:** Сразу после показа результата (= после `Scenario Submitted` + результат отображён)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `scenario_id` | string | `retention-drop` | |
| `scenario_title` | string | `Падение Retention` | |
| `category` | string | `analytics` | |
| `difficulty` | string | `medium` | |
| `is_best_answer` | boolean | `false` | |
| `score` | number | `45` | |
| `grade` | string | `A`, `B`, `C`, `D` | Из `UserScenarioCompletion.grade` |
| `time_spent_sec` | number | `180` | Полное время в сценарии |
| `attempt_number` | number | `1` | |

---

### 6.6 `Scenario Restarted`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/scenarios/[id]/page.tsx](pm-gym/app/scenarios/%5Bid%5D/page.tsx) — `handleReset`

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `scenario_id` | string | `retention-drop` | |
| `previous_score` | number | `45` | Результат предыдущей попытки |
| `previous_is_best_answer` | boolean | `false` | |
| `previous_attempt_number` | number | `1` | |
| `reason` | string | `wants_best_answer`, `low_score` | Пока `wants_best_answer` по умолчанию |

---

## 7. Quizzes — Квизы

> Квизы живут внутри уроков (модель `Quiz` связана с `Lesson`). Отдельные события нужны, чтобы отличать completion урока от прохождения квиза.

### 7.1 `Quiz Started`
**Статус:** 🔲 Нужно добавить

| Свойство | Тип | Пример |
|---|---|---|
| `quiz_id` | string | `metrics-types-quiz` |
| `quiz_title` | string | `Quiz: Типы метрик` |
| `questions_count` | number | `10` |
| `lesson_slug` | string | `metric-types` |
| `module_slug` | string | `analytics-metrics` |
| `attempt_number` | number | `1` |

---

### 7.2 `Quiz Completed`
**Статус:** 🔲 Нужно добавить

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `quiz_id` | string | `metrics-types-quiz` | |
| `quiz_title` | string | `Quiz: Типы метрик` | |
| `score` | number | `90` | % правильных ответов |
| `passed` | boolean | `true` | Из `QuizAttempt.passed` |
| `questions_count` | number | `10` | |
| `correct_answers_count` | number | `9` | |
| `time_spent_sec` | number | `210` | |
| `attempt_number` | number | `1` | |
| `lesson_slug` | string | `metric-types` | |
| `module_slug` | string | `analytics-metrics` | |
| `$insert_id` | string | `quiz_metrics-types_user123_attempt1` | |

---

## 8. Library — Библиотека ресурсов

### 8.1 `Library Viewed`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/library/page.tsx](pm-gym/app/library/page.tsx)

| Свойство | Тип | Пример |
|---|---|---|
| `source` | string | `sidebar`, `dashboard_recommendation`, `module_page`, `direct` |
| `total_resources_shown` | number | `24` |

---

### 8.2 `Library Filter Applied`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/library/page.tsx](pm-gym/app/library/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `filter_type` | string | `type`, `category`, `search` | Тип фильтра |
| `filter_value` | string | `tool`, `analytics` | |
| `results_count` | number | `7` | Сколько результатов после фильтра |
| `previous_filter_value` | string \| null | `template` | Что было выбрано до |

---

### 8.3 `Resource Clicked`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/library/page.tsx](pm-gym/app/library/page.tsx) + [app/modules/[slug]/page.tsx](pm-gym/app/modules/%5Bslug%5D/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `resource_id` | string | `rice-calculator` | |
| `resource_title` | string | `RICE Calculator` | |
| `resource_type` | string | `tool`, `template`, `checklist`, `guide`, `video` | |
| `resource_format` | string | `interactive`, `google_docs`, `pdf`, `figma`, `youtube` | lowercase enum |
| `resource_category` | string | `frameworks`, `analytics`, `artifacts`, `planning` | |
| `is_featured` | boolean | `true` | |
| `is_external` | boolean | `false` | Внешняя ссылка или внутренняя страница |
| `source` | string | `library_page`, `module_resources_tab`, `dashboard` | Откуда кликнули |
| `source_module_slug` | string \| null | `analytics-metrics` | Если клик со страницы модуля |

---

### 8.4 `Resource Bookmarked`
**Статус:** 🔲 Нужно добавить  
**Триггер:** Пользователь добавил ресурс в закладки (`UserResourceBookmark`)

| Свойство | Тип | Пример |
|---|---|---|
| `resource_id` | string | `rice-calculator` |
| `resource_type` | string | `tool` |
| `resource_title` | string | `RICE Calculator` |
| `source` | string | `library_page`, `module_resources_tab` |

---

### 8.5 `Resource Bookmark Removed`
**Статус:** 🔲 Нужно добавить

| Свойство | Тип | Пример |
|---|---|---|
| `resource_id` | string | `rice-calculator` |
| `resource_type` | string | `tool` |

---

## 9. Achievements — Достижения

### 9.1 `Achievements Page Viewed`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/achievements/page.tsx](pm-gym/app/achievements/page.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `total_unlocked` | number | `9` | |
| `total_achievements` | number | `25` | |
| `completion_pct` | number | `36` | `(unlocked/total)*100` — удобен для cohort |

---

### 9.2 `Achievement Unlocked`
**Статус:** 🔲 Нужно добавить  
**Триггер:** Серверное событие — при записи в `UserAchievement`

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `achievement_slug` | string | `five-scenarios` | |
| `achievement_title` | string | `5 Scenarios` | |
| `rarity` | string | `common`, `rare`, `epic`, `legendary` | |
| `category` | string | `learning`, `scenario`, `streak`, `social`, `special` | |
| `points_earned` | number | `50` | Из `Achievement.points` |
| `total_points_after` | number | `350` | `UserStats.totalPoints` после начисления |
| `achievements_unlocked_total` | number | `9` | Порядковый номер достижения у пользователя |

---

### 9.3 `Achievement Viewed`
**Статус:** 🔲 Нужно добавить  
**Триггер:** Пользователь кликнул на карточку достижения (открылся модал)

| Свойство | Тип | Пример |
|---|---|---|
| `achievement_slug` | string | `five-scenarios` |
| `achievement_status` | string | `unlocked`, `locked`, `in_progress` |
| `rarity` | string | `epic` |

---

### 9.4 `Achievement Filter Applied`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/achievements/page.tsx](pm-gym/app/achievements/page.tsx)

| Свойство | Тип | Пример |
|---|---|---|
| `filter_type` | string | `status`, `category` |
| `filter_value` | string | `unlocked`, `scenario` |
| `results_count` | number | `6` |

---

## 10. Navigation & UI

### 10.1 `Sidebar Nav Clicked`
**Статус:** 🔲 Нужно добавить  
**Файл:** [components/platform/Sidebar.tsx](pm-gym/components/platform/Sidebar.tsx)

| Свойство | Тип | Пример |
|---|---|---|
| `destination` | string | `dashboard`, `modules`, `library`, `scenarios`, `progress`, `achievements` |
| `current_page` | string | `dashboard`, `modules` |

---

### 10.2 `CTA Clicked`
**Статус:** 🔲 Нужно добавить  
**Триггер:** Клик на любой CTA-кнопки на лендинге  
**Файлы:** [components/HeroSection.tsx](pm-gym/components/HeroSection.tsx), [components/FinalCTA.tsx](pm-gym/components/FinalCTA.tsx), [components/Header.tsx](pm-gym/components/Header.tsx)

| Свойство | Тип | Пример | Комментарий |
|---|---|---|---|
| `cta_text` | string | `Начать бесплатно`, `Попробовать` | Текст кнопки |
| `cta_location` | string | `hero`, `header`, `final_cta`, `how_it_works` | Раздел страницы |
| `destination` | string | `/register`, `/login` | |

---

## 11. Dashboard — Главный экран

### 11.1 `Continue Learning Clicked`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/dashboard/page.tsx](pm-gym/app/dashboard/page.tsx) — ContinueLearningCard

| Свойство | Тип | Пример |
|---|---|---|
| `module_slug` | string | `analytics-metrics` |
| `lesson_slug` | string | `data-driven-decisions` |
| `lesson_number` | string | `1.3` |
| `module_progress_pct` | number | `12` |

---

### 11.2 `Recommendation Clicked`
**Статус:** 🔲 Нужно добавить  
**Файл:** [app/dashboard/page.tsx](pm-gym/app/dashboard/page.tsx) — RecommendationCard

| Свойство | Тип | Пример |
|---|---|---|
| `recommendation_title` | string | `RICE Framework` |
| `recommendation_category` | string | `prioritization` |
| `recommendation_type` | string | `module`, `tool`, `lesson` |
| `destination` | string | `/library/rice-calculator` |
| `position` | number | `1` | Порядковый номер в списке — для анализа position bias |

---

## 12. Revenue — Монетизация (будущий Pro план)

> Использовать нативный Amplitude Revenue API, а не просто `track()`.

```typescript
import { Revenue, revenue } from '@amplitude/analytics-browser'

const revenueEvent = new Revenue()
  .setProductId('pm_gym_pro_monthly')
  .setPrice(19.99)
  .setQuantity(1)
  .setRevenue(19.99)

revenue(revenueEvent)
```

### 12.1 `Subscription Started` (после успешной оплаты)

| Свойство | Тип | Пример |
|---|---|---|
| `plan` | string | `pro_monthly`, `pro_annual` |
| `price_usd` | number | `19.99` |
| `billing_period` | string | `monthly`, `annual` |
| `trial_used` | boolean | `false` |

### 12.2 `Subscription Cancelled`

| Свойство | Тип | Пример |
|---|---|---|
| `plan` | string | `pro_monthly` |
| `days_active` | number | `45` |
| `cancellation_reason` | string | `too_expensive`, `not_enough_content`, `achieved_goal`, `other` |

---

## Сводная таблица

| Группа | Готово | Нужно добавить | Итого |
|---|---|---|---|
| Autocapture (Amplitude) | 3 | — | 3 |
| Auth | 5 | 4 | 9 |
| Onboarding | — | 4 | 4 |
| Modules | — | 4 | 4 |
| Lessons | — | 3 | 3 |
| Scenarios | — | 6 | 6 |
| Quizzes | — | 2 | 2 |
| Library | — | 5 | 5 |
| Achievements | — | 4 | 4 |
| Navigation & UI | — | 2 | 2 |
| Dashboard | — | 2 | 2 |
| Revenue | — | 2 | 2 |
| **Всего** | **8** | **38** | **46** |

---

## Приоритизация внедрения

### P0 — Core conversion funnel
1. `User Registered` + UTM-атрибуция — знаем откуда пришли
2. `Onboarding Completed` — сегментация ЦА по role/goal
3. `Lesson Completed` — ключевой activation event
4. `Scenario Submitted` + `Scenario Completed` — основной engagement loop
5. Global Context Properties + расширенные User Properties

### P1 — Engagement & retention
6. `Module Started` / `Module Completed` — прогресс воронка
7. `Onboarding Step Completed` — drop-off по шагам
8. `User Logged In` с `is_first_login` + `days_since_last_login` — D1/D7/D30 retention
9. `Quiz Completed` — quality of learning
10. `Scenario Restarted` — показатель мотивации

### P2 — Product depth
11. `Resource Clicked` + `Resource Bookmarked` — ценность библиотеки
12. `Achievement Unlocked` — gamification loop
13. `CTA Clicked` — landing → registration конверсия
14. `Recommendation Clicked` — эффективность рекомендаций

### P3 — UX optimization
15. `Lesson Navigation Clicked`, `Module Tab Switched`, `Scenario Tab Switched` — паттерны поведения
16. `Library Filter Applied` — UX поиска ресурсов
17. `Achievement Filter Applied`, `Achievement Viewed`

---

## Технические заметки

### `$insert_id` — дедупликация событий

Добавляй к событиям, которые могут сфайриться дважды:
```typescript
track('Lesson Completed', {
  lesson_slug: '...',
  // ...
  $insert_id: `lesson_${lessonSlug}_${userId}`
})
```

### Массивы в Amplitude

Amplitude поддерживает фильтрацию по массивам через `contains`:
```
filter: interests contains "analytics"
```
Используй для `interests`, `tags`, `completed_modules`.

### Не отправлять в свойства событий

- `email` — только через `identifyUser`, никогда в event properties (GDPR)
- `password`, `token` — очевидно
- Длинный текст контента урока — только ID и заголовок
