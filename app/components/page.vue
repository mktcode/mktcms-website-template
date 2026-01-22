<template>
  <div>
    <header class="bg-brand-soft">
      <nav class="container max-w-292.5 mx-auto px-4 py-3 bg-brand text-white">
        <a href="/" class="font-bold">Meine Webseite</a>
      </nav>
    </header>
    <main>
      <div class="container max-w-292.5 mx-auto p-4 bg-white">
        <div class="bg-brand-soft rounded-sm p-4 mb-4">
          <h1 class="text-4xl font-bold">Hallo Welt!</h1>
        </div>
        <nav class="bg-brand text-white text-sm rounded-sm mb-4 flex overflow-hidden">
          <NuxtLink to="/" class="p-4 hover:bg-brand-hover">Startseite</NuxtLink>
          <NuxtLink to="/contact" class="p-4 hover:bg-brand-hover">Kontakt</NuxtLink>
        </nav>
        <slot />
      </div>
    </main>
    <footer class="bg-brand-soft">
      <div class="container max-w-292.5 mx-auto px-4 py-3 bg-brand text-white text-right text-sm">
        <NuxtLink to="/impressum" class="hover:underline">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz" class="ml-4 hover:underline">Datenschutz</NuxtLink>
      </div>
    </footer>
  </div>
</template>