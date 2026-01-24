<script setup lang="ts">
defineProps<{
  children: Array<MenuItem>
}>()
</script>

<template>
  <div>
    <NuxtLink
      v-for="nestedChild in children"
      :key="nestedChild.label"
      :to="nestedChild.link || '#'"
      class="px-4 py-2 block bg-white/5 whitespace-nowrap"
    >
      {{ nestedChild.label }}
    </NuxtLink>
  </div>
</template>