<script setup lang="ts">
defineProps<{
  items: Array<MenuItem>
}>()

const isOpen = ref(false)
</script>

<template>
  <nav class="gap-1 flex flex-col sm:hidden">
    <div
      v-for="item in items"
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
        class="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer w-full text-left"
      >
        {{ item.label }}
        <span v-if="item.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
        </span>
      </button>

      <!-- Dropdown menu -->
      <ClientOnly>
        <NavMobileDropdown
          v-if="item.children"
          :children="item.children"
        />
      </ClientOnly>
    </div>
  </nav>
</template>