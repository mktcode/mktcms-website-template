import TurndownService from 'turndown'

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_'
})

export function htmlToMarkdown(html: string): string {
  return turndownService.turndown(html)
}

export function buildMarkdown(title: string, body: string): string {
  const normalizedBody = body.trim()
  if (normalizedBody.length === 0) {
    return `# ${title}\n\n`
  }
  return `# ${title}\n\n${normalizedBody}\n`
}
