<script setup lang="ts">
defineProps<{
  item: MenuItem,
  index: number
}>()

const { toggleSubmenu, isSubmenuOpen } = useMenu()
</script>

<template>
  <li class="nav-item w-full relative" :class="{ 'has-submenu': item.submenu, 'submenu-open': isSubmenuOpen(`item-${index}`) }">
    <!-- If item has no link, make entire button toggle submenu -->
    <button v-if="!item.link && item.submenu" class="nav-link nav-link-button" @click="toggleSubmenu(`item-${index}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}`)">
      {{ item.label }}
      <Icon name="heroicons:chevron-down" size="1rem" />
    </button>
    
    <!-- If item has link, use wrapper with separate toggle -->
    <div v-else class="nav-link-wrapper">
      <a :href="item.link" class="nav-link">
        {{ item.label }}
        <span class="hidden sm:block">
          <Icon
            v-if="item.submenu"
            name="heroicons:chevron-down"
          />
        </span>
      </a>
      <button v-if="item.submenu" class="submenu-toggle" @click="toggleSubmenu(`item-${index}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}`)">
        <Icon name="heroicons:chevron-down" />
      </button>
    </div>

    <!-- First Level Submenu -->
    <ul v-if="item.submenu" class="submenu">
      <li v-for="(subitem, subindex) in item.submenu" :key="subindex" class="submenu-item" :class="{ 'has-submenu': subitem.submenu, 'submenu-open': isSubmenuOpen(`item-${index}-${subindex}`) }">
        <!-- If subitem has no link, make entire button toggle nested submenu -->
        <button v-if="!subitem.link && subitem.submenu" class="submenu-link submenu-link-button" @click="toggleSubmenu(`item-${index}-${subindex}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}-${subindex}`)">
          {{ subitem.label }}
          <Icon name="heroicons:chevron-down" />
        </button>
        
        <!-- If subitem has link, use wrapper with separate toggle -->
        <div v-else class="submenu-link-wrapper">
          <a :href="subitem.link" class="submenu-link">
            {{ subitem.label }}
          </a>
          <button v-if="subitem.submenu" class="submenu-toggle" @click="toggleSubmenu(`item-${index}-${subindex}`, $event)" :aria-expanded="isSubmenuOpen(`item-${index}-${subindex}`)">
            <Icon name="heroicons:chevron-down" />
          </button>
        </div>

        <!-- Second Level Submenu -->
        <ul v-if="subitem.submenu" class="submenu submenu-nested">
          <li v-for="(nesteditem, nestedindex) in subitem.submenu" :key="nestedindex" class="submenu-item">
            <a :href="nesteditem.link" class="submenu-link">
              {{ nesteditem.label }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>