<template>
  <g class="map-region" v-bind="props">
    <path
        class="map-region-path"
        :d="mainProps.d"
    >
    </path>
  </g>
</template>

<script setup>
  import { ref } from "vue"

  const mainProps = defineProps(["d", "data"])

</script>

<style lang="scss">
  .tooltip {
    & {
      z-index: 10000;
      background: white;
    }
  }

  .map-region {
    & {
      fill: #444;
      cursor: pointer;
    }
  }
</style>