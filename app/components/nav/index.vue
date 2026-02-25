<template>
  <nav class="nav hidden text-sm sm:flex gap-1 bg-nav-bg rounded-(--base-radius)">
    <div
      v-for="item in navItems"
      :key="item.label"
      class="relative group"
    >
      <!-- Parent item: clickable if has link, otherwise just a label -->
      <NuxtLink
        v-if="item.link"
        :to="item.link"
        class="navitem"
      >
        {{ item.label }}
        <span v-if="item.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
        </span>
      </NuxtLink>
      <button
        v-else
        class="navitem"
      >
        {{ item.label }}
        <span v-if="item.children" class="ml-1">
          <Icon name="heroicons:chevron-down" class="inline-block" />
        </span>
      </button>

      <!-- Dropdown menu -->
      <ClientOnly>
        <NavDropdown
          v-if="item.children"
          :children="item.children"
        />
      </ClientOnly>
    </div>
  </nav>
</template>