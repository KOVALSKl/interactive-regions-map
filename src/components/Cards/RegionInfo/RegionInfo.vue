<template>
    <v-card elevation="3" id="region-info-card">
        <v-card-title>
            Test title
        </v-card-title>
        <v-card-text>
            test
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn variant="text">
                следующий
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
    import {ref, computed} from "vue"
</script>

<style lang="scss">
    #region-info-card {
        & {
            border-radius: 20px;
        }
    }
</style>