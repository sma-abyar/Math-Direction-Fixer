function saveOptions(e) {
  e.preventDefault();
  chrome.storage.sync.set({
    applyToKatex: document.getElementById('applyToKatex').checked,
    applyToMathJax: document.getElementById('applyToMathJax').checked,
    autoRun: document.getElementById('autoRun').checked
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    applyToKatex: true,
    applyToMathJax: true,
    autoRun: true
  }, settings => {
    document.getElementById('applyToKatex').checked = settings.applyToKatex;
    document.getElementById('applyToMathJax').checked = settings.applyToMathJax;
    document.getElementById('autoRun').checked = settings.autoRun;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);