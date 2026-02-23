'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary-hover">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Начни прокачку сегодня
          </h2>
          
          <Link 
            href="/register"
            className="inline-flex items-center px-10 py-5 text-lg font-semibold text-primary bg-white hover:bg-gray-50 rounded-lg transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl no-underline"
          >
            Начать →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
