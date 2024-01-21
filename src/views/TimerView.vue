<template>
    <div>
        <div class="timer">
            {{display.minutes}} : {{display.seconds}}
        </div>
        <div style="text-align:center;">
            <TimerButton @toggleButton="toggleButton" :title="startButton" />
            <ResetButton @resetTimer="resetTimer" />
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
    var countdown

    const counter = () => { 
        timeleft.value--
    }

    const stopCountdown = () => {
        clearInterval(countdown)
    }

    const startCountdown = () => {
        countdown = setInterval(counter, 1000)
    }

    const toggleButton = () => {
        changeCountdownState()
    }

    const changeTimerButtonTitle = (newTitle) => {
        startButton.value = newTitle
    }

    const changeCountdownState = (newState) => {
        countdownIsRunning.value = newState || !countdownIsRunning.value
    }

    const resetTimer = () => {
        changeCountdownState(false)
        timeleft.value = 300
    }
 
    watch(timeleft, (remaining) => {
        remaining === 0 && stopCountdown()
    })

    watch(countdownIsRunning, (isRunning) => {
        changeTimerButtonTitle(isRunning ? "Stop" : "Start")
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