<script setup lang="ts">
const authKey = ref('')

async function login() {
  await $fetch('/api/admin/login', {
    method: 'POST',
    body: {
      authKey: authKey.value,
    },
  })

  await navigateTo('/admin')
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen max-w-3xl mx-auto">
    <div class="bg-white flex flex-col gap-3 rounded-2xl p-4">
      <h1 class="text-2xl font-bold">
        Admin Login
      </h1>
      <div class="flex flex-col">
        <label for="authKey" class="text-gray-700">
          Schlüssel:
        </label>
        <input
          id="authKey"
          v-model="authKey"
          type="password"
          class="border border-gray-300 rounded-md p-2 mt-2"
        >
      </div>
      <button @click="login" class="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand/90 cursor-pointer">
        Anmelden
      </button>
    </div>
  </div>
</template>