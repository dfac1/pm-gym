'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-2">
              PM Gym
            </div>
            <p className="text-sm text-gray-400">
              Прокачай продуктовое мышление на практике
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Ссылки</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-white transition-colors">
                  Возможности
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a 
                  href="mailto:hello@pmgym.io" 
                  className="hover:text-white transition-colors"
                >
                  hello@pmgym.io
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a 
                  href="https://t.me/pmgym_community" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @pmgym_community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PM Gym. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
