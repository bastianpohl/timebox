<template>
    <button
        @click="toggleButton"
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

