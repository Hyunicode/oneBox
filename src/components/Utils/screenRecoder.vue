<!-- eslint-disable no-console -->
<template>
  <div id="root">
    <video
      id="screenView"
      src="../../assets/base.mp4"
      autoplay="autoplay"
      controls="controls"
      muted="muted"
      loop
    ></video>
    <!-- <button @click="startScreen">录制</button> -->
    <el-button type="warning" @click="startScreen" round size="small">
      <span>开始录制</span>
    </el-button>
    <!-- <button @click="stopScreen">停止</button> -->
    <el-button type="warning" @click="stopScreen" round size="small">
      <span>停止录制</span>
    </el-button>
    <!-- <button @click="downloadStream">下载</button> -->
    <el-button type="warning" @click="downloadStream" round size="small">
      <span>下载视频</span>
    </el-button>
    <el-button type="warning" @click="jumpTp()" round size="small">
      <span>跳转</span>
    </el-button>
    <cameraRecorder />
    <!-- <audioTransfer /> -->
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import cameraRecorder from './cameraRecorder.vue';
// import audioTransfer from './audioTransfer.vue';
// import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue';

window.onload = () => {
  const basevideo = document.getElementById('screenView');
  if (!basevideo.play()) {
    basevideo.play();
  }
};
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
      mediaRecorder.start(10);
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
  a.download = `${new Date().getTime()}.webm`;
  a.click();
};

// inject('screenView', ref(window.screenView));
// inject('jumpTime', jumpTime);

const jumpTp = (time_) => {
  window.screenView.currentTime = time_ || 10;
};
</script>

<style scoped>
#root {
  display: inline-block;
  margin: 20px;
}
#screenView {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px dashed #374685;
  width: 1200px;
  height: 675px;
}
</style>
