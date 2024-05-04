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

const playMusic = (track) => {
  let audio = new Audio("/songs/" + track)
  audio.play()
}

async function main() {
    let currentSong;
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
            // console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    }

    )
}

main()
