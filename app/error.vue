<script setup lang="ts">
const toHome = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <NuxtRouteAnnouncer />

    <div class="text-center prose prose-lg">
      <h1>
        Inhalt nicht gefunden
      </h1>
      <p>
        Der angeforderte Inhalt konnte nicht gefunden werden, weil er möglicherweise gelöscht oder verschoben wurde oder nie existiert hat.
      </p>
      <NuxtLink @click="toHome" class="button">Zur Startseite</NuxtLink>
    </div>
  </div>
</template>
