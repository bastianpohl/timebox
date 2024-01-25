<template>
    <GenericButton @click="toggleButton" :title="props.title" />
</template>

<script setup>
import GenericButton from './GenericButton.vue'

    const props = defineProps(['title'])
    const emit = defineEmits(['toggleButton'])

    const toggleButton = () => {
        emit("toggleButton")
    }
</script>

<style>
 
</style>
