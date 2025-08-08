let studyTime = 0; //Variable to hold the studying time
let breakTime = 0; //Variable to hold the break time

// Add event listeners to the input fields to listen for the "Enter" key press
document.getElementById("studyTimeInput").addEventListener("input", (event) => {
  studyTime = parseInt(event.target.value) || 0;
  assignNumber();
});

document.getElementById("breakTimeInput").addEventListener("input", (event) => {
  breakTime = parseInt(event.target.value) || 0;
  assignNumber();
});

function assignNumber() {
  //Display the values
  document.getElementById("studyTimeDisplay").innerText =
    "Study Time: " + studyTime + " minutes";
  document.getElementById("breakTimeDisplay").innerText =
    "Break Time: " + breakTime + " minutes";
}

function startTimer() {
  //Declare variables to be used
  let minutes = studyTime;
  let seconds = 0;
  let phase = "study";

  const render = () => {
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText =
      (seconds < 10 ? "0" : "") + seconds;
  };

  const circle = document.getElementById("timer-circle"); //get the timer circle
  const radius = circle.r.baseVal.value; //get the radius from the circle
  const circumference = 2 * Math.PI * radius; // calculate the circumference
  console.log("radius:", radius, "circumference:", circumference);
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;

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
    const secondsLeft = minutes * 60 + seconds;
    const fraction = secondsLeft / totalSeconds;

    // “fraction” because an offset of 0 shows the full ring
    circle.style.strokeDashoffset = circumference * fraction;

    render();
  };
  render();
  const timerID = setInterval(countdown, 1000); //Stores id of the countdown to be stopped later
  document.getElementById("stopBtn").addEventListener("click", () => {
    clearInterval(timerID);
    minutes = studyTime;
    seconds = 0;
    phase = "study";
    render();
  });
}
