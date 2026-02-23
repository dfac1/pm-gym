import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM || 'PM Gym <onboarding@resend.dev>',
    to,
    subject,
    html,
  })
  if (error) {
    return { success: false, error }
  }
  return { success: true }
}

// Email templates
export function welcomeEmail(name: string): { subject: string; html: string } {
  return {
    subject: 'Добро пожаловать в PM Gym! 🚀',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366F1, #818CF8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background: #6366F1; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Добро пожаловать в PM Gym!</h1>
          </div>
          <div class="content">
            <p>Привет, ${name}!</p>
            
            <p>Спасибо за регистрацию в PM Gym! Мы рады, что ты с нами.</p>
            
            <p>Теперь у тебя есть доступ к:</p>
            <ul>
              <li>📊 Практическим кейсам из реальных продуктов</li>
              <li>🎯 Интерактивным симуляциям</li>
              <li>📈 Персональному треку развития</li>
              <li>🏆 Системе прогресса и достижений</li>
            </ul>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}/dashboard" class="button">
                Начать обучение →
              </a>
            </p>
            
            <p>Если у тебя возникнут вопросы, просто ответь на это письмо.</p>
            
            <p>Удачи в прокачке навыков! 💪</p>
            
            <p>Команда PM Gym</p>
          </div>
          <div class="footer">
            <p>PM Gym © 2026 | Прокачка PM навыков</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
}

export function passwordResetEmail(name: string, token: string): { subject: string; html: string } {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
  
  return {
    subject: 'Восстановление пароля PM Gym',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #6366F1; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background: #6366F1; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
          .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔑 Восстановление пароля</h1>
          </div>
          <div class="content">
            <p>Привет${name ? `, ${name}` : ''}!</p>
            
            <p>Вы запросили восстановление пароля для аккаунта PM Gym.</p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" class="button">
                Восстановить пароль
              </a>
            </p>
            
            <p>Или скопируйте ссылку в браузер:</p>
            <p style="word-break: break-all; color: #6b7280; font-size: 14px;">${resetUrl}</p>
            
            <div class="warning">
              <p style="margin: 0;"><strong>⚠️ Важно:</strong> Ссылка действительна 1 час.</p>
            </div>
            
            <p>Если это были не вы, просто проигнорируйте это письмо. Ваш пароль не изменится.</p>
            
            <p>PM Gym Team</p>
          </div>
          <div class="footer">
            <p>PM Gym © 2026</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
}

export function emailVerificationEmail(name: string, token: string): { subject: string; html: string } {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`
  
  return {
    subject: 'Подтвердите email для PM Gym',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366F1, #818CF8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 12px 24px; background: #6366F1; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Подтвердите email</h1>
          </div>
          <div class="content">
            <p>Привет, ${name}!</p>
            
            <p>Спасибо за регистрацию в PM Gym! 🎉</p>
            
            <p>Подтверди свой email, чтобы получить полный доступ к платформе:</p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="${verifyUrl}" class="button">
                Подтвердить email
              </a>
            </p>
            
            <p style="color: #6b7280; font-size: 14px;">Ссылка действительна 24 часа.</p>
            
            <p>Если это были не вы, проигнорируйте это письмо.</p>
            
            <p>Команда PM Gym</p>
          </div>
          <div class="footer">
            <p>PM Gym © 2026</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
}
