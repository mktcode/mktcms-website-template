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
    class="dropdown absolute left-0 -mt-1 bg-white shadow-lg rounded-(--base-radius) opacity-0 invisible group-hover:opacity-100 group-hover:visible min-w-48 z-10 transition-all duration-200 ease-out -translate-y-2 group-hover:translate-y-0"
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
        class="subnavitem"
      >
        {{ child.label }}
        <span v-if="child.children" class="ml-1">
          <Icon name="heroicons:chevron-right" class="inline-block" />
        </span>
      </NuxtLink>
      <div
        v-else
        class="subnavitem"
      >
        {{ child.label }}
        <span v-if="child.children" class="ml-1">
          <Icon name="heroicons:chevron-right" class="inline-block" />
        </span>
      </div>

      <!-- Nested dropdown -->
      <NavNestedDropdown
        v-if="child.children"
        :children="child.children"
      />
    </div>
  </div>
</template>