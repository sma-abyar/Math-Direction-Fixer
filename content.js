function fixMathDirection() {
  const mathSpans = document.querySelectorAll('span.katex, .MathJax');
  
  mathSpans.forEach(span => {
    span.style.direction = 'ltr';
    span.style.display = 'inline-block';
    span.classList.add('math-direction-fixed');
  });
}

function applySettings() {
  chrome.storage.sync.get({
    applyToKatex: true,
    applyToMathJax: true,
    autoRun: true
  }, settings => {
    if (settings.autoRun) {
      document.removeEventListener('DOMSubtreeModified', debounceFixMathDirection);
      if (settings.applyToKatex && settings.applyToMathJax) {
        fixMathDirection();
      } else {
        const selector = [
          settings.applyToKatex ? 'span.katex' : null,
          settings.applyToMathJax ? '.MathJax' : null
        ].filter(Boolean).join(', ');
        
        if (selector) {
          const spans = document.querySelectorAll(selector);
          spans.forEach(span => {
            span.style.direction = 'ltr';
            span.style.display = 'inline-block';
            span.classList.add('math-direction-fixed');
          });
        }
      }
      document.addEventListener('DOMSubtreeModified', debounceFixMathDirection);
    }
  });
}

const debounceFixMathDirection = debounce(fixMathDirection, 100);

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  applySettings();
  chrome.runtime.onMessage.addListener(message => {
    if (message.action === 'updateSettings') {
      applySettings();
    }
  });
});