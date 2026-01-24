<script setup lang="ts">
defineProps<{
  children: Array<MenuItem>
}>()

const dropdownRef = ref<HTMLElement | null>(null)
const isSubmenuLeft = ref(false)

onMounted(() => {
  if (dropdownRef.value) {
    const rect = dropdownRef.value.getBoundingClientRect()
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
    ref="dropdownRef"
    :class="{ 'submenu-left': isSubmenuLeft }"
    class="dropdown absolute left-0 pt-1 bg-white shadow-lg rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible min-w-48 z-10 transition-all duration-200 ease-out -translate-y-2 group-hover:translate-y-0"
  >
    <div
      v-for="child in children"
      :key="child.label"
      class="relative group/nested"
    >
      <!-- Child item: clickable if has link, otherwise just a label -->
      <NuxtLink
        v-if="child.link"
        :to="child.link"
        class="px-4 py-2 block hover:bg-gray-100 whitespace-nowrap"
      >
        {{ child.label }}
        <span v-if="child.children" class="ml-1">
          <Icon name="heroicons:chevron-right" class="inline-block" />
        </span>
      </NuxtLink>
      <div
        v-else
        class="px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
      >
        {{ child.label }}
        <span v-if="child.children" class="ml-1">
          <Icon name="heroicons:chevron-right" class="inline-block" />
        </span>
      </div>

      <!-- Nested dropdown -->
      <div
        v-if="child.children"
        class="nested-dropdown absolute left-full top-0 pl-1 bg-white shadow-lg rounded opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible min-w-48 z-10 transition-all duration-200 ease-out -translate-x-2 group-hover/nested:translate-x-0"
      >
        <NuxtLink
          v-for="nestedChild in child.children"
          :key="nestedChild.label"
          :to="nestedChild.link || '#'"
          class="px-4 py-2 block hover:bg-gray-100 whitespace-nowrap"
        >
          {{ nestedChild.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Class to make first-level dropdown appear on the right side (aligned to right edge) */
.dropdown.submenu-left {
  left: auto;
  right: 0;
}

/* Class to make nested submenus appear on the left instead of right */
.nested-dropdown.submenu-left {
  left: auto;
  right: 100%;
  padding-left: 0;
  padding-right: 0.25rem; /* pr-1 equivalent */
  transform: translateX(0.5rem); /* translate-x-2 equivalent */
}

.nested-dropdown.submenu-left:is(.group-hover\/nested *) {
  transform: translateX(0);
}
</style>