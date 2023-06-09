/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || window.SpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || SpeechRecognitionEvent;

const colors = [
  'aqua',
  'azure',
  'beige',
  'bisque',
  'black',
  'blue',
  'brown',
  'chocolate',
  'coral',
  'crimson',
  'cyan',
  'fuchsia',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lime',
  'linen',
  'magenta',
  'maroon',
  'moccasin',
  'navy',
  'olive',
  'orange',
  'orchid',
  'peru',
  'pink',
  'plum',
  'purple',
  'red',
  'salmon',
  'sienna',
  'silver',
  'snow',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'white',
  'yellow',
];

const recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
  // This code is provided as a demonstration of possible capability. You may choose not to use it.
  const speechRecognitionList = new SpeechGrammarList();
  const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')} ;`;
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector('.output');
const bg = document.querySelector('html');
const hints = document.querySelector('.hints');

let colorHTML = '';
colors.forEach((v, i, a) => {
  console.log(v, i);
  colorHTML += `<span style="background-color:${v};"> ${v} </span>`;
});
hints.innerHTML = `Tap/click then say a color to change the background color of the app. Try ${colorHTML}.`;

document.body.onclick = function () {
  recognition.start();
  console.log('Ready to receive a color command.');
};

recognition.onresult = function (event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  const color = event.results[0][0].transcript || 'white';
  diagnostic.textContent = `Result received: ${color}.`;
  bg.style.backgroundColor = color;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
};

recognition.onspeechend = function () {
  recognition.stop();
};

recognition.onnomatch = function (event) {
  diagnostic.textContent = "I didn't recognise that color.";
};

recognition.onerror = function (event) {
  diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
};
