export interface Source {
  /**
   * Any source the `skills` CLI accepts: `owner/repo`, `owner/repo/sub/path`, ...
   */
  source: string
  category: string
  /**
   * Skill names to pick; omitted means every skill in the source.
   */
  skills?: string[]
}

/**
 * Vendored skills that'll be written to package.json.skills
 */
export const vendor: Source[] = []

/**
 * Handwritten skills
 */
export const manual: Source[] = []
