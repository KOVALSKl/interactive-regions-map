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
            <v-btn variant="text" @click="$emit('next')">
                previous
            </v-btn>
            <v-btn variant="text" @click="$emit('previous')">
                next
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    const props = defineProps(["regionData"])

    defineEmits(['next', 'previous'])
</script>

<style lang="scss">
    #region-info-card {
        & {
            border-radius: 20px;
            max-width: 400px;
        }
    }
</style>