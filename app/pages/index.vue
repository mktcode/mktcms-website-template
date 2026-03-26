<script setup lang="ts">
useTrackPageview()
const content = await useMdContent<{ seoTitle?: string }>('Seiten:Startseite.md')

useSeoMeta({
  title: content.frontmatter.seoTitle,
})
</script>

<template>
  <Page>
    <MDC :value="content.markdown" class="markdown-content" />
  </Page>
</template>