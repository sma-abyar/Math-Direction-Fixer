chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get({
    applyToKatex: true,
    applyToMathJax: true,
    autoRun: true
  }, settings => {
    if (Object.keys(settings).length === 0) {
      chrome.storage.sync.set({
        applyToKatex: true,
        applyToMathJax: true,
        autoRun: true
      });
    }
  });
});

chrome.storage.onChanged.addListener(changes => {
  if (changes.applyToKatex || changes.applyToMathJax || changes.autoRun) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
      }
    });
  }
});