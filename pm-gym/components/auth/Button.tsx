'use client'

interface ButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  fullWidth?: boolean
  icon?: React.ReactNode
}

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  fullWidth = true,
  icon
}: ButtonProps) {
  const baseStyles = `
    h-12 px-6 rounded-lg font-medium text-base transition-all
    ${fullWidth ? 'w-full' : ''}
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const variants = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-indigo-500
      text-white shadow-lg shadow-indigo-500/30
      hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      bg-white border border-gray-300 text-gray-900
      hover:bg-gray-50 hover:border-gray-400
    `
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Загрузка...</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}
