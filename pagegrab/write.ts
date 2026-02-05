import { constants } from 'node:fs'
import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export type WriteResult = {
  skipped: boolean
}

export async function writeMarkdown(filePath: string, content: string, force: boolean): Promise<WriteResult> {
  const directory = path.dirname(filePath)
  await mkdir(directory, { recursive: true })

  if (!force) {
    try {
      await access(filePath, constants.F_OK)
      return { skipped: true }
    } catch {
      // File does not exist, proceed.
    }
  }

  await writeFile(filePath, content, 'utf8')
  return { skipped: false }
}
