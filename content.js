// All known math libraries and their selectors
const mathSelectors = [
  'span.katex, .katex-mathml',             // KaTeX
  '.MathJax, .MathJax_Display',           // MathJax
  'math, .MathMLMathElement',             // MathML
  '.latex-math, .latex-display-math',     // Custom LaTeX
  '[data-math-type], [data-math-display]' // Generic attributes
].join(', ');

// Function to fix all math on the page
function fixAllMathDirection() {
  const mathElements = document.querySelectorAll(mathSelectors);

  mathElements.forEach(el => {
    const isBlock = window.getComputedStyle(el).display === 'block' || 
                   el.classList.contains('display') || 
                   el.classList.contains('MathJax_Display') ||
                   el.getAttribute('data-math-display') === 'true';

    el.setAttribute('dir', 'ltr');
    el.style.direction = 'ltr';
    el.style.unicodeBidi = 'isolate';

    if (isBlock) {
      el.style.display = 'block';
      el.style.width = '100%';
      el.style.textAlign = 'center';
      el.classList.add('display-math-fixed');
    } else {
      el.style.display = 'inline-block';
      el.style.textAlign = 'left';
      el.style.verticalAlign = 'middle';
    }

    el.classList.add('math-direction-fixed');
  });
}

// Function to fix any new math elements added to the page
const observer = new MutationObserver(mutations => {
  let needsFix = false;
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE && 
            (node.matches(mathSelectors) || node.querySelector(mathSelectors))) {
          needsFix = true;
          break;
        }
      }
    }
  }
  if (needsFix) {
    fixAllMathDirection();
  }
});

// Initial fix and start observing
document.addEventListener('DOMContentLoaded', () => {
  fixAllMathDirection();
  observer.observe(document.body, { childList: true, subtree: true });
});

// Also fix every second as a fallback
setInterval(fixAllMathDirection, 1000);

// Fix again when page becomes visible (for tabs that were in background)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    fixAllMathDirection();
  }
});

// Fix again after images and other resources load
window.addEventListener('load', fixAllMathDirection);