// CCA Certified Architect - Real Exam domains and questions data
// Based on official exam guide - EXPANDED VERSION (100+ questions)

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
  { id: 'agentic-architecture', name: 'Agentic Architecture & Orchestration', description: 'Design and implement agentic loops, multi-agent systems, and orchestration patterns', weight: '27%' },
  { id: 'tool-design-mcp', name: 'Tool Design & MCP Integration', description: 'Design effective tool interfaces, MCP servers, and tool choice configuration', weight: '18%' },
  { id: 'claude-code-config', name: 'Claude Code Configuration & Workflows', description: 'Configure CLAUDE.md, custom commands, skills, and CI/CD integration', weight: '20%' },
  { id: 'prompt-engineering', name: 'Prompt Engineering & Structured Output', description: 'Design prompts with explicit criteria, few-shot prompting, JSON schemas', weight: '20%' },
  { id: 'context-management', name: 'Context Management & Reliability', description: 'Manage conversation context, escalation patterns, error propagation', weight: '15%' },
];

export const questions: Question[] = [
  // DOMAIN 1: Agentic Architecture & Orchestration (27%)
  { id: 'aa-1', domain: 'agentic-architecture', question: 'What stop_reason value indicates the agent wants to use a tool?', options: ['end_turn', 'tool_use', 'complete', 'finish'], correctAnswer: 1, explanation: 'stop_reason "tool_use" means Claude wants to call a tool. "end_turn" means final response.' },
  { id: 'aa-2', domain: 'agentic-architecture', question: 'How are tool results used in conversation history?', options: ['Not included', 'Appended so model can reason about next action', 'Only final responses', 'Replace messages'], correctAnswer: 1, explanation: 'Tool results are appended so the model can reason about the next action.' },
  { id: 'aa-3', domain: 'agentic-architecture', question: 'Which is an anti-pattern for loop termination?', options: ['Checking stop_reason', 'Parsing natural language signals', 'Using end_turn', 'Tool results'], correctAnswer: 1, explanation: 'Parsing natural language signals is an anti-pattern. Use stop_reason values.' },
  { id: 'aa-4', domain: 'agentic-architecture', question: 'What is model-driven decision-making?', options: ['Uses if/else', 'Claude reasons about which tool to call based on context', 'Pre-configured', 'Fixed sequence'], correctAnswer: 1, explanation: 'Claude reasons about tool selection based on context.' },
  { id: 'aa-5', domain: 'agentic-architecture', question: 'What is hub-and-spoke architecture?', options: ['Subagents communicate directly', 'Coordinator manages all communication', 'Central database', 'Message queue'], correctAnswer: 1, explanation: 'Coordinator agent manages all inter-subagent communication.' },
  { id: 'aa-6', domain: 'agentic-architecture', question: 'Do subagents inherit coordinator history?', options: ['Yes always', 'No - isolated context', 'Only summaries', 'From parent'], correctAnswer: 1, explanation: 'Subagents operate with isolated context—no automatic inheritance.' },
  { id: 'aa-7', domain: 'agentic-architecture', question: 'Risk of overly narrow task decomposition?', options: ['Faster execution', 'Incomplete coverage', 'Better resources', 'More accuracy'], correctAnswer: 1, explanation: 'Overly narrow decomposition leads to incomplete topic coverage.' },
  { id: 'aa-8', domain: 'agentic-architecture', question: 'How partition research across subagents?', options: ['Same topics', 'Assign distinct subtopics to minimize duplication', 'Random', 'One agent only'], correctAnswer: 1, explanation: 'Assign distinct subtopics/source types to each agent.' },
  { id: 'aa-9', domain: 'agentic-architecture', question: 'What is iterative refinement loop?', options: ['Agents call each other', 'Coordinator evaluates gaps, re-delegates with targeted queries', 'All parallel', 'Single pass'], correctAnswer: 1, explanation: 'Coordinator evaluates gaps and re-delegates until coverage sufficient.' },
  { id: 'aa-10', domain: 'agentic-architecture', question: 'Tool to spawn subagents?', options: ['Spawn', 'Agent', 'Task', 'Delegate'], correctAnswer: 2, explanation: 'Task tool spawns subagents.' },
  { id: 'aa-11', domain: 'agentic-architecture', question: 'What required for coordinator to invoke subagents?', options: ['Admin', 'allowedTools includes Task', 'MCP', 'Specific model'], correctAnswer: 1, explanation: 'allowedTools must include "Task".' },
  { id: 'aa-12', domain: 'agentic-architecture', question: 'How do subagents receive context?', options: ['Automatic', 'Include in prompt', 'Shared memory', 'Environment'], correctAnswer: 1, explanation: 'Context must be explicitly provided in prompt.' },
  { id: 'aa-13', domain: 'agentic-architecture', question: 'How spawn parallel subagents?', options: ['Multiple turns', 'Multiple Task calls in single response', 'Parallel flag', 'Sequential'], correctAnswer: 1, explanation: 'Emit multiple Task calls in single coordinator response.' },
  { id: 'aa-14', domain: 'agentic-architecture', question: 'When use programmatic enforcement?', options: ['Always', 'When deterministic compliance required', 'Never', 'Production only'], correctAnswer: 1, explanation: 'Use for identity verification before financial operations.' },
  { id: 'aa-15', domain: 'agentic-architecture', question: 'What does structured handoff include?', options: ['Transcript', 'Customer details, root cause, actions', 'All calls', 'Nothing'], correctAnswer: 1, explanation: 'Includes customer details, root cause, recommended actions.' },
  { id: 'aa-16', domain: 'agentic-architecture', question: 'Hook transforming tool results?', options: ['PreToolUse', 'PostToolUse', 'onToolCall', 'Interceptor'], correctAnswer: 1, explanation: 'PostToolUse transforms results before model processes.' },
  { id: 'aa-17', domain: 'agentic-architecture', question: 'Hook enforcing compliance?', options: ['PreToolUse', 'PostToolUse', 'onResult', 'Complete'], correctAnswer: 0, explanation: 'PreToolUse enforces compliance on outgoing calls.' },
  { id: 'aa-18', domain: 'agentic-architecture', question: 'When use hooks over prompts?', options: ['Faster', 'When guaranteed compliance needed', 'Always', 'Never'], correctAnswer: 1, explanation: 'Use hooks when business rules need guaranteed compliance.' },
  { id: 'aa-19', domain: 'agentic-architecture', question: 'When use prompt chaining?', options: ['Open-ended', 'Predictable multi-aspect reviews', 'Never', 'Research'], correctAnswer: 1, explanation: 'Prompt chaining for predictable reviews.' },
  { id: 'aa-20', domain: 'agentic-architecture', question: 'When dynamic decomposition?', options: ['Predictable', 'Open-ended investigation', 'Never', 'Simple'], correctAnswer: 1, explanation: 'Dynamic for open-ended investigation tasks.' },
  { id: 'aa-21', domain: 'agentic-architecture', question: 'How split large code reviews?', options: ['All at once', 'Per-file + cross-file integration', 'Random', 'One pass'], correctAnswer: 1, explanation: 'Per-file passes plus cross-file to avoid attention dilution.' },
  { id: 'aa-22', domain: 'agentic-architecture', question: 'Resume specific session?', options: ['--continue', '--resume <name>', '--restore', '--session'], correctAnswer: 1, explanation: '--resume <session-name> continues prior conversation.' },
  { id: 'aa-23', domain: 'agentic-architecture', question: 'When use fork_session?', options: ['Continue', 'Create branches for divergent approaches', 'Delete', 'Merge'], correctAnswer: 1, explanation: 'Creates independent branches from shared baseline.' },
  { id: 'aa-24', domain: 'agentic-architecture', question: 'When new session over resume?', options: ['Always resume', 'When tool results stale', 'Never', 'Simple'], correctAnswer: 1, explanation: 'New session with summaries more reliable than stale results.' },

  // DOMAIN 2: Tool Design & MCP Integration (18%)
  { id: 'tm-1', domain: 'tool-design-mcp', question: 'Primary mechanism for tool selection?', options: ['Names', 'Descriptions', 'Parameters', 'Categories'], correctAnswer: 1, explanation: 'Tool descriptions are primary selection mechanism.' },
  { id: 'tm-2', domain: 'tool-design-mcp', question: 'Tool descriptions include?', options: ['Just name', 'Inputs, examples, edge cases', 'Only function', 'Nothing'], correctAnswer: 1, explanation: 'Include input formats, examples, edge cases.' },
  { id: 'tm-3', domain: 'tool-design-mcp', question: 'Problem with ambiguous descriptions?', options: ['Faster', 'Misrouting between similar tools', 'Better', 'Nothing'], correctAnswer: 1, explanation: 'Ambiguous descriptions cause misrouting.' },
  { id: 'tm-4', domain: 'tool-design-mcp', question: 'MCP flag for failure?', options: ['error: true', 'isError: true', 'failed: true', 'status: error'], correctAnswer: 1, explanation: 'isError flag communicates failures.' },
  { id: 'tm-5', domain: 'tool-design-mcp', question: 'Error categories?', options: ['Minor/Major', 'Transient, validation, business, permission', 'Retryable only', 'Fatal only'], correctAnswer: 1, explanation: 'Categories: transient, validation, business, permission.' },
  { id: 'tm-6', domain: 'tool-design-mcp', question: 'Why uniform errors bad?', options: ['Better', 'Prevents recovery decisions', 'Faster', 'Nothing'], correctAnswer: 1, explanation: 'Generic errors prevent appropriate recovery.' },
  { id: 'tm-7', domain: 'tool-design-mcp', question: 'How many tools for reliable selection?', options: ['As needed', '18+', '4-5', '1'], correctAnswer: 2, explanation: 'Too many (18 vs 4-5) degrades reliability.' },
  { id: 'tm-8', domain: 'tool-design-mcp', question: 'What is scoped tool access?', options: ['All get all', 'Only tools needed for role', 'No tools', 'Random'], correctAnswer: 1, explanation: 'Give agents only tools needed for their role.' },
  { id: 'tm-9', domain: 'tool-design-mcp', question: 'tool_choice:any guarantees?', options: ['auto', 'Tool call vs text', 'forced', 'required'], correctAnswer: 1, explanation: '"any" guarantees tool call.' },
  { id: 'tm-10', domain: 'tool-design-mcp', question: 'Difference auto vs any?', options: ['Same', 'auto=text/tool, any=forces tool', 'any slower', 'No diff'], correctAnswer: 1, explanation: 'auto allows text; any forces tool.' },
  { id: 'tm-11', domain: 'tool-design-mcp', question: 'When forced tool selection?', options: ['Never', 'Ensure specific tool called first', 'Debugging', 'Simple'], correctAnswer: 1, explanation: 'Force specific tool first.' },
  { id: 'tm-12', domain: 'tool-design-mcp', question: 'Shared team MCP location?', options: ['~/.claude.json', '.mcp.json', '/etc/mcp', 'package.json'], correctAnswer: 1, explanation: 'Project-level .mcp.json.' },
  { id: 'tm-13', domain: 'tool-design-mcp', question: 'Credentials in .mcp.json?', options: ['Hard-coded', 'Environment variable expansion', 'Not supported', 'Plain text'], correctAnswer: 1, explanation: 'Use ${TOKEN} style expansion.' },
  { id: 'tm-14', domain: 'tool-design-mcp', question: 'When tools discovered?', options: ['Each request', 'At connection time', 'Never', 'On demand'], correctAnswer: 1, explanation: 'At connection time, available simultaneously.' },
  { id: 'tm-15', domain: 'tool-design-mcp', question: 'MCP resources purpose?', options: ['Store files', 'Expose content catalogs', 'Auth', 'Nothing'], correctAnswer: 1, explanation: 'Expose content catalogs to reduce calls.' },
  { id: 'tm-16', domain: 'tool-design-mcp', question: 'Grep vs Glob?', options: ['Same', 'Grep=content, Glob=file paths', 'Opposite', 'Neither'], correctAnswer: 1, explanation: 'Grep searches content; Glob finds files.' },
  { id: 'tm-17', domain: 'tool-design-mcp', question: 'When Read+Write over Edit?', options: ['Always', 'When Edit fails (non-unique)', 'Never', 'New only'], correctAnswer: 1, explanation: 'Fallback when Edit has non-unique matches.' },

  // DOMAIN 3: Claude Code Configuration (20%)
  { id: 'cc-1', domain: 'claude-code-config', question: 'CLAUDE.md hierarchy (low to high)?', options: ['Root>Project>User', 'User>Project>Directory', 'Directory>Project>User', 'Project>User>Root'], correctAnswer: 1, explanation: 'User>Project>Directory priority.' },
  { id: 'cc-2', domain: 'claude-code-config', question: 'User-level limitation?', options: ['All users', 'Not shared via version control', 'Override project', 'Permanent'], correctAnswer: 1, explanation: 'User-level not shared with teammates.' },
  { id: 'cc-3', domain: 'claude-code-config', question: '@import syntax?', options: ['npm packages', 'Reference external files', 'Load MCP', 'CSS'], correctAnswer: 1, explanation: 'References external files for modularity.' },
  { id: 'cc-4', domain: 'claude-code-config', question: '.claude/rules/ purpose?', options: ['Aliases', 'Topic-specific rules', 'MCP config', 'Nothing'], correctAnswer: 1, explanation: 'Organize topic-specific rules.' },
  { id: 'cc-5', domain: 'claude-code-config', question: 'Project commands location?', options: ['~/.claude/', '.claude/commands/', 'src/', 'commands/'], correctAnswer: 1, explanation: '.claude/commands/ for project commands.' },
  { id: 'cc-6', domain: 'claude-code-config', question: 'context:fork does?', options: ['Runs in isolation', 'Same context', 'Disables', 'Nothing'], correctAnswer: 0, explanation: 'Runs in isolated sub-agent context.' },
  { id: 'cc-7', domain: 'claude-code-config', question: 'allowed-tools restricts?', options: ['Nothing', 'Tool access during execution', 'Network', 'Memory'], correctAnswer: 1, explanation: 'Restricts tool access.' },
  { id: 'cc-8', domain: 'claude-code-config', question: 'argument-hint?', options: ['Nothing', 'Prompts for required parameters', 'Optional only', 'Validation'], correctAnswer: 1, explanation: 'Prompts for missing parameters.' },
  { id: 'cc-9', domain: 'claude-code-config', question: 'Skills vs CLAUDE.md?', options: ['Same', 'Skills=on-demand, CLAUDE.md=always', 'Skills permanent', 'No diff'], correctAnswer: 1, explanation: 'Skills for workflows, CLAUDE.md always-loaded.' },
  { id: 'cc-10', domain: 'claude-code-config', question: 'Plan mode for?', options: ['Simple', 'Complex large-scale changes', 'Quick fixes', 'Nothing'], correctAnswer: 1, explanation: 'Complex tasks with large changes.' },
  { id: 'cc-11', domain: 'claude-code-config', question: 'Direct execution for?', options: ['Complex', 'Simple well-scoped changes', 'Research', 'Nothing'], correctAnswer: 1, explanation: 'Simple, well-scoped changes.' },
  { id: 'cc-12', domain: 'claude-code-config', question: 'Explore subagent?', options: ['Faster', 'Isolate verbose output', 'Required', 'Default'], correctAnswer: 1, explanation: 'Isolates verbose discovery.' },
  { id: 'cc-13', domain: 'claude-code-config', question: 'CLI flag non-interactive?', options: ['--interactive=false', '-p', '--batch', '--quiet'], correctAnswer: 1, explanation: '-p for non-interactive mode.' },
  { id: 'cc-14', domain: 'claude-code-config', question: 'Structured CI output?', options: ['Default', '--output-format json --json-schema', 'Not supported', 'External'], correctAnswer: 1, explanation: 'Use --output-format json --json-schema.' },
  { id: 'cc-15', domain: 'claude-code-config', question: 'Why separate review better?', options: ['Faster', 'No generation context', 'Cheaper', 'Required'], correctAnswer: 1, explanation: 'Independent review catches more issues.' },

  // DOMAIN 4: Prompt Engineering (20%)
  { id: 'pe-1', domain: 'prompt-engineering', question: 'Improve precision over vague?', options: ['Be conservative', 'Specific categorical criteria', 'Higher temp', 'More tools'], correctAnswer: 1, explanation: 'Specific criteria define what to report vs skip.' },
  { id: 'pe-2', domain: 'prompt-engineering', question: 'Why "be conservative" fails?', options: ['Always works', 'Doesnt improve precision', 'Required', 'Better'], correctAnswer: 1, explanation: 'General instructions dont improve precision.' },
  { id: 'pe-3', domain: 'prompt-engineering', question: 'Few-shot most effective for?', options: ['Prose', 'Consistent formatted output', 'Higher temp', 'Long prompts'], correctAnswer: 1, explanation: 'Few-shot examples for consistent output.' },
  { id: 'pe-4', domain: 'prompt-engineering', question: 'How many few-shot examples?', options: ['1 large', '2-4 targeted', 'As many', 'None'], correctAnswer: 1, explanation: '2-4 targeted examples.' },
  { id: 'pe-5', domain: 'prompt-engineering', question: 'Reliable schema output?', options: ['Prompts', 'Tool use with JSON schemas', 'Temperature', 'System'], correctAnswer: 1, explanation: 'Tool use guarantees schema compliance.' },
  { id: 'pe-6', domain: 'prompt-engineering', question: 'JSON schemas eliminate?', options: ['All errors', 'Syntax not semantic', 'Nothing', 'Large only'], correctAnswer: 1, explanation: 'Eliminates syntax, not semantic errors.' },
  { id: 'pe-7', domain: 'prompt-engineering', question: 'Schema for absent info?', options: ['Required', 'Optional/nullable', 'Always required', 'Remove'], correctAnswer: 1, explanation: 'Use optional when source may lack info.' },
  { id: 'pe-8', domain: 'prompt-engineering', question: 'Retry-with-feedback?', options: ['Same prompt', 'Append validation errors', 'Longer', 'Less text'], correctAnswer: 1, explanation: 'Append errors to guide correction.' },
  { id: 'pe-9', domain: 'prompt-engineering', question: 'When retries ineffective?', options: ['Format errors', 'Info absent from source', 'Always work', 'Never'], correctAnswer: 1, explanation: 'Retries fail when info absent from source.' },
  { id: 'pe-10', domain: 'prompt-engineering', question: 'Batch API appropriate for?', options: ['Blocking checks', 'Non-blocking, latency-tolerant', 'Real-time', 'Single docs'], correctAnswer: 1, explanation: 'Overnight reports, not pre-merge checks.' },
  { id: 'pe-11', domain: 'prompt-engineering', question: 'Why self-review less effective?', options: ['Better', 'Retains generation context', 'Slower', 'Expensive'], correctAnswer: 1, explanation: 'Model less likely to question own decisions.' },
  { id: 'pe-12', domain: 'prompt-engineering', question: 'Split large reviews?', options: ['All together', 'Per-file + cross-file passes', 'Random', 'One pass'], correctAnswer: 1, explanation: 'Avoids attention dilution and contradictions.' },

  // DOMAIN 5: Context Management (15%)
  { id: 'cm-1', domain: 'context-management', question: 'Lost in middle effect?', options: ['Forget names', 'Models may omit middle section findings', 'Auto delete', 'Memory leaks'], correctAnswer: 1, explanation: 'Models process start/end reliably, miss middle.' },
  { id: 'cm-2', domain: 'context-management', question: 'Escalation triggers?', options: ['All complex', 'Customer requests, policy gaps, inability to progress', 'Only errors', 'Never'], correctAnswer: 1, explanation: 'Customer requests, policy gaps, no progress.' },
  { id: 'cm-3', domain: 'context-management', question: 'Why confidence scores unreliable?', options: ['Always accurate', 'Poorly calibrated proxies', 'Too slow', 'Extra config'], correctAnswer: 1, explanation: 'Poorly calibrated for actual complexity.' },
  { id: 'cm-4', domain: 'context-management', question: 'Subagent outputs include?', options: ['Only answer', 'Metadata (dates, sources, context)', 'Reasoning only', 'Nothing'], correctAnswer: 1, explanation: 'Include metadata for synthesis.' },
  { id: 'cm-5', domain: 'context-management', question: 'Crash recovery approach?', options: ['Start fresh', 'Structured state exports (manifests)', 'Never recover', 'Manual only'], correctAnswer: 1, explanation: 'Each agent exports state, coordinator loads on resume.' },
  { id: 'cm-6', domain: 'context-management', question: 'Transactional facts approach?', options: ['Keep in context', 'Extract to persistent case facts block', 'Higher temp', 'Disable'], correctAnswer: 1, explanation: 'Extract facts to persistent block outside history.' },
  { id: 'cm-7', domain: 'context-management', question: 'When sentiment-based escalation bad?', options: ['Always good', 'Poorly correlates with case complexity', 'Fast', 'Accurate'], correctAnswer: 1, explanation: 'Sentiment doesnt correlate with complexity.' },
  { id: 'cm-8', domain: 'context-management', question: '/compact command?', options: ['Nothing', 'Reduce context during long sessions', 'Compress files', 'Nothing'], correctAnswer: 1, explanation: 'Reduces context when verbose output fills.' },
  { id: 'cm-9', domain: 'context-management', question: 'Handle conflicting sources?', options: ['Pick one', 'Include both with attribution', 'Ignore', 'Ask user'], correctAnswer: 1, explanation: 'Preserve both with source attribution.' },
  { id: 'cm-10', domain: 'context-management', question: 'Confidence calibration uses?', options: ['Nothing', 'Labeled validation sets', 'Guess', 'Random'], correctAnswer: 1, explanation: 'Calibrate using labeled validation sets.' },
];

