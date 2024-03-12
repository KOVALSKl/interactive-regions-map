<template>
  <g class="map-region">
    <path
        class="map-region-path"
        :d="mainProps.d"
        @click="(event) => onclick(event, data)"
    >
    </path>
  </g>
</template>

<script setup>
  const mainProps = defineProps(["d", "data", "onclick"])
</script>

<style lang="scss">
  .map-region {
    & {
      transition: fill ease-in 200ms;
      fill: #444;
      cursor: pointer;
      position: relative;
    }

    &:hover {
      fill: rgba(68, 68, 68, 0.7)
    }
  }
</style>