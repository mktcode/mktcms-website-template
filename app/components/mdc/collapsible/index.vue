<script setup lang="ts">
const props = defineProps<{
  title: string
  defaultOpen?: boolean
}>()

const isOpen = ref(props.defaultOpen ?? false)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="border border-gray-200 rounded-(--base-radius) mb-4 overflow-hidden">
    <button 
      @click="toggle" 
      class="w-full p-4 flex justify-start gap-4 items-center bg-gray-50 hover:bg-gray-100 cursor-pointer text-lg font-semibold text-left transition-colors duration-200"
      :aria-expanded="isOpen"
    >
      <Icon name="heroicons:chevron-down" size="1.5rem" class="transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
      <span>{{ title }}</span>
    </button>
    <div class="grid transition-[grid-template-rows] duration-300 ease-in-out" :class="isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
      <div class="overflow-hidden p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
