<script setup lang="ts">
const path = useRoute().params.path as string[]

const content = await useMdContent<{ "SEO Titel"?: string }>(['Seiten', ...path, 'Seite.md'].join(':'))

useSeoMeta({
  title: content.frontmatter["SEO Titel"],
})
</script>

<template>
  <Page>
    <MDC :value="content.markdown" class="markdown-content" />
  </Page>
</template>