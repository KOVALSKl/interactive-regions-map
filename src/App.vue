<script setup>
    import * as d3 from "d3"
    import {ref, computed} from "vue"
    import mapJson from "./assets/map.json"

    import RegionsMap from "@/components/RegionsMap/RegionsMap.vue";
    import RegionInfo from "@/components/Cards/RegionInfo/RegionInfo.vue"

    const width = 900
    const height = 900
    const mapData = computed(() => mapJson)

</script>

<template>
    <div class="app-container w-100">
      <regions-map :width="width" :height="height" :data="mapData">
      </regions-map>
      <region-info>
      </region-info>
    </div>
</template>

<style lang="scss">

  .app-container {
    & {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-column-gap: 20px;
        align-items: center;
    }
  }

</style>