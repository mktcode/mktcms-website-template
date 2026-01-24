<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <button class="flex sm:hidden flex-col bg-transparent border-0 cursor-pointer p-2" :aria-expanded="isOpen">
    <Icon name="heroicons:bars-3" size="1.5rem" />
  </button>
</template>