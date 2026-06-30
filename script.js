// 🔥 Nur Reddit Links hier einfügen
let videos = [
  "https://www.reddit.com/r/cumsluts/comments/1oectaz/vintage_cumslut_y2k/",
  "https://www.reddit.com/r/cumsluts/comments/1pezts4/the_heavens_opened/",
  "https://www.reddit.com/r/tiktoknsfw/comments/1uihqvl/cowabunga/",
  "https://www.reddit.com/r/SheSucksHim/comments/1r0izb1/my_favourite_hobby/",
  "https://www.reddit.com/r/SheSucksHim/comments/1uflt2p/taking_it_rough/",
  "https://www.reddit.com/r/SheSucksHim/comments/1ub6gsu/she_looks_so_cute_when_she_sucks_my_cock/",
  "https://www.reddit.com/r/SheSucksHim/comments/1ud1ibc/baddie_knew_exactly_what_to_do/",
  "https://www.reddit.com/r/SheSucksHim/comments/1ue041l/she_took_it_deeper_every_time/",
  "https://www.reddit.com/r/cumsluts/comments/1ueevsz/swallowed_everything/",
  "https://www.reddit.com/r/bdsm/comments/1u3pcd2/you_loved_to_give_control_and_now_you_are/",
  "https://www.reddit.com/r/nsfwhardcore/comments/q9qhbk/pure_female_orgasm/",
  "https://www.reddit.com/r/cumsluts/comments/1to960q/too_much_fun/",
  "https://www.reddit.com/r/bdsm/comments/1u849cw/you_like_it_when_he_punish_you_in_public_like/",
  "https://www.reddit.com/r/Handjob/comments/1qjxjrx/she_is_brutal/",
  "https://www.reddit.com/r/cumsluts/comments/1slj7ef/in_the_public/"
];

let currentIndex = 0;

// 🚀 Reddit Parser (holt echte Video/GIF Links)
async function getRedditMedia(url) {
  try {
    const jsonUrl = url + ".json";

    const res = await fetch(jsonUrl);
    const data = await res.json();

    const post = data[0].data.children[0].data;

    // 🎥 Reddit Video
    if (post.is_video && post.secure_media?.reddit_video) {
      return post.secure_media.reddit_video.fallback_url;
    }

    // 🖼️ Image / GIF
    if (post.url && post.url.includes("i.redd.it")) {
      return post.url;
    }

    // 🎞️ GIF preview fallback
    if (post.preview?.images?.[0]?.variants?.mp4?.source?.url) {
      return post.preview.images[0].variants.mp4.source.url.replace(/&amp;/g, "&");
    }

    return null;

  } catch (err) {
    console.error("Fehler beim Laden:", err);
    return null;
  }
}

// 🎬 Videos laden + starten
async function loadAndStart() {
  const realVideos = [];

  for (let url of videos) {
    const media = await getRedditMedia(url);
    if (media) realVideos.push(media);
  }

  window.realVideos = realVideos;

  if (realVideos.length > 0) {
    playVideo(0);
  } else {
    alert("Keine Videos geladen");
  }
}

// ▶️ Video abspielen
function playVideo(index) {
  const player = document.getElementById("player");
  player.src = window.realVideos[index];
  player.play();
}

// ⏭️ nächstes Video
function nextVideo() {
  currentIndex++;

  if (currentIndex >= window.realVideos.length) {
    currentIndex = 0;
  }

  playVideo(currentIndex);
}

// 🚀 Start
loadAndStart();
