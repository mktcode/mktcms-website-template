<script setup lang="ts">
const { data: keys, refresh } = await useFetch('/api/content/list')

const { isUploading, fileInput, path, uploadFiles } = useAdminUpload()
</script>

<template>
  <PageAdmin>
    <div class="bg-white flex flex-col gap-3 rounded-2xl p-4 mt-12">
      <h1 class="text-2xl font-bold">Website Administration</h1>
      <p>
        Hier können Sie <strong>öffentlich zugängliche</strong> Inhalte verwalten.
        Das können Texte und Bilder sein, die auf der Website angezeigt werden oder Dokumente, die heruntergeladen werden können.
      </p>

      <div class="flex gap-3">
        <input
          v-model="path"
          type="text"
          placeholder="Unterordner (z.B. 'Produkte')"
          class="input-field"
        />
        <button
          class="admin-button"
          :disabled="isUploading"
        >
          Neuer Inhalt
        </button>
        <button
          class="admin-button"
          @click="fileInput?.click()"
          :disabled="isUploading"
        >
          <Icon v-if="isUploading" name="lucide:loader-circle" size="1.5rem" class="animate-spin" />
          <Icon v-else name="heroicons:arrow-up-tray" size="1.5rem" />
          Bild/Dokument hochladen
        </button>
        <input
          ref="fileInput"
          class="hidden"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          @change="async (e) => { await uploadFiles(e); await refresh(); }"
        />
      </div>

      <div>
        <div v-for="key in keys" :key="key" class="border border-gray-200 rounded-lg p-4 mb-4">
          <h2 class="text-xl font-semibold mb-2">{{ key }}</h2>
          <NuxtLink
            :to="`/admin/edit/${key}`"
            class="text-blue-600 hover:underline"
          >
            Inhalt bearbeiten
          </NuxtLink>
        </div>
      </div>
    </div>
  </PageAdmin>
</template>