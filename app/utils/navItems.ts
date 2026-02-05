export const navItems: Array<MenuItem> = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'Kontakt',
    link: '/kontakt'
  },
  {
    label: 'Rechtliches',
    children: [
      { label: 'Impressum', link: '/impressum' },
      { label: 'Datenschutzerklärung', link: '/datenschutzerklaerung' }
    ]
  }
]