export const flashcards: Flashcard[] = [
  // Domain 1
  { id: 'fc-1', domain: 'agentic-architecture', front: 'Agentic Loop', back: 'Continue when stop_reason="tool_use", end when "end_turn"' },
  { id: 'fc-2', domain: 'agentic-architecture', front: 'Coordinator Pattern', back: 'Hub-and-spoke: coordinator manages all communication' },
  { id: 'fc-3', domain: 'agentic-architecture', front: 'Task Tool', back: 'allowedTools must include "Task" to spawn subagents' },
  { id: 'fc-4', domain: 'agentic-architecture', front: 'Subagent Context', back: 'Isolated - must be explicitly provided in prompt' },
  { id: 'fc-5', domain: 'agentic-architecture', front: 'Hooks', back: 'PostToolUse=transform results, PreToolUse=enforce compliance' },
  { id: 'fc-6', domain: 'agentic-architecture', front: 'fork_session', back: 'Creates branches to explore divergent approaches' },
  // Domain 2
  { id: 'fc-7', domain: 'tool-design-mcp', front: 'Tool Descriptions', back: 'Primary mechanism for selection - include inputs, examples, edges' },
  { id: 'fc-8', domain: 'tool-design-mcp', front: 'isError Flag', back: 'MCP pattern for communicating tool failures' },
  { id: 'fc-9', domain: 'tool-design-mcp', front: 'Error Categories', back: 'Transient, validation, business, permission' },
  { id: 'fc-10', domain: 'tool-design-mcp', front: 'Optimal Tool Count', back: '4-5 tools per agent - more degrades selection' },
  { id: 'fc-11', domain: 'tool-design-mcp', front: 'tool_choice: any', back: 'Guarantees tool call vs text return' },
  { id: 'fc-12', domain: 'tool-design-mcp', front: 'MCP Resources', back: 'Expose content catalogs to reduce exploratory calls' },
  // Domain 3
  { id: 'fc-13', domain: 'claude-code-config', front: 'CLAUDE.md Hierarchy', back: 'User > Project > Directory (directory highest)' },
  { id: 'fc-14', domain: 'claude-code-config', front: 'Plan Mode', back: 'Complex large-scale changes, architectural decisions' },
  { id: 'fc-15', domain: 'claude-code-config', front: 'context: fork', back: 'Runs skill in isolated sub-agent context' },
  { id: 'fc-16', domain: 'claude-code-config', front: '-p Flag', back: 'Run Claude Code non-interactively in CI/CD' },
  { id: 'fc-17', domain: 'claude-code-config', front: '.claude/rules/', back: 'Path-specific rules with glob patterns' },
  // Domain 4
  { id: 'fc-18', domain: 'prompt-engineering', front: 'Few-shot', back: '2-4 targeted examples for ambiguous scenarios' },
  { id: 'fc-19', domain: 'prompt-engineering', front: 'Tool Use + Schema', back: 'Guarantees schema-compliant output' },
  { id: 'fc-20', domain: 'prompt-engineering', front: 'Batch API', back: 'Non-blocking workloads only (not pre-merge)' },
  { id: 'fc-21', domain: 'prompt-engineering', front: 'Self-review', back: 'Less effective - retains generation context' },
  // Domain 5
  { id: 'fc-22', domain: 'context-management', front: 'Lost in Middle', back: 'Models process start/end, may omit middle' },
  { id: 'fc-23', domain: 'context-management', front: 'Escalation Triggers', back: 'Customer requests, policy gaps, inability to progress' },
  { id: 'fc-24', domain: 'context-management', front: 'Crash Recovery', back: 'Structured state exports (manifests)' },
  { id: 'fc-25', domain: 'context-management', front: 'Case Facts Block', back: 'Extract transactional facts outside summarized history' },
];

export const scenarios = [
  { id: 1, name: 'Customer Support Resolution Agent', domains: ['agentic-architecture', 'tool-design-mcp', 'context-management'] },
  { id: 2, name: 'Code Generation with Claude Code', domains: ['claude-code-config', 'context-management'] },
  { id: 3, name: 'Multi-Agent Research System', domains: ['agentic-architecture', 'tool-design-mcp', 'context-management'] },
  { id: 4, name: 'Developer Productivity with Claude', domains: ['tool-design-mcp', 'claude-code-config', 'agentic-architecture'] },
  { id: 5, name: 'Claude Code for CI/CD', domains: ['claude-code-config', 'prompt-engineering'] },
  { id: 6, name: 'Structured Data Extraction', domains: ['prompt-engineering', 'context-management'] },
];
