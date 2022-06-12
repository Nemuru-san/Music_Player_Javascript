const containerMusic = document.querySelector('.musicContainer');
const btnPrev = document.querySelector('#prev');
const btnPlay = document.querySelector('#play');
const btnNext = document.querySelector('#next');

const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const containerProgress = document.querySelector('.progressContainer');
const title = document.querySelector('#titleMusic');
const cover = document.querySelector('#cover');

// song titleMusic
const songCollection = ['feint - word', 'GEazy - Get Back Up', 'no sugar'];

// song trackCollection
let songIndex = 2;

// load song with DOM element
loadSong(songCollection[songIndex]);

function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `image/${song}.jpg`;
}

function playSong() {
    containerMusic.classList.add('play');
    btnPlay.querySelector('.fa-solid').classList.remove('fa-play');
    btnPlay.querySelector('.fa-solid').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    containerMusic.classList.remove('play');
    btnPlay.querySelector('.fa-solid').classList.add('fa-play');
    btnPlay.querySelector('.fa-solid').classList.remove('fa-pause');

    audio.pause();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songCollection.length - 1;
    }

    loadSong(songCollection[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songCollection.length - 1) {
        songIndex = 0;
    }

    loadSong(songCollection[songIndex]);

    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;

    progress.style.width = `${progressPercentage}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// event listener 
btnPlay.addEventListener('click', () => {
    const isPlaying = containerMusic.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// change song
btnPrev.addEventListener('click', prevSong);
btnNext.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

containerProgress.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);