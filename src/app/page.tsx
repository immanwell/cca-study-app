'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { domains, questions, flashcards } from '@/lib/data';
import { getQuizState, saveQuizState, getProgress, saveProgress } from '@/lib/storage';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState({ totalAnswered: 0, correct: 0, byDomain: {} as Record<string, { total: number; correct: number }> });

  useEffect(() => {
    setProgress(getProgress());
    if (localStorage.getItem('cca-dark-mode') === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('cca-dark-mode', String(!darkMode));
  };

  const accuracy = progress.totalAnswered > 0 
    ? Math.round((progress.correct / progress.totalAnswered) * 100) 
    : 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CCA Study App</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Progress Dashboard Preview */}
          <section className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Progress</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{progress.totalAnswered}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{accuracy}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{progress.correct}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{progress.totalAnswered - progress.correct}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Needs Review</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/practice" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Practice Mode</h3>
                <p className="text-gray-600 dark:text-gray-400">MCQs grouped by domain with instant feedback</p>
              </div>
            </Link>
            <Link href="/flashcards" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">🎴</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Flashcards</h3>
                <p className="text-gray-600 dark:text-gray-400">Key concepts and best practices</p>
              </div>
            </Link>
            <Link href="/cheatsheets" className="block">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Cheat Sheets</h3>
                <p className="text-gray-600 dark:text-gray-400">Quick reference guides per domain</p>
              </div>
            </Link>
          </section>

          {/* Domains */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Exam Domains</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {domains.map((domain) => {
                const domainProgress = progress.byDomain[domain.id] || { total: 0, correct: 0 };
                const domainAccuracy = domainProgress.total > 0 
                  ? Math.round((domainProgress.correct / domainProgress.total) * 100) 
                  : 0;
                const questionCount = questions.filter(q => q.domain === domain.id).length;
                
                return (
                  <div key={domain.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{domain.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{domain.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{questionCount} questions</span>
                      {domainProgress.total > 0 && (
                        <span className={domainAccuracy >= 70 ? 'text-green-600' : 'text-orange-600'}>
                          {domainAccuracy}% complete
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
