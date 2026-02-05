import path from 'node:path'
import { extractPathFromLink } from './url'

export function linkToOutputPath(link: string, outputDir: string): string {
  const rawPath = extractPathFromLink(link)
  const pathname = rawPath.split(/[?#]/)[0] ?? ''
  const trimmed = pathname.replace(/^\/+|\/+$/g, '')
  const segments = trimmed.length > 0 ? trimmed.split('/') : []

  return path.join(outputDir, ...segments, 'Seite.md')
}
