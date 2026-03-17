'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { domains, flashcards, Flashcard } from '@/lib/data';
import { getFlashcardState, saveFlashcardState } from '@/lib/storage';

export default function Flashcards() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [cardState, setCardState] = useState(getFlashcardState());
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cca-dark-mode') === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const startFlashcards = (domainId: string) => {
    const domainCards = flashcards.filter(c => c.domain === domainId);
    const newState = {
      cards: domainCards.map(c => c.id),
      currentIndex: 0,
    };
    setCardState(newState);
    saveFlashcardState(newState);
    setSelectedDomain(domainId);
    setCurrentCard(domainCards[0]);
    setIsFlipped(false);
  };

  const nextCard = () => {
    const domainCards = flashcards.filter(c => c.domain === selectedDomain);
    const nextIndex = cardState.currentIndex + 1;
    
    if (nextIndex >= domainCards.length) {
      setSelectedDomain(null);
      return;
    }

    const newState = { ...cardState, currentIndex: nextIndex };
    setCardState(newState);
    saveFlashcardState(newState);
    setCurrentCard(domainCards[nextIndex]);
    setIsFlipped(false);
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
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
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
            <h2 className="text-lg text-gray-700 dark:text-gray-300 mb-6">Select a domain:</h2>
            <div className="grid gap-4">
              {domains.map((domain) => {
                const cardCount = flashcards.filter(c => c.domain === domain.id).length;
                if (cardCount === 0) return null;
                return (
                  <button
                    key={domain.id}
                    onClick={() => startFlashcards(domain.id)}
                    className="text-left bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent hover:border-purple-500"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{domain.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{cardCount} cards</p>
                  </button>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!currentCard) return null;

  const domainCards = flashcards.filter(c => c.domain === selectedDomain);
  const domain = domains.find(d => d.id === selectedDomain);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedDomain(null)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                ← Exit
              </button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{domain?.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {cardState.currentIndex + 1} / {domainCards.length}
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
                className="h-2 bg-purple-500 rounded-full transition-all"
                style={{ width: `${((cardState.currentIndex + 1) / domainCards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[300px] bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 cursor-pointer perspective-1000"
          >
            <div className={`relative w-full h-full min-h-[250px] transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* Front */}
              <div className={`absolute inset-0 backface-hidden ${isFlipped ? 'hidden' : 'flex flex-col justify-center items-center'}`}>
                <span className="text-sm text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-4">Question</span>
                <h2 className="text-2xl text-center text-gray-900 dark:text-white">{currentCard.front}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-8">Tap to reveal answer</p>
              </div>
              
              {/* Back */}
              <div className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-center items-center bg-purple-50 dark:bg-purple-900/20 rounded-lg`}>
                <span className="text-sm text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-4">Answer</span>
                <p className="text-xl text-center text-gray-900 dark:text-white whitespace-pre-line">{currentCard.back}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center mt-8">
            <button
              onClick={nextCard}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              {cardState.currentIndex + 1 >= domainCards.length ? 'Finish' : 'Next Card'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
