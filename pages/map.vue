<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button @click="goHome" type="button" class="nes-btn is-primary ma-2">
          Меню
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="nes-container is-dark with-title">
          <p class="title">Карта</p>
          <div class="row align-items-center titles">
            <div class="col-1 line" align="center">
              <h3>#</h3>
            </div>
            <div class="col-4 line" align="center">
              <h3>Уровень</h3>
            </div>
            <div class="col-2 line" align="center">
              <h3>Теория</h3>
            </div>
            <div class="col-2 line" align="center">
              <h3>Рекорд</h3>
            </div>
            <div class="col-3 line" align="center">
              <h3>Сложность</h3>
            </div>
          </div>

          <div class="row align-items-center">
            <div class="col-sm" align="center">
              <span v-if="start != 0" @click="up" class="nes-text is-primary"
                >↑ Вверх ↑</span
              >
              <span v-else class="nes-text is-disabled">↑ Вверх ↑</span>
            </div>
          </div>
          <div
            class="row align-items-center"
            v-for="level in levels"
            :key="level.id"
          >
            <div class="col-1" align="center">
              {{ level.id }}
            </div>
            <div class="col-4" align="center">
              <button v-if="level.close" class="nes-btn is-disabled ma-3">
                {{ level.name }}
              </button>
              <button
                v-else
                @click="showStartDialog(level.id)"
                :class="{
                  'nes-btn': true,
                  'is-success': level.done,
                  'ma-3': true,
                }"
              >
                {{ level.name }}
              </button>
              <dialog
                class="nes-dialog is-dark no-scroll"
                :id="'dialog-start' + level.id"
              >
                <form method="dialog" class="form ma-0 pa-0">
                  <menu class="dialog-menu">
                    <h3>{{ level.name }}</h3>
                    <p v-for="(row, n) in level.history" :key="n">
                      <span v-html="row" />
                    </p>
                    <h3>Цель: {{ level.target }}</h3>
                    <button
                      @click="goGame(level.id)"
                      class="nes-btn is-success"
                    >
                      Начать
                    </button>
                    <button class="nes-btn is-primary">Назад</button>
                  </menu>
                </form>
              </dialog>
            </div>
            <div class="col-2" align="center">
              <dialog class="nes-dialog" :id="'dialog-default' + level.id">
                <dialog-form :name="level.name" :theory="level.theory" />
              </dialog>
              <span
                class="nes-text is-warning link"
                @click="showDialog(level.id)"
              >
                Теория
              </span>
            </div>
            <div class="col-2" align="center">
              <h2>{{ level.record }}</h2>
            </div>
            <div class="col-3" align="center">
              <i
                v-for="(star, j) in level.stars"
                :key="j"
                :class="{
                  'nes-icon': true,
                  'is-medium': true,
                  star: true,
                  'is-transparent': !star.active,
                }"
              >
              </i>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-sm" align="center">
              <span
                v-if="end != levelsLen"
                @click="down"
                class="nes-text is-primary"
              >
                ↓ Вниз ↓
              </span>
              <span v-else class="nes-text is-disabled">↓ Вниз ↓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogForm from "~/components/DialogForm.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      start: 0,
      end: 4,
    };
  },
  computed: {
    name() {
      return this.$store.getters["user/getUserName"];
    },
    levelsLen() {
      return this.$store.getters["level/getLevelsLen"];
    },
    levels() {
      let levels = this.$store.getters["level/getLevels"];
      return levels.slice(this.start, this.end);
    },
  },
  methods: {
    up() {
      this.start -= 1;
      this.end -= 1;
    },
    down() {
      this.start += 1;
      this.end += 1;
    },
    goGame(key) {
      this.$router.push({ path: "/game/" + key });
    },
    goHome() {
      this.$router.push("/");
    },
    showDialog(key) {
      document.getElementById("dialog-default" + key).showModal();
    },
    showStartDialog(key) {
      document.getElementById("dialog-start" + key).showModal();
    },
  },
};
</script>

<style scoped>
.link:hover {
  border-bottom: 3px solid yellow;
}
.titles {
  border-bottom: 5px solid white;
  margin-bottom: 15px;
}
.no-scroll::-webkit-scrollbar {
  width: 0;
}
.no-scroll {
  -ms-overflow-style: none;
}
</style>