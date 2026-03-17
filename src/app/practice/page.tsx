'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { domains, questions, Question } from '@/lib/data';
import { getQuizState, saveQuizState, getProgress, saveProgress } from '@/lib/storage';

export default function Practice() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [quizState, setQuizState] = useState(getQuizState());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cca-dark-mode') === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const startQuiz = (domainId: string) => {
    const domainQuestions = questions.filter(q => q.domain === domainId);
    const newState = {
      questions: domainQuestions.map(q => q.id),
      currentIndex: 0,
      answers: {},
      seen: [...new Set([...quizState.seen, ...domainQuestions.map(q => q.id)])],
    };
    setQuizState(newState);
    saveQuizState(newState);
    setSelectedDomain(domainId);
    setCurrentQuestion(domainQuestions[0]);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const progress = getProgress();
    
    // Update progress
    progress.totalAnswered += 1;
    if (isCorrect) progress.correct += 1;
    if (!progress.byDomain[currentQuestion.domain]) {
      progress.byDomain[currentQuestion.domain] = { total: 0, correct: 0 };
    }
    progress.byDomain[currentQuestion.domain].total += 1;
    if (isCorrect) progress.byDomain[currentQuestion.domain].correct += 1;
    
    saveProgress(progress);

    // Update quiz state
    const newAnswers = { ...quizState.answers, [currentQuestion.id]: selectedAnswer };
    const newState = { ...quizState, answers: newAnswers };
    setQuizState(newState);
    saveQuizState(newState);
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    const domainQuestions = questions.filter(q => q.domain === selectedDomain);
    const nextIndex = quizState.currentIndex + 1;
    
    if (nextIndex >= domainQuestions.length) {
      // Quiz complete
      router.push('/');
      return;
    }

    const newState = { ...quizState, currentIndex: nextIndex };
    setQuizState(newState);
    saveQuizState(newState);
    setCurrentQuestion(domainQuestions[nextIndex]);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('cca-dark-mode', String(!darkMode));
  };

  if (!selectedDomain) {
    return (
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="min-h-screen dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  ← Back
                </Link>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Practice Mode</h1>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-lg text-gray-700 dark:text-gray-300 mb-6">Select a domain to practice:</h2>
            <div className="grid gap-4">
              {domains.map((domain) => {
                const questionCount = questions.filter(q => q.domain === domain.id).length;
                return (
                  <button
                    key={domain.id}
                    onClick={() => startQuiz(domain.id)}
                    className="text-left bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent hover:border-blue-500"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{domain.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{domain.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{questionCount} questions</p>
                  </button>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const domainQuestions = questions.filter(q => q.domain === selectedDomain);
  const domain = domains.find(d => d.id === selectedDomain);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setSelectedDomain(null); setShowExplanation(false); }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                ← Exit
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{domain?.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {quizState.currentIndex + 1} / {domainQuestions.length}
              </span>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 bg-blue-500 rounded-full transition-all"
                style={{ width: `${((quizState.currentIndex + 1) / domainQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg text-gray-900 dark:text-white mb-6">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let optionClass = 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700';
                
                if (showExplanation) {
                  if (index === currentQuestion.correctAnswer) {
                    optionClass = 'border-green-500 bg-green-50 dark:bg-green-900/20';
                  } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                    optionClass = 'border-red-500 bg-red-50 dark:bg-red-900/20';
                  }
                } else if (selectedAnswer === index) {
                  optionClass = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && setSelectedAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${optionClass}`}
                  >
                    <span className="font-medium text-gray-900 dark:text-white mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                </h3>
                <p className="text-blue-800 dark:text-blue-200">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            {!showExplanation ? (
              <button
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                {quizState.currentIndex + 1 >= domainQuestions.length ? 'Finish' : 'Next Question'}
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
