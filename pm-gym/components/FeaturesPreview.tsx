'use client'

import { motion } from 'framer-motion'

const features = [
  { text: 'Интерактивные кейсы', description: 'реальные продуктовые ситуации' },
  { text: 'Ветвящиеся сценарии', description: 'разные пути решения' },
  { text: 'Детальная обратная связь', description: 'разбор каждого решения' },
  { text: 'Трекинг навыков', description: 'отслеживание развития' },
  { text: 'Персональная статистика', description: 'твой прогресс' },
  { text: 'Библиотека шаблонов', description: 'базовые PM документы' }
]

export default function FeaturesPreview() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Основные возможности
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 p-6 rounded-lg bg-gray-50 hover:bg-primary-light hover:border-primary border border-transparent transition-all"
            >
              <div className="flex-shrink-0">
                <svg 
                  className="w-6 h-6 text-success" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {feature.text}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
