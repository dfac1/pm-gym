import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize Prisma Client with driver adapters
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  // For SQLite, Prisma Client can work directly without additional adapters
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
