<script setup lang="ts">
defineProps<{
  children: Array<MenuItem>
}>()
</script>

<template>
  <div
    class="nested-dropdown absolute left-full top-0 bg-white shadow-lg rounded opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible min-w-48 z-10 transition-all duration-200 ease-out -translate-x-2 group-hover/nested:translate-x-0"
  >
    <NuxtLink
      v-for="nestedChild in children"
      :key="nestedChild.label"
      :to="nestedChild.link || '#'"
      class="px-4 py-2 block hover:bg-gray-100 whitespace-nowrap"
    >
      {{ nestedChild.label }}
    </NuxtLink>
  </div>
</template>