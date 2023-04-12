<!-- eslint-disable no-console -->
<template>
  <div id="ATroot">
    <div>
      Audio Transfer
      <el-switch
        v-model="value"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        size="large"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
        @change="toggleAudio"
      />
      Language:
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
    </div>
    <br />
    <div class="audioTransfer" v-for="(_, index) in audioTime" :key="index">
      <!-- <span class="audioTime">{{ audioTime[index] }}</span> -->
      <div>
        <el-button text size="small">{{ audioTime[index] }}</el-button>
      </div>
      <div>
        <el-link type="info" class="audioText">{{ audioText[index] }}</el-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from 'vue';
import { Check, Close, Position } from '@element-plus/icons-vue';

// const videoEl = inject('videoEl');
const value = ref(false);
const audioTime = ref(['00:12', '00:42', '02:56', '59:42']);
const audioText = ref([
  '虞书欣要求粉丝不要再催工作人员，说他们平时工作很努力，对自己也很好',
  '很多人会认为像他这样靠粉丝为生的人发这么一篇小作文太冒昧了',
  '事实上，艺人和工作人员几乎一天24小时都在一起，粉丝之间不可能有隔阂',
  '如果艺人本人对工作人员没有自己的意见，就无法决定这样的事情',
]);
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

const now = new Date().getTime();
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  // eslint-disable-next-line no-alert
  alert('Your browser does not support speech recognition. Please use a different browser.');
}
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = langu.value || 'cmn-Hans-CN';
recognition.onresult = (e) => {
  // eslint-disable-next-line no-console
  // console.log(e.results);
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');
  const nowTime = (new Date().getTime() - now) / 1000;
  // transfer to mm:ss
  const nowmin = Math.floor(nowTime / 60);
  const nowsec = Math.floor(nowTime % 60);
  // eslint-disable-next-line no-console
  console.log(nowTime, transcript);
  audioText.value.push(transcript);
  audioTime.value.push(
    `${nowmin < 10 ? `0${nowmin}` : nowmin}:${nowsec < 10 ? `0${nowsec}` : nowsec}`,
  );
};
recognition.onstart = () => {
  // eslint-disable-next-line no-console
  // console.log('Speech recognition service has started');
};
recognition.onend = () => {
  // eslint-disable-next-line no-console
  // console.log('Speech recognition service disconnected');
  if (value.value) {
    recognition.start();
  }
};
recognition.onerror = (e) => {
  // eslint-disable-next-line no-console
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
  // eslint-disable-next-line no-console
  // console.log(recognition.lang);
};
</script>

<style>
#ATroot {
  width: 100%;
}

.audioTransfer {
  display: grid;
  grid-template-columns: 1fr 10fr;
  /* grid-template-rows: 1fr 1fr; */
}
</style>
