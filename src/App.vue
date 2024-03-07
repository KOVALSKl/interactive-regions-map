<script setup>
    import * as d3 from "d3"
    import {ref, computed, toRaw} from "vue"

    import mapJson from "./assets/map.json"
    import indexedMapFeaturesJson from "./assets/indexed_map.json"

    import RegionsMap from "@/components/RegionsMap/RegionsMap.vue";
    import RegionInfo from "@/components/Cards/RegionInfo/RegionInfo.vue"

    const width = 900
    const height = 900
    const mapData = computed(() => mapJson)
    const mapDataFeaturesLength = mapData.value.features.length
    const indexedMapFeatures = computed(() => indexedMapFeaturesJson)

    const currentRegionIndex = ref(0)


    const currentRegion = computed(() => {
      return mapData.value.features[currentRegionIndex.value]
    })

    function setRegionIndex(value) {
      if (value >= 0 && value < mapDataFeaturesLength) {
        currentRegionIndex.value = value
      }
    }

    function nextRegion() {
      currentRegionIndex.value += 1

      if (currentRegionIndex.value === mapDataFeaturesLength) {
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
      let regionId = currentRegion.value.properties.id
      let regionElement = document.getElementById(regionId).lastChild
      regionElement.dispatchEvent(new MouseEvent("click", undefined))
    }

</script>

<template>
    <div class="app-container w-100">
      <regions-map
          :width="width"
          :height="height"
          :data="mapData"
          :indexed-regions="indexedMapFeatures"
          :current-region-index="currentRegionIndex"
          :set-region-index="setRegionIndex"
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

      @media screen and (max-width: 576px) {
          & {
              grid-template-columns: 1fr;
              grid-template-rows: 1fr 0.5fr;
              align-items: center;
              justify-items: center;
          }
      }
  }

</style>