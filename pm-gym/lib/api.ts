// API client utilities

const API_BASE_URL = '/api'

export interface ApiResponse<T = any> {
  success?: boolean
  error?: string
  message?: string
  data?: T
  user?: any
  token?: string
}

async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('auth_token')
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API error')
    }

    return data
  } catch (error) {
    console.error('API call error:', error)
    throw error
  }
}

// Auth API
export const authApi = {
  register: async (data: {
    name: string
    email: string
    password: string
    agreeToTerms: boolean
  }) => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }
    
    return response
  },

  login: async (data: {
    email: string
    password: string
    rememberMe?: boolean
  }) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }
    
    return response
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  },

  forgotPassword: async (email: string) => {
    return apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  resetPassword: async (token: string, password: string) => {
    const response = await apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    })
    
    if (response.token) {
      localStorage.setItem('auth_token', response.token)
    }
    
    return response
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token')
  },
}

// User API
export const userApi = {
  getMe: async () => {
    return apiCall('/user/me', {
      method: 'GET',
    })
  },

  updateOnboarding: async (data: {
    role?: string
    interests?: string[]
    goal?: string
  }) => {
    return apiCall('/user/onboarding', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  resendVerification: async () => {
    return apiCall('/auth/resend-verification', {
      method: 'POST',
    })
  },
}
