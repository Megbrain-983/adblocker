chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: ["ruleset_1"]
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Failed to enable ruleset_1:", chrome.runtime.lastError.message);
    }
  });
});
