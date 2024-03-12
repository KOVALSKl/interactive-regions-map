<script setup>
    import RegionsMap from "@/components/RegionsMap/RegionsMap.vue";
    import RegionInfo from "@/components/Cards/RegionInfo/RegionInfo.vue"

    const width = 900
    const height = 900

</script>

<template>
    <regions-map
            :width="width"
            :height="height"
    >
        <template #default="props">
            <region-info
                    v-bind="props"
            >
            </region-info>
        </template>
    </regions-map>
</template>