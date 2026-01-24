<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const openSubmenus = ref<Set<string>>(new Set())

type MenuItem = {
  label: string
  link?: string
  submenu?: Array<MenuItem>
}

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
</script>

<template>
  <nav class="relative z-1000">
    <div class="flex items-center justify-between">
      <!-- Mobile Menu Toggle -->
      <button class="flex sm:hidden flex-col bg-transparent border-0 cursor-pointer p-2 text-white" @click="toggleMobileMenu" :aria-expanded="mobileMenuOpen">
        <Icon name="heroicons:bars-3" size="1.5rem" />
      </button>

      <!-- Menu -->
      <ul class="nav-menu" :class="{ 'mobile-open': mobileMenuOpen }">
        <!-- Mobile Close Button -->
        <button class="mobile-close" @click="toggleMobileMenu" aria-label="Close menu">
          <span>✕</span>
        </button>
        
        <li v-for="(item, index) in menuItems" :key="index" class="nav-item" :class="{ 'has-submenu': item.submenu, 'submenu-open': isSubmenuOpen(`item-${index}`) }">
          <!-- If item has no link, make entire button toggle submenu -->
          <button v-if="!item.link && item.submenu" class="nav-link nav-link-button" @click="toggleSubmenu(`item-${index}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}`)">
            {{ item.label }}
            <Icon name="heroicons:chevron-down" size="1rem" />
          </button>
          
          <!-- If item has link, use wrapper with separate toggle -->
          <div v-else class="nav-link-wrapper">
            <a :href="item.link" class="nav-link">
              {{ item.label }}
              <span class="hidden sm:block">
                <Icon
                  v-if="item.submenu"
                  name="heroicons:chevron-down"
                />
              </span>
            </a>
            <button v-if="item.submenu" class="submenu-toggle" @click="toggleSubmenu(`item-${index}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}`)">
              <Icon name="heroicons:chevron-down" />
            </button>
          </div>

          <!-- First Level Submenu -->
          <ul v-if="item.submenu" class="submenu">
            <li v-for="(subitem, subindex) in item.submenu" :key="subindex" class="submenu-item" :class="{ 'has-submenu': subitem.submenu, 'submenu-open': isSubmenuOpen(`item-${index}-${subindex}`) }">
              <!-- If subitem has no link, make entire button toggle nested submenu -->
              <button v-if="!subitem.link && subitem.submenu" class="submenu-link submenu-link-button" @click="toggleSubmenu(`item-${index}-${subindex}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}-${subindex}`)">
                {{ subitem.label }}
                <Icon name="heroicons:chevron-down" />
              </button>
              
              <!-- If subitem has link, use wrapper with separate toggle -->
              <div v-else class="submenu-link-wrapper">
                <a :href="subitem.link" class="submenu-link">
                  {{ subitem.label }}
                </a>
                <button v-if="subitem.submenu" class="submenu-toggle" @click="toggleSubmenu(`item-${index}-${subindex}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}-${subindex}`)">
                  <Icon name="heroicons:chevron-down" />
                </button>
              </div>

              <!-- Second Level Submenu -->
              <ul v-if="subitem.submenu" class="submenu submenu-nested">
                <li v-for="(nesteditem, nestedindex) in subitem.submenu" :key="nestedindex" class="submenu-item">
                  <a :href="nesteditem.link" class="submenu-link">
                    {{ nesteditem.label }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>