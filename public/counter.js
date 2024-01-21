var timeleft = 300
var countdown

onmessage = (e) => {
    e.data.isRunning ? startCountdown() : stopCountdown()
    e.data.resetTimer && resetTimer()
}

const counter = () => {
    timeleft--
    console.log(timeleft)
    postMessage(timeleft)
}

const stopCountdown = () => {
    clearInterval(countdown)
    console.log("Counter stopped")
}

const startCountdown = () => {
    countdown = setInterval(counter, 1000)
    console.log("Counter started")
}

const resetTimer = () => {
    stopCountdown()
    timeleft = 300
    postMessage(timeleft)
    console.log("Timer reseted")
}
