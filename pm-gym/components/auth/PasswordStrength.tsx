'use client'

interface PasswordStrengthProps {
  password: string
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = () => {
    if (!password) return { level: 0, label: '', color: '', hint: '' }

    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    }

    // Calculate strength (0-100)
    if (checks.length) strength += 20
    if (checks.uppercase) strength += 20
    if (checks.lowercase) strength += 20
    if (checks.number) strength += 20
    if (checks.special) strength += 20

    // Determine level
    let level = 0
    let label = ''
    let color = ''
    let hint = ''

    if (strength < 40) {
      level = 1
      label = 'Слабый'
      color = 'bg-red-500'
      if (!checks.length) hint = '⚠️ Минимум 8 символов'
      else hint = '💡 Добавь цифру и заглавную букву'
    } else if (strength < 80) {
      level = 2
      label = 'Средний'
      color = 'bg-orange-500'
      if (!checks.uppercase) hint = '💡 Добавь заглавную букву'
      else if (!checks.number) hint = '💡 Добавь цифру для надёжности'
      else hint = '💡 Добавь специальный символ'
    } else {
      level = 3
      label = 'Сильный'
      color = 'bg-green-500'
      hint = '✅ Надёжный пароль'
    }

    return { level, label, color, hint, strength }
  }

  const { level, label, color, hint, strength } = calculateStrength()

  if (!password) return null

  return (
    <div className="mt-2 space-y-2">
      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${strength}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${
          level === 1 ? 'text-red-600' : 
          level === 2 ? 'text-orange-600' : 
          'text-green-600'
        }`}>
          {label}
        </span>
      </div>

      {/* Hint */}
      {hint && (
        <p className="text-sm text-gray-600">
          {hint}
        </p>
      )}
    </div>
  )
}
