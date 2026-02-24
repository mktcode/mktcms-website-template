<script setup lang="ts">
const { zoom, lat, lng, markers, width, height } = defineProps<{
  zoom: number
  lat: number
  lng: number
  markers: Array<{
    lat: number
    lng: number
    text: string
    open?: boolean
  }>
  width?: string | number
  height?: string | number
}>()

const mapStyle = {
  ...(width !== undefined
    ? { width: typeof width === 'number' ? `${width}px` : width }
    : {}),
  ...(height !== undefined
    ? { height: typeof height === 'number' ? `${height}px` : height }
    : {}),
}

function onMapReady(map: L.Map) {
  if (import.meta.client) {
    markers.forEach(marker => {
      if (marker.open) {
        map.openPopup(marker.text, [marker.lat, marker.lng], { offset: [0, 5] })
      }
    })
  }
}
</script>

<template>
  <LMap
    ref="map"
    :class="['not-prose', { 'h-72!': height === undefined }]"
    :style="mapStyle"
    :zoom="zoom"
    :center="[lat, lng]"
    :use-global-leaflet="false"
    @ready="onMapReady"
  >
    <LTileLayer
      url="/api/maptiles?z={z}&x={x}&y={y}"
      layer-type="base"
      name="OpenStreetMap"
    />
    <LMarker
      v-for="(marker, index) in markers"
      :key="`${marker.lat}-${marker.lng}-${index}`"
      :lat-lng="[marker.lat, marker.lng]"
    >
      <LIcon
        icon-url="/map-marker.png"
        :icon-anchor="[13, 38]"
      />
      <LPopup>
        <span v-html="marker.text" />
      </LPopup>
    </LMarker>
  </LMap>
</template>
