import * as amplitude from '@amplitude/analytics-browser'

let initialized = false

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

export function track(eventName: string, properties?: Record<string, unknown>): void {
  if (!initialized) return
  amplitude.track(eventName, properties)
}

export function identifyUser(userId: string, traits?: Record<string, unknown>): void {
  if (!initialized) return
  amplitude.setUserId(userId)
  if (traits) {
    const identifyEvent = new amplitude.Identify()
    Object.entries(traits).forEach(([key, value]) => {
      identifyEvent.set(key, value as string | number | boolean)
    })
    amplitude.identify(identifyEvent)
  }
}

export function resetUser(): void {
  if (!initialized) return
  amplitude.reset()
}
