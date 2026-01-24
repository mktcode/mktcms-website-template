<script setup lang="ts">
defineProps<{
  items: Array<MenuItem>
}>()
</script>

<template>
  <nav class="flex gap-1">
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
        class="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
      >
        {{ item.label }}
        <span v-if="item.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
        </span>
      </button>

      <!-- Dropdown menu -->
      <ClientOnly>
        <NavDropdown
          v-if="item.children"
          :children="item.children"
        />
      </ClientOnly>
    </div>
  </nav>
</template>