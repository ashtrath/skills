# `@ashtrath/skills`

![Project Overview](https://shieldcn.dev/group/npm/@ashtrath/skills+github/stars/ashtrath/skills+github/license/ashtrath/skills.svg?variant=branded&size=xs)

Ashtrath's curated agent skills.

A hand-picked set of [agent skills](https://agentskills.io) from across the ecosystem, declared in one npm package so a project gets all of them with a single install.

Powered by the [`skills` CLI](https://github.com/vercel-labs/skills) `experimental_sync` feature.

## Setup

Install the [`skills` CLI](https://github.com/vercel-labs/skills) and this pack as dev dependencies, then hook `skills experimental_sync` into your `prepare` script:

```bash
pnpm i -D skills @ashtrath/skills
```

```json
{
  "scripts": {
    "prepare": "skills experimental_sync -y"
  },
  "devDependencies": {
    "skills": "^1.7.4",
    "@ashtrath/skills": "^1.0.0"
  }
}
```

Then run `pnpm i` (or `pnpx skills experimental_sync -y`) for the first sync. From then on every install keeps the skills in sync.

What you get:

- Every skill listed below is installed into `.agents/skills/<name>` and linked into the skill directories of the agents detected on your machine (Claude Code, Cursor, OpenCode, Codex, ...). Pass `-a claude-code cursor` to choose explicitly.
- `skills-lock.json` records what came from where. Commit it.
- Removing `@ashtrath/skills` from your dependencies removes the skills on the next sync.

The pack tracks each upstream's default branch. To pull in the latest upstream changes without waiting for a new pack release:

```bash
pnpx skills update
```

## Skills

<!-- skills:start -->

### Workflow

| Skill                                                                                                                  | Description                                                                                                                                                                                                                                             | Source                                                                |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [code-review](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/code-review/SKILL.md)                | Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes: Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/spec asked for?).        | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [codebase-design](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/codebase-design/SKILL.md)        | Shared vocabulary for designing deep modules.                                                                                                                                                                                                           | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [diagnosing-bugs](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/diagnosing-bugs/SKILL.md)        | Diagnosis loop for hard bugs and performance regressions.                                                                                                                                                                                               | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [domain-modeling](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/domain-modeling/SKILL.md)        | Build and sharpen a project's domain model.                                                                                                                                                                                                             | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [grill-me](https://github.com/mattpocock/skills/blob/v1.3.2/skills/productivity/grill-me/SKILL.md)                     | A relentless interview to sharpen a plan or design.                                                                                                                                                                                                     | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [grill-with-docs](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/grill-with-docs/SKILL.md)        | A relentless interview to sharpen a plan or design, which also creates docs (ADR's and glossary) as we go.                                                                                                                                              | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [grilling](https://github.com/mattpocock/skills/blob/v1.3.2/skills/productivity/grilling/SKILL.md)                     | Grill the user relentlessly about a plan, decision, or idea.                                                                                                                                                                                            | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [implement](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/implement/SKILL.md)                    | Implement a piece of work based on a spec or set of tickets.                                                                                                                                                                                            | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [implement-spec](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/implement-spec/SKILL.md)          | Implement the result of /to-spec and /to-tickets in code.                                                                                                                                                                                               | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [prototype](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/prototype/SKILL.md)                    | Build a throwaway prototype to answer a design question.                                                                                                                                                                                                | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [research](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/research/SKILL.md)                      | Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo.                                                                                                                                      | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [retro](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/retro/SKILL.md)                            | Conduct a retrospective on a coding session.                                                                                                                                                                                                            | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [tdd](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/tdd/SKILL.md)                                | Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.                                                                                                   | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [to-spec](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/to-spec/SKILL.md)                        | Turn the current conversation into a spec and publish it to the project issue tracker: no interview, just synthesis of what you've already discussed.                                                                                                   | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [to-tickets](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/to-tickets/SKILL.md)                  | Break a plan, spec, or the current conversation into a set of tracer-bullet tickets, each declaring its blocking edges, published to the configured tracker (edges as text in one file per ticket locally, or native blocking links on a real tracker). | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [wayfinder](https://github.com/mattpocock/skills/blob/v1.3.2/skills/engineering/wayfinder/SKILL.md)                    | Plan a huge chunk of work (more than one agent session can hold) as a shared map of decision tickets on your issue tracker, and resolve them one at a time until the way to the destination is clear.                                                   | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |
| [writing-for-agents](https://github.com/mattpocock/skills/blob/v1.3.2/skills/productivity/writing-for-agents/SKILL.md) | Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md.                                                                                                                                                 | [mattpocock/skills](https://github.com/mattpocock/skills/tree/v1.3.2) |

### Writing

| Skill                                                                                      | Description                                                                                                                                                                             | Source                                                      |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [i-have-adhd](https://github.com/ayghri/i-have-adhd/blob/HEAD/skills/i-have-adhd/SKILL.md) | Shape output for a reader with ADHD: lead with the next action, number multi-step work, restate state across turns, suppress tangents, give specific time estimates, make wins visible. | [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) |

### Design

| Skill                                                                                                        | Description                                                                                                                                                      | Source                                                      |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [better-accessibility](https://github.com/jakubkrehel/skills/blob/HEAD/skills/better-accessibility/SKILL.md) | Reviews and fixes keyboard and focus behavior, ARIA, accessible names, forms, screen-reader announcements, motion and zoom against WCAG 2.2.                     | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [better-colors](https://github.com/jakubkrehel/skills/blob/HEAD/skills/better-colors/SKILL.md)               | Builds and checks color systems by generating palettes, naming semantic tokens, converting between formats and measuring contrast.                               | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [better-interface](https://github.com/jakubkrehel/skills/blob/HEAD/skills/better-interface/SKILL.md)         | Reviews a screen, flow or whole interface across accessibility, layout, writing, typography, color and UI polish, and returns one ranked report.                 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [better-layout](https://github.com/jakubkrehel/skills/blob/HEAD/skills/better-layout/SKILL.md)               | Sets grouping, alignment, reading order, responsive structure and room for translated text, so a layout holds up when it is resized, translated or mirrored.     | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [better-typography](https://github.com/jakubkrehel/skills/blob/HEAD/skills/better-typography/SKILL.md)       | Sets and reviews how text renders, from the type scale and spacing to font features, wrapping, truncation and punctuation.                                       | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [better-ui](https://github.com/jakubkrehel/skills/blob/HEAD/skills/better-ui/SKILL.md)                       | Polishes surfaces, icons and motion with exact values for border radius, optical alignment, shadows, icon states and animation.                                  | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [better-writing](https://github.com/jakubkrehel/skills/blob/HEAD/skills/better-writing/SKILL.md)             | Writes and reviews interface copy, from labels and errors to empty states and confirmations, so it matches the product's voice and tells people what to do next. | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [break](https://github.com/jakubkrehel/skills/blob/HEAD/skills/break/SKILL.md)                               | Renders a component you choose under every scenario that can reach it on a temporary page and stress tests it.                                                   | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [explain-interface](https://github.com/jakubkrehel/skills/blob/HEAD/skills/explain-interface/SKILL.md)       | Explains how a website, a visual effect or an animation was built, from a live URL or a screenshot.                                                              | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [state-machine](https://github.com/jakubkrehel/skills/blob/HEAD/skills/state-machine/SKILL.md)               | Renders every state of a component you choose on a throwaway page, with mock data and a switcher, so you can work on each state.                                 | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |
| [variant](https://github.com/jakubkrehel/skills/blob/HEAD/skills/variant/SKILL.md)                           | Builds multiple variants of a component you're working on and helps you iterate and pick one.                                                                    | [jakubkrehel/skills](https://github.com/jakubkrehel/skills) |

<!-- skills:end -->

## Acknowledgements

- Inspired by Anthony Fu's [`@antfu/skills-pack`](https://github.com/antfu/skills-pack).

## License

[MIT](./LICENSE)
