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
      <div
        v-if="item.children"
        class="absolute left-0 pt-1 bg-white shadow-lg rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible min-w-48 z-10 transition-all duration-200 ease-out -translate-y-2 group-hover:translate-y-0"
      >
        <div
          v-for="child in item.children"
          :key="child.label"
          class="relative group/nested"
        >
          <!-- Child item: clickable if has link, otherwise just a label -->
          <NuxtLink
            v-if="child.link"
            :to="child.link"
            class="px-4 py-2 block hover:bg-gray-100 whitespace-nowrap"
          >
            {{ child.label }}
            <span v-if="child.children" class="ml-1">
              <Icon name="heroicons:chevron-right" class="inline-block" />
            </span>
          </NuxtLink>
          <div
            v-else
            class="px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
          >
            {{ child.label }}
            <span v-if="child.children" class="ml-1">
              <Icon name="heroicons:chevron-right" class="inline-block" />
            </span>
          </div>

          <!-- Nested dropdown -->
          <div
            v-if="child.children"
            class="absolute left-full top-0 pl-1 bg-white shadow-lg rounded opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible min-w-48 z-10 transition-all duration-200 ease-out -translate-x-2 group-hover/nested:translate-x-0"
          >
            <NuxtLink
              v-for="nestedChild in child.children"
              :key="nestedChild.label"
              :to="nestedChild.link || '#'"
              class="px-4 py-2 block hover:bg-gray-100 whitespace-nowrap"
            >
              {{ nestedChild.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>