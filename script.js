const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');

const allSongs = [
  {
    id: 0,
    title: 'Good Morning',
    artist: 'Kanye West',
    duration: '3:15',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/01%20-%20Good%20Morning.mp3'
  },

  {
    id: 1,
    title: 'Champion',
    artist: 'Kanye West',
    duration: '2:48',
    src: 'https://ia601204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/02%20-%20Champion.mp3'
  },

  {
    id: 2,
    title: 'Stronger',
    artist: 'Kanye West',
    duration: '5:12',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/03%20-%20Stronger.mp3'
  },

  {
    id: 3,
    title: 'I Wonder',
    artist: 'Kanye West',
    duration: '4:03',
    src: 'https://ia601204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/04%20-%20I%20Wonder.mp3'
  },

  {
    id: 4,
    title: 'Good Life feat. T-Pain',
    artist: 'Kanye West',
    duration: '3:27',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/05%20-%20Good%20Life%20feat.%20T-Pain.mp3'
  },

  {
    id: 5,
    title: "Can't Tell Me Nothing",
    artist: 'Kanye West',
    duration: '4:32',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/06%20-%20Can%27t%20Tell%20Me%20Nothing.mp3'
  },

  {
    id: 6,
    title: 'Barry Bonds feat. Lil Wayne',
    artist: 'Kanye West',
    duration: '3:24',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/07%20-%20Barry%20Bonds%20feat.%20Lil%20Wayne.mp3'
  },

  {
    id: 7,
    title: 'Drunk & Hot Girls feat. Mos Def',
    artist: 'Kanye West',
    duration: '5:13',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/08%20-%20Drunk%20%26%20Hot%20Girls%20feat.%20Mos%20Def.mp3'
  },

  {
    id: 8,
    title: 'Flashing Lights feat. Dwele',
    artist: 'Kanye West',
    duration: '3:58',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/09%20-%20Flashing%20Lights%20feat.%20Dwele.mp3'
  },

  {
    id: 9,
    title: 'Everything I Am feat. DJ Premier',
    artist: 'Kanye West',
    duration: '3:48',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/10%20-%20Everything%20I%20Am%20feat.%20DJ%20Premier.mp3'
  },

  {
    id: 10,
    title: 'The Glory',
    artist: 'Kanye West',
    duration: '3:33',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/11%20-%20The%20Glory.mp3'
  },

  {
    id: 11,
    title: 'Homecoming',
    artist: 'Kanye West',
    duration: '3:24',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/12%20-%20Homecoming.mp3'
  },

  {
    id: 12,
    title: 'Big Brother',
    artist: 'Kanye West',
    duration: '9:48',
    src: 'https://ia601204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/13%20-%20Big%20Brother.mp3'
  },

  {
    id: 13,
    title: 'Good Night feat. Mos Def & Al Be',
    artist: 'Kanye West',
    duration: '3:07',
    src: 'https://ia601204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/14%20-%20Good%20Night%20feat.%20Mos%20Def%20%26%20Al%20Be.mp3'
  },

  {
    id: 14,
    title: 'Bittersweet Poetry feat. John Mayer',
    artist: 'Kanye West',
    duration: '4:02',
    src: 'https://ia801204.us.archive.org/15/items/kanye-west-graduation-cd-rip-flac-1700kbps/15%20-%20Bittersweet%20Poetry%20feat.%20John%20Mayer.mp3'
  }
];

const audio = new Audio();

let userData = {
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0
};

const playSong = id => {
  const song = userData?.songs.find(song => song.id === id);
  audio.src = song.src;
  audio.title = song.title;
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData?.songCurrentTime;
  }

  userData.currentSong = song;

  playButton.classList.add('playing');
  highlightCurrentSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
  audio.play();
};

const pauseSong = () => {
  userData.songCurrentTime = audio.currentTime;
  playButton.classList.remove('playing');
  audio.pause();
};

const playNextSong = () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const nextSong = userData?.songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

const playPreviousSong = () => {
  if (userData?.currentSong === null) {
    return;
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1];
    playSong(previousSong.id);
  }
};

const shuffle = () => {
  userData?.songs.sort(() => Math.random() - 0.5);
  userData.currentSong = null;
  userData.songCurrentTime = 0;
  renderSongs(userData?.songs);
  pauseSong();
  setPlayerDisplay();
  setPlayButtonAccessibleText();
};

const deleteSong = id => {
  if (userData?.currentSong?.id === id) {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
  }
  userData.songs = userData?.songs.filter(song => song.id !== id);
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText();

  if (userData?.songs.length === 0) {
    const resetButton = document.createElement('button');
    const resetText = document.createTextNode('Resetar a playlist');

    resetButton.id = 'reset';
    resetButton.ariaLabel = 'Reset playlist';
    resetButton.appendChild(resetText);
    playlistSongs.appendChild(resetButton);

    resetButton.addEventListener('click', () => {
      userData.songs = [...allSongs];

      renderSongs(sortSongs());
      setPlayButtonAccessibleText();
      resetButton.remove();
    });
  }
};

const setPlayerDisplay = () => {
  const playingSong = document.getElementById('player-song-title');
  const songArtist = document.getElementById('player-song-artist');
  const currentTitle = userData?.currentSong?.title;
  const currentArtist = userData?.currentSong?.artist;
  playingSong.textContent = currentTitle ? currentTitle : '';
  songArtist.textContent = currentArtist ? currentArtist : '';
};

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll('.playlist-song');
  const songToHighlight = document.getElementById(
    `song-${userData?.currentSong?.id}`
  );

  playlistSongElements.forEach(songEl => {
    songEl.removeAttribute('aria-current');
  });

  if (songToHighlight) songToHighlight.setAttribute('aria-current', 'true');
};

const renderSongs = array => {
  const songsHTML = array
    .map(song => {
      return `<li id="song-${song.id}" class="playlist-song">

<button class='playlist-song-info' onclick="playSong(${song.id})">
<span class='playlist-song-title'>${song.title}</span>
<span class='playlist-song-artist'>${song.artist}</span>
<span class='playlist-song-duration'>${song.duration}</span>
</button>
<button class="playlist-song-delete" aria-label="Delete ${song.title}" onclick= "deleteSong(${song.id})">
<svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg></button>
</li>
`;
    })
    .join('');

  playlistSongs.innerHTML = songsHTML;
};

const setPlayButtonAccessibleText = () => {
  const song = userData?.currentSong || userData?.songs[0];
  playButton.setAttribute(
    'aria-label',
    song?.title ? `Play ${song.title}` : 'Play'
  );
};

const getCurrentSongIndex = () => {
  return userData?.songs.indexOf(userData?.currentSong);
};

playButton.addEventListener('click', () => {
  if (userData?.currentSong === null) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
});

pauseButton.addEventListener('click', pauseSong);

nextButton.addEventListener('click', playNextSong);

previousButton.addEventListener('click', playPreviousSong);

shuffleButton.addEventListener('click', shuffle);

audio.addEventListener('ended', () => {
  const currentSongIndex = getCurrentSongIndex();
  const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;
  if (nextSongExists) {
    playNextSong();
  } else {
    userData.currentSong = null;
    userData.songCurrentTime = 0;
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText();
  }
});

const sortSongs = () => {
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return userData?.songs;
};
renderSongs(userData?.songs);
