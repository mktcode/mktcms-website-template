import type { MenuItem } from './navItems'
import type { PagegrabConfig } from './config'
import { fetchHtml } from './fetch'
import { extractHtmlFragment } from './extract'
import { buildMarkdown, htmlToMarkdown } from './markdown'
import { linkToOutputPath } from './path'
import { resolveSelector } from './selectors'
import { resolveUrl } from './url'
import { writeMarkdown } from './write'

export type GrabStats = {
  processed: number
  written: number
  skipped: number
  failed: number
}

export async function grabFromNavItems(items: Array<MenuItem>, config: PagegrabConfig): Promise<GrabStats> {
  const stats: GrabStats = {
    processed: 0,
    written: 0,
    skipped: 0,
    failed: 0
  }

  await traverse(items, async (item) => {
    if (!item.link) {
      return
    }

    const selector = resolveSelector(item, config)
    const url = resolveUrl(config.domain, item.link)
    const filePath = linkToOutputPath(item.link, config.outputDir)

    stats.processed += 1

    try {
      const html = await fetchHtml(url)
      const fragment = extractHtmlFragment(html, selector)
      const markdownBody = htmlToMarkdown(fragment)
      const markdown = buildMarkdown(item.label, markdownBody)
      const result = await writeMarkdown(filePath, markdown, config.force)

      if (result.skipped) {
        stats.skipped += 1
      } else {
        stats.written += 1
      }
    } catch (error) {
      stats.failed += 1
      const message = error instanceof Error ? error.message : String(error)
      console.warn(`[pagegrab] ${item.link} -> ${message}`)
    }
  })

  return stats
}

async function traverse(items: Array<MenuItem>, visit: (item: MenuItem) => Promise<void>): Promise<void> {
  for (const item of items) {
    await visit(item)
    if (item.children && item.children.length > 0) {
      await traverse(item.children, visit)
    }
  }
}
