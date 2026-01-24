export function getTitleFromKey(key: string): string {
  const extensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'pdf', 'json', 'csv', 'md']

  return key.split(':').pop()?.replace(new RegExp(`\\.(${extensions.join('|')})$`, 'i'), '') || ''
}