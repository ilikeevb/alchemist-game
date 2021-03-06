<template>
  <form method="dialog" class="form">
    <p class="title">{{ name }}</p>
    <p v-for="(row, n) in theory" :key="n">
      <span v-html="row" />
    </p>
    <menu class="dialog-menu">
      <button class="nes-btn is-primary">Закрыть</button>
    </menu>
  </form>
</template>

<script>
export default {
  props: ['name', 'theory']
};
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
}
.form {
  max-width: 70vh;
}
</style>