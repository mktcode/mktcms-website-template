import type { MenuItem } from './navItems'
import type { PagegrabConfig } from './config'

export function resolveSelector(item: MenuItem, config: PagegrabConfig): string {
  if (item.selector && item.selector.trim().length > 0) {
    return item.selector
  }

  if (item.link) {
    const normalized = normalizeLinkKey(item.link)
    const mapped = config.selectors[normalized] ?? config.selectors[item.link]
    if (mapped && mapped.trim().length > 0) {
      return mapped
    }
  }

  return config.selector
}

export function normalizeLinkKey(link: string): string {
  if (link === '/') {
    return '/'
  }
  return link.replace(/\/+$/, '')
}
