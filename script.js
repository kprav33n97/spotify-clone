console.log("JavaScipt Loading...");

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

    // Play the first song 
    var audio = new Audio(songs[0]);
    // audio.play();

    audio.addEventListener("loadeddata", () => {
        // let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
        // The duration variable now holds the duration (in seconds) of the audio clip
      });
}

main()
