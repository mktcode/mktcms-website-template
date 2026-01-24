export function useMenu() {
  const mobileMenuOpen = useState<boolean>('mobileMenuOpen', () => false)
  const openSubmenus = useState<Set<string>>('openSubmenus', () => new Set())

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }
  
  const toggleSubmenu = (key: string, event: Event) => {
    event.preventDefault()
    event.stopPropagation()
    if (openSubmenus.value.has(key)) {
      openSubmenus.value.delete(key)
    } else {
      openSubmenus.value.add(key)
    }
    openSubmenus.value = new Set(openSubmenus.value)
  }
  
  const isSubmenuOpen = (key: string) => {
    return openSubmenus.value.has(key)
  }

  return {
    mobileMenuOpen,
    toggleMobileMenu,
    toggleSubmenu,
    isSubmenuOpen
  }
}