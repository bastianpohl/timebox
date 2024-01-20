<template>
    <div>
        <div class="timer">
            {{display.minuten}} : {{display.sekunden}}
        </div>
        <div>
            <TimerButton @toggleButton="toggleButton" :title="startButton" />
            <ResetButton @resetTimer="resetTimer" />
        </div>
        <div>
           <RoundTable />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import TimerButton from '@/components/TimerButton.vue';
import ResetButton from '@/components/ResetButton.vue';
import RoundTable from '@/components/RoundTable.vue';

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

    const toggleButton = () => {
        // toggle Running State 
        countdownIsRunning.value = !countdownIsRunning.value

        if (countdownIsRunning.value === true) { countdown = setInterval(counter, 1000) }
        if (countdownIsRunning.value === false) { stopCountdown() }
    }

    const changeTimerButtonTitle = (newValue) => {
        startButton.value = newValue || (countdownIsRunning.value ? "Stop" : "Start");
    };

    const resetTimer = () => {
        countdownIsRunning.value = false
        stopCountdown()
        timeleft.value = 300
    }
 
    watch(timeleft, (remaining) => {
        if (remaining === 0) {
            clearInterval(countdown)
        }
    })

    watch(countdownIsRunning, (newValue) => {
        changeTimerButtonTitle(newValue ? "Stop" : "Start");
    })

    const display = computed(() => {
        var minuten = Math.floor(timeleft.value / 60);
        var restlicheSekunden = timeleft.value % 60;

        var formatierteMinuten = minuten.toString().padStart(2, '0');
        var formatierteSekunden = restlicheSekunden.toString().padStart(2, '0');

        return {
            minuten: formatierteMinuten,
            sekunden: formatierteSekunden
        }; 
    })
</script>

<style>

</style>