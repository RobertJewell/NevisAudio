/* All tracks object */
let audioFiles = {
  track1: "audioFiles/AndrewMcEwan-Wait[PopCountry].mp3",
  track2: "audioFiles/deVilliers-FatallyBrute[IndieRock].mp3",
  track3: "audioFiles/Foxchase-Dare[PopRock].mp3",
  track4: "audioFiles/Palantir-ILikeCreepy[Rock].mp3",
  track5: "audioFiles/Rivia-HelloStranger[Rock].mp3",
  track6: "audioFiles/Tidesetter-WTG[Rock].mp3",
  // track7: "audioFiles/VicTayla-Fade[Pop].mp3",
};


//variables
let collectTracks = document.getElementsByClassName("trackSelector");
let trackList = [...collectTracks];
let audioPlayer = document.getElementById("audioPlayer__mixed");
let audioPlayer2 = document.getElementById("audioPlayer__unmixed");
let audioSource = document.getElementById("audioPlayer__track");
let playPause = document.getElementById("playerControls__button--playPause");
let mixButton = document.getElementById("playerControls__button--mix");
let playButton = document.getElementById("playerControls__play");
let pauseButton = document.getElementById("playerControls__pause");
let progress = document.getElementById("progressBar")
let progressContainer = document.getElementById("progressBar--container")
let progressLoop


/* 
----------------
EVENT LISTENERS
---------------- 
*/


//Toggle play pause state
playPause.addEventListener("click", function () {
  playButton.classList.toggle("noDisplay");
  pauseButton.classList.toggle("noDisplay");
  syncAudio()
  playPauseTrack();
});


//Mix button
mixButton.addEventListener("click", function () {
  syncAdjust()
  if (isMixed() == true) {
    audioPlayer2.muted = false;
    audioPlayer.muted = true;
    mixButton.textContent = "Hear Mixed!";
  } else {
    audioPlayer2.muted = true;
    audioPlayer.muted = false;
    mixButton.textContent = "Hear Unmixed!";
  }
});

//reset play/pause on track end
audioPlayer.addEventListener("ended", function () {
  playButton.classList.remove("noDisplay");
  pauseButton.classList.add("noDisplay");
  audioPlayer.currentTime = 0;
  audioPlayer2.currentTime = 0;
  progress.style.width = "0%"
});

// move track position
progressContainer.addEventListener("click", function (e) {
  let clickPosition = (e.offsetX / e.target.clientWidth)
  audioPlayer.currentTime = (clickPosition * audioPlayer.duration);
  audioPlayer2.currentTime = (clickPosition * audioPlayer.duration);
  updateProgressBar()
})




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
  progress.style.width = "0%"
  console.log("test")
}

//play pause audio
function playPauseTrack() {
  if (playButton.classList.contains("noDisplay")) {
    audioPlayer.play();
    audioPlayer2.play();
    progressLoop = setInterval(updateProgressBar, 64)
  } else {
    audioPlayer.pause();
    audioPlayer2.pause();
    clearInterval(progressLoop)
  }
}

//Check state of mix button
function isMixed() {
  if (mixButton.textContent == "Hear Unmixed!") {
    return true;
  }
  return false;
}

//check audio sync
function checkSync() {
  return (Math.abs(audioPlayer2.currentTime - audioPlayer.currentTime))
}

//sync audio (introduces small delay)
function syncAudio() {
  let currentTimeReference = audioPlayer.currentTime
  audioPlayer.currentTime = currentTimeReference;
  audioPlayer2.currentTime = currentTimeReference;
}

// check audio sync then adjust sync
function syncAdjust() {
  if (checkSync() > 0.5) {
    syncAudio()
  }
}



// update css postion of the progress bar
function updateProgressBar() {
  let progressvalue = ((audioPlayer.currentTime / audioPlayer.duration) * 100).toString()
  let progressValuePercent = progressvalue.concat("%")
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
      audioPlayer.load();
      audioPlayer2.load();
      //optional autoplay on click
      //audioPlayer.play();
    });
  }
}

function resetSelectedTrack(arr) {
  for (i = 0; i < arr.length; i++) {
    arr[i].classList.remove("trackSelector__active");
  }
}
