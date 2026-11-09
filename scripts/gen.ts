import type { Source } from '../meta'

import { existsSync } from 'node:fs'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { parse as parseYaml } from 'yaml'

import { manual, vendor } from '../meta'

const START_MARKER = '<!-- skills:start -->'
const END_MARKER = '<!-- skills:end -->'

interface Row {
  category: string
  description: string
  skill: string
  source: string
}

interface SkillMeta {
  description: string
  folder: string
  name: string
  url: string
}

function splitSource(source: string): { owner: string; repo: string; subpath: string } {
  const [owner, repo, ...rest] = source.split('/')
  return { owner, repo, subpath: rest.join('/') }
}

function sourceCell(source: string, ref?: string): string {
  const commit = ref ?? 'HEAD'

  const { owner, repo, subpath } = splitSource(source)
  const url = subpath
    ? `https://github.com/${owner}/${repo}/tree/${commit}/${subpath}`
    : ref
      ? `https://github.com/${owner}/${repo}/tree/${ref}`
      : `https://github.com/${owner}/${repo}`

  return `[${owner}/${repo}](${url})`
}

function summary(text: string): string {
  const flat = text.replaceAll(/\s+/g, ' ').replaceAll(' \u2014 ', ' - ').trim()
  let out = ''
  for (const sentence of flat.split(/(?<=[.!?])\s+/)) {
    out += `${sentence} `
    if (out.length >= 40) break
  }
  return out.trim()
}

function parseFrontmatter(raw: string): { name?: string; description?: string } {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)?.[1] ?? ''
  return (parseYaml(frontmatter) as { name?: string; description?: string } | null) ?? {}
}

function renderTable(rows: Row[]): string {
  if (rows.length === 0) return ''

  const categories = [...new Set(rows.map(r => r.category))]
  return categories
    .map(category =>
      [
        `### ${category}`,
        '',
        '| Skill | Description | Source |',
        '| --- | --- | --- |',
        ...rows
          .filter(r => r.category === category)
          .map(r => `| ${r.skill} | ${r.description} | ${r.source} |`),
      ].join('\n'),
    )
    .join('\n\n')
}

async function github<T>(path: string): Promise<T> {
  const headers: Record<string, string> = { 'user-agent': 'skills-pack' }
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  if (token) headers.authorization = `Bearer ${token}`

  const res = await fetch(`https://api.github.com/${path}`, { headers })
  if (!res.ok) {
    const isRateLimit =
      res.status === 429 || (res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0')

    if (isRateLimit) {
      throw new Error(
        `GitHub API rate limit exceeded on ${path}. Set GITHUB_TOKEN or GH_TOKEN to continue.`,
      )
    }

    throw new Error(`GitHub API ${path}: ${res.status} ${res.statusText}`)
  }

  return res.json() as Promise<T>
}

function skillPaths(paths: string[], subpath: string): string[] {
  const prefix = subpath ? `${subpath}/` : ''
  if (paths.includes(`${prefix}SKILL.md`)) return [`${prefix}SKILL.md`]

  const relative = paths
    .filter(p => p.startsWith(prefix) && p.endsWith('/SKILL.md'))
    .map(p => p.slice(prefix.length))
  const depth = (p: string): number => p.split('/').length - 1

  return [
    ...relative.filter(p => depth(p) === 1),
    ...relative.filter(p => p.startsWith('skills/') && depth(p) <= 4),
  ].map(p => prefix + p)
}

async function fetchLocal(source: Source): Promise<SkillMeta[]> {
  const rootSkillsDir = join(process.cwd(), 'skills')
  if (!existsSync(rootSkillsDir)) return []

  const entries = await readdir(rootSkillsDir, { withFileTypes: true })
  const folders = entries.filter(e => e.isDirectory()).map(e => e.name)

  const discovered: SkillMeta[] = []
  for (const folder of folders) {
    const skillPath = join(rootSkillsDir, folder, 'SKILL.md')
    if (!existsSync(skillPath)) continue

    const raw = await readFile(skillPath, 'utf8')
    const { description, name } = parseFrontmatter(raw)
    discovered.push({
      name: name ?? folder,
      description: summary(description ?? ''),
      folder,
      url: `https://github.com/ashtrath/skills/blob/${source.ref ?? 'HEAD'}/skills/${folder}/SKILL.md`,
    })
  }

  if (source.skills !== undefined) {
    const byIdentifier = new Map(
      discovered.flatMap(
        s =>
          [
            [s.name, s],
            [s.folder, s],
          ] as const,
      ),
    )

    return source.skills.map(name => {
      const found = byIdentifier.get(name)
      if (!found) throw new Error(`Local skill "${name}" not found in skills/`)
      return found
    })
  }

  return discovered
}

async function fetchUpstream(source: string, ref = 'HEAD'): Promise<SkillMeta[]> {
  const { owner, repo, subpath } = splitSource(source)
  const tree = await github<{ tree: { path: string }[] }>(
    `repos/${owner}/${repo}/git/trees/${ref}?recursive=1`,
  )
  const paths = skillPaths(
    tree.tree.map(e => e.path),
    subpath,
  )

  const headers: Record<string, string> = { 'user-agent': 'skills-pack' }
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  if (token) headers.authorization = `Bearer ${token}`

  const skills = await Promise.all(
    paths.map(async path => {
      const res = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path}`, {
        headers,
      })
      if (!res.ok) {
        throw new Error(`Failed to fetch raw skill at ${path}: ${res.status} ${res.statusText}`)
      }

      const raw = await res.text()
      const { description, name } = parseFrontmatter(raw)
      const folder = path.split('/').at(-2) ?? name ?? ''

      return {
        name: name ?? folder,
        description: summary(description ?? ''),
        folder,
        url: `https://github.com/${owner}/${repo}/blob/${ref}/${path}`,
      }
    }),
  )

  return [...new Map(skills.toReversed().map(s => [s.name, s])).values()].toReversed()
}

