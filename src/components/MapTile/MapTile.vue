<template>
    <g id="map-tile"></g>
</template>

<script setup>
    import { ref } from "vue"
    import * as d3 from "d3"

    const props = defineProps({
        mapArea: Object,
        onClick: Function,
        mapWidth: Number,
        mapHeight: Number,
    })

    const projection = d3.geoTransverseMercator().fitSize([props.mapWidth, props.mapHeight], props.mapArea)
    const path = ref(d3.geoPath().projection(projection))

    const g = ref(d3.select("#map-tile"))

    const tileRegions = ref()
    tileRegions.value = g.value.append("g")
        .selectAll("path")
        .data(props.mapArea.features)
        .join("path")
        .on("click", props.onClick)
        .attr

    tileRegions.value.append("title")
        .text(d => d.properties.district)



</script>

<style lang="scss">
    #map-tile {
        & {
            fill: #444444;
            cursor: pointer;
        }
    }
</style>
