// ===========================
// Canción
// ===========================
const song = {
  title:  'Midnight Bloom',
  artist: 'Luna Vargas',
  src:    'audio/audio.mp3',
};

// ===========================
// Audio
// ===========================
const audio = new Audio(song.src);

// ===========================
// Referencias al DOM
// ===========================
const btnPlay       = document.getElementById('btnPlay');
const iconPlay      = document.getElementById('iconPlay');
const iconPause     = document.getElementById('iconPause');
const progressFill  = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const progressBar   = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl   = document.getElementById('totalTime');
const songTitleEl   = document.querySelector('.song-title');
const songArtistEl  = document.querySelector('.song-artist');

// ===========================
// Utilidades
// ===========================

/** Convierte segundos en formato m:ss */
function fmt(s) {
  if (isNaN(s)) return '0:00';
  const m   = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

/** Actualiza la barra de progreso y tiempos */
function updateProgress() {
  const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
  progressFill.style.width  = pct + '%';
  progressThumb.style.left  = pct + '%';
  currentTimeEl.textContent = fmt(audio.currentTime);
}

/** Sincroniza los íconos play/pause */
function syncPlayIcon() {
  iconPlay.style.display  = audio.paused ? 'block' : 'none';
  iconPause.style.display = audio.paused ? 'none'  : 'block';
}

// ===========================
// Eventos del audio
// ===========================

// Cuando se carga la metadata (duración disponible)
audio.addEventListener('loadedmetadata', () => {
  console.log('Metadata cargada - Duración:', audio.duration);
  totalTimeEl.textContent = fmt(audio.duration);
});

// Cuando hay error
audio.addEventListener('error', (e) => {
  console.error('Error de audio:', e, audio.error);
});

// Actualiza progreso mientras reproduce
audio.addEventListener('timeupdate', updateProgress);

// Al terminar la canción
audio.addEventListener('ended', () => {
  syncPlayIcon();
  progressFill.style.width = '0%';
  progressThumb.style.left = '0%';
  currentTimeEl.textContent = '0:00';
});

// ===========================
// Eventos de la UI
// ===========================

// Play / Pause
btnPlay.addEventListener('click', () => {
  console.log('Audio paused:', audio.paused);
  console.log('Audio src:', audio.src);
  
  if (audio.paused) {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('Reproducción iniciada');
        })
        .catch((error) => {
          console.error('Error al reproducir:', error);
        });
    }
  } else {
    audio.pause();
  }
  syncPlayIcon();
});

// Seek: clic en la barra de progreso
progressBar.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  audio.currentTime = pct * audio.duration;
});

// ===========================
// Inicialización
// ===========================
syncPlayIcon();