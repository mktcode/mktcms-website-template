export function getTitleFromKey(key: string): string {
  return key.split(':').pop()?.replace('.md', '') || ''
}