<template>
  <div>
    <div class="score">
      <h1>Cчёт: {{ score }}/{{ target }}</h1>
      <h1 v-if="xp > 0">
        <span v-for="i in xp" :key="i">
          <img src="~/assets/heart.png" width="50" alt="" />
        </span>
      </h1>
    </div>
    <div v-if="gameOver" class="gameover">
      <div align="center">
        <h1>Игра окончена</h1>
        <h2>Ваш счёт: {{ score }}</h2>
      </div>
    </div>
    <div class="toolbar">
      <button
        id="next"
        @click="nextLevel"
        type="button"
        class="nes-btn is-success ma-2"
      >
        Продолжить
      </button>
      <button
        @click="restart"
        id="return"
        type="button"
        class="nes-btn is-warning ma-2"
      >
        Повторить
      </button>
      <button
        id="back"
        @click="goMap"
        type="button"
        class="nes-btn is-primary ma-2"
      >
        Назад
      </button>
      <button
        @click="setDebug"
        id="debug"
        type="button"
        :class="{ 'nes-btn': true, 'is-primary': debug, 'ma-2': true }"
      >
        <span v-if="debug">Тест: вкл</span>
        <span v-else>Тест: выкл</span>
      </button>
    </div>
    <canvas id="canvas" :class="game.background"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      music: null,
      score: 0,
      debug: false,
      gameOver: false,
      xp: 3,
      target: null,
    };
  },
  computed: {
    game() {
      let id = this.$route.params.id;
      return this.$store.getters["level/getLevels"].find(function (game) {
        return game.id == id;
      });
    },
  },
  methods: {
    setDebug() {
      this.debug = !this.debug;
    },
    goMap() {
      this.$router.push({ name: "map" });
    },
    nextLevel() {
      let id = this.$route.params.id;
      let score = this.score;

      this.$store.dispatch("level/DONE_LEVEL", {
        score: score,
        id: id,
      });
      this.$router.push({ name: "map" });
    },
    restart() {
      let id = this.$route.params.id;
      let score = this.score;

      this.$store.dispatch("level/RECORD_LEVEL", {
        score: score,
        id: id,
      });

      location.reload();
    },
  },
  mounted() {
    let this_ = this;

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    document.getElementById("next").hidden = true;
    document.getElementById("return").hidden = true;

    let gameData = JSON.parse(JSON.stringify(this.game));

    this_.target = gameData.target;

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    canvas.height = document.documentElement.clientHeight;
    canvas.width = document.documentElement.clientWidth;

    let debug = this_.debug;

    const good = gameData.good;
    const bad = gameData.bad;

    let elements = gameData.elements;

    const speeds = [1.25, 1.5];

    let elementsLen = elements.length;

    // Звуки
    let coin = new Audio("../coin.wav");
    coin.volume = 0.2;
    let critic = new Audio("../critic.wav");
    critic.volume = 0.2;

    let musicList = [
      "../music/Overworld.ogg",
      "../music/Rebels Be.ogg",
      "../music/Danger.ogg",
    ];
    this.music = new Audio("../music/Opening.ogg");
    let music = this.music;

    music.volume = 0.5;

    // Сердце
    let heart = new Image();
    heart.src = "../heart.png";

    // Поле (трава)
    let grass = new Image();
    grass.src = "../grass.png";

    // Параметры главного героя
    let hero = new Image();
    hero.src = "../dean.png";

    document.addEventListener("keydown", startMoveHero);
    document.addEventListener("keyup", stopMoveHero);

    let CurrentFrame = 0;

    let xp = 4;
    let score = 0;

    let gameOver = false;

    document.getElementById("back").onclick = function () {
      gameOver = true;
    };

    document.getElementById("debug").onclick = function () {
      debug = this_.debug;
    };

    music.addEventListener("ended", function () {
      music.src = musicList[getRandomIntInclusive(0, musicList.length - 1)];
      music.play();
    });

    var xPos = 200;
    var yPos = canvas.height - 75 - 96;
    let yCrop = 0;
    let speed = 10;

    let goLeft = false;
    let goRight = false;
    let goJump = false;
    let jumpUp = false;
    let jumpDown = false;
    let jumpCount = 0;
    let jumpCountConst = 0;

    function criticPlay() {
      critic.pause();
      critic.currentTime = 0;
      critic.play();
    }

    function coinPlay() {
      coin.pause();
      coin.currentTime = 0;
      coin.play();
    }

    function moveLeft() {
      if (goLeft) {
        yCrop = 96;
        CurrentFrame += 1;

        if (CurrentFrame > 3) {
          CurrentFrame -= 3;
        }
        xPos -= speed;

        if (xPos < -25) {
          xPos = canvas.width;
        }
      }
    }

    function moveRight() {
      if (goRight) {
        yCrop = 192;
        CurrentFrame += 1;

        if (CurrentFrame > 3) {
          CurrentFrame -= 3;
        }
        xPos += speed;

        if (xPos + 25 > canvas.width) {
          xPos = 0;
        }
      }
    }

    function moveJump() {
      if (goJump) {
        if (jumpUp) {
          speed = 15;
          jumpCount += 1;
          yPos -= 15;
          if (jumpCount > 10) {
            jumpCountConst = jumpCount;
            jumpUp = false;
            jumpDown = true;
          }
        }
        if (jumpDown) {
          if (jumpCountConst > 0) {
            yPos += 15;
            jumpCountConst -= 1;
          } else {
            jumpUp = false;
            jumpDown = false;
            goJump = false;
            jumpCount = 0;
            speed = 10;
          }
        }
      }
    }

    function startMoveHero(event) {
      if (event.code == "ArrowLeft" || event.code == "KeyA") {
        goLeft = true;
      }
      if (event.code == "ArrowRight" || event.code == "KeyD") {
        goRight = true;
      }
      if (
        event.code == "ArrowUp" ||
        event.code == "KeyW" ||
        event.code == "Space"
      ) {
        if (!goJump) {
          goJump = true;
          jumpUp = true;
        }
      }
    }

    function stopMoveHero(event) {
      if (event.code == "ArrowLeft" || event.code == "KeyA") {
        goLeft = false;
      }
      if (event.code == "ArrowRight" || event.code == "KeyD") {
        goRight = false;
      }
    }

    function removeElements() {
      elements = elements.filter(function (element) {
        return element.active;
      });
      if (elements.length <= elementsLen) {
        for (let i = 0; i <= elementsLen - elements.length; i++) {
          if (Math.random() < 0.5) {
            elements.push({
              name: good[getRandomIntInclusive(0, good.length - 1)],
              active: true,
              good: true,
              speed: speeds[getRandomIntInclusive(0, speeds.length - 1)],
              xPos: getRandomIntInclusive(100, canvas.width - 100),
              yPos: 0,
            });
          } else {
            elements.push({
              name: bad[getRandomIntInclusive(0, bad.length - 1)],
              active: true,
              good: false,
              speed: speeds[getRandomIntInclusive(0, speeds.length - 1)],
              xPos: getRandomIntInclusive(100, canvas.width - 100),
              yPos: 0,
            });
          }
        }
      }
    }

    function drawElements() {
      ctx.font = "16px PressStart2P";
      if (!gameOver) {
        for (let i = 0; i < elements.length; i++) {
          if (elements[i].active) {
            if (debug) {
              if (elements[i].good) {
                ctx.fillStyle = "#0f0";
              } else {
                ctx.fillStyle = "#f00";
              }
            } else {
              ctx.fillStyle = "#fff";
            }

            ctx.fillText(elements[i].name, elements[i].xPos, elements[i].yPos);

            let len = elements[i].name.length;

            if (elements[i].yPos > canvas.height - 78) {
              if (elements[i].good) {
                xp -= 1;
                this_.xp -= 1;
                critic.play();
                if (xp == 0) {
                  gameOver = true;
                }
              }
              elements[i].active = false;
            }

            if (
              xPos + 64 >= elements[i].xPos &&
              xPos <= elements[i].xPos + len * 0.8 * 16 &&
              yPos + 96 >= elements[i].yPos &&
              yPos <= elements[i].yPos + 16
            ) {
              if (elements[i].good) {
                score += 1;
                this_.score += 1;
                coinPlay();
              } else {
                xp -= 1;
                this_.xp -= 1;
                criticPlay();
                if (xp == 0) {
                  gameOver = true;
                }
              }
              elements[i].active = false;
            }

            elements[i].yPos += elements[i].speed;
          }
        }
        removeElements();
      }
    }

    function gameOverUI() {
      if (score >= gameData.target) {
        document.getElementById("next").hidden = false;
      }
      document.getElementById("return").hidden = false;

      this_.gameOver = true;
    }

    function drawGrass() {
      // Рисуем платформу
      let count = Math.ceil(canvas.width / 75);
      for (let i = 0; i < count; i++) {
        ctx.drawImage(grass, 75 * i, canvas.height - 78);
      }
    }

    function clearCanvas() {
      // Очищаем экран
      ctx.clearRect(0, 0, canvas.width, canvas.height - 75);
    }

    function game() {
      if (!gameOver) {
        clearCanvas();
        drawElements();
        moveLeft();
        moveRight();
        moveJump();
        ctx.drawImage(
          hero,
          64 * CurrentFrame,
          yCrop,
          64,
          96,
          xPos,
          yPos,
          64,
          96
        );
        requestAnimationFrame(game);
      } else {
        gameOverUI();
      }
    }

    function draw() {
      music.play();
      drawGrass();
      game();
    }

    setInterval(function () {
      for (let i = 0; i < speeds.length; i++) {
        speeds[i] = +(1.05 * speeds[i]).toFixed(2);
      }
    }, 5000);

    hero.onload = draw;
  },
  destroyed() {
    this.music.pause();
  },
};
</script>

<style scoped>
#canvas.bg1 {
  background-image: URL("/bg/Battleground1.png");
  background-size: cover;
}
#canvas.bg2 {
  background-image: URL("/bg/Battleground2.png");
  background-size: cover;
}
#canvas.bg3 {
  background-image: URL("/bg/Battleground3.png");
  background-size: cover;
}
#canvas.bg4 {
  background-image: URL("/bg/Battleground4.png");
  background-size: cover;
}
.score {
  font-size: 16px;
  color: white;
  text-shadow: 3px 3px 2px black;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  left: 40px;
  right: 0;
}
.toolbar {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 15px;
  text-align: center;
}
.gameover {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;

  color: white;
  text-shadow: 3px 3px 2px black;
}
.gameover h1 {
  font-size: 42px;
}
.gameover h2 {
  font-size: 36px;
}
</style>