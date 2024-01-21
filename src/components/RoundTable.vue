<template>
  <table>
    <th >
        <td>Runde</td>
        <td>Zeit</td>
    </th>
    <tr>
      <td>
        1
      </td>
      <td>
        02:30
      </td>
    </tr>
    <tr v-for="round in rounds" :key="index">
      <td>
        {{round.index}}
      </td>
      <td>
        {{round.time}}
      </td>
    </tr>
  </table>
</template>

<script setup>
  import { ref } from 'vue'
  const props = defineProps(["rounds"])
  
  const rounds = ref([])

</script>

<style lang="scss" scoped></style>