<script setup lang="ts">
const navItems: Array<MenuItem> = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'Services',
    children: [
      { label: 'Consulting', link: '/services/consulting' },
      { label: 'Support', link: '/services/support' },
      { label: 'Training', link: '/services/training' }
    ]
  },
  {
    label: 'About',
    link: '/about',
    children: [
      { label: 'Our Team', link: '/about/team' },
      { label: 'History', link: '/about/history' },
      { label: 'Careers', link: '/about/careers' }
    ]
  },
  {
    label: 'Contact',
    link: '/contact'
  },
  {
    label: 'Products',
    link: '/products',
    children: [
      { label: 'Electronics', link: '/products/electronics' },
      { label: 'Clothing', link: '/products/clothing' },
      {
        label: 'Testitem',
        link: '/products/accessories',
        children: [
          { label: 'Bags', link: '/products/accessories/bags' },
          { label: 'Watches', link: '/products/accessories/watches' },
          { label: 'Jewelry', link: '/products/accessories/jewelry' }
        ]
      },
      {
        label: 'Accessories',
        link: '/products/accessories',
        children: [
          { label: 'Bags', link: '/products/accessories/bags' },
          { label: 'Watches', link: '/products/accessories/watches' },
          { label: 'Jewelry', link: '/products/accessories/jewelry' }
        ]
      },
      { label: 'Home & Garden', link: '/products/home-garden' }
    ]
  },
]
</script>

<template>
  <div>
    <header class="bg-brand-soft">
      <nav class="container max-w-292.5 mx-auto px-4 py-3 bg-brand text-white">
        <NuxtLink to="/" class="font-bold">
          Meine Webseite
        </NuxtLink>
      </nav>
    </header>
    <main>
      <div class="container max-w-292.5 mx-auto p-4 bg-white">
        <div class="bg-brand-soft rounded-sm p-4 mb-4">
          <h1 class="text-4xl font-bold">Hallo Welt!</h1>
        </div>
        <Nav :items="navItems" />
        <slot />
      </div>
    </main>
    <footer class="bg-brand-soft">
      <div class="container max-w-292.5 mx-auto px-4 py-3 bg-brand text-white text-right text-sm">
        <NuxtLink to="/impressum" class="hover:underline">Impressum</NuxtLink>
        <NuxtLink to="/datenschutzerklaerung" class="ml-4 hover:underline">Datenschutzerklärung</NuxtLink>
      </div>
    </footer>
  </div>
</template>