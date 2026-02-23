import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем seed базы данных...');

  // Загружаем сценарии из JSON
  const scenariosPath = path.join(__dirname, '..', 'public', 'data', 'scenarios.json');
  const scenariosData = JSON.parse(fs.readFileSync(scenariosPath, 'utf-8'));

  // Создаём модули если их нет
  const modules = [
    {
      slug: 'analytics-metrics',
      title: 'Аналитика и метрики',
      description: 'Освойте data-driven подход к управлению продуктом',
      order: 1,
      color: '#3b82f6',
      icon: '📊',
      difficulty: 'intermediate' as const,
      estimatedHours: 12
    },
    {
      slug: 'strategy-roadmap',
      title: 'Стратегия и Roadmap',
      description: 'Создавайте продуктовую стратегию и управляйте roadmap',
      order: 2,
      color: '#8b5cf6',
      icon: '🎯',
      difficulty: 'advanced' as const,
      estimatedHours: 15
    },
    {
      slug: 'growth-activation',
      title: 'Growth и активация',
      description: 'Растите продукт и оптимизируйте воронку пользователей',
      order: 3,
      color: '#10b981',
      icon: '📈',
      difficulty: 'advanced' as const,
      estimatedHours: 14
    }
  ];

  console.log('📦 Создаём модули...');
  
  const createdModules: any[] = [];
  for (const moduleData of modules) {
    const module = await prisma.module.upsert({
      where: { slug: moduleData.slug },
      update: {},
      create: moduleData
    });
    createdModules.push(module);
    console.log(`  ✅ Модуль: ${module.title}`);
  }

  // Добавляем сценарии в соответствующие модули
  console.log('\n🎮 Создаём сценарии...');
  
  const scenarioModuleMap: { [key: string]: string } = {
    'retention-falling-case': 'analytics-metrics',
    'roadmap-conflict-case': 'strategy-roadmap',
    'activation-drop-case': 'growth-activation'
  };

  for (const scenarioData of scenariosData.scenarios) {
    const moduleSlug = scenarioModuleMap[scenarioData.id];
    const module = createdModules.find(m => m.slug === moduleSlug);

    if (!module) {
      console.log(`  ⚠️  Модуль не найден для сценария: ${scenarioData.title}`);
      continue;
    }

    const scenario = await prisma.scenario.upsert({
      where: { 
        moduleId_title: {
          moduleId: module.id,
          title: scenarioData.title
        }
      },
      update: {
        description: scenarioData.description,
        difficulty: scenarioData.difficulty,
        estimatedTime: scenarioData.estimatedTime,
        content: scenarioData as any
      },
      create: {
        moduleId: module.id,
        title: scenarioData.title,
        description: scenarioData.description,
        difficulty: scenarioData.difficulty,
        estimatedTime: scenarioData.estimatedTime,
        content: scenarioData as any
      }
    });

    console.log(`  ✅ Сценарий: ${scenario.title} (${scenario.difficulty})`);
  }

  console.log('\n✨ Seed завершён успешно!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
