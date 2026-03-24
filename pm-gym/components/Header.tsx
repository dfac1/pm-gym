'use client'

import Link from 'next/link'
import { track } from '@/lib/amplitude'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary no-underline hover:no-underline">
              PM Gym
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors no-underline"
            >
              Войти
            </Link>
            <Link 
              href="/register"
              onClick={() => track('CTA Clicked', { cta_text: 'Начать →', cta_location: 'header', destination: '/register' })}
              className="px-6 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg transition-all no-underline hover:no-underline transform hover:-translate-y-0.5"
            >
              Начать →
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