async function rowsFor(source: Source): Promise<Row[]> {
  if (source.skills !== undefined && source.skills.length === 0) return []

  const sourceCellText = sourceCell(source.source, source.ref)
  const isLocal =
    source.source === 'ashtrath/skills' || source.source.startsWith('ashtrath/skills/')
  const skillsMeta = isLocal
    ? await fetchLocal(source)
    : await fetchUpstream(source.source, source.ref)

  const byName = new Map(
    skillsMeta.flatMap(
      s =>
        [
          [s.name, s],
          [s.folder, s],
        ] as const,
    ),
  )

  const wanted = source.skills ?? skillsMeta.map(s => s.name).sort()
  if (wanted.length === 0) {
    throw new Error(`No skills found in ${source.source}`)
  }

  return wanted.map(name => {
    const found = byName.get(name)
    if (!found) throw new Error(`Skill "${name}" not found in ${source.source}`)

    return {
      category: source.category,
      description: found.description.replaceAll('|', '\\|'),
      skill: `[${found.name}](${found.url})`,
      source: sourceCellText,
    }
  })
}

async function main(): Promise<void> {
  const readmeFile = 'README.md'
  const readme = await readFile(readmeFile, 'utf8')
  const start = readme.indexOf(START_MARKER) + START_MARKER.length
  const end = readme.indexOf(END_MARKER)
  if (start < START_MARKER.length || end < 0)
    throw new Error(`${readmeFile} is missing ${START_MARKER} / ${END_MARKER} markers`)

  const rows: Row[] = []
  const allSources = [...manual, ...vendor]
  for (const source of allSources) rows.push(...(await rowsFor(source)))

  const tableMarkdown = renderTable(rows)
  const nextReadme = tableMarkdown
    ? `${readme.slice(0, start)}\n\n${tableMarkdown}\n\n${readme.slice(end)}`
    : `${readme.slice(0, start)}\n\n${readme.slice(end)}`

  const pkgFile = 'package.json'
  const pkg = JSON.parse(await readFile(pkgFile, 'utf8'))
  pkg.skills = vendor.map(s => {
    if (!s.skills && !s.ref) return s.source
    return {
      ...(s.skills ? { skills: s.skills } : {}),
      source: s.source,
      ...(s.ref ? { ref: s.ref } : {}),
    }
  })
  const nextPkg = `${JSON.stringify(pkg, null, 2)}\n`

  await writeFile(pkgFile, nextPkg)
  console.log(`Updated ${pkgFile}`)

  await writeFile(readmeFile, nextReadme)
  console.log(`Updated ${readmeFile}`)
}

await main()
