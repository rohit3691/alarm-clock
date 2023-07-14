function Time() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var ampm = hours < 12 ? "AM" : "PM";
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  hours = hours % 12;
  hours = hours < 10 ? "0" + hours : hours;
  var time = hours + ":" + minutes + ":" + seconds + " " + ampm;
  document.getElementById("time").innerHTML = time;
  const realTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return realTime;
}
setInterval(Time, 1000);

//get alarm time

function getAlarmTime() {
  var setHours = document.getElementById("Hours").value;
  var setMinutes = document.getElementById("Minutes").value;
  var setSeconds = document.getElementById("Seconds").value;
  var setAMPM = document.getElementById("AMPM").value;
  setHours = setHours < 10 ? "0" + setHours : setHours;
  setMinutes = setMinutes < 10 ? "0" + setMinutes : setMinutes;
  setSeconds = setSeconds < 10 ? "0" + setSeconds : setSeconds;
  const getTime =
    setHours + ":" + setMinutes + ":" + setSeconds + " " + setAMPM;
  return getTime;
}

var alarmArray = [];

//   sorting the alarms   ----------------------------------------------
function sortAlarm() {
  alarmArray.sort((a, b) => {
    // Splitting the time strings into components
    const [timeA, periodA] = a.split(" ");
    const [hoursA, minutesA, secondsA] = timeA.split(":");
    const [timeB, periodB] = b.split(" ");
    const [hoursB, minutesB, secondsB] = timeB.split(":");

    // Comparing the periods (AM/PM)

    if (periodA !== periodB) {
      if (periodA === "AM") {
        return -1;
      } else {
        return 1;
      }
    }

    // Comparing the hours
    if (parseInt(hoursA) < parseInt(hoursB)) {
      return -1;
    }
    if (parseInt(hoursA) > parseInt(hoursB)) {
      return 1;
    }

    // Comparing the minutes
    if (parseInt(minutesA) < parseInt(minutesB)) {
      return -1;
    }
    if (parseInt(minutesA) > parseInt(minutesB)) {
      return 1;
    }

    // Comparing the seconds
    if (parseInt(secondsA) < parseInt(secondsB)) {
      return -1;
    }
    if (parseInt(secondsA) > parseInt(secondsB)) {
      return 1;
    }

    // If both hours, minutes, and seconds are the same
    return 0;
  });
}
// --------------------------------------------------

// delete alarm
function deleteAlarm(e) {
  const deleteItem = e.target.value;
  const alarmIndex = alarmArray.findIndex((item) => {
    return item == deleteItem;
  });
  alarmArray.splice(alarmIndex, 1);
}

// set alarm

function setAlarm() {
  event.preventDefault();
  const setTime = getAlarmTime();
  alarmArray.push(setTime);
  sortAlarm();
  // alert("Alarm set at : " + setTime);
  const alarmList = document.getElementById("alarms");
  const newAlarm = document.createElement("li");
  const dltBtn = document.createElement("button");
  newAlarm.textContent = setTime;
  dltBtn.textContent = "Delete";
  alarmList.append(newAlarm);
  alarmList.append(dltBtn);

  dltBtn.addEventListener("click", (e) => {
    alarmList.removeChild(newAlarm);
    alarmList.removeChild(dltBtn);
    deleteAlarm(e);
  });
}

// alarm music

var audio = new Audio("http://www.fun-lover.com/music/wavs/clock4.wav");

// pause alarm

// function pauseAlarm() {
//     audio.pause();
// }
// check Alarm

function checkAlarm() {
  const realTime = Time();
  if (realTime == alarmArray[0]) {
    audio.play();
    // const alarmList = document.getElementById("alarms");
    // const pauseButton = document.createElement("button");
    // pauseButton.textContent = "Pause";
    // alarmList.append(pauseButton);
    // pauseButton.addEventListener("click", () => {
    //     pauseAlarm();
    //     alarmList.removeChild(pauseButton);
    // })
    alarmArray.splice(0, 1);
  }
}
setInterval(checkAlarm, 1000);
