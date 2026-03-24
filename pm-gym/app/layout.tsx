import type { Metadata } from 'next'
import './globals.css'
import AmplitudeProvider from '@/components/AmplitudeProvider'

export const metadata: Metadata = {
  title: 'PM Gym — Прокачай продуктовое мышление на практике',
  description: 'Безопасная симуляционная среда для отработки продуктовых решений. Интерактивные кейсы для Product Managers.',
  keywords: ['product management', 'PM', 'обучение', 'кейсы', 'продакт менеджмент'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <AmplitudeProvider>{children}</AmplitudeProvider>
      </body>
    </html>
  )
}
