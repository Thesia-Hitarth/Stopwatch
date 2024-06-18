const playButton = document.getElementsByClassName("play")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const clearButton = document.getElementsByClassName("clear")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centiSecond = document.getElementsByClassName("min_sec")[0];
const laps = document.getElementsByClassName("laps")[0];

let isPlay = false;
let secCounter = 0;
let secInterval;
let centiCounter = 0;
let centiSecInterval;
let minInterval;
let minCounter = 0;
let isReset = false;
let lap_items = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
}

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = 'Pause';
        minInterval = setInterval(() => {
            minute.innerText = `${minCounter} :`;
            minCounter++;
        }, 60 * 1000);

        secInterval = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerText = `${secCounter} :`;
            secCounter++;
        }, 1000);

        centiSecInterval = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerText = `${centiCounter}`;
            centiCounter++;
        }, 10);

        isPlay = true;
        isReset = false;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(minInterval);
        clearInterval(secInterval);
        clearInterval(centiSecInterval);
        isPlay = false;
    }
    toggleButton();
}

const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    secCounter = 0;
    centiCounter = 0;
    minCounter = 0;
    second.innerHTML = '0 :';
    centiSecond.innerHTML = '0';
    minute.innerHTML = '0 :';
    isReset = false;
    laps.innerHTML = '';
    lap_items = 0;
    clearButton.classList.add("hidden");
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap_items");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time_stamp");

    number.innerText = `#${++lap_items}`;
    timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timeStamp);
    laps.append(li);
    clearButton.classList.remove("hidden");
}

const clearAll = () => {
    laps.innerHTML = '';
    clearButton.classList.add("hidden");
}

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
