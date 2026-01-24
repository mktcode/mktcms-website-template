<script setup lang="ts">
const content = await useMdContent('Impressum.md')
</script>

<template>
  <Page>
    <div v-html="content.html" class="prose max-w-none" />
  </Page>
</template>