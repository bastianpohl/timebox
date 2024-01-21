var timeleft = 300
var countdown

onmessage = (e) => {
    e.data.isRunning ? startCountdown() : stopCountdown()
    e.data.resetTimer && resetTimer()
}

const counter = () => {
    timeleft--
    postMessage(timeleft)
}

const stopCountdown = () => {
    clearInterval(countdown)
}

const startCountdown = () => {
    countdown = setInterval(counter, 1000)
}

const resetTimer = () => {
    stopCountdown()
    timeleft = 300
    postMessage(timeleft)
}
