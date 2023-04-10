<!-- eslint-disable no-console -->
<template>
  <div>
    <button @click="startScreen">录制</button>
    <button @click="stopScreen">停止</button>
    <button @click="downloadStream">下载</button>
    <video
      id="screenView"
      src="../../assets/base.mp4"
      width="960"
      height="540"
      autoplay
      muted
      loop
    ></video>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// const screenView = document.getElementById('screenView');
const data = [];
let mediaRecorder = null;
const startScreen = () => {
  navigator.mediaDevices
    .getDisplayMedia({
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
      window.screenView.srcObject = stream;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        if (event?.data?.size > 0) {
          data.push(event.data); // 存储媒体数据
        }
      };
      mediaRecorder.start(1000); // 开始录制，每隔1秒触发一次ondataavailable事件
    });
};

const stopScreen = () => {
  const tracks = window.screenView.srcObject.getTracks(); // [audioTrack, videoTrack]
  tracks.forEach((track) => track.stop());
  window.screenView.srcObject = null;
  mediaRecorder.stop();
  const blob = new Blob(data, { type: 'video/webm' });
  window.screenView.src = URL.createObjectURL(blob);
  window.screenView.controls = true;
  window.screenView.muted = false;
  window.screenView.play();
};

const downloadStream = () => {
  const blob = new Blob(data, { type: 'video/webm' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'test.webm';
  a.click();
};
</script>
<style lang="scss" scoped></style>
