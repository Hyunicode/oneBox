<script setup>
import { RouterLink, RouterView } from 'vue-router';
import screenRecorder from './components/Utils/screenRecoder.vue';
// import cameraRecorder from './components/Utils/cameraRecorder.vue';
import audioTransfer from './components/Utils/audioTransfer.vue';
// const bg = document.querySelector('html');
// bg.style.backgroundColor = 'aliceblue';
</script>

<template>
  <div class="root">
    <screenRecorder />
    <!-- <cameraRecorder /> -->
    <audioTransfer />
  </div>
</template>

<style scoped>
document.body {
  /* background-color: aliceblue; */
  margin: 0;
  padding: 0;
}

.root {
  display: grid;
  grid-template-rows: 4fr 1fr;
  margin: 0px;
}
</style>
