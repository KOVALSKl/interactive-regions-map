<template>
  <g class="map-region">
    <path
        class="map-region-path"
        :d="mainProps.d"
        @click="(event) => onclick(event, data)"
    >
      <title>{{data.properties.NAME_1}}</title>
    </path>
  </g>
</template>

<script setup>
  import { ref } from "vue"

  const mainProps = defineProps(["d", "data", "onclick"])

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