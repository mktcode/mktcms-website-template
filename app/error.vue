<script setup lang="ts">
const toHome = () => clearError({ redirect: '/' })
</script>

<template>
  <Page>
    <div class="markdown-content">
      <h1>
        Inhalt nicht gefunden
      </h1>
      <p>
        Der angeforderte Inhalt konnte nicht gefunden werden, weil er möglicherweise gelöscht oder verschoben wurde oder nie existiert hat.
      </p>
      <NuxtLink @click="toHome" class="button">Zur Startseite</NuxtLink>
    </div>
  </Page>
</template>
