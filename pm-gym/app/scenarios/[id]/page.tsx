'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PlatformLayout from '@/components/platform/PlatformLayout';

// Типы для сценариев
interface Metric {
  name: string;
  trend: 'up' | 'down' | 'neutral';
  severity: 'positive' | 'negative' | 'neutral' | 'low' | 'medium' | 'high' | 'critical';
  value: string;
}

interface Option {
  id: string;
  text: string;
  type: string;
}

interface Consequence {
  type: string;
  title: string;
  description: string;
  verdict: string;
  score: number;
}

interface BestAnswer {
  optionId: string;
  title: string;
  reasoning: string[];
  nextSteps: string[];
}

interface ScenarioData {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  estimatedTime: number;
  tags: string[];
  description: string;
  context: {
    role: string;
    company: string;
    situation: string;
    stakeholders: Array<{ role: string; says: string }>;
  };
  changelog: string[];
  metrics: Metric[];
  task: string;
  options: Option[];
  consequences: { [key: string]: Consequence };
  bestAnswer: BestAnswer;
  learningGoals: string[];
}

export default function ScenarioPage() {
  const params = useParams();
  const router = useRouter();
  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'context' | 'changelog' | 'metrics'>('context');

  useEffect(() => {
    // Загружаем сценарий из JSON (позже заменим на API)
    fetch('/data/scenarios.json')
      .then(res => res.json())
      .then(data => {
        const foundScenario = data.scenarios.find((s: ScenarioData) => s.id === params.id);
        if (foundScenario) {
          setScenario(foundScenario);
        }
      })
      .catch(err => console.error('Error loading scenario:', err));
  }, [params.id]);

  if (!scenario) {
    return (
      <PlatformLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка сценария...</p>
          </div>
        </div>
      </PlatformLayout>
    );
  }

  const handleOptionSelect = (optionId: string) => {
    if (!showResult) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSelectedOptionType = () => {
    if (!selectedOption) return null;
    const option = scenario.options.find(o => o.id === selectedOption);
    return option?.type || null;
  };

  const getConsequence = (): Consequence | null => {
    const optionType = getSelectedOptionType();
    if (!optionType) return null;
    return scenario.consequences[optionType] || null;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getMetricColor = (metric: Metric) => {
    if (metric.severity === 'positive') return 'text-green-600';
    if (metric.severity === 'critical') return 'text-red-600';
    if (metric.severity === 'high') return 'text-orange-600';
    if (metric.severity === 'medium') return 'text-yellow-600';
    return 'text-gray-600';
  };

  const consequence = getConsequence();
  const isBestAnswer = selectedOption === scenario.bestAnswer.optionId;

  return (
    <PlatformLayout>
      <div className="max-w-6xl mx-auto">
        {/* Хедер с результатом */}
        {showResult && consequence && (
          <div className={`mb-6 p-6 rounded-lg border-2 ${
            isBestAnswer 
              ? 'bg-green-50 border-green-500' 
              : consequence.score >= 7 
                ? 'bg-blue-50 border-blue-500'
                : consequence.score >= 5
                  ? 'bg-yellow-50 border-yellow-500'
                  : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{isBestAnswer ? '🎯' : consequence.score >= 7 ? '✅' : consequence.score >= 5 ? '⚠️' : '❌'}</span>
                  <h3 className="text-2xl font-bold">
                    {isBestAnswer ? 'Отличный выбор!' : consequence.title}
                  </h3>
                </div>
                <p className="text-lg mb-2">{consequence.description}</p>
                <p className="text-sm font-semibold italic">"{consequence.verdict}"</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{consequence.score}/10</div>
                <div className="text-sm text-gray-600">баллов</div>
              </div>
            </div>

            {isBestAnswer && (
              <div className="mt-4 p-4 bg-white rounded-lg border border-green-300">
                <h4 className="font-bold text-green-900 mb-2">Почему это лучший ответ:</h4>
                <ul className="space-y-1 mb-3">
                  {scenario.bestAnswer.reasoning.map((reason, idx) => (
                    <li key={idx} className="text-sm text-green-800">• {reason}</li>
                  ))}
                </ul>
                <h4 className="font-bold text-green-900 mb-2">Следующие шаги:</h4>
                <ul className="space-y-1">
                  {scenario.bestAnswer.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-green-800">→ {step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Попробовать снова
              </button>
              <button
                onClick={() => router.push('/modules')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Вернуться к модулям
              </button>
            </div>
          </div>
        )}

        {/* Основная информация о сценарии */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{scenario.title}</h1>
              <p className="text-gray-600 mb-3">{scenario.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                  {scenario.difficulty === 'hard' ? 'Сложный' : scenario.difficulty === 'medium' ? 'Средний' : 'Лёгкий'}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                  {scenario.category}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  ⏱ ~{scenario.estimatedTime} мин
                </span>
              </div>
            </div>
          </div>

          {/* Теги */}
          <div className="flex flex-wrap gap-2 mb-4">
            {scenario.tags.map((tag, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>

          {/* Цели обучения */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Что тренирует этот кейс:</h3>
            <div className="flex flex-wrap gap-2">
              {scenario.learningGoals.map((goal, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Контекст, Changelog, Метрики - табы */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('context')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'context' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 Контекст
              </button>
              <button
                onClick={() => setActiveTab('changelog')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'changelog' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🔄 Что было сделано ({scenario.changelog.length})
              </button>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'metrics' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📊 Данные
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'context' && (
              <div>
                <div className="mb-4">
                  <div className="font-semibold text-gray-700 mb-1">Твоя роль:</div>
                  <div className="text-lg">{scenario.context.role}</div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold text-gray-700 mb-1">Компания:</div>
                  <div className="text-lg">{scenario.context.company}</div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold text-gray-700 mb-2">Ситуация:</div>
                  <div className="text-lg leading-relaxed">{scenario.context.situation}</div>
                </div>
                {scenario.context.stakeholders.length > 0 && (
                  <div>
                    <div className="font-semibold text-gray-700 mb-2">Что говорят стейкхолдеры:</div>
                    <div className="space-y-2">
                      {scenario.context.stakeholders.map((sh, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-900">{sh.role}:</span>{' '}
                          <span className="text-gray-700">"{sh.says}"</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'changelog' && (
              <div>
                <p className="text-gray-600 mb-4">За последние месяцы команда сделала:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {scenario.changelog.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 hover:bg-gray-50 rounded">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div>
                <p className="text-gray-600 mb-4">Что ты видишь в данных:</p>
                <div className="space-y-3">
                  {scenario.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{metric.name}</span>
                      <span className={`font-semibold ${getMetricColor(metric)}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Задача */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-sm p-6 mb-6 border-2 border-purple-200">
          <h2 className="text-2xl font-bold mb-2">🎯 Твоя задача</h2>
          <p className="text-lg">{scenario.task}</p>
        </div>

        {/* Варианты действий */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">20 вариантов действий</h2>
          <p className="text-gray-600 mb-4">Выбери ОДИН первый шаг:</p>
          
          <div className="grid grid-cols-1 gap-3">
            {scenario.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                disabled={showResult}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedOption === option.id
                    ? showResult && isBestAnswer
                      ? 'border-green-500 bg-green-50'
                      : showResult
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-blue-500 bg-blue-50'
                    : showResult
                      ? 'border-gray-200 bg-gray-50 opacity-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="font-bold text-lg text-gray-500 min-w-[24px]">{option.id}.</span>
                  <span className="flex-1">{option.text}</span>
                  {selectedOption === option.id && (
                    <span className="text-xl">
                      {showResult && isBestAnswer ? '🎯' : '✓'}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {selectedOption && !showResult && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Подтвердить выбор
              </button>
            </div>
          )}
        </div>
      </div>
    </PlatformLayout>
  );
}
