<template>
    <div>
        <div class="timer">
            {{display.minutes}} : {{display.seconds}}
        </div>
        <div style="text-align:center;">
            <TimerButton @toggleButton="toggleButton" :title="startButton" />
            <ResetButton @resetTimer="resetTimer"/>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import TimerButton from '@/components/TimerButton.vue';
import ResetButton from '@/components/ResetButton.vue';
import { STATES } from '../STATES';

    const InitialTimeleftt = 300

    let startButton = ref(STATES.running.buttonText)
    let timeleft = ref(InitialTimeleftt)
    let countdownIsRunning = ref(STATES.stopped.state)
    const worker = new Worker("./counter.js")

    worker.onmessage = (e) => {
        timeleft.value = e.data
    }

    const stopCountdown = () => {
        worker.postMessage({ "isRunning": STATES.stopped.state })
    }

    const startCountdown = () => {
        worker.postMessage({ "isRunning": STATES.running.state })
    }

    const toggleButton = () => {
        getRunningState() ? setRunningState(STATES.stopped.state) : setRunningState(STATES.running.state)
    }

    const getRunningState = () => {
        return countdownIsRunning.value
    }

    const setRunningState = (newState) => {
        countdownIsRunning.value = newState 
    }

    const changeTimerButtonTitle = () => {
        startButton.value = getRunningState() ? STATES.stopped.buttonText : STATES.running.buttonText
    }

    const resetTimer = () => {
        setRunningState(STATES.stopped.state)
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

</style>../STATES