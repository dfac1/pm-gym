'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    icon: '📝',
    title: 'Выбери кейс',
    description: 'Выбери продуктовую ситуацию из библиотеки'
  },
  {
    number: '2',
    icon: '🤔',
    title: 'Принимай решения',
    description: 'Проходи ветвящийся сценарий, делая выборы'
  },
  {
    number: '3',
    icon: '💡',
    title: 'Получай фидбек',
    description: 'Анализируй последствия и учись на разборе'
  }
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Как это работает?
          </h2>
        </motion.div>

        <div className="relative">
          {/* Progress Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gray-200">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-full bg-primary"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all">
                  {/* Step Number Badge */}
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full font-bold text-xl mb-4">
                    {step.number}
                  </div>
                  
                  <div className="text-4xl mb-4">{step.icon}</div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/4 -right-4 text-3xl text-primary">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
