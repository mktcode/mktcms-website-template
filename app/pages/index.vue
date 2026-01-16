<script setup lang="ts">
const { data: content } = await useFetch('/api/content/home.md')
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-4">Hallo Welt!</h1>
    <div v-html="content" class="prose max-w-none" />
  </div>
</template>