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
  import { ref } from "vue"

  const mainProps = defineProps(["d", "data", "onclick"])

</script>

<style lang="scss">
  .map-region {
    & {
      transition: fill ease-in 150ms;
      fill: #444;
      cursor: pointer;
      position: relative;
    }

    &:hover {
      fill: rgba(68, 68, 68, 0.7)
    }

    & .region-tooltip {
      z-index: 9999;

      color: black;
    }
  }
</style>