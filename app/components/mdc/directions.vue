<script setup lang="ts">
const { text, zoom, lat, lng } = defineProps<{
  text: string
  zoom: number
  lat: number
  lng: number
}>()
</script>

<template>
  <LMap
    class="h-96!"
    ref="map"
    :zoom="zoom"
    :center="[lat, lng]"
    :use-global-leaflet="false"
  >
    <LTileLayer
      url="/api/maptiles?z={z}&x={x}&y={y}"
      layer-type="base"
      name="OpenStreetMap"
    />
    <LMarker :lat-lng="[lat, lng]">
      <LIcon icon-url="/map-marker.png" :icon-anchor="[13, 16]" />
      <LPopup>
        {{ text }}
      </LPopup>
    </LMarker>
  </LMap>
</template>