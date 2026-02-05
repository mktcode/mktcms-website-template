import { load } from 'cheerio'

export function extractHtmlFragment(html: string, selector: string): string {
  const $ = load(html)
  const element = $(selector).first()

  if (!element.length) {
    throw new Error(`Selector not found: ${selector}`)
  }

  return $.html(element)
}
