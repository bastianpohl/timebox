<template>
  <button>{{ props.title }}</button>
</template>

<script setup>
  const props = defineProps(['title'])
</script>