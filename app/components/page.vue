<template>
  <div id="mktcms-page">
    <header class="bg-brand-lighten">
      <nav class="container flex items-center justify-between max-w-292.5 mx-auto px-4 py-3 bg-brand text-white">
        <NuxtLink to="/" class="font-bold">
          Meine Webseite
        </NuxtLink>
        <NavMobile :items="navItems" />
      </nav>
    </header>
    <main>
      <div class="container max-w-292.5 mx-auto p-4 bg-white">
        <div class="mb-4">
          <h1 class="text-4xl font-bold">Hallo Welt!</h1>
        </div>
        <Nav :items="navItems" class="mb-10" />
        <slot />
      </div>
    </main>
    <footer class="bg-brand-lighten">
      <div class="container max-w-292.5 mx-auto px-4 py-3 bg-brand text-white text-right text-sm">
        <NuxtLink to="/impressum" class="hover:underline">Impressum</NuxtLink>
        <NuxtLink to="/datenschutzerklaerung" class="ml-4 hover:underline">Datenschutzerklärung</NuxtLink>
      </div>
    </footer>
  </div>
</template>