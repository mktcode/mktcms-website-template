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