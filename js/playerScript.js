//Fix web audio API on ios
window.addEventListener('touchstart', function() {

	// create empty buffer
	var buffer = myContext.createBuffer(1, 1, 22050);
	var source = myContext.createBufferSource();
	source.buffer = buffer;

	// connect to output (your speakers)
	source.connect(myContext.destination);

	// play the file
	source.noteOn(0);

}, false);

/* All tracks object */
let audioFiles = {
  track1: "audioFiles/the_taboos--innovative_thinking.mp4",
  track2: "audioFiles/andrew_mcEwan--wait.mp4",
  track3: "audioFiles/beefywink--feel_me.mp4",
  track4: "audioFiles/fallen_house--i_disappear.mp4",
};


/* 
----------------
VARIABLES
---------------- 
*/

//set up audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const audioElement = document.getElementById("audioPlayer");
const sourceTrack = audioContext.createMediaElementSource(audioElement);
const channelSplitter = audioContext.createChannelSplitter(4)
const mergeMixed = audioContext.createChannelMerger(2)
const mergeUnmixed = audioContext.createChannelMerger(2)
const mixedGain = audioContext.createGain()
const unmixedGain = audioContext.createGain()

//Routing
sourceTrack.connect(channelSplitter);
channelSplitter.connect(mergeMixed, 0, 0);
channelSplitter.connect(mergeMixed, 1, 1);
channelSplitter.connect(mergeUnmixed, 2, 0);
channelSplitter.connect(mergeUnmixed, 3, 1);
mergeMixed.connect(mixedGain)
mergeUnmixed.connect(unmixedGain)
mixedGain.connect(audioContext.destination)
unmixedGain.connect(audioContext.destination)

//Set initial gain
unmixedGain.gain.value = 0
mixedGain.gain.value = 1


//Pull the list of tracks from the DOM
const collectTracks = document.getElementsByClassName("trackSelector");
//Make that tracklist iterable
const trackList = [...collectTracks];

//Audio Source
const audioSource = document.getElementById("audioPlayer__track");

//Player contols
const playPause = document.getElementById("playerControls__button--playPause");
const playButton = document.getElementById("playerControls__play");
const pauseButton = document.getElementById("playerControls__pause");

//mix toggle
const mixButton = document.getElementById("playerControls__button--mixed");
const unmixButton = document.getElementById("playerControls__button--unmixed");
const mixToggleBG = document.getElementById("playerControls__button--bg");

//Progress Bar
const progress = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressBar--container");
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
  playPauseTrack();
});

//Mix button
mixButton.addEventListener("click", function () {
  mixToggleBG.classList.add("mixButton__bg--active");
  unmixedGain.gain.value = 0
  mixedGain.gain.value = 1
});

unmixButton.addEventListener("click", function () {
  mixToggleBG.classList.remove("mixButton__bg--active");
  mixedGain.gain.value = 0
  unmixedGain.gain.value = 1
});

//reset play/pause on track end
audioElement.addEventListener("ended", function () {
  playButton.classList.remove("noDisplay");
  pauseButton.classList.add("noDisplay");
  audioElement.currentTime = 0;
  progress.style.width = "0%";
});

// move track position
progressContainer.addEventListener("click", function (e) {
  let clickPosition = e.offsetX / e.target.clientWidth;
  let clickPositionTimecode = clickPosition * audioElement.duration;
  audioElement.currentTime = clickPositionTimecode;
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
    audioElement.play();
    progressLoop = setInterval(updateProgressBar, 64);
  } else {
    audioElement.pause();
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


// update css postion of the progress bar
function updateProgressBar() {
  let progressvalue = (
    (audioElement.currentTime / audioElement.duration) *
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
      audioSource.setAttribute("src", `${selectedTrack}`);
      audioElement.load();
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
