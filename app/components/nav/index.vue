<script setup lang="ts">
const { mobileMenuOpen, toggleMobileMenu } = useMenu()

const menuItems: Array<MenuItem> = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'Products',
    link: '/products',
    submenu: [
      { label: 'Electronics', link: '/products/electronics' },
      { label: 'Clothing', link: '/products/clothing' },
      {
        label: 'Accessories',
        link: '/products/accessories',
        submenu: [
          { label: 'Bags', link: '/products/accessories/bags' },
          { label: 'Watches', link: '/products/accessories/watches' },
          { label: 'Jewelry', link: '/products/accessories/jewelry' }
        ]
      },
      { label: 'Home & Garden', link: '/products/home-garden' }
    ]
  },
  {
    label: 'Services',
    submenu: [
      { label: 'Consulting', link: '/services/consulting' },
      { label: 'Support', link: '/services/support' },
      { label: 'Training', link: '/services/training' }
    ]
  },
  {
    label: 'About',
    link: '/about',
    submenu: [
      { label: 'Our Team', link: '/about/team' },
      { label: 'History', link: '/about/history' },
      { label: 'Careers', link: '/about/careers' }
    ]
  },
  {
    label: 'Contact',
    link: '/contact'
  }
]
</script>

<template>
  <nav class="relative z-1000">
    <div class="flex items-center justify-between">
      <NavMobileToggle :isOpen="mobileMenuOpen" @click="toggleMobileMenu" />

      <ul class="nav-menu" :class="{ 'mobile-open': mobileMenuOpen }">
        <NavMobileClose @click="toggleMobileMenu" />
        
        <NavItem v-for="(item, index) in menuItems" :key="index" :item="item" :index="index" />
      </ul>
    </div>
  </nav>
</template>