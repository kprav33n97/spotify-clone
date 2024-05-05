console.log("JavaScipt Loading...");

let currentSong = new Audio;

function convertSecondsToMinutesSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;

    // Add leading zero if seconds is less than 10
    if (remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    return minutes + ":" + remainingSeconds;
}


async function getSongs() {
    let a = await fetch('http://127.0.0.1:5500/songs/');
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs
}

const playMusic = (track) => {
//   let audio = new Audio("/songs/" + track)
  currentSong.src = "/songs/" + track
  currentSong.play()
  play.src = "pause.svg"
  document.querySelector(".songInfo").innerHTML = "track";
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
}

async function main() {
    let songs = await getSongs();
    console.log(songs);

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
        <img src="music.svg" class="invert" alt="Music icon">
        <div class="songListInfo">
          <div class="songName">${song.replaceAll("%20", " ")}</div>
          <div class="songArtist">Praveen</div>
        </div>
        <div class="playNow">
          <span>Play Now</span>
          <img src="play.svg" alt="Play icon">
        </div>
        </li>`;
    }

    // Attach an event listener to all songs... 

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", element => {
            // console.log(e.getElementsByTagName("div")[0]);
            console.log(e.querySelector(".songListInfo").firstElementChild.innerHTML);
            playMusic(e.querySelector(".songListInfo").firstElementChild.innerHTML.trim())
        })
    })

    // Attach an event listener to play, next & previous 

    play.addEventListener("click", ()=> {
        if(currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    // Listen for timeupdate event

    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML = `
        ${convertSecondsToMinutesSeconds(currentSong.currentTime)}/${convertSecondsToMinutesSeconds(currentSong.duration)}'
        `
    })
}

main()
