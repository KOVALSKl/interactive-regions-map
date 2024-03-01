<template>
  <div class="map-container">
    <svg
        id="map"
        :width="props.width"
        :height="props.height"
        :viewBox="[0,0,props.width, props.height]"
    >
      <map-region
          v-for="feature in data.features" :key="feature.properties.NAME_1"
          :data="feature"
          :d="path(feature)"
          :onclick="clicked"
      >
      </map-region>
    </svg>
  </div>
</template>

<script setup>
  import * as d3 from "d3"
  import { ref, onMounted } from "vue"

  // Components
  import MapRegion from "@/components/MapRegion/MapRegion.vue";

  const props = defineProps({
    width: Number,
    height: Number,
    data: Object,
  })

  const projection = d3.geoTransverseMercator().fitSize([props.width, props.height], props.data)

  const zoom = ref(
      d3.zoom()
          .scaleExtent([1, 8])
          .on("zoom", zoomed)
  )
  const map = ref(null)
  const path = ref(
      d3.geoPath().projection(projection)
  )

  function zoomed(event) {
    const {transform} = event;
    map.value.attr("transform", transform);
    map.value.attr("stroke-width", 1 / transform.k);
  }

  function reset() {
    console.log(map.value.node())
    map.value.transition().duration(750).call(
        zoom.value.transform,
        d3.zoomIdentity,
        d3.zoomTransform(map.value.node()).invert([props.width / 2, props.height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.value.bounds(d);
    event.stopPropagation();
    console.log(event)
    d3.select(event.currentTarget).transition().style("fill", "red");
    map.value.transition().duration(750).call(
        zoom.value.transform,
        d3.zoomIdentity
            .translate(props.width / 2, props.height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / props.width, (y1 - y0) / props.height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, map.value.node())
    )
  }

  onMounted(() => {
    map.value = d3.select("#map")
        .on("click", reset)
    map.value.call(zoom.value)
  })

</script>

<style lang="scss">
  .map-container {
    & {}

    #map {
      transform: rotate(90deg);
      max-width: 100%;
      height: auto;
    }
  }
</style>