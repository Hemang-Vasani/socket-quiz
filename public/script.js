// window.onload = function() {
//   let frame = document.getElementById("myiframes");
//   let doc = frame.contentDocument;
//   doc.body.innerHTML = doc.body.innerHTML + '<style> .blogos{display: none;}</style>';
// }
function loadquestionspage(ev) {
  ev.preventDefault();
  let wpage = document.getElementById('welcomepage');
  let qpage = document.getElementById('questionspage');
  wpage.style.display = ('none');
  qpage.style.display = ('block');
  let body = document.getElementById('body');
  // body.style.background = ('#cce2cb');
}
function loadquestionspage2() {
  let sbpage = document.getElementById('scoreboard');
  let qpage = document.getElementById('questionspage');
  sbpage.style.display = ('none');
  qpage.style.display = ('block');
  let body = document.getElementById('body');
  // body.style.background = ('#cce2cb');
  
}
function loadanswerpage() {
  show_option_click()
  let anspage = document.getElementById('answerpage');
  let qpage = document.getElementById('questionspage');
  anspage.style.display = ('block');
  qpage.style.display = ('none');
  let body = document.getElementById('body');
  // body.style.background = ('#FFFFBA');
  
  
}
function loadscoreboard() {
  let anspage = document.getElementById('answerpage');
  let sbpage = document.getElementById('scoreboard');
  anspage.style.display = ('none');
  sbpage.style.display = ('block');
  let body = document.getElementById('body');
  // body.style.background = ('#BAE1FF');
}
function loadmulti() {
  // ev.preventDefault();
  let wpage = document.getElementById('welcomepage');
  let mpage = document.getElementById('multi');
  wpage.style.display = ('none');
  mpage.style.display = ('block');
  let body = document.getElementById('body');
  // body.style.background = ('#BAFFC9');
  setTimeout(function () {
    let qpage = document.getElementById('questionspage');
    mpage.style.display = ('none');
    qpage.style.display = ('block');
    let body = document.getElementById('body');
    // body.style.background = ('#cce2cb');
  }, 3000);
}

// setTimeout(function(){
//     let wpage= document.getElementById('welcomepage');
//     let qpage= document.getElementById('questionspage');
//     wpage.style.display = ('none');
//     qpage.style.display = ('block');
// }, 5000);

// ------------------------------------------------time----------------------------------------------
// Credit: Mateusz Rybczonec


function download_image_p() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')

  canvas.width = 1080
  canvas.height = 1920

  var img1 = document.getElementById("framep")

  context.drawImage(img1,0,0)

  var rNametxt = document.getElementById("rNametxt").innerHTML.trim()
  var rScore = document.getElementById("rScore").innerHTML.trim()
  var rScore_score = document.getElementById("rScore_score").innerHTML.trim()
  var sTxt = document.getElementById("sTxt").innerHTML.trim()
  var sTxt_in = document.getElementById("sTxt_in").innerHTML.trim()



  context.fillStyle = '#707070';
  context.font = "50px Poppins";


  context.fillText(rNametxt,80,620)
  context.font = "600 45px Poppins";

  context.fillText(rScore,82,980)
  context.fillText(rScore_score,590,980)
  context.fillText(sTxt,400,1283)
  context.fillText(sTxt_in,720,1283)
  


  var button = document.getElementById('download_score');
  var dataURL = canvas.toDataURL('image/png');
  button.href = dataURL;
  button.click();

}



