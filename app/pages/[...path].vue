<script setup lang="ts">
useTrackPageview()
const path = useRoute().params.path as string[]

const content = await useMdContent<{ seoTitle?: string }>(['Seiten', ...path.filter(Boolean), 'Seite.md'].join(':'))

useSeoMeta({
  title: content.frontmatter.seoTitle,
})
</script>

<template>
  <Page>
    <MDC :value="content.markdown" class="markdown-content" />
  </Page>
</template>