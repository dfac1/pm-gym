'use client'

import { ReactNode } from 'react'
import Sidebar from './Sidebar'

interface PlatformLayoutProps {
  children: ReactNode
  user?: {
    name: string
    email: string
    image?: string
    level?: number
    progress?: number
  }
}

export default function PlatformLayout({ children, user }: PlatformLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="ml-64 min-h-screen">
        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
