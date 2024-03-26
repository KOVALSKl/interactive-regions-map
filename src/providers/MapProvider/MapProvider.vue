<script setup>
    import * as d3 from "d3"
    import { ref, onMounted, computed } from "vue"

    const props = defineProps({
        mapData: {
            type: Object,
            required: true
        },
        mapDataIndexes: {
            type: Object,
            default: null
        },
        mapProjection: {
            type: Object,
            default: null
        },
    })

    const emits = defineEmits(['nextRegion', 'previousRegion'])

    const mapDataFeaturesLength = props.regions.features.length
    let tags = [];
    let tagsMap = new Map();

    const projection = computed(() => {
        return (props.mapProjection ?? d3.geoTransverseMercator()
            .fitSize([props.width, props.height], props.regions)
            .rotate([-90, 0])
            .center([-20, -20]))
    })

    const currentRegionIndex = ref(0)
    const path = ref(d3.geoPath().projection(projection.value))
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

        emits("nextRegion")
    }

    function previousRegion() {
        currentRegionIndex.value -= 1

        if (currentRegionIndex.value < 0) {
            currentRegionIndex.value = mapDataFeaturesLength - 1
        }

        invokeRegionClick()

        emits("previousRegion")
    }

    function invokeRegionClick() {
        let regionId = currentRegion.value.properties.id
        let regionPathElement = tagsMap.get(regionId)
        regionPathElement.dispatchEvent(new PointerEvent("click", undefined))
    }

    function zoomed(event) {
        const {transform} = event;
        g.value.attr("transform", transform);
        g.value.attr("stroke-width", 1 / transform.k);
    }

    function reset() {
        map.value.transition().duration(props.animationDurationTime).call(
            zoom.value.transform,
            d3.zoomIdentity,
            d3.zoomTransform(map.value.node()).invert([props.width / 2, props.height / 2])
        );
    }

    function clicked({event, data}) {
        const [[x0, y0], [x1, y1]] = path.value.bounds(data);
        event.stopPropagation();

        tagsMap.get(currentRegion.value.properties.id)?.style.setProperty("fill", null)

        let regionIndex;

        if(props.regionsIndexes)
            regionIndex = getRegionIndex(data)
        else
            regionIndex = findRegionIndex(data)

        setRegionIndex(regionIndex)

        tagsMap.get(currentRegion.value.properties.id)?.style.setProperty("fill", "red")

        map.value.transition().duration(props.animationDurationTime).call(
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

        tags = document.querySelectorAll("path.map-region-path").values();

        for (let tag of tags) {
            tagsMap.set(tag.parentElement.id, tag)
        }

        g.value = d3.select("#regions-container")

        invokeRegionClick();
    })
</script>

<template>
    <slot></slot>
</template>