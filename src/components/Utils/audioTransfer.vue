<template>
  <div id="root">
    <el-switch
      v-model="value"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      size="large"
      inline-prompt
      :active-icon="Check"
      :inactive-icon="Close"
      @change="toggleAudio"
    />
    <el-tree-select
      v-model="langu"
      :data="options"
      :props="props"
      filterable
      clearable
      :show-all-levels="false"
      placeholder="voice language"
      style="width: 150px"
      @change="changeLangu"
    />
    <span>{{ langu }}</span>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { Check, Close } from '@element-plus/icons-vue';

const value = ref(false);
const text1111 = ref('text');
const langu = ref('cmn-Hans-CN');
const props = {
  expandTrigger: 'hover',
};
const options = [
  {
    value: 'Han',
    label: '中文',
    children: [
      {
        value: 'cmn-Hans-CN',
        label: '普通话 (中国大陆)',
      },
      {
        value: 'cmn-Hans-HK',
        label: '普通话 (香港)',
      },
      {
        value: 'cmn-Hant-TW',
        label: '中文 (台灣)',
      },
      {
        value: 'yue-Hant-HK',
        label: '粵語 (香港)',
      },
    ],
  },
  {
    value: 'Eng',
    label: 'English',
    children: [
      {
        value: 'en-Au',
        label: 'Australia',
      },
      {
        value: 'en-CA',
        label: 'Canada',
      },
      {
        value: 'en-IN',
        label: 'India',
      },
      {
        value: 'en-NZ',
        label: 'New Zealand',
      },
      {
        value: 'en-ZA',
        label: 'South Africa',
      },
      {
        value: 'en-GB',
        label: 'United Kingdom',
      },
      {
        value: 'en-US',
        label: 'United States',
      },
    ],
  },
  {
    value: 'Esp',
    label: 'Español',
    children: [
      {
        value: 'es-AR',
        label: 'Argentina',
      },
      {
        value: 'es-BO',
        label: 'Bolivia',
      },
      {
        value: 'es-CL',
        label: 'Chile',
      },
      {
        value: 'es-CO',
        label: 'Colombia',
      },
      {
        value: 'es-CR',
        label: 'Costa Rica',
      },
      {
        value: 'es-EC',
        label: 'Ecuador',
      },
      {
        value: 'es-SV',
        label: 'El Salvador',
      },
      {
        value: 'es-ES',
        label: 'España',
      },
      {
        value: 'es-US',
        label: 'Estados Unidos',
      },
      {
        value: 'es-GT',
        label: 'Guatemala',
      },
      {
        value: 'es-HN',
        label: 'Honduras',
      },
      {
        value: 'es-MX',
        label: 'México',
      },
      {
        value: 'es-NI',
        label: 'Nicaragua',
      },
      {
        value: 'es-PA',
        label: 'Panamá',
      },
      {
        value: 'es-PY',
        label: 'Paraguay',
      },
      {
        value: 'es-PE',
        label: 'Perú',
      },
      {
        value: 'es-PR',
        label: 'Puerto Rico',
      },
      {
        value: 'es-DO',
        label: 'República Dominicana',
      },
      {
        value: 'es-UY',
        label: 'Uruguay',
      },
      {
        value: 'es-VE',
        label: 'Venezuela',
      },
    ],
  },
];
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  // eslint-disable-next-line no-alert
  alert('Your browser does not support speech recognition. Please use a different browser.');
}
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = langu.value || 'cmn-Hans-CN';
recognition.onresult = (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
  console.log(transcript);
};
recognition.onstart = () => {
  console.log('Speech recognition service has started');
};
recognition.onend = () => {
  console.log('Speech recognition service disconnected');
  recognition.start();
};
recognition.onerror = (e) => {
  console.error(e);
};
const start = () => {
  recognition.start();
};
const stop = () => {
  recognition.stop();
};
const toggleAudio = () => {
  if (value.value) {
    start();
  } else {
    stop();
  }
};
const changeLangu = () => {
  recognition.lang = langu.value;
  console.log(recognition.lang);
};
</script>

<style>
#root {
  display: inline-block;
  margin: 20px;
}
</style>
