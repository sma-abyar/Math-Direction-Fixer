function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
      fixKatex: document.getElementById('fixKatex').checked,
      fixMathJax: document.getElementById('fixMathJax').checked,
      fixOthers: document.getElementById('fixOthers').checked,
      autoRun: document.getElementById('autoRun').checked
    }, () => {
      // Update status to let user know options were saved
      const status = document.createElement('p');
      status.textContent = 'Options saved.';
      document.body.appendChild(status);
      setTimeout(() => document.body.removeChild(status), 1000);
  
      // Notify content script that preferences have changed
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'preferencesUpdated' });
      });
    });
  }
  
  function restoreOptions() {
    chrome.storage.sync.get({
      fixKatex: true,
      fixMathJax: true,
      fixOthers: true,
      autoRun: true
    }, items => {
      document.getElementById('fixKatex').checked = items.fixKatex;
      document.getElementById('fixMathJax').checked = items.fixMathJax;
      document.getElementById('fixOthers').checked = items.fixOthers;
      document.getElementById('autoRun').checked = items.autoRun;
    });
  }
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.querySelector('form').addEventListener('submit', saveOptions);