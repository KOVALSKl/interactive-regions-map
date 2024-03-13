<script setup>
  import * as d3 from "d3"
  import { ref, onMounted, computed } from "vue"

  // Components
  import MapRegion from "@/components/MapRegion/MapRegion.vue";
  import RegionInfo from "@/components/Cards/RegionInfo/RegionInfo.vue"

  const props = defineProps({
    width: {
      type: Number,
      default: 900
    },
    height: {
      type: Number,
      default: 900
    },
    regions: {
      type: Object,
    },
    regionsIndexes: {
      type: Object,
    }
  })

  const mapDataFeaturesLength = props.regions.features.length
  const projection = d3.geoTransverseMercator().fitSize([props.width, props.height], props.regions)
  const animationDurationTime = 1500

  const currentRegionIndex = ref(0)
  const path = ref(d3.geoPath().projection(projection))
  const transform = ref(null)
  const zoom = ref(null)
  const map = ref(null)
  const g = ref(null)

  const regionsHTMlTags = ref(null)

  const currentRegion = computed(() => {
    return props.regions.features[currentRegionIndex.value]
  })

  function setRegionIndex(value) {
    if (value >= 0 && value < mapDataFeaturesLength) {
      currentRegionIndex.value = value
    }
  }

  function findRegionIndex(value) {
    for(let i = 0; i < mapDataFeaturesLength; i++) {
      if (props.regions[i].properties.id === value.properties.id) {
        return i;
      }
    }
  }

  function getRegionIndex(value) {
    let regionId = value.properties.id
    return props.regionsIndexes[regionId].index
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
      currentRegionIndex.value = mapDataFeaturesLength - 1
    }

    invokeRegionClick()
  }

  function invokeRegionClick() {
    let regionId = currentRegion.value.properties.id
    let regionPathElement = document.getElementById(regionId).lastChild
    regionPathElement.dispatchEvent(new MouseEvent("click", undefined))
  }

  function zoomed(event) {
    const {transform} = event;
    g.value.attr("transform", transform);
    g.value.attr("stroke-width", 1 / transform.k);
  }

  function reset() {
    map.value.transition().duration(animationDurationTime).call(
        zoom.value.transform,
        d3.zoomIdentity,
        d3.zoomTransform(map.value.node()).invert([props.width / 2, props.height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.value.bounds(d);
    event.stopPropagation();
    regionsHTMlTags.value.transition().style("fill", null)

    d3.select(event.currentTarget).transition().style("fill", "red");

    let regionIndex;

    if(props.regionsIndexes)
      regionIndex = getRegionIndex(d)
    else
      regionIndex = findRegionIndex(d)

    setRegionIndex(regionIndex)

    map.value.transition().duration(animationDurationTime).call(
        zoom.value.transform,
        d3.zoomIdentity
            .translate(props.width / 2, props.height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / props.width, (y1 - y0) / props.height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
    )
  }

  onMounted(() => {
    zoom.value = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed)

    map.value = d3.select("svg")
        .on("click", reset)
        .call(zoom.value)

    regionsHTMlTags.value = d3.selectAll("path")
    g.value = d3.select("#regions-container")
  })

</script>

<template>
  <div class="map-container w-100">
    <svg
            id="map"
            :width="props.width"
            :height="props.height"
            :transform="transform"
            :viewBox="[0,0,props.width, props.height]"
    >
      <g id="regions-container">
        <map-region
                v-for="feature in regions.features"
                :key="feature.properties.NAME_1"
                :id="feature.properties.id"
                ref="regionsRef"
                :data="feature"
                :d="path(feature)"
                :onclick="clicked"
        >
        </map-region>
        <path fill="none" stroke="white" stroke-linejoin="round">
        </path>
      </g>
    </svg>
    <slot
            :region-data="currentRegion"
            @next="nextRegion"
            @previous="previousRegion"
    >
    </slot>
  </div>
</template>

<style lang="scss">
  .map-container {
    & {
      z-index: 10;
      min-width: 100%;

      display: flex;
      justify-content: center;
      gap: 20px;

      align-items: center;
    }

    @media screen and (max-width: 576px) {
      & {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        justify-items: center;
      }
    }

    #map {
      transform: rotate(90deg);
      max-width: 100%;
      height: auto;
    }
  }
</style>