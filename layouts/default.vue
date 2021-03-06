<template>
  <div class="main" style="font-family: PressStart2P">
    <div class="container">
      <div id="window" class="row justify-content-center align-items-center">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: "PressStart2P";
  src: url("~assets/style/PressStart2P.ttf");
}
#window {
  height: 100vh;
}
.main {
  background-image: URL("/bg/bg.jpg");
  background-size: cover;
}
</style>
