<script setup lang="ts">
defineProps<{
  children: Array<MenuItem>
}>()
</script>

<template>
  <div>
    <div
      v-for="child in children"
      :key="child.label"
      class="relative group/nested"
    >
      <!-- Child item: clickable if has link, otherwise just a label -->
      <NuxtLink
        v-if="child.link"
        :to="child.link"
        class="px-4 py-2 block bg-gray-50 whitespace-nowrap"
      >
        {{ child.label }}
        <span v-if="child.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
        </span>
      </NuxtLink>
      <div
        v-else
        class="px-4 py-2 bg-gray-50 whitespace-nowrap cursor-pointer"
      >
        {{ child.label }}
        <span v-if="child.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
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