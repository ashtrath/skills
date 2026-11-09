# `@ashtrath/skills`

![Project Overview](https://shieldcn.dev/group/npm/@ashtrath/skills+github/stars/ashtrath/skills+github/license/ashtrath/skills.svg?variant=branded)

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

<!-- skills:end -->

## Acknowledgements

- Inspired by Anthony Fu's [`@antfu/skills-pack`](https://github.com/antfu/skills-pack).

## License

[MIT](./LICENSE)
