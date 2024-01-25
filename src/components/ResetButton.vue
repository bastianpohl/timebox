<template>
    <GenericButton @click="resetTimer" :title="reset" />
</template>

<script setup>
  import { ref } from 'vue';
  import GenericButton from './GenericButton.vue';

  const reset = ref("Reset")
  const emit = defineEmits(['resetTimer'])

  const resetTimer = () => {
    emit("resetTimer")
  }
</script>

<style>

</style>
