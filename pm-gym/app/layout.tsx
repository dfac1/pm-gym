import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
