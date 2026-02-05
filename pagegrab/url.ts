export function resolveUrl(domain: string, link: string): string {
  if (isAbsoluteUrl(link)) {
    return link
  }

  const base = domain.endsWith('/') ? domain.slice(0, -1) : domain
  const path = link.startsWith('/') ? link : `/${link}`
  return `${base}${path}`
}

export function extractPathFromLink(link: string): string {
  if (isAbsoluteUrl(link)) {
    return new URL(link).pathname
  }
  return link
}

function isAbsoluteUrl(link: string): boolean {
  return /^https?:\/\//i.test(link)
}
