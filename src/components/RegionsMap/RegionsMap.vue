<template>
    <div id="map">
        <svg
                id="map-image"
                :width="width"
                :height="height"
                :viewBox="[0,0,width,height]"
        >

        </svg>
    </div>
</template>

<script>
    import * as d3 from "d3"
    import mapJson from "./assets/map.json"

    export default  {
        props: ["width", "height"],
        data() {
            return {

            }
        },

        methods: {

        }
    }
</script>

<style>
    #map-image {
        transform: rotate(90deg);
    }
</style>