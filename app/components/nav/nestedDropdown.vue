<script setup lang="ts">
defineProps<{
  children: Array<MenuItem>
}>()

const nestedDropdownRef = ref<HTMLElement | null>(null)
const isSubmenuLeft = ref(false)

onMounted(() => {
  if (nestedDropdownRef.value) {
    const rect = nestedDropdownRef.value.getBoundingClientRect()
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth

    // If the dropdown would overflow the viewport, position it to the left
    if (rect.right > viewportWidth) {
      isSubmenuLeft.value = true
    }
  }
})
</script>

<template>
  <div
    ref="nestedDropdownRef"
    :class="{ 'submenu-left': isSubmenuLeft }"
    class="nested-dropdown absolute left-full top-0 bg-white shadow-lg rounded-(--base-radius) opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible min-w-48 z-10 transition-all duration-200 ease-out -translate-x-2 group-hover/nested:translate-x-0"
  >
    <NuxtLink
      v-for="nestedChild in children"
      :key="nestedChild.label"
      :to="nestedChild.link || '#'"
      class="px-4 py-2 block hover:bg-gray-100 whitespace-nowrap"
    >
      {{ nestedChild.label }}
    </NuxtLink>
  </div>
</template>