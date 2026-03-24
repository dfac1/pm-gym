'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAmplitude, track } from '@/lib/amplitude'

export default function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    initAmplitude()
  }, [])

  useEffect(() => {
    track('Page Viewed', { path: pathname })
  }, [pathname])

  return <>{children}</>
}
