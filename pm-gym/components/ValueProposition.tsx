'use client'

import { motion } from 'framer-motion'

const values = [
  {
    icon: '🎯',
    title: 'Практика без рисков',
    description: 'Учись на ошибках в симуляции, а не на реальном продукте'
  },
  {
    icon: '💡',
    title: 'Системная обратная связь',
    description: 'Детальный разбор каждого решения с альтернативами'
  },
  {
    icon: '📊',
    title: 'Измеримый прогресс',
    description: 'Отслеживай развитие конкретных навыков'
  }
]

export default function ValueProposition() {
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
            Почему PM Gym?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
