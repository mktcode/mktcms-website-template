<script setup lang="ts">
const { path } = defineProps<{ path: string }>()

const content = await useMdContent(path + '.md')
</script>

<template>
  <div v-html="content.html" class="prose max-w-none" />
</template>