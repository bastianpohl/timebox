<template>
  <button @click="resetTimer">Reset</button>
</template>

<script setup>
  const emit = defineEmits(['resetTimer'])
  
  const resetTimer = () => {
    emit("resetTimer")
  }
</script>

<style>

</style>
