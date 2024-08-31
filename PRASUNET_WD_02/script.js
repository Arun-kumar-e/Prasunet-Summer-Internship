let startTime, updatedTime, difference, interval;
let running = false;
let lapCounter = 0;
let laps = [];

const timeDisplay = document.getElementById('time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 1000 / 60);
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(interval);
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(interval);
    difference = 0;
    running = false;
    timeDisplay.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
    laps = [];
    lapCounter = 0;
    startStopButton.textContent = 'Start';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const time = new Date(difference);
    const minutes = time.getUTCMinutes().toString().padStart(2, '0');
    const seconds = time.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');

    timeDisplay.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (running) {
        lapCounter++;
        laps.push(difference);

        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
        lapsContainer.appendChild(lapElement);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
