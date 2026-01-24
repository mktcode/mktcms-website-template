<script setup lang="ts">
defineProps<{
  items: Array<MenuItem>
}>()

const isOpen = ref(false)
</script>

<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="sm:hidden px-4 py-2 bg-brand text-white rounded-md focus:outline-none"
    >
      <span v-if="isOpen">Close Menu</span>
      <span v-else>Open Menu</span>
    </button>
    <Teleport to="body">
      <nav
        class="absolute z-1000 top-0 right-0 h-screen overflow-y-auto max-w-100 w-5/6 flex flex-col sm:hidden transform transition duration-500"
        :class="{ 'translate-x-full': !isOpen, 'translate-x-0': isOpen }"
      >
        <div
          v-for="item in items"
          :key="item.label"
          class="relative group"
        >
          <!-- Parent item: clickable if has link, otherwise just a label -->
          <NuxtLink
            v-if="item.link"
            :to="item.link"
            class="px-4 py-2 bg-white flex justify-between whitespace-nowrap w-full"
          >
            {{ item.label }}
            <span v-if="item.children" class="ml-1">
              <Icon name="heroicons:chevron-down" class="inline-block" />
            </span>
          </NuxtLink>
          <button
            v-else
            class="px-4 py-2 bg-white flex justify-between whitespace-nowrap w-full cursor-pointer text-left"
          >
            {{ item.label }}
            <span v-if="item.children" class="ml-1">
              <Icon name="heroicons:chevron-down" class="inline-block" />
            </span>
          </button>
  
          <!-- Dropdown menu -->
          <ClientOnly>
            <NavMobileDropdown
              v-if="item.children"
              :children="item.children"
            />
          </ClientOnly>
        </div>
      </nav>
    </Teleport>
  </div>
</template>