<script setup lang="ts">
import { computed, ref } from 'vue'

const siteUrl = useSiteUrl()

const props = withDefaults(defineProps<{
  url: string
  previewImage: string
  consentText?: string
  autoplay?: boolean
  width?: string | number
}>(), {
  autoplay: false,
  consentText: 'Mit dem Laden des Videos akzeptieren Sie die Datenübertragung an YouTube.'
})

const consentGiven = ref(false)

const withPlayerOptions = (baseUrl: string) => {
  const embedUrl = new URL(baseUrl)
  embedUrl.searchParams.set('controls', '0')
  embedUrl.searchParams.set('rel', '0')
  embedUrl.searchParams.set('iv_load_policy', '3')
  embedUrl.searchParams.set('fs', '0')
  embedUrl.searchParams.set('modestbranding', '1')
  embedUrl.searchParams.set('playsinline', '1')
  if (props.autoplay) {
    embedUrl.searchParams.set('autoplay', '1')
  }
  return embedUrl.toString()
}

const embedUrl = computed(() => {
  if (!consentGiven.value) return ''

  try {
    const parsedUrl = new URL(props.url)
    const host = parsedUrl.hostname.replace('www.', '')

    if (host === 'youtu.be') {
      const videoId = parsedUrl.pathname.split('/').filter(Boolean)[0]
      return videoId ? withPlayerOptions(`https://www.youtube-nocookie.com/embed/${videoId}`) : ''
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsedUrl.pathname === '/watch') {
        const videoId = parsedUrl.searchParams.get('v')
        return videoId ? withPlayerOptions(`https://www.youtube-nocookie.com/embed/${videoId}`) : ''
      }

      if (parsedUrl.pathname.startsWith('/embed/')) {
        return withPlayerOptions(`https://www.youtube-nocookie.com${parsedUrl.pathname}${parsedUrl.search}`)
      }

      if (parsedUrl.pathname.startsWith('/shorts/')) {
        const videoId = parsedUrl.pathname.split('/').filter(Boolean)[1]
        return videoId ? withPlayerOptions(`https://www.youtube-nocookie.com/embed/${videoId}`) : ''
      }
    }

    return ''
  }
  catch {
    return ''
  }
})

const accept = () => {
  consentGiven.value = true
}
</script>

<template>
  <div
    class="relative w-full max-w-full aspect-video overflow-hidden bg-black"
    :style="props.width ? { width: typeof props.width === 'number' ? props.width + 'px' : props.width } : undefined"
  >
    <!-- Preview -->
    <div
      v-if="!consentGiven"
      class="absolute inset-0 flex flex-col items-center justify-center text-center text-white"
    >
      <img
        :src="`${siteUrl}/api/content/${previewImage}`"
        alt="Video Vorschau"
        class="absolute inset-0 w-full h-full object-cover opacity-70 my-0!"
      />

      <div class="relative z-10 p-4 max-w-md">
        <p class="text-sm mb-4">
          {{ consentText }}
        </p>
        <button
          class="px-6 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
          @click="accept"
        >
          Video laden
        </button>
      </div>
    </div>

    <!-- Iframe -->
    <iframe
      v-if="embedUrl"
      class="h-full w-full"
      :src="embedUrl"
      title="YouTube Video"
      loading="lazy"
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerpolicy="strict-origin-when-cross-origin"
    />
  </div>
</template>