<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm" align="center">
          <h1 class="name">Алхимик</h1>
        </div>
      </div>
    </div>
    <div class="container d-none d-md-block d-lg-block d-xl-block">
      <div class="row">
        <div class="col-sm" align="center">
          <button
            v-if="gameContinue"
            @click="goMap"
            class="nes-btn is-primary ma-3"
          >
            Продолжить
          </button>
          <button v-else class="nes-btn is-disabled ma-3">Продолжить</button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm" align="center">
          <button @click="newGame" class="nes-btn is-primary ma-3">
            Новая игра
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-sm" align="center">
          <button class="nes-btn is-primary ma-3" @click="goSetting">
            Настройки
          </button>
        </div>
      </div>
    </div>
    <div class="container d-md-none d-xl-none d-lg-none">
      <div class="row">
        <div class="col-sm" align="center">
          <h3 style="color: white; text-shadow: 2px 2px 10px #000">
            Игра доступна только для desctop устройств
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameContinue: false,
    };
  },
  computed: {},
  mounted() {
    if (this.$store.getters["user/getUserName"]) {
      this.gameContinue = true;
    }
  },
  methods: {
    newGame() {
      this.$router.push({ name: "login" });
    },
    goMap() {
      this.$router.push({ name: "map" });
    },
    goSetting() {
      this.$router.push({ name: "setting" });
    },
  },
};
</script>

<style scoped>
.name {
  font-size: 48px;
  color: white;
  text-shadow: 4px 4px 3px black;
}
</style>
