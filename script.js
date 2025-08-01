let studyTime; //Variable to hold the studying time
let breakTime; //Variable to hold the break time

// Add event listeners to the input fields to listen for the "Enter" key press
document
  .getElementById("studyTimeInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      assignNumber(event);
    }
  });

document
  .getElementById("breakTimeInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      assignNumber(event);
    }
  });

function assignNumber(event) {
  // Get values from both input fields
  let studyTimeInput = document.getElementById("studyTimeInput").value;
  let breakTimeInput = document.getElementById("breakTimeInput").value;

  // Convert the input values to numbers
  studyTime = Number(studyTimeInput);
  breakTime = Number(breakTimeInput);
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

  let countdown = () => {
    if (seconds === 0) {
      if (minutes === 0) {
        if (phase === "study") {
          phase = "break";
          minutes = breakTime;
          seconds = 0;
        } else {
          phase = "study"
          minutes = studyTime
          seconds = 0
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
  const timerID = setInterval(countdown, 1000); //Stores id of the countdown to be stopped laterß
  document
    .getElementById("stopBtn")
    .addEventListener("click", () => {
      clearInterval(timerID);
      minutes = studyTime;
      seconds = 0;
      phase = "study";
      render();
    });
}
