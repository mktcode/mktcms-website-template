<script setup lang="ts">
const isOpen = ref(false)
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
    <button
      @click="isOpen = !isOpen"
      class="sm:hidden px-4 py-2 bg-brand text-white rounded-md focus:outline-none flex items-center justify-center cursor-pointer"
    >
      <Icon name="heroicons:bars-3" size="1.5rem" />
    </button>
    <ClientOnly>
      <Teleport to="body">
        <nav
          class="bg-nav-mobile-bg text-nav-mobile-text fixed z-1000 top-0 right-0 h-screen pt-14 overflow-y-auto max-w-100 w-5/6 flex flex-col sm:hidden transform transition duration-500"
          :class="{ 'translate-x-full': !isOpen, 'translate-x-0': isOpen }"
        >
          <button
            @click="isOpen = false"
            class="absolute top-0 right-0 p-4 focus:outline-none flex items-center justify-center cursor-pointer"
          >
            <Icon name="heroicons:x-mark" size="1.5rem" />
          </button>
  
          <div
            v-for="item in navItems"
            :key="item.label"
            class="relative group mb-px"
          >
            <!-- Parent item: clickable if has link, otherwise just a label -->
            <div class="flex items-center">
              <NuxtLink
                v-if="item.link"
                :to="item.link"
                class="px-4 py-2 bg-nav-mobile-item-bg text-nav-mobile-text flex justify-between whitespace-nowrap flex-1"
              >
                {{ item.label }}
              </NuxtLink>
              <div
                v-else
                class="px-4 py-2 bg-nav-mobile-item-bg text-nav-mobile-text whitespace-nowrap flex-1 cursor-pointer"
                @click="toggleItem(item.label)"
              >
                {{ item.label }}
              </div>
              <button
                v-if="item.children"
                @click="toggleItem(item.label)"
                class="px-4 py-2 bg-nav-mobile-trigger-bg text-nav-mobile-text cursor-pointer"
              >
                <Icon
                  name="heroicons:chevron-down"
                  class="inline-block transition-transform duration-300"
                  :class="{ 'rotate-180': openItems.has(item.label) }"
                />
              </button>
            </div>
    
            <!-- Dropdown menu -->
            <ClientOnly>
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-screen opacity-100"
                leave-active-class="transition-all duration-300 ease-in"
                leave-from-class="max-h-screen opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-if="item.children && openItems.has(item.label)" class="overflow-hidden">
                  <NavMobileDropdown
                    :children="item.children"
                  />
                </div>
              </Transition>
            </ClientOnly>
          </div>
        </nav>
      </Teleport>
    </ClientOnly>
  </div>
</template>