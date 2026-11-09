export interface Source {
  /**
   * Any source the `skills` CLI accepts: `owner/repo`, `owner/repo/sub/path`, ...
   */
  source: string
  category: string
  /**
   * Git branch, tag, or commit SHA to pin.
   */
  ref?: string
  /**
   * Skill names to pick; omitted means every skill in the source.
   */
  skills?: string[]
}

/**
 * Vendored skills that'll be written to package.json.skills
 */
export const vendor: Source[] = [
  {
    category: 'Workflow',
    ref: 'v1.3.2',
    source: 'mattpocock/skills',
    skills: [
      'code-review',
      'codebase-design',
      'diagnosing-bugs',
      'domain-modeling',
      'grill-me',
      'grill-with-docs',
      'grilling',
      'implement',
      'implement-spec',
      'prototype',
      'research',
      'retro',
      'tdd',
      'to-spec',
      'to-tickets',
      'wayfinder',
      'writing-for-agents',
    ],
  },
  {
    category: 'Writing',
    source: 'ayghri/i-have-adhd',
  },
  {
    category: 'Design',
    source: 'jakubkrehel/skills',
    skills: [
      'better-accessibility',
      'better-colors',
      'better-interface',
      'better-layout',
      'better-typography',
      'better-ui',
      'better-writing',
      'break',
      'explain-interface',
      'state-machine',
      'variant',
    ],
  },
]

/**
 * Handwritten skills
 */
export const manual: Source[] = []
