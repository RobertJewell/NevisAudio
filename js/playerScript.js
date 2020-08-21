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

let collectTracks = document.getElementsByClassName("trackSelector");
let trackList = [...collectTracks];
let audioPlayer = document.getElementById("audioPlayer__mixed");
let audioPlayer2 = document.getElementById("audioPlayer__unmixed");
let audioSource = document.getElementById("audioPlayer__track");
let playPause = document.getElementById("playerControls__button--playPause");
let mixButton = document.getElementById("playerControls__button--mix");
let playButton = document.getElementById("playerControls__play");
let pauseButton = document.getElementById("playerControls__pause");

//Toggle play pause state
playPause.addEventListener("click", function () {
  playButton.classList.toggle("noDisplay");
  pauseButton.classList.toggle("noDisplay");
  audioPlayer.currentTime = audioPlayer2.currentTime;
  console.log(audioPlayer.currentTime, audioPlayer2.currentTime)
  playPauseTrack();
});

mixButton.addEventListener("click", function () {
  if (isMixed() == true) {
    audioPlayer.currentTime = audioPlayer2.currentTime;
    mixButton.textContent = "Hear Mixed!";
    console.log(audioPlayer.currentTime, audioPlayer2.currentTime)
    audioPlayer2.muted = false;
    audioPlayer.muted = true;
  } else {
    mixButton.textContent = "Hear Unmixed!";
    audioPlayer2.currentTime = audioPlayer.currentTime;
    console.log(audioPlayer.currentTime, audioPlayer2.currentTime)
    audioPlayer2.muted = true;
    audioPlayer.muted = false;
  }
});

//reset play/pause on track end
audioPlayer.addEventListener("ended", resetPlayPause());

makeTracksClickable();

//Functions

//reset button on track select
function resetPlayPause() {
  playButton.classList.remove("noDisplay");
  pauseButton.classList.add("noDisplay");
}

//play pause audio
function playPauseTrack() {
  if (playButton.classList.contains("noDisplay")) {
    audioPlayer.play();
    audioPlayer2.play();
  } else {
    audioPlayer.pause();
    audioPlayer2.pause();
  }
}

function isMixed() {
  if (mixButton.textContent == "Hear Unmixed!") {
    return true;
  }
  return false;
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
