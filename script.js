let videos = [];
let currentIndex = 0;

async function loadVideos() {
  const res = await fetch("videos.json");
  videos = await res.json();

  console.log("Geladen:", videos);

  if (videos.length > 0) {
    playVideo(0);
  } else {
    alert("Keine Videos gefunden");
  }
}
function playVideo(index) {
  const player = document.getElementById("player");

  player.src = videos[index];
  player.load();
  player.play();
}
function nextVideo() {
  currentIndex++;

  if (currentIndex >= videos.length) {
    currentIndex = 0;
  }

  playVideo(currentIndex);
}
loadVideos();
