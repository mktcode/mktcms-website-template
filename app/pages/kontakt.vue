<script setup lang="ts">
const content = await useMdContent('Kontakt.md')
</script>

<template>
  <Page>
    <div v-html="content.html" class="prose max-w-none" />
  </Page>
</template>