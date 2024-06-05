// List of selectors for various math libraries
const mathSelectors = [
  'span.katex',              // KaTeX
  '.MathJax',              // MathJax
  'math',                  // MathML
  '.latex-math',          // Custom LaTeX renderers
  '[data-math-type]'      // Generic attribute for math
].join(', ');

// Function to fix a single math span
function fixMathSpanDirection(span) {
  const isDisplayMath = span.classList.contains('display') || 
                      window.getComputedStyle(span).display === 'block';

  span.setAttribute('dir', 'ltr');
  span.style.display = isDisplayMath ? 'block' : 'inline-block';
  span.style.textAlign = isDisplayMath ? 'center' : 'left';
  span.style.width = isDisplayMath ? '100%' : 'auto';
  span.classList.add('math-direction-fixed');

  if (isDisplayMath) {
    span.classList.add('display-math');
  }
}

// Function to fix all math spans in a given element
function fixMathInElement(element) {
  const mathSpans = element.querySelectorAll(mathSelectors);
  mathSpans.forEach(fixMathSpanDirection);
}

// Load user preferences
function loadPreferences() {
  return new Promise(resolve => {
    chrome.storage.sync.get({
      fixKatex: true,
      fixMathJax: true,
      fixOthers: true,
      autoRun: true
    }, resolve);
  });
}

// Apply user preferences to selectors
function applyPreferences(prefs) {
  let activeSelectors = [];
  if (prefs.fixKatex) activeSelectors.push('span.katex');
  if (prefs.fixMathJax) activeSelectors.push('.MathJax');
  if (prefs.fixOthers) {
    activeSelectors = activeSelectors.concat(['math', '.latex-math', '[data-math-type]']);
  }
  return activeSelectors.join(', ');
}

// Main function to fix math on the page
async function fixMathDirection() {
  const prefs = await loadPreferences();
  if (!prefs.autoRun) return;

  const activeSelectors = applyPreferences(prefs);
  const mathSpans = document.querySelectorAll(activeSelectors);
  mathSpans.forEach(fixMathSpanDirection);
}

// Set up mutation observer for dynamic content
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

// Run when the page loads and set up observer
document.addEventListener('DOMContentLoaded', () => {
  fixMathDirection();
  observer.observe(document.body, { childList: true, subtree: true });
});

// Listen for preference changes
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'preferencesUpdated') {
    fixMathDirection();
  }
});