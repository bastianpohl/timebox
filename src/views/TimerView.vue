<template>
    <div>
        <div class="timer">
            {{display.minutes}} : {{display.sekunden}}
        </div>
        <div>
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
        countdown = countdown = setInterval(counter, 1000)
    }

    const toggleButton = () => {
        changeCountdownState()
        countdownIsRunning.value ? startCountdown() : stopCountdown()
    }

    const changeTimerButtonTitle = (newValue) => {
        startButton.value = newValue
    }

    const changeCountdownState = (newValue) => {
        countdownIsRunning.value = newValue || !countdownIsRunning.value
    }

    const resetTimer = () => {
        changeCountdownState(false)
        stopCountdown()
        timeleft.value = 300
    }
 
    watch(timeleft, (remaining) => {
        remaining === 0 && stopCountdown()
    })

    watch(countdownIsRunning, (newValue) => {
        changeTimerButtonTitle(newValue ? "Stop" : "Start")
    })

    const display = computed(() => {
        var minutes = Math.floor(timeleft.value / 60)
        var remainingSeconds = timeleft.value % 60
        var formattedminutes = minutes.toString().padStart(2, '0')
        var formattedSeconds = remainingSeconds.toString().padStart(2, '0')

        return {
            minutes: formattedminutes,
            seconds: formattedSeconds
        } 
    })
</script>

<style>

</style>