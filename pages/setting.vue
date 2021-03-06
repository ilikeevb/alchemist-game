<template>
  <div class="container">
    <div class="nes-container is-dark with-title">
      <p class="title">Настройки</p>
      <div class="row align-items-center">
        <div class="col-sm" align="center">
          <h3>Тут будут настройки игры</h3>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-sm" align="right">
          <button type="button" class="nes-btn is-success">Сохранить</button>
        </div>
        <div class="col-sm" align="left">
          <button type="button" class="nes-btn is-primary" @click="goHome">
            Назад
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
</style>