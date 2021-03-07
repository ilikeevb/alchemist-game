<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button @click="goHome" type="button" class="nes-btn is-primary ma-2">
          Меню
        </button>
      </div>
    </div>
    <!-- 1 слайд -->
    <div v-if="slide == 0" class="nes-container is-dark with-title">
      <p class="title">Привет, путник!</p>
      <div class="row justify-content-center">
        <div class="col-8" align="center">
          <p>
            Если ты читаешь это, то Алхимик выбрал тебя в качестве своего
            помощника. Алхимик&nbsp;-&nbsp;это ученный из далекого прошлого.
          </p>
          <p>
            В отличие от других алхимиков прошлого, которые хотят из металлов
            сделать золото, наш Алхимик использует химию чтобы улучшить жизнь
            других: из железа делает инструменты для крестьян, использует химию
            в медицине и тд.
          </p>
          <p>
            Ахимик живет в прошлом. Даже базовые химические элементы не открыты
            в этом мире. Но благодаря твоим знаниям, ты можешь помощь Алхимику.
          </p>
          <button @click="nextSlide" type="button" class="nes-btn is-success">
            Дальше
          </button>
        </div>
      </div>
    </div>
    <!-- 2 слайд -->
    <div v-else-if="slide == 1" class="nes-container is-dark with-title">
      <p class="title">Начало пути</p>
      <div class="row justify-content-center">
        <div class="col-6" align="center">
          <div class="nes-field">
            <label for="name_field">Как тебя зовут?</label>
            <input
              v-model="name"
              type="text"
              id="name_field"
              class="nes-input"
            />

            <div class="row">
              <div class="col">
                <button
                  @click="nextSlide"
                  type="button"
                  class="nes-btn is-success"
                >
                  Продолжить
                </button>
              </div>
              <div class="col">
                <button
                  @click="pastSlide"
                  type="button"
                  class="nes-btn is-primary"
                >
                  Назад
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 3 слайд -->
    <div v-else class="nes-container is-dark with-title">
      <p class="title">Добро пожаловать!</p>
      <div class="row justify-content-center">
        <div class="col-6" align="center">
          {{ name }}
          <button @click="setName" type="button" class="nes-btn is-success">
            Начать игру!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      slide: 0,
    };
  },
  methods: {
    setName() {
      this.$store.dispatch("user/RENAME_USER", this.name);
      this.$router.push({ name: "map" });
    },
    goHome() {
      this.$router.push("/");
    },
    nextSlide() {
      this.slide += 1;
    },
    pastSlide() {
      this.slide -= 1;
    },
  },
};
</script>

<style scoped>
</style>