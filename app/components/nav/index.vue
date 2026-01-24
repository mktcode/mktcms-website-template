<script setup lang="ts">
const menuItems: Array<MenuItem> = [
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
  <nav class="flex gap-1">
    <div
      v-for="item in menuItems"
      :key="item.label"
      class="relative group"
    >
      <!-- Parent item: clickable if has link, otherwise just a label -->
      <NuxtLink
        v-if="item.link"
        :to="item.link"
        class="px-4 py-2 block hover:bg-gray-100 rounded"
      >
        {{ item.label }}
        <span v-if="item.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
        </span>
      </NuxtLink>
      <button
        v-else
        class="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
      >
        {{ item.label }}
        <span v-if="item.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
        </span>
      </button>

      <!-- Dropdown menu -->
      <NavDropdown
        v-if="item.children"
        :children="item.children"
      />
    </div>
  </nav>
</template>

<style scoped>
/* Class to make first-level dropdown appear on the right side (aligned to right edge) */
.dropdown.submenu-left {
  left: auto;
  right: 0;
}

/* Class to make nested submenus appear on the left instead of right */
.nested-dropdown.submenu-left {
  left: auto;
  right: 100%;
  padding-left: 0;
  padding-right: 0.25rem; /* pr-1 equivalent */
  transform: translateX(0.5rem); /* translate-x-2 equivalent */
}

.nested-dropdown.submenu-left:is(.group-hover\/nested *) {
  transform: translateX(0);
}
</style>