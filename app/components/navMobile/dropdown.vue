<script setup lang="ts">
defineProps<{
  children: Array<MenuItem>
}>()

const openItems = ref<Set<string>>(new Set())

const toggleItem = (label: string) => {
  if (openItems.value.has(label)) {
    openItems.value.delete(label)
  } else {
    openItems.value.add(label)
  }
}
</script>

<template>
  <div>
    <div
      v-for="child in children"
      :key="child.label"
      class="relative group/nested"
    >
      <!-- Child item: clickable if has link, otherwise just a label -->
      <div class="flex items-center">
        <NuxtLink
          v-if="child.link"
          :to="child.link"
          class="px-4 py-2 bg-gray-50 whitespace-nowrap flex-1"
        >
          {{ child.label }}
        </NuxtLink>
        <div
          v-else
          class="px-4 py-2 bg-gray-50 whitespace-nowrap flex-1"
        >
          {{ child.label }}
        </div>
        <button
          v-if="child.children"
          @click="toggleItem(child.label)"
          class="px-4 py-2 bg-gray-50 cursor-pointer"
        >
          <Icon
            name="heroicons:chevron-down"
            class="inline-block transition-transform duration-300"
            :class="{ 'rotate-180': openItems.has(child.label) }"
          />
        </button>
      </div>

      <!-- Nested dropdown -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-screen opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="max-h-screen opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="child.children && openItems.has(child.label)" class="overflow-hidden">
          <NavMobileNestedDropdown
            :children="child.children"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>