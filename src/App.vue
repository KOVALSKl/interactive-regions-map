<template>
    <div class="map-container">
        <div id="map">

        </div>
    </div>
</template>

<script>
    import * as d3 from "d3"
    import mapJson from "./assets/map.json"

    export default {
        data() {
            return {
                width: 900,
                height: 900,
                g: null,
                zoom: null,
                regions: null,
                svg: null,
                path: null
            }
        },

        methods: {
          zoomed(event) {
              const {transform} = event;
              this.g.attr("transform", transform);
              this.g.attr("stroke-width", 1 / transform.k);
          },

          reset() {
              this.regions.transition().style("fill", null);
              this.svg.transition().duration(750).call(
                  this.zoom.transform,
                  d3.zoomIdentity,
                  d3.zoomTransform(this.svg.node()).invert([this.width / 2, this.height / 2])
              );
          },

          clicked(event, d) {
              const [[x0, y0], [x1, y1]] = this.path.bounds(d);
              event.stopPropagation();
              this.regions.transition().style("fill", null);
              d3.select(event.target).transition().style("fill", "red");
              this.svg.transition().duration(750).call(
                  this.zoom.transform,
                  d3.zoomIdentity
                      .translate(this.width / 2, this.height / 2)
                      .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height)))
                      .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                  d3.pointer(event, this.svg.node())
              );
          }
        },

        mounted() {
            this.svg = d3.select("#map")
                .append("svg")
                .attr("transform", "rotate(90)")
                .attr("viewBox", [0,0,this.width, this.height])
                .attr("width", this.width)
                .attr("height",this.height)
                .attr("style", "max-width: 100%; height: auto;")
                .on("click", this.reset)

            this.zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on("zoom", this.zoomed);

            let projection = d3.geoTransverseMercator().fitSize([this.width, this.height], mapJson)
            this.path = d3.geoPath().projection(projection)

            this.g = this.svg.append("g")

            this.regions = this.g.append("g")
                .attr("fill", "#444")
                .attr("cursor", "pointer")
                .selectAll("path")
                .data(mapJson.features)
                .join("path")
                .on("click", this.clicked)
                .attr("d", this.path)

            this.regions.append("title")
                .text(d => d.properties.NAME_1);

            this.g.append("path")
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")

            this.svg.call(this.zoom)

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