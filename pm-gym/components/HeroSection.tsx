'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Прокачай продуктовое мышление на практике
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
              Симуляция для PM с реальными кейсами
            </p>
            <Link 
              href="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl no-underline"
            >
              Начать →
            </Link>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-light to-white rounded-2xl p-8 shadow-2xl border border-gray-200">
              <div className="space-y-4">
                <div className="h-8 bg-primary/20 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="h-20 bg-white rounded-lg shadow"></div>
                  <div className="h-20 bg-white rounded-lg shadow"></div>
                  <div className="h-20 bg-white rounded-lg shadow"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
