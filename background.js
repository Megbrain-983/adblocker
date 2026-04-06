chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: ["ruleset_1"]
  }).catch(error => {
    console.error("Failed to enable ruleset_1:", error?.message || error);
  });
});
