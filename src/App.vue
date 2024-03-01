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
                width: 700,
                height: 700,
                g: null,
                zoom: null,
                regions: null,
                svg: null,
                path: null
            }
        },

        computed: {
          mapData() {
            return mapJson
          }
        },

        mounted() {
            // this.svg = d3.select("#map")
            //     .append("svg")
            //     .attr("transform", "rotate(90)")
            //     .attr("viewBox", [0,0,this.width, this.height])
            //     .attr("width", this.width)
            //     .attr("height",this.height)
            //     .attr("style", "max-width: 100%; height: auto;")
            //     .on("click", this.reset)
            //
            // this.zoom = d3.zoom()
            //     .scaleExtent([1, 8])
            //     .on("zoom", this.zoomed);
            //
            // let projection = d3.geoTransverseMercator().fitSize([this.width, this.height], mapJson)
            // this.path = d3.geoPath().projection(projection)
            // console.log(this.path)
            //
            // this.g = this.svg.append("g")
            //
            // this.regions = this.g.append("g")
            //     .attr("fill", "#444")
            //     .attr("cursor", "pointer")
            //     .selectAll("path")
            //     .data(mapJson.features)
            //     .join("path")
            //     .on("click", this.clicked)
            //     .attr("d", this.path)
            //     .on("mouseover", function (event) {
            //         d3.select(event.target).attr("fill", "rgba(68,68,68,0.7)")
            //     })
            //     .on("mouseout", function (event) {
            //         d3.select(event.target).attr("fill", "#444")
            //     })
            //
            // // this.regions.append("v-tooltip")
            //
            // console.log(this.path(mapJson.features[0]))
            //
            // this.regions.append("title")
            //     .text(d => d.properties.NAME_1);
            //
            // this.g.append("path")
            //     .attr("fill", "none")
            //     .attr("stroke", "white")
            //     .attr("stroke-linejoin", "round")
            //
            // this.svg.call(this.zoom)

            // svg.selectAll("path")
            //     .data(mapJson.features)
            //     .enter()
            //     .append("path")
            //     .attr("d", path)
            //     .attr('stroke', '#999999')
            //     .attr("fill", "#000000")
            //     .attr("stroke-width", 1)
            //     .on("click", (event) => {
            //         console.log(event.target.__data__)
            //     })
            //     .on("mouseover", (event) => {
            //         d3.select(event.target).attr("fill", "red")
            //     })
            //     .on("mouseout", (event) => {
            //         d3.select(event.target).attr("fill", "#000000")
            //     })
            //
            // let all_paths = svg.selectAll("path")
            // console.log(all_paths)
        }
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