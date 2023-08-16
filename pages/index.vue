<script lang="ts" setup></script>

<template>
  <div class="home-page min-h-screen flex flex-col justify-center items-center">
    <!-- <AzLogo class="scale-150"/> -->
    <h1 class="title my-6 text-gradient text-center text-7xl font-extrabold">
      Vue 3 - Nuxt 3<br />Conventions
    </h1>
    <AzNavbar />
  </div>
</template>

<style scoped lang="scss">
.text-gradient {
  background: rgb(57, 132, 244);
  background: linear-gradient(
    169.4deg,
    #3984f4 -6.01%,
    #0cd3ff 36.87%,
    #2f7cf0 78.04%,
    #0e65e8 103.77%
  );
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
