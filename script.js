let studyTime = 0; //Variable to hold the studying time
let breakTime = 0; //Variable to hold the break time

//declare variables here so it can be used by multiple functions
let minutes = 0;
let seconds = 0;
let phase = "study";
let timerID = null;
let isRunning = false; //toggle for play and pause

//circle setup
const circle = document.getElementById("timer-circle"); //get the timer circle
const radius = circle.r.baseVal.value; //get the radius from the circle
const circumference = 2 * Math.PI * radius; // calculate the circumference
console.log("radius:", radius, "circumference:", circumference);
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

// Add event listeners to the input fields to listen for button presses
document.getElementById("studyTimeInput").addEventListener("input", (event) => {
  studyTime = parseInt(event.target.value) || 0;
  assignNumber();
});

document.getElementById("breakTimeInput").addEventListener("input", (event) => {
  breakTime = parseInt(event.target.value) || 0;
  assignNumber();
});

document.getElementById("playPauseBtn").addEventListener("click", startTimer);

function assignNumber() {
  //Display the values
  document.getElementById("studyTimeDisplay").innerText =
    "Study Time: " + studyTime + " minutes";
  document.getElementById("breakTimeDisplay").innerText =
    "Break Time: " + breakTime + " minutes";
}

document.getElementById("restartBtn").addEventListener("click", () => {
  clearInterval(timerID);
  timerID = null;
  minutes = studyTime;
  seconds = 0;
  phase = "study";
  circle.style.strokeDashoffset = circumference;
  render();
  isRunning = false;
  document.getElementById("playPauseBtn").textContent = "▶️";
});

// --- render lives at top-level so restart() can call it ---
function render() {
  //changes text
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText =
    (seconds < 10 ? "0" : "") + seconds;

  //changes ring
  // guard against 0 to avoid division by 0
  const totalStudySeconds = Math.max(1, studyTime * 60);
  const totalBreakSeconds = Math.max(1, breakTime * 60);
  const totalSeconds =
    phase === "study" ? totalStudySeconds : totalBreakSeconds;

  const secondsLeft = minutes * 60 + seconds;
  const fraction = secondsLeft / totalSeconds;

  // “fraction” because an offset of 0 shows the full ring
  circle.style.strokeDashoffset = circumference * fraction;
}

function startTimer() {
  if (isRunning) {
    clearInterval(timerID);
    timerID = null;
    isRunning = false;
    document.getElementById("playPauseBtn").textContent = "▶️";
    return; //pause it
  }

  //when it is fresh start
  if (minutes == 0 && seconds == 0) {
    phase = "study";
    minutes = studyTime;
    seconds = 0;
    circle.style.strokeDashoffset = circumference;
  }

  // total length in seconds for each phase
  const totalStudySeconds = studyTime * 60;
  const totalBreakSeconds = breakTime * 60;

  let countdown = () => {
    //Decide which seconds to use for the offset for the circle
    const totalSeconds =
      phase === "study" ? totalStudySeconds : totalBreakSeconds;

    if (seconds === 0) {
      if (minutes === 0) {
        if (phase === "study") {
          phase = "break";
          minutes = breakTime;
          seconds = 0;
        } else {
          phase = "study";
          minutes = studyTime;
          seconds = 0;
        }
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    render();
  };
  render();
  timerID = setInterval(countdown, 1000); //Stores id of the countdown to be used later
  isRunning = true;
  document.getElementById("playPauseBtn").textContent = "⏸️";
}
