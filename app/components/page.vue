<template>
  <div>
    <header class="bg-brand-soft">
      <nav class="container max-w-292.5 mx-auto px-4 py-3 bg-brand text-white">
        <NuxtLink to="/" class="font-bold">
          Meine Webseite
        </NuxtLink>
      </nav>
    </header>
    <main>
      <div class="container max-w-292.5 mx-auto p-4 bg-white">
        <div class="bg-brand-soft rounded-sm p-4 mb-4">
          <h1 class="text-4xl font-bold">Hallo Welt!</h1>
        </div>
        <Nav />
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