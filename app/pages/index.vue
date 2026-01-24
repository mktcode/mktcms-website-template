<script setup lang="ts">
const content = await useMdContent('Startseite.md')
const posts = await useMdContents('Beiträge')
</script>

<template>
  <Page>
    <div v-html="content.html" class="prose max-w-none" />

    <h2 class="mt-12 text-2xl font-bold mb-4">Neueste Beiträge</h2>
    <Collapsible 
      v-for="post in posts" 
      :key="post.key"
      :title="getTitleFromKey(post.key)"
    >
      <div v-html="post.value.html" class="prose max-w-none" />
    </Collapsible>
  </Page>
</template>