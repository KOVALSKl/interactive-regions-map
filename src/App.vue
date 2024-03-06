<script setup>
    import * as d3 from "d3"
    import {ref, computed, toRaw} from "vue"
    import mapJson from "./assets/map.json"

    import RegionsMap from "@/components/RegionsMap/RegionsMap.vue";
    import RegionInfo from "@/components/Cards/RegionInfo/RegionInfo.vue"

    const width = 900
    const height = 900
    const mapData = computed(() => mapJson)

    const currentRegionIndex = ref(0)
    const regionsRef = ref(null)


    const currentRegion = computed(() => {
      return mapData.value.features[currentRegionIndex.value]
    })

    function setRegionsRef(value) {
      regionsRef.value = value
    }

    function setRegionIndex(value) {
      if (value >= 0 && value < mapData.value.features.length) {
        currentRegionIndex.value = value
      }
    }

    function nextRegion() {
      currentRegionIndex.value += 1

      if (currentRegionIndex.value === mapData.value.features.length) {
        currentRegionIndex.value = 0
      }

      invokeRegionClick()
    }

    function previousRegion() {
      currentRegionIndex.value -= 1

      if (currentRegionIndex.value < 0) {
        currentRegionIndex.value = mapData.value.features.length - 1
      }

      invokeRegionClick()
    }

    function invokeRegionClick() {
      let regionId = currentRegion.value.properties.NAME_1
      let regionElement = document.querySelector(`#${regionId} > path`)
      regionElement.dispatchEvent(new MouseEvent("click", undefined))
    }

</script>

<template>
    <div class="app-container w-100">
      <regions-map
          :width="width"
          :height="height"
          :data="mapData"
          :current-region-index="currentRegionIndex"
          :set-region-index="setRegionIndex"
          :set-regions-ref="setRegionsRef"
      >
      </regions-map>
      <region-info
          :region-data="currentRegion"
          :on-next="nextRegion"
          :on-previous="previousRegion"
      >
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