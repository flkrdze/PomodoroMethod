const timerDisplay = document.getElementById('timer-display');
const timerButton = document.getElementById('timer-button');
const phase = document.getElementById('phase-getter');
const notificationSound = document.getElementById('notification-sound');
notificationSound.volume = 0.2;

let timerInterval;
let seconds = 0;
let isRunning = false;
let WORK_TIME = 25 * 60;
let SMALL_REST_TIME = 5 * 60;
let BIG_REST_TIME = 15 * 60;
let phase_counter = 0;

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    isRunning = true;
    timerButton.textContent = 'Стоп';

    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
        
        if (phase.textContent === "current task: rest" && phase_counter !== 3 &&
             seconds == SMALL_REST_TIME) {
            seconds = 0;
            phase_counter++;
            phase.textContent = "current task: work";
            notificationSound.play();
        }

        if (phase.textContent === "current task: rest" && phase_counter === 3 &&
             seconds == BIG_REST_TIME) {
            seconds = 0;
            phase_counter = 0;
            phase.textContent = "current task: work";
            notificationSound.play();
        }

        if (phase.textContent === "current task: work" && phase_counter !== 3 && //Если фаза не конечная (4) то сдвигаем её
             seconds == WORK_TIME) {
            seconds = 0;
            phase.textContent = "current task: rest";
            notificationSound.play();
        }

        if (phase.textContent === "current task: work" && seconds === WORK_TIME && //Если это последняя фаза то обнуляемся по фаз_каунтеру 
            phase_counter == 3) {
                seconds = 0;
                phase.textContent = "current task: rest";
            notificationSound.play();
        }
        
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    timerButton.textContent = 'Старт';
    clearInterval(timerInterval);
}

function resetTimer() {
    seconds = 0;
    updateTimerDisplay();
}

timerButton.addEventListener('click', function() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

updateTimerDisplay();