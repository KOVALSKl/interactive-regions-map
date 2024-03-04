<template>
  <regions-map :width="this.width" :height="this.height" :data="this.mapData">
  </regions-map>
</template>

<script>
    import * as d3 from "d3"
    import mapJson from "./assets/map.json"

    import RegionsMap from "@/components/RegionsMap/RegionsMap.vue";

    export default {
      components: {RegionsMap},
        data() {
            return {
                width: 900,
                height: 900,
            }
        },

        computed: {
          mapData() {
            return mapJson
          }
        },
    }
</script>

<style>
    .map-container {
        min-width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>