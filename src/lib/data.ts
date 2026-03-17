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
  weight: string;
}

export const domains: Domain[] = [
  { id: 'agentic-architecture', name: 'Agentic Architecture & Orchestration', description: 'Design and implement agentic loops, multi-agent systems, and workflow automation', weight: '27%' },
  { id: 'tool-design', name: 'Tool Design & MCP Integration', description: 'Build effective MCP tools, error handling, and server integrations', weight: '18%' },
  { id: 'claude-code-config', name: 'Claude Code Configuration & Workflows', description: 'Configure CLAUDE.md, slash commands, skills, and CI/CD integration', weight: '20%' },
  { id: 'prompt-engineering', name: 'Prompt Engineering & Structured Output', description: 'Design prompts, JSON schemas, few-shot examples, and extraction patterns', weight: '20%' },
  { id: 'context-management', name: 'Context Management & Reliability', description: 'Manage conversation context, escalation patterns, and error propagation', weight: '15%' },
];

export const questions: Question[] = [
  // Domain 1: Agentic Architecture & Orchestration
  {
    id: 'aa-1',
    domain: 'agentic-architecture',
    question: 'What does the stop_reason "tool_use" indicate in an agentic loop?',
    options: [
      'The task is complete and Claude is returning final output',
      'Claude wants to call a tool and continue the conversation',
      'An error occurred and the loop should terminate',
      'The conversation has reached the context limit'
    ],
    correctAnswer: 1,
    explanation: 'stop_reason "tool_use" means Claude wants to execute a tool and continue. stop_reason "end_turn" indicates completion.'
  },
  {
    id: 'aa-2',
    domain: 'agentic-architecture',
    question: 'In a coordinator-subagent pattern, how do subagents receive context?',
    options: [
      'They automatically inherit the coordinator\'s conversation history',
      'Context must be explicitly provided in the subagent prompt',
      'They share a common memory bank',
      'Context is passed through environment variables'
    ],
    correctAnswer: 1,
    explanation: 'Subagents do not automatically inherit context. All relevant information must be explicitly passed in the subagent prompt.'
  },
  {
    id: 'aa-3',
    domain: 'agentic-architecture',
    question: 'When should you use programmatic enforcement (hooks) over prompt-based guidance?',
    options: [
      'When you want probabilistic compliance',
      'When deterministic compliance is required (e.g., identity verification before financial ops)',
      'When the task is simple and straightforward',
      'When you want the agent to make all decisions'
    ],
    correctAnswer: 1,
    explanation: 'Programmatic enforcement provides deterministic guarantees. Prompt instructions have a non-zero failure rate, which is unacceptable for critical operations like financial transactions.'
  },
  {
    id: 'aa-4',
    domain: 'agentic-architecture',
    question: 'What is the Task tool used for?',
    options: [
      'Running unit tests',
      'Spawning subagents from a coordinator agent',
      'Scheduling background jobs',
      'Creating new files'
    ],
    correctAnswer: 1,
    explanation: 'The Task tool is the mechanism for spawning subagents. allowedTools must include "Task" for a coordinator to invoke subagents.'
  },
  {
    id: 'aa-5',
    domain: 'agentic-architecture',
    question: 'What is fork_session used for?',
    options: [
      'Resuming a previous conversation',
      'Creating independent branches from a shared analysis baseline to explore divergent approaches',
      'Copying files between directories',
      'Merging two git branches'
    ],
    correctAnswer: 1,
    explanation: 'fork_session creates independent branches from a shared analysis baseline to explore different approaches (e.g., comparing testing strategies).'
  },
  // Domain 2: Tool Design & MCP Integration
  {
    id: 'td-1',
    domain: 'tool-design',
    question: 'What is the primary mechanism LLMs use for tool selection?',
    options: [
      'Tool names',
      'Tool descriptions',
      'Tool parameters',
      'Tool categories'
    ],
    correctAnswer: 1,
    explanation: 'Tool descriptions are the primary mechanism LLMs use for tool selection. Minimal descriptions lead to unreliable selection among similar tools.'
  },
  {
    id: 'td-2',
    domain: 'tool-design',
    question: 'What does the MCP isError flag pattern do?',
    options: [
      'Marks a tool as deprecated',
      'Communicates tool failures back to the agent',
      'Enables tool retry logic',
      'Logs tool execution times'
    ],
    correctAnswer: 1,
    explanation: 'The isError flag pattern communicates tool failures back to the agent so it can make appropriate recovery decisions.'
  },
  {
    id: 'td-3',
    domain: 'tool-design',
    question: 'How many tools should an agent ideally have access to for reliable selection?',
    options: [
      'As many as needed',
      '18 or more',
      '4-5 tools',
      'Only 1-2 tools'
    ],
    correctAnswer: 2,
    explanation: 'Giving an agent access to too many tools (e.g., 18 instead of 4-5) degrades tool selection reliability by increasing decision complexity.'
  },
  {
    id: 'td-4',
    domain: 'tool-design',
    question: 'What is tool_choice "any" mode used for?',
    options: [
      'Forcing a specific tool to be called',
      'Guaranteeing the model calls a tool rather than returning conversational text',
      'Allowing the model to choose any tool freely',
      'Disabling all tools'
    ],
    correctAnswer: 1,
    explanation: 'tool_choice: "any" guarantees the model calls a tool rather than returning conversational text.'
  },
  {
    id: 'td-5',
    domain: 'tool-design',
    question: 'What is the difference between access failures and valid empty results?',
    options: [
      'They are the same thing',
      'Access failures need retry decisions; empty results are successful queries with no matches',
      'Access failures are successes; empty results are failures',
      'Neither matters for error handling'
    ],
    correctAnswer: 1,
    explanation: 'Access failures (timeouts) need retry decisions. Valid empty results represent successful queries with no matches and should not trigger retries.'
  },
  // Domain 3: Claude Code Configuration & Workflows
  {
    id: 'cc-1',
    domain: 'claude-code-config',
    question: 'Where should project-scoped slash commands be stored?',
    options: [
      '~/.claude/commands/',
      '.claude/commands/ in the project repository',
      'In CLAUDE.md',
      'In .claude/config.json'
    ],
    correctAnswer: 1,
    explanation: 'Project-scoped commands in .claude/commands/ are version-controlled and available to all developers when they clone the repo.'
  },
  {
    id: 'cc-2',
    domain: 'claude-code-config',
    question: 'What does the -p (--print) flag do in Claude Code?',
    options: [
      'Prints the version number',
      'Runs Claude in non-interactive mode for automated pipelines',
      'Enables pretty printing of JSON output',
      'Prints debug information'
    ],
    correctAnswer: 1,
    explanation: 'The -p flag runs Claude Code in non-interactive mode, processing the prompt and outputting to stdout without waiting for input.'
  },
  {
    id: 'cc-3',
    domain: 'claude-code-config',
    question: 'What is plan mode designed for?',
    options: [
      'Simple, well-scoped changes',
      'Complex tasks involving large-scale changes, multiple approaches, and architectural decisions',
      'Running unit tests',
      'Quick one-liner commands'
    ],
    correctAnswer: 1,
    explanation: 'Plan mode enables safe codebase exploration and design before committing to changes, ideal for complex tasks with architectural implications.'
  },
  {
    id: 'cc-4',
    domain: 'claude-code-config',
    question: 'What does context: fork frontmatter do in a skill?',
    options: [
      'Forks the repository',
      'Runs the skill in an isolated sub-agent context, preventing output from polluting the main conversation',
      'Creates a new git branch',
      'Duplicates the skill for each use'
    ],
    correctAnswer: 1,
    explanation: 'context: fork runs skills in isolated sub-agent context, preventing verbose output from polluting the main conversation.'
  },
  {
    id: 'cc-5',
    domain: 'claude-code-config',
    question: 'What is the CLAUDE.md hierarchy from lowest to highest priority?',
    options: [
      'User-level → Project-level → Directory-level',
      'Directory-level → Project-level → User-level',
      'Project-level → User-level → Directory-level',
      'User-level = Project-level = Directory-level'
    ],
    correctAnswer: 1,
    explanation: 'Directory-level (subdirectory) CLAUDE.md has highest priority, then project-level, then user-level (~/.claude/CLAUDE.md).'
  },
  // Domain 4: Prompt Engineering & Structured Output
  {
    id: 'pe-1',
    domain: 'prompt-engineering',
    question: 'What is few-shot prompting most effective for?',
    options: [
      'Reducing API costs',
      'Achieving consistently formatted, actionable output when detailed instructions alone produce inconsistent results',
      'Faster responses',
      'Larger context windows'
    ],
    correctAnswer: 1,
    explanation: 'Few-shot examples demonstrate ambiguous-case handling and enable the model to generalize judgment to novel patterns.'
  },
  {
    id: 'pe-2',
    domain: 'prompt-engineering',
    question: 'What does tool use with JSON schemas guarantee?',
    options: [
      'Semantic correctness of extracted data',
      'Schema-compliant structured output, eliminating JSON syntax errors',
      'Faster processing',
      'Lower costs'
    ],
    correctAnswer: 1,
    explanation: 'Tool use with JSON schemas eliminates syntax errors but does not prevent semantic errors (e.g., values in wrong fields).'
  },
  {
    id: 'pe-3',
    domain: 'prompt-engineering',
    question: 'When are retries ineffective for extraction quality?',
    options: [
      'When there are format mismatches',
      'When the required information is absent from the source document',
      'When using few-shot examples',
      'When using JSON schemas'
    ],
    correctAnswer: 1,
    explanation: 'Retries are ineffective when required information is simply absent from the source document. They work for format or structural errors.'
  },
  {
    id: 'pe-4',
    domain: 'prompt-engineering',
    question: 'What is the Message Batches API best used for?',
    options: [
      'Pre-merge checks that developers wait for',
      'Non-blocking, latency-tolerant workloads (overnight reports, weekly audits)',
      'Real-time user interactions',
      'Single-shot queries'
    ],
    correctAnswer: 1,
    explanation: 'Batch API has no guaranteed latency SLA and is inappropriate for blocking workflows. It offers 50% cost savings for non-blocking tasks.'
  },
  {
    id: 'pe-5',
    domain: 'prompt-engineering',
    question: 'Why is self-review limited in effectiveness?',
    options: [
      'The model is too critical of itself',
      'A model retains reasoning context from generation, making it less likely to question its own decisions',
      'Self-review is always accurate',
      'Models cannot review'
    ],
    correctAnswer: 1,
    explanation: 'Independent review instances without prior reasoning context are more effective at catching subtle issues than self-review.'
  },
  // Domain 5: Context Management & Reliability
  {
    id: 'cm-1',
    domain: 'context-management',
    question: 'What is the "lost in the middle" effect?',
    options: [
      'Models forget user names over time',
      'Models reliably process information at the beginning and end of long inputs but may omit findings from middle sections',
      'Context windows have fixed sizes',
      'Long documents cannot be processed'
    ],
    correctAnswer: 1,
    explanation: 'Models reliably process information at the beginning and end of long inputs but may omit findings from middle sections.'
  },
  {
    id: 'cm-2',
    domain: 'context-management',
    question: 'What are appropriate escalation triggers for customer support agents?',
    options: [
      'Complex cases only',
      'Customer requests for a human, policy exceptions/gaps, and inability to make meaningful progress',
      'Low confidence scores only',
      'Negative sentiment only'
    ],
    correctAnswer: 1,
    explanation: 'Escalation triggers include: customer explicitly requests human, policy is ambiguous/silent on request, and inability to make progress.'
  },
  {
    id: 'cm-3',
    domain: 'context-management',
    question: 'What information should structured error context include?',
    options: [
      'Just the error message',
      'Failure type, attempted query, partial results, and potential alternatives',
      'Timestamp only',
      'Stack trace only'
    ],
    correctAnswer: 1,
    explanation: 'Structured error context including failure type, attempted query, partial results, and alternatives enables intelligent coordinator recovery.'
  },
  {
    id: 'cm-4',
    domain: 'context-management',
    question: 'What is progressive summarization risk?',
    options: [
      'Summarization improves context efficiency',
      'Condensing numerical values, percentages, dates, and customer-stated expectations into vague summaries',
      'Longer summaries are always better',
      'There are no risks to summarization'
    ],
    correctAnswer: 1,
    explanation: 'Progressive summarization risks losing transactional facts (amounts, dates, order numbers) when condensing into vague summaries.'
  },
  {
    id: 'cm-5',
    domain: 'context-management',
    question: 'How should conflicting statistics from credible sources be handled?',
    options: [
      'Arbitrarily select one value',
      'Annotate conflicts with source attribution rather than selecting one',
      'Ignore conflicts',
      'Report as errors'
    ],
    correctAnswer: 1,
    explanation: 'Conflicting statistics should be annotated with source attribution, letting the coordinator decide how to reconcile before synthesis.'
  }
];

