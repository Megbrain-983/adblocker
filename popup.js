// Load saved keywords on open
chrome.storage.sync.get("keywords", data => {
  if (data.keywords) {
    document.getElementById("keywords").value = data.keywords.join("\n");
  }
});

function save() {
  const raw = document.getElementById("keywords").value;
  const keywords = raw.split("\n").map(k => k.trim()).filter(Boolean);
  chrome.storage.sync.set({ keywords }, () => {
    document.getElementById("status").textContent = "✓ Saved!";
    setTimeout(() => document.getElementById("status").textContent = "", 2000);
  });
}

document.getElementById("saveBtn").addEventListener("click", save);
