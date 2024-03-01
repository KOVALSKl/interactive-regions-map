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
      >
      </map-region>
    </svg>
  </div>
</template>

<script setup>
  import * as d3 from "d3"
  import { ref } from "vue"

  // Components
  import MapRegion from "@/components/MapRegion/MapRegion.vue";

  const props = defineProps({
    width: Number,
    height: Number,
    data: Object,
  })

  function zoomed(event) {
    const {transform} = event;
    map.attr("transform", transform);
    map.attr("stroke-width", 1 / transform.k);
  }

  function reset() {
    map.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(map.node()).invert([props.width / 2, props.height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    d3.select(event.target).transition().style("fill", "red");
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(props.width / 2, props.height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / props.width, (y1 - y0) / props.height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, map.node())
    )
  }

  const projection = d3.geoTransverseMercator().fitSize([props.width, props.height], props.data)

  const zoom = ref(
      d3.zoom()
          .scaleExtent([1, 8])
          .on("zoom", zoomed)
  )
  const map = ref(d3.select("#map"))
  const path = ref(
      d3.geoPath().projection(projection)
  )

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