// CCA Exam domains and questions data
export interface Question {
  id: string;
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  domain: string;
  front: string;
  back: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
}

export const domains: Domain[] = [
  { id: 'prompt-engineering', name: 'Prompt Engineering', description: 'Master the art of crafting effective prompts for LLMs' },
  { id: 'code-generation', name: 'Code Generation', description: 'Generate clean, efficient code with AI assistance' },
  { id: 'debugging', name: 'AI-Assisted Debugging', description: 'Use AI to find and fix bugs faster' },
  { id: 'data-analysis', name: 'Data Analysis', description: 'Analyze data and generate insights with AI' },
  { id: 'workflow-automation', name: 'Workflow Automation', description: 'Automate repetitive tasks with AI' },
];

export const questions: Question[] = [
  // Prompt Engineering
  {
    id: 'pe-1',
    domain: 'prompt-engineering',
    question: 'What is the primary benefit of using few-shot prompting?',
    options: [
      'It reduces API costs',
      'It helps the model understand the desired output format through examples',
      'It speeds up response time',
      'It enables real-time learning'
    ],
    correctAnswer: 1,
    explanation: 'Few-shot prompting provides example(s) in the prompt to guide the model toward desired outputs without fine-tuning.'
  },
  {
    id: 'pe-2',
    domain: 'prompt-engineering',
    question: 'Which technique involves telling the AI to "think step by step"?',
    options: [
      'Chain of Thought',
      'Zero-shot prompting',
      'Prompt injection',
      'Temperature scaling'
    ],
    correctAnswer: 0,
    explanation: 'Chain of Thought (CoT) prompting encourages the model to show its reasoning process, improving performance on complex tasks.'
  },
  {
    id: 'pe-3',
    domain: 'prompt-engineering',
    question: 'What is prompt injection?',
    options: [
      'A way to speed up prompts',
      'A security vulnerability where malicious instructions override original prompts',
      'A prompting technique for code generation',
      'A method to compress prompts'
    ],
    correctAnswer: 1,
    explanation: 'Prompt injection occurs when user input contains instructions that override or bypass the original prompt instructions.'
  },
  // Code Generation
  {
    id: 'cg-1',
    domain: 'code-generation',
    question: 'What is the best practice when asking an AI to write code?',
    options: [
      'Be vague to allow creativity',
      'Provide clear requirements, language, and expected behavior',
      'Always ask for the shortest solution',
      'Avoid providing test cases'
    ],
    correctAnswer: 1,
    explanation: 'Clear specifications help the AI generate accurate code. Include language, framework, inputs, outputs, and edge cases.'
  },
  {
    id: 'cg-2',
    domain: 'code-generation',
    question: 'When using AI for code generation, what should you always do?',
    options: [
      'Copy code without review',
      'Test and validate the generated code',
      'Use the first code snippet suggested',
      'Avoid reading the explanation'
    ],
    correctAnswer: 1,
    explanation: 'AI-generated code may have bugs or security issues. Always review, test, and validate before using in production.'
  },
  // Debugging
  {
    id: 'db-1',
    domain: 'debugging',
    question: 'What information should you provide when asking an AI to help debug?',
    options: [
      'Just the error message',
      'The full error message, relevant code, and what you\'ve tried',
      'Only the line causing the error',
      'A screenshot of the problem'
    ],
    correctAnswer: 1,
    explanation: 'Providing context (error message, code, attempts) helps the AI understand and accurately diagnose the issue.'
  },
  {
    id: 'db-2',
    domain: 'debugging',
    question: 'What is "rubber duck debugging" in the context of AI assistance?',
    options: [
      'A debugging tool for Python',
      'Explaining your problem to an AI (or duck) to clarify your thinking',
      'A method to test UI elements',
      'An encryption technique'
    ],
    correctAnswer: 1,
    explanation: 'The practice of explaining problems aloud (to an AI or object) often helps identify the solution through verbalization.'
  },
  // Data Analysis
  {
    id: 'da-1',
    domain: 'data-analysis',
    question: 'What is the first step when using AI for data analysis?',
    options: [
      'Ask for visualizations immediately',
      'Clean and prepare your data',
      'Draw conclusions',
      'Share data publicly'
    ],
    correctAnswer: 1,
    explanation: 'AI works best with clean, well-structured data. Always clean and prepare your data before analysis.'
  },
  // Workflow Automation
  {
    id: 'wa-1',
    domain: 'workflow-automation',
    question: 'What makes a good candidate for AI workflow automation?',
    options: [
      'Highly creative tasks',
      'Repetitive, rule-based processes',
      'One-time only tasks',
      'Tasks requiring human judgment only'
    ],
    correctAnswer: 1,
    explanation: 'Repetitive, rule-based tasks are ideal for automation as they follow consistent patterns.'
  },
  {
    id: 'wa-2',
    domain: 'workflow-automation',
    question: 'Which tool is commonly used for AI-powered workflow automation?',
    options: [
      'Microsoft Word',
      'Zapier or Make (Integromat)',
      'Adobe Photoshop',
      'Spotify'
    ],
    correctAnswer: 1,
    explanation: 'Zapier, Make (formerly Integromat), and similar tools connect apps and automate workflows with AI capabilities.'
  }
];

export const flashcards: Flashcard[] = [
  { id: 'fc-1', domain: 'prompt-engineering', front: 'Zero-shot prompting', back: 'Asking the model to perform a task without any examples in the prompt. Relies on the model\'s pre-trained knowledge.' },
  { id: 'fc-2', domain: 'prompt-engineering', front: 'Few-shot prompting', back: 'Including 2-5 examples in the prompt to guide the model toward desired output format and style.' },
  { id: 'fc-3', domain: 'code-generation', front: 'Code review checklist', back: '1. Does it compile?\n2. Are there tests?\n3. Is it secure?\n4. Is it readable?\n5. Does it handle edge cases?' },
  { id: 'fc-4', domain: 'debugging', front: 'Effective bug report', back: '1. Expected behavior\n2. Actual behavior\n3. Steps to reproduce\n4. Error message\n5. What you\'ve tried' },
  { id: 'fc-5', domain: 'data-analysis', front: 'Data cleaning essentials', back: '1. Remove duplicates\n2. Handle missing values\n3. Standardize formats\n4. Check for outliers\n5. Validate data types' },
  { id: 'fc-6', domain: 'workflow-automation', front: 'Automation success factors', back: '1. Clear trigger\n2. Defined actions\n3. Error handling\n4. Logging/monitoring\n5. Regular review' },
];
