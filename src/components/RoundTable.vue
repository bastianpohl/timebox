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
    <tr>
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
  import { ref } from 'vue';
  const rounds = ref([])
</script>

<style lang="scss" scoped></style>