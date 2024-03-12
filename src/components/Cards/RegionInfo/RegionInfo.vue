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
<<<<<<< HEAD
            <v-btn variant="text" @click="$emit('next')">
              назад
            </v-btn>
            <v-btn variant="text" @click="$emit('previous')">
=======
            <v-btn variant="text" @click="onPrevious">
              назад
            </v-btn>
            <v-btn variant="text" @click="onNext">
>>>>>>> 7b7f7887ed2b53d1787237e167e64a4882f4eb56
              далее
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
        }
    }
</style>