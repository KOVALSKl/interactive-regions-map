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
                v-for="feature in data.features"
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
  </div>
</template>

<script setup>
  import * as d3 from "d3"
  import { ref, onMounted, computed } from "vue"

  // Components
  import MapRegion from "@/components/MapRegion/MapRegion.vue";

  const props = defineProps({
    width: Number,
    height: Number,
    data: Object,
    currentRegionIndex: Number,
    setRegionIndex: Function,
    setRegionsRef: Function
  })

  const currentRegion = computed(() => {
    return props.data.features[props.currentRegionIndex]
  })

  const regionsData = computed(() => {
    return props.data.features
  })

  const projection = d3.geoTransverseMercator().fitSize([props.width, props.height], props.data)

  const path = ref(d3.geoPath().projection(projection))
  const transform = ref(null)
  const zoom = ref(null)
  const map = ref(null)
  const g = ref(null)

  const regionsHTMlTags = ref(null)
  const regionsRef = ref(null)

  function findRegionIndex(regionData) {
    for (let i = 0; i < regionsData.value.length; i++) {
      if (regionsData.value[i].properties.NAME_1 === regionData.properties.NAME_1) {
        return i;
      }
    }
  }

  function zoomed(event) {
    const {transform} = event;
    g.value.attr("transform", transform);
    g.value.attr("stroke-width", 1 / transform.k);
  }

  function reset() {
    regionsHTMlTags.value.transition().style("fill", null)
    map.value.transition().duration(750).call(
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
    map.value.transition().duration(750).call(
        zoom.value.transform,
        d3.zoomIdentity
            .translate(props.width / 2, props.height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / props.width, (y1 - y0) / props.height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        // d3.pointer(event, map.value.node())
    )

    let regionIndex = findRegionIndex(d)
    props.setRegionIndex(regionIndex)
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

<style lang="scss">
  .map-container {
    & {
      z-index: 10;
      min-width: 100%;
    }

    #map {
      transform: rotate(90deg);
      max-width: 100%;
      height: auto;
    }
  }
</style>