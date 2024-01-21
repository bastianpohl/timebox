<template>
    <button
        @click="toggleButton"
        class="button-container button"
    >
        {{props.title}}
    </button>
</template>

<script setup>

    const props = defineProps(['title'])
    const emit = defineEmits(['toggleButton'])

    const toggleButton = () => {
        emit("toggleButton")
    }
</script>

<style>
 
</style>
