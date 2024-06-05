const mathSpans = document.querySelectorAll(mathSelectors);
function fixMathDirection() {
  // const mathSpans = document.querySelectorAll('span.katex, .MathJax');

  mathSpans.forEach(span => {
    const isDisplayMath = span.classList.contains('display') ||
      window.getComputedStyle(span).display === 'block';

    span.style.direction = 'ltr';
    span.style.display = isDisplayMath ? 'block' : 'inline-block';
    span.style.width = isDisplayMath ? '100%' : 'fit-content';
    span.style.textAlign = isDisplayMath ? 'center' : 'left';
    span.style.verticalAlign = 'middle';
    span.classList.add('math-direction-fixed');
  });
}

// Run on page load and content change
document.addEventListener('DOMContentLoaded', fixMathDirection);
document.addEventListener('DOMSubtreeModified', debounceFixMathDirection);

// Debounce function to prevent excessive calls
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const debounceFixMathDirection = debounce(fixMathDirection, 100);

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

function debounce(func, wait) {
  let timeout;
  return function () {
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

observer.observe(document.body, { childList: true, subtree: true });

function fixMathSpanDirection(span) {
  const isDisplayMath = span.classList.contains('display') ||
    window.getComputedStyle(span).display === 'block';

  span.style.direction = 'ltr';
  span.style.display = isDisplayMath ? 'block' : 'inline-block';
  span.style.width = isDisplayMath ? '100%' : 'fit-content';
  span.style.textAlign = isDisplayMath ? 'center' : 'left';
  span.style.verticalAlign = 'middle';
  span.classList.add('math-direction-fixed');
}

const isRTLContext = window.getComputedStyle(span.parentElement).direction === 'rtl';
span.classList.toggle('rtl-context', isRTLContext);
// List of selectors for various math libraries
const mathSelectors = [
  'span.katex',              // KaTeX
  '.MathJax',              // MathJax
  'math',                  // MathML
  '.latex-math',          // Custom LaTeX renderers
  '[data-math-type]'      // Generic attribute for math
].join(', ');

// Function to find and fix all math spans in a given element
function fixMathInElement(element) {
  const mathSpans = element.querySelectorAll(mathSelectors);
  mathSpans.forEach(fixMathSpanDirection);
}

// Fix math spans on page load
document.addEventListener('DOMContentLoaded', () => {
  fixMathInElement(document.body);
});

// Set up an observer to fix math spans in dynamically added content
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          fixMathInElement(node);
        }
      });
    }
  }
});

// Start observing the entire document for changes
observer.observe(document.body, { childList: true, subtree: true });