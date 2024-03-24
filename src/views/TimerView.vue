<template>
  <div>
    <div>{{ display.minutes }} : {{ display.seconds }}</div>
    <div style="text-align: center">
      <TimerButton @toggleButton="toggleButton" :title="startButton" />
      <ResetButton @resetTimer="resetTimer" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import TimerButton from "@/components/TimerButton.vue";
import ResetButton from "@/components/ResetButton.vue";
import { RUNNING, NOT_RUNNING } from "../STATES";

const InitialTimeleftt = 300;

let startButton = ref(RUNNING.buttonText);
let timeleft = ref(InitialTimeleftt);
let countdownIsRunning = ref(NOT_RUNNING.state);
const worker = new Worker("./counter.js");

//let CountdownState = new buffer();

worker.onmessage = (e) => {
  timeleft.value = e.data;
};

const stopCountdown = () => {
  worker.postMessage({ isRunning: NOT_RUNNING.state });
};

const startCountdown = () => {
  worker.postMessage({ isRunning: RUNNING.state });
};

const toggleButton = () => {
  getRunningState() ? setRunningState(NOT_RUNNING.state) : setRunningState(RUNNING.state);
};

const getRunningState = () => countdownIsRunning.value;

const setRunningState = (newState) => {
  countdownIsRunning.value = newState;
};

const changeTimerButtonTitle = () => {
  startButton.value = getRunningState() ? RUNNING.buttonText : NOT_RUNNING.buttonText;
};

const resetTimer = () => {
  setRunningState(NOT_RUNNING.state);
  worker.postMessage({ resetTimer: true });
};

watch(timeleft, (remaining) => {
  remaining === 0 && stopCountdown();
});

watch(countdownIsRunning, (isRunning) => {
  changeTimerButtonTitle();
  isRunning ? startCountdown() : stopCountdown();
});

const display = computed(() => {
  var minutes = Math.floor(timeleft.value / 60);
  var remainingSeconds = timeleft.value % 60;
  var formattedMinutes = minutes.toString().padStart(2, "0");
  var formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return {
    minutes: formattedMinutes,
    seconds: formattedSeconds,
  };
});
</script>

<style scoped></style>
