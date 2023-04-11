<template>
  <div id="root">
    <!-- <button @click="toggleCamera">摄像头</button> -->
    <!-- <span>摄像头</span> -->

    <video id="cameraView" width="240" height="240" autoplay muted></video>
    <el-switch
      v-model="value"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      size="large"
      inline-prompt
      :active-icon="Check"
      :inactive-icon="Close"
      @change="toggleCamera"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Check, Close } from '@element-plus/icons-vue';

const value = ref(false);
let isCameraOn = false;
const startCamera = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        cursor: 'always',
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    })
    .then((stream) => {
      window.cameraView.srcObject = stream;
    })
    .then(() => {
      setTimeout(() => {
        window.cameraView.requestPictureInPicture();
      }, 500);
    });

  isCameraOn = true;
};

const stopCamera = () => {
  const tracks = window.cameraView.srcObject.getTracks(); // [audioTrack, videoTrack]
  tracks.forEach((track) => track.stop());
  document.exitPictureInPicture();
  window.cameraView.srcObject = null;
  isCameraOn = false;
};

const toggleCamera = () => {
  if (isCameraOn) {
    stopCamera();
  } else {
    startCamera();
  }
};
</script>

<style>

#cameraView {
  opacity: 0;
  display: hidden;
  width: 0px;
  height: 0px;
}
</style>
