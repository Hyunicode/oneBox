<template>
  <div>
    <button @click="toggleCamera">摄像头</button>
    <video id="cameraView" width="240" height="180" autoplay muted style="opacity: 0"></video>
  </div>
</template>

<script setup>
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
      //   return window.cameraView;
    });
  setTimeout(() => {
    window.cameraView.requestPictureInPicture();
  }, 1000);
  isCameraOn = true;
};

const stopCamera = () => {
  const tracks = window.cameraView.srcObject.getTracks(); // [audioTrack, videoTrack]
  tracks.forEach((track) => track.stop());
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
