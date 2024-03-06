<template>
    <v-card elevation="3" id="region-info-card">
        <v-card-title class="region-title">
            {{regionData.properties.NAME_1}}
        </v-card-title>
        <v-card-text class="region-info">
          {{regionData.properties}}
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn variant="text" @click="onPrevious">
              назад
            </v-btn>
            <v-btn variant="text" @click="onNext">
              далее
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import {ref, computed} from "vue"

    const props = defineProps(["regionData", "onNext", "onPrevious"])
</script>

<style lang="scss">
    #region-info-card {
        & {
            border-radius: 20px;
        }
    }
</style>