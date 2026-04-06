// ---- Your blocked keywords (edit this list) ----
// // Replace the hardcoded BLOCKED_KEYWORDS line with this:
let BLOCKED_KEYWORDS = [];

chrome.storage.sync.get("keywords", data => {
  BLOCKED_KEYWORDS = data.keywords || [];
  runFilter();
});
const BLOCKED_CHANNELS = []; // e.g. ["MrBeast", "some channel"]

// ---- YouTube Filter ----
function filterYouTube() {
  // Targets video cards in home feed, search results, sidebar
  const cards = document.querySelectorAll(
    "ytd-video-renderer, ytd-rich-item-renderer, ytd-compact-video-renderer"
  );

  cards.forEach(card => {
    const titleEl = card.querySelector("#video-title, .title");
    const channelEl = card.querySelector("#channel-name, .ytd-channel-name");

    const title = titleEl?.textContent?.toLowerCase() || "";
    const channel = channelEl?.textContent?.toLowerCase() || "";

    const blocked =
      BLOCKED_KEYWORDS.some(kw => title.includes(kw.toLowerCase())) ||
      BLOCKED_CHANNELS.some(ch => channel.includes(ch.toLowerCase()));

    if (blocked) {
      card.style.display = "none";
    }
  });

  // Also hide YouTube Shorts shelf if you want
  document.querySelectorAll("ytd-reel-shelf-renderer").forEach(el => {
    el.style.display = "none";
  });
}

// ---- Instagram Filter ----
function filterInstagram() {
  // Instagram posts in feed
  document.querySelectorAll("article").forEach(post => {
    const text = post.innerText?.toLowerCase() || "";
    const blocked = BLOCKED_KEYWORDS.some(kw => text.includes(kw.toLowerCase()));
    if (blocked) {
      post.style.display = "none";
    }
  });
}

// ---- Run on page load + whenever new content loads ----
function runFilter() {
  if (location.hostname.includes("youtube.com")) filterYouTube();
  if (location.hostname.includes("instagram.com")) filterInstagram();
}

runFilter();

// MutationObserver watches for new videos loaded dynamically
const observer = new MutationObserver(() => runFilter());
observer.observe(document.body, { childList: true, subtree: true });
