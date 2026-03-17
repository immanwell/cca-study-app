'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { domains } from '@/lib/data';

const cheatsheets: Record<string, { title: string; content: string[] }[]> = {
  'prompt-engineering': [
    {
      title: 'Prompt Types',
      content: [
        '• Zero-shot: No examples, rely on model knowledge',
        '• Few-shot: 2-5 examples to show format',
        '• Chain of Thought: "Think step by step" for reasoning',
        '• Role-based: Assign persona (e.g., "You are a senior developer")',
      ],
    },
    {
      title: 'Best Practices',
      content: [
        '• Be specific and clear in instructions',
        '• Use delimiters for structured input (```, ===)',
        '• Break complex tasks into steps',
        '• Include constraints and format requirements',
        '• Provide context when needed',
      ],
    },
    {
      title: 'Common Pitfalls',
      content: [
        '• Vague prompts lead to unpredictable outputs',
        '• Prompt injection: malicious input overrides your instructions',
        '• Forgetting to specify output format',
        '• Overloading prompts with too many tasks',
      ],
    },
  ],
  'code-generation': [
    {
      title: 'Effective Code Prompts',
      content: [
        '• Specify language/framework explicitly',
        '• Describe input, output, and edge cases',
        '• Request error handling when needed',
        '• Ask for comments and documentation',
        '• Include performance requirements if any',
      ],
    },
    {
      title: 'Code Review Checklist',
      content: [
        '• Does it compile/run without errors?',
        '• Are there unit tests?',
        '• Is there proper error handling?',
        '• Is the code readable and maintainable?',
        '• Does it handle edge cases?',
        '• Are there security vulnerabilities?',
      ],
    },
  ],
  'debugging': [
    {
      title: 'Effective Bug Reports',
      content: [
        '1. Expected behavior vs actual',
        '2. Steps to reproduce',
        '3. Full error message/stack trace',
        '4. What you\'ve already tried',
        '5. Relevant code snippets',
        '6. Environment details',
      ],
    },
    {
      title: 'AI Debugging Tips',
      content: [
        '• Share the full error message',
        '• Include relevant context (language, framework)',
        '• Show what you\'ve already attempted',
        '• Ask for explanations, not just fixes',
        '• Request multiple approaches',
      ],
    },
  ],
  'data-analysis': [
    {
      title: 'Data Preparation',
      content: [
        '• Remove duplicate entries',
        '• Handle missing values (drop or impute)',
        '• Standardize data formats',
        '• Check for outliers',
        '• Validate data types',
        '• Document data cleaning steps',
      ],
    },
    {
      title: 'AI Analysis Prompts',
      content: [
        '• Specify the analysis goal',
        '• Describe data structure/columns',
        '• Request specific visualizations',
        '• Ask for insights and patterns',
        '• Request statistical summaries',
      ],
    },
  ],
  'workflow-automation': [
    {
      title: 'Automation Candidates',
      content: [
        '✓ Repetitive tasks (daily reports)',
        '✓ Rule-based processes',
        '✓ Data transfer between apps',
        '✓ Notifications and alerts',
        '✗ Highly creative tasks',
        '✗ Complex decisions requiring judgment',
      ],
    },
    {
      title: 'Automation Tools',
      content: [
        '• Zapier: Simple app integrations',
        '• Make (Integromat): Complex workflows',
        '• n8n: Self-hosted automation',
        '• Custom scripts: Python/Node.js',
        '• Cron jobs: Scheduled tasks',
      ],
    },
  ],
};

export default function Cheatsheets() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="min-h-screen dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                ← Back
              </Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Cheat Sheets</h1>
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
          {!selectedDomain ? (
            <>
              <h2 className="text-lg text-gray-700 dark:text-gray-300 mb-6">Select a domain:</h2>
              <div className="grid gap-4">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain.id)}
                    className="text-left bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-2 border-transparent hover:border-green-500"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{domain.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{domain.description}</p>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setSelectedDomain(null)}
                className="mb-6 text-green-600 dark:text-green-400 hover:underline"
              >
                ← Back to domains
              </button>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {domains.find(d => d.id === selectedDomain)?.name} Cheat Sheet
              </h2>
              <div className="space-y-6">
                {cheatsheets[selectedDomain]?.map((section, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">{section.title}</h3>
                    <div className="space-y-2">
                      {section.content.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
