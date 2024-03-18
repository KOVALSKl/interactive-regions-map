<script setup>
    import {computed} from "vue"
    import RegionsMap from "@/components/RegionsMap/RegionsMap.vue";
    import RegionInfo from "@/components/Cards/RegionInfo/RegionInfo.vue"

    import regionsJSON from "/src/assets/map.json"
    import regionsIndexesJSON from "/src/assets/indexed_map.json"

    const regions = computed(() => regionsJSON)
    const regionsIndexes = computed(() => regionsIndexesJSON)

    const width = 720
    const height = 720
</script>

<template>
    <div class="app-container">
        <header>
            <h2>Interactive Map</h2>
        </header>
        <main>
            <regions-map
                    :width="width"
                    :height="height"
                    :regions="regions"
                    :regions-indexes="regionsIndexes"
            >
                <template #default="props">
                    <region-info
                            v-bind="props"
                    >
                    </region-info>
                </template>
            </regions-map>
        </main>
        <footer>
            Map.json taken from <a href="https://gadm.org/download_country.html">GADM</a> &#128151;
        </footer>
    </div>
</template>

<style lang="scss">
    .app-container {
        & {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;

            padding: 2rem;
        }
    }
</style>
