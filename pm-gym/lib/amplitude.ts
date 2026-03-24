import * as amplitude from '@amplitude/analytics-browser'

let initialized = false

// Global context merged into every track() call (level, plan, streak, etc.)
let globalContext: Record<string, string | number | boolean> = {}

export function initAmplitude(): void {
  const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
  if (!apiKey || initialized) return

  amplitude.init(apiKey, {
    autocapture: {
      pageViews: true,
      sessions: true,
      formInteractions: false,
      fileDownloads: false,
    },
    defaultTracking: false,
  })

  initialized = true
}

/**
 * Reads UTM params from the current URL and persists them in sessionStorage
 * using first-touch attribution (never overwritten on subsequent visits).
 * Call once on app mount (AmplitudeProvider).
 */
export function captureUtmParams(): void {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem('pm_gym_utm')) return // already captured

  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
  let hasUtm = false

  keys.forEach((key) => {
    const value = params.get(key)
    if (value) {
      utm[key] = value
      hasUtm = true
    }
  })

  if (!hasUtm && document.referrer) {
    try {
      utm['utm_source'] = new URL(document.referrer).hostname
      utm['utm_medium'] = 'referral'
      hasUtm = true
    } catch {
      // ignore malformed referrer
    }
  }

  if (hasUtm) {
    sessionStorage.setItem('pm_gym_utm', JSON.stringify(utm))
  }
}

/** Returns stored UTM params (first-touch). Safe to call on server (returns {}). */
export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const stored = sessionStorage.getItem('pm_gym_utm')
    return stored ? (JSON.parse(stored) as Record<string, string>) : {}
  } catch {
    return {}
  }
}

/**
 * Set global properties automatically merged into every track() call.
 * Call after login with user context: level, plan, current_streak_days, etc.
 */
export function setGlobalContext(props: Record<string, string | number | boolean>): void {
  globalContext = { ...globalContext, ...props }
}

/** Track an event. Global context properties are merged automatically. */
export function track(eventName: string, properties?: Record<string, unknown>): void {
  if (!initialized) return
  amplitude.track(eventName, { ...globalContext, ...properties })
}

// ── User Properties ──────────────────────────────────────────────────────────

export type IdentifyOperation = 'set' | 'setOnce' | 'append' | 'add'

export interface UserProperty {
  value: string | number | boolean | string[]
  operation: IdentifyOperation
}

type TraitInput = string | number | boolean | string[] | UserProperty

function isUserProperty(v: unknown): v is UserProperty {
  return (
    typeof v === 'object' &&
    v !== null &&
    !Array.isArray(v) &&
    'operation' in (v as Record<string, unknown>)
  )
}

/**
 * Identify the current user and set user properties.
 * Supports Amplitude operations: set (default), setOnce, append, add.
 *
 * @example
 * identifyUser(userId, {
 *   email: 'user@example.com',                                        // set
 *   role: { value: 'junior', operation: 'setOnce' },                  // lock first value
 *   total_lessons_completed: { value: 1, operation: 'add' },          // increment
 *   completed_modules: { value: 'analytics-metrics', operation: 'append' }, // push to array
 * })
 */
export function identifyUser(
  userId: string,
  traits?: Record<string, TraitInput>
): void {
  if (!initialized) return
  amplitude.setUserId(userId)
  if (traits) {
    const identifyEvent = new amplitude.Identify()
    Object.entries(traits).forEach(([key, rawValue]) => {
      if (isUserProperty(rawValue)) {
        const { value, operation } = rawValue
        switch (operation) {
          case 'setOnce':
            identifyEvent.setOnce(key, value as string | number | boolean)
            break
          case 'add':
            identifyEvent.add(key, value as number)
            break
          case 'append':
            identifyEvent.append(key, value as string)
            break
          default:
            identifyEvent.set(key, value as string | number | boolean | string[])
        }
      } else {
        identifyEvent.set(key, rawValue as string | number | boolean | string[])
      }
    })
    amplitude.identify(identifyEvent)
  }
}

export function resetUser(): void {
  if (!initialized) return
  globalContext = {}
  amplitude.reset()
}
