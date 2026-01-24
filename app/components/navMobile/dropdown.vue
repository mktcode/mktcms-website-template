<script setup lang="ts">
defineProps<{
  children: Array<MenuItem>
}>()
</script>

<template>
  <div
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
      <NavMobileNestedDropdown
        v-if="child.children"
        :children="child.children"
      />
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
  transform: translateX(0.5rem); /* translate-x-2 equivalent */
}

.nested-dropdown.submenu-left:is(.group-hover\/nested *) {
  transform: translateX(0);
}
</style>