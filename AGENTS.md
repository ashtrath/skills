# Agent instructions

Curated agent skills pack combining vendored upstream skills and local handwritten skills.

## Architecture

Skill sources are defined in `meta.ts`:

- **Vendored skills (`vendor`)**: External git sources (such as `owner/repo`). Written to `package.json.skills` by `scripts/gen.ts` and fetched at consumer install time by `skills experimental_sync`.
- **Handwritten skills (`manual`)**: Authored locally in `skills/<name>/SKILL.md` using `source: 'ashtrath/skills'`. Shipped directly in the npm package. Modify or create these only when asked.

## Workflow

1. Edit sources in `meta.ts`:
   - Add external skills to `vendor`.
   - Add local skills to `manual` and place their files in `skills/<name>/SKILL.md`.
2. Run `pnpm run gen` to update `package.json.skills` and `README.md`.
3. Run `pnpm run lint` and `pnpm run fmt` before committing.

## Skill authoring standards

When creating or modifying local skills in `skills/<name>/SKILL.md`:

- Follow skill best practices: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
- Provide YAML frontmatter containing `name` and `description`.
- Document agent-specific workflows, non-obvious API behaviors, and actionable recipes.
- Keep instructions compact. Rely on pretrained model knowledge for general programming patterns.