function download_image_l() {
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')

  canvas.width = 1920
  canvas.height = 1080

  var img1 = document.getElementById("framel")

  context.drawImage(img1,0,0)

  var rNametxt = document.getElementById("rNametxt").innerHTML.trim()
  var rScore = document.getElementById("rScore").innerHTML.trim()
  var rScore_score = document.getElementById("rScore_score").innerHTML.trim()
  var sTxt = document.getElementById("sTxt").innerHTML.trim()
  var sTxt_in = document.getElementById("sTxt_in").innerHTML.trim()



  context.fillStyle = '#707070';
  context.font = "38px Poppins";


  context.fillText(rNametxt,570,400)
  context.font = "600 38px Poppins";

  context.fillText(rScore,580,630)
  context.fillText(rScore_score,1000,635)
  context.fillText(sTxt,837,835)
  context.fillText(sTxt_in,1110,835)
  


  var button = document.getElementById('download_score');
  var dataURL = canvas.toDataURL('image/png');
  button.href = dataURL;
  button.click();

}


// const FULL_DASH_ARRAY = 185;
// const WARNING_THRESHOLD = 10;
// const ALERT_THRESHOLD = 5;

// const COLOR_CODES = {
//   info: {
//     color: "green"
//   },
//   warning: {
//     color: "orange",
//     threshold: WARNING_THRESHOLD
//   },
//   alert: {
//     color: "red",
//     threshold: ALERT_THRESHOLD
//   }
// };

// const TIME_LIMIT = 10;
// let timePassed = 0;
// let timeLeft = TIME_LIMIT;
// let timerInterval = null;
// let remainingPathColor = COLOR_CODES.info.color;

// document.getElementById("app").innerHTML = `
// <div class="base-timer">
//   <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//     <g class="base-timer__circle">
//       <circle class="base-timer__path-elapsed" cx="50" cy="50" r="30"></circle>
//       <path
//         id="base-timer-path-remaining"
//         stroke-dasharray="185"
//         class="base-timer__path-remaining ${remainingPathColor}"
//         d="
//           M 50, 50
//           m -30, 0
//           a 30,30 0 1,0 60,0
//           a 30,30 0 1,0 -60,0
//         "
//       ></path>
//     </g>
//   </svg>
//   <span id="base-timer-label" class="base-timer__label">${time}</span>
// </div>
// `;

// startTimer();

// function onTimesUp() {
//   clearInterval(timerInterval);
// }

// function startTimer() {

//   timerInterval = setInterval(() => {
//     timePassed = timePassed += 1;
//     timeLeft = TIME_LIMIT - timePassed;
//     document.getElementById("").innerHTML = formatTime(
//       timeLeft
//     );
//     setCircleDasharray();
//     setRemainingPathColor(timeLeft);

//     if (timeLeft === 0) {

//       onTimesUp();
//     }
//   }, 1000);
// }

// function formatTime(time) {
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;

//   if (seconds < 10) {
//     seconds = `0${seconds}`;
//   }

//   return `${minutes}:${seconds}`;
// }

// function setRemainingPathColor(timeLeft) {
//   const { alert, warning, info } = COLOR_CODES;
//   if (timeLeft <= alert.threshold) {
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.remove(warning.color);
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.add(alert.color);
//   } else if (timeLeft <= warning.threshold) {
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.remove(info.color);
//     document
//       .getElementById("base-timer-path-remaining")
//       .classList.add(warning.color);
//   }
// }

// function calculateTimeFraction() {
//   const rawTimeFraction = timeLeft / TIME_LIMIT;
//   return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
// }

// function setCircleDasharray() {
//   const circleDasharray = `${(
//     calculateTimeFraction() * FULL_DASH_ARRAY
//   ).toFixed(0)} 185`;
//   document
//     .getElementById("base-timer-path-remaining")
//     .setAttribute("stroke-dasharray", circleDasharray);
// }


// function formatTimeLeft(time) {
//   // The largest round integer less than or equal to the result of time divided being by 60.
//   const minutes = Math.floor(time / 60);

//   // Seconds are the remainder of the time divided by 60 (modulus operator)
//   let seconds = time % 60;

//   // If the value of seconds is less than 10, then display seconds with a leading zero
//   if (seconds < 10) {
//     seconds = `0${seconds}`;
//   }

//   // The output in MM:SS format
//   return `${minutes}:${seconds}`;
// }
