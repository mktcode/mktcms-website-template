<script setup lang="ts">
const { data: content } = await useFetch('/api/content/home.md')
</script>

<template>
  <PageDefault>
    <h1 class="text-4xl font-bold mb-4">Hallo Welt!</h1>
    <div v-html="content" class="prose max-w-none" />
  </PageDefault>
</template>