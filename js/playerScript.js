/* All tracks object */
let audioFiles = {
  track1: "audioFiles/mixed/cbr-the_taboos--innovative_thinking--mixed.mp3",
  track2: "audioFiles/mixed/cbr-andrew_mcEwan--wait--mixed.mp3",
  track3: "audioFiles/mixed/cbr-beefywink--feel_me--mixed.mp3",
  track4: "audioFiles/mixed/cbr-fallen_house--i_disappear--mixed.mp3",
};

let audioFilesUnmixed = {
  track1: "audioFiles/unmixed/cbr-the_taboos--innovative_thinking--unmixed.mp3",
  track2: "audioFiles/unmixed/cbr-andrew_mcEwan--wait--unmixed.mp3",
  track3: "audioFiles/unmixed/cbr-beefywink--feel_me--unmixed.mp3",
  track4: "audioFiles/unmixed/cbr-fallen_house--i_disappear--unmixed.mp3",
};

/* 
----------------
VARIABLES
---------------- 
*/

//set up audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
//grab audio elements
const audioElementMixed = document.getElementById("audioPlayer__mixed");
const audioElementUnmixed = document.getElementById("audioPlayer__unmixed");
//pass audio elements to audio context as elements
const mixedTrack = audioContext.createMediaElementSource(audioElementMixed);
const unmixedTrack = audioContext.createMediaElementSource(audioElementUnmixed);
//send the elements to the default outputs
mixedTrack.connect(audioContext.destination);
unmixedTrack.connect(audioContext.destination);

//Pull the list of tracks from the DOM
let collectTracks = document.getElementsByClassName("trackSelector");
//Make that tracklist iterable
let trackList = [...collectTracks];

//Audio Players
// let audioPlayer = document.getElementById("audioPlayer__mixed");
// let audioPlayer2 = document.getElementById("audioPlayer__unmixed");

//Audio Source
let audioSource = document.getElementById("audioPlayer__track");
let audioSource2 = document.getElementById("audioPlayer__unmixedTrack");

//Player contols
let playPause = document.getElementById("playerControls__button--playPause");
let playButton = document.getElementById("playerControls__play");
let pauseButton = document.getElementById("playerControls__pause");

//mix toggle
let mixButton = document.getElementById("playerControls__button--mixed");
let unmixButton = document.getElementById("playerControls__button--unmixed");
let mixToggleBG = document.getElementById("playerControls__button--bg");

//Progress Bar
let progress = document.getElementById("progressBar");
let progressContainer = document.getElementById("progressBar--container");
let progressLoop;

/* 
----------------
EVENT LISTENERS
---------------- 
*/

//Toggle play pause state
playPause.addEventListener("click", function () {
  playButton.classList.toggle("noDisplay");
  pauseButton.classList.toggle("noDisplay");
  syncAudio();
  playPauseTrack();
});

//Mix button
mixButton.addEventListener("click", function () {
  syncAdjust();
  mixToggleBG.classList.add("mixButton__bg--active");
  audioElementMixed.muted = true;
  audioElementUnmixed.muted = true;
});

unmixButton.addEventListener("click", function () {
  syncAdjust();
  mixToggleBG.classList.remove("mixButton__bg--active");
  audioElementMixed.muted = true;
  audioElementUnmixed.muted = true;
});

//reset play/pause on track end
audioElementMixed.addEventListener("ended", function () {
  playButton.classList.remove("noDisplay");
  pauseButton.classList.add("noDisplay");
  audioElementMixed.currentTime = 0;
  audioElementUnmixed.currentTime = 0;
  progress.style.width = "0%";
});

// move track position
progressContainer.addEventListener("click", function (e) {
  let clickPosition = e.offsetX / e.target.clientWidth;
  let clickPositionTimecode = clickPosition * audioElementMixed.duration;
  audioElementMixed.currentTime = clickPositionTimecode;
  audioElementUnmixed.currentTime = clickPositionTimecode;
  syncAdjust();
  updateProgressBar();
});

/* 
----------------
EVENT LISTENER LOOP
----------------
*/

makeTracksClickable();

/* 
----------------
FUNCTIONS
----------------
*/

//reset button on track select
function resetPlayPause() {
  playButton.classList.remove("noDisplay");
  pauseButton.classList.add("noDisplay");
  progress.style.width = "0%";
}

//play pause audio
function playPauseTrack() {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
  if (playButton.classList.contains("noDisplay")) {
    audioElementMixed.play();
    audioElementUnmixed.play();
    progressLoop = setInterval(updateProgressBar, 64);
  } else {
    audioElementMixed.pause();
    audioElementUnmixed.pause();
    clearInterval(progressLoop);
  }
}

//Check state of mix button
function isMixed() {
  if (mixToggleBG.classList.contains("mixButton__bg--active")) {
    return true;
  }
  return false;
}

//check audio sync
function checkSync() {
  return Math.abs(
    audioElementUnmixed.currentTime - audioElementMixed.currentTime
  );
}

//sync audio (introduces small delay)
function syncAudio() {
<<<<<<< HEAD
  let currentTimeReference = audioElementMixed.currentTime;
  audioElementMixed.currentTime = currentTimeReference;
  audioElementUnmixed.currentTime = currentTimeReference;
  // console.log(audioElementMixed.currentTime, audioElementUnmixed.currentTime);
=======
  let currentTimeReference = audioPlayer.currentTime;
  // introduces delay to compensate for offset (replace this with async await)
  setTimeout(() => (audioPlayer.currentTime = currentTimeReference), 0);
  audioPlayer2.currentTime = currentTimeReference;
  // console.log(audioPlayer.currentTime, audioPlayer2.currentTime);
>>>>>>> master
}

// check audio sync then adjust sync
function syncAdjust() {
  if (checkSync() > 0.02) {
    syncAudio();
  }
}

// update css postion of the progress bar
function updateProgressBar() {
  let progressvalue = (
    (audioElementMixed.currentTime / audioElementMixed.duration) *
    100
  ).toString();
  let progressValuePercent = progressvalue.concat("%");
  progress.style.width = progressValuePercent;
}

//track selector
function makeTracksClickable() {
  for (i = 0; i < trackList.length; i++) {
    trackList[i].addEventListener("click", function () {
      resetPlayPause();
      resetSelectedTrack(trackList);
      this.classList.add("trackSelector__active");
      let selectedTrack = audioFiles[this.id];
      let selectedTrack2 = audioFilesUnmixed[this.id];
      audioSource.setAttribute("src", `${selectedTrack}`);
      audioSource2.setAttribute("src", `${selectedTrack2}`);
      audioElementMixed.load();
      audioElementUnmixed.load();
      //optional autoplay on click
      //audioElementMixed.play();
    });
  }
}

function resetSelectedTrack(arr) {
  for (i = 0; i < arr.length; i++) {
    arr[i].classList.remove("trackSelector__active");
  }
}
