<template>
    <div>
        <div class="timer">
            {{display.minutes}} : {{display.seconds}}
        </div>
        <div style="text-align:center;">
            <TimerButton @toggleButton="toggleButton" :title="startButton" />
            <ResetButton @resetTimer="resetTimer" :title="BUTTON.reset"/>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import TimerButton from '@/components/TimerButton.vue';
import ResetButton from '@/components/ResetButton.vue';

    let startButton = ref('Start')
    let timeleft = ref(300)
    let countdownIsRunning = ref(false)
    const worker = new Worker("./counter.js")
    let BUTTON = {
        "start": "Start",
        "stop": "Stop",
        "reset": "Reset" 
    }

    worker.onmessage = (e) => {
        timeleft.value = e.data
    }

    const stopCountdown = () => {
        worker.postMessage({ "isRunning": false })
    }

    const startCountdown = () => {
        worker.postMessage({ "isRunning": true })
    }

    const toggleButton = () => {
        getRunningState() ? setRunningState(false) : setRunningState(true)
    }

    const getRunningState = () => {
        return countdownIsRunning.value
    }

    const setRunningState = (newState) => {
        countdownIsRunning.value = newState 
    }

    const changeTimerButtonTitle = () => {
        startButton.value = getRunningState() ? BUTTON.stop : BUTTON.start
    }

    const resetTimer = () => {
        setRunningState(false)
        worker.postMessage({"resetTimer": true})
    }
 
    watch(timeleft, (remaining) => {
        remaining === 0 && stopCountdown()
    })

    watch(countdownIsRunning, (isRunning) => {
        changeTimerButtonTitle()
        isRunning ? startCountdown() : stopCountdown()
    })

    const display = computed(() => {
        var minutes = Math.floor(timeleft.value / 60)
        var remainingSeconds = timeleft.value % 60
        var formattedMinutes = minutes.toString().padStart(2, '0')
        var formattedSeconds = remainingSeconds.toString().padStart(2, '0')

        return {
            minutes: formattedMinutes,
            seconds: formattedSeconds
        } 
    })
</script>

<style scoped>

</style>