export const flashcards: Flashcard[] = [
  // Domain 1
  { id: 'fc-aa-1', domain: 'agentic-architecture', front: 'Agentic Loop Lifecycle', back: 'Send request → Inspect stop_reason ("tool_use" vs "end_turn") → Execute tools → Return results for next iteration' },
  { id: 'fc-aa-2', domain: 'agentic-architecture', front: 'Coordinator Pattern', back: 'Hub-and-spoke: coordinator manages all inter-subagent communication, error handling, and information routing' },
  { id: 'fc-aa-3', domain: 'agentic-architecture', front: 'Programmatic vs Prompt Enforcement', back: 'Programmatic (hooks): deterministic compliance for critical ops (financial). Prompt: probabilistic, for non-critical tasks.' },
  // Domain 2
  { id: 'fc-td-1', domain: 'tool-design', front: 'Tool Description Best Practices', back: 'Include: input formats, example queries, edge cases, boundary explanations, when to use vs similar tools' },
  { id: 'fc-td-2', domain: 'tool-design', front: 'Structured Error Response', back: 'Include: errorCategory (transient/validation/permission), isRetryable, human-readable descriptions' },
  { id: 'fc-td-3', domain: 'tool-design', front: 'Tool Choice Options', back: 'auto: may return text | any: must call tool | forced: must call specific named tool' },
  // Domain 3
  { id: 'fc-cc-1', domain: 'claude-code-config', front: 'CLAUDE.md Hierarchy', back: 'User-level (~/.claude/) → Project-level → Directory-level (highest priority)' },
  { id: 'fc-cc-2', domain: 'claude-code-config', front: 'Slash Command Locations', back: 'Project: .claude/commands/ (version controlled) | Personal: ~/.claude/commands/' },
  { id: 'fc-cc-3', domain: 'claude-code-config', front: 'Plan Mode Use Cases', back: 'Complex tasks: large-scale changes, architectural decisions, multi-file modifications | Direct: simple, well-scoped changes' },
  // Domain 4
  { id: 'fc-pe-1', domain: 'prompt-engineering', front: 'Few-Shot Effectiveness', back: 'Most effective for consistently formatted output, ambiguous-case handling, reducing hallucination in extraction' },
  { id: 'fc-pe-2', domain: 'prompt-engineering', front: 'JSON Schema Tool Use', back: 'Eliminates syntax errors but NOT semantic errors (e.g., values in wrong fields)' },
  { id: 'fc-pe-3', domain: 'prompt-engineering', front: 'Batch API Trade-offs', back: '50% cost savings, up to 24hr processing, no latency SLA. Use: non-blocking. Avoid: pre-merge checks.' },
  // Domain 5
  { id: 'fc-cm-1', domain: 'context-management', front: 'Lost in the Middle', back: 'Models process start/end reliably but may miss middle sections of long inputs' },
  { id: 'fc-cm-2', domain: 'context-management', front: 'Escalation Triggers', back: '1) Customer requests human 2) Policy exceptions/gaps 3) Cannot make meaningful progress' },
  { id: 'fc-cm-3', domain: 'context-management', front: 'Error Propagation', back: 'Return: failure type, attempted query, partial results, alternatives. Distinguish access failures from valid empty results.' },
];
