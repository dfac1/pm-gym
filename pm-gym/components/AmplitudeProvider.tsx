'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAmplitude, captureUtmParams, track } from '@/lib/amplitude'

export default function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    initAmplitude()
    captureUtmParams()
  }, [])

  useEffect(() => {
    track('Page Viewed', { path: pathname })
  }, [pathname])

  return <>{children}</>
}
