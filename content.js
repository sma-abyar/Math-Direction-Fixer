// All known math libraries and their selectors
const mathSelectors = [
  'span.katex, .katex-mathml',             // KaTeX
  '.MathJax, .MathJax_Display',           // MathJax
  'math, .MathMLMathElement',             // MathML
  '.latex-math, .latex-display-math',     // Custom LaTeX
  '[data-math-type], [data-math-display]', // Generic attributes
  'code'                                   // All code tags
].join(', ');

// Function to check if an element contains math symbols
function hasMathSymbols(element) {
  const text = element.textContent || '';
  return /[\[\](){}=<>≤≥±×÷√∑∏∫∂∇∞π⁻¹²³⁴⁵⁶⁷⁸⁹⁰_]/.test(text);
}

// Function to fix all math on the page
function fixAllMathDirection() {
  const mathElements = document.querySelectorAll(mathSelectors);
  mathElements.forEach(el => {
    // For code elements, only fix if they contain math symbols
    if (el.tagName.toLowerCase() !== 'code' || hasMathSymbols(el)) {
      const computedStyle = window.getComputedStyle(el);
      const isBlock = computedStyle.display === 'block' ||
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
    }
  });
}

// Function to find elements with specific text content
function findElementsWithMathContent() {
  // Get all code elements
  const codeElements = document.querySelectorAll('code');
  
  // Filter only those with math content
  return Array.from(codeElements).filter(el => {
    const text = el.textContent || '';
    return text.includes('[') || 
           text.includes(']') || 
           text.includes('&gt;') || 
           text.includes('⁻¹') ||
           /[=<>≤≥±×÷√∑∏∫∂∇∞π²³]/.test(text);
  });
}

// Function to fix elements that might not be selected by CSS selectors
function fixSpecificMathElements() {
  const mathCodes = findElementsWithMathContent();
  
  mathCodes.forEach(el => {
    el.setAttribute('dir', 'ltr');
    el.style.direction = 'ltr';
    el.style.unicodeBidi = 'isolate';
    el.style.display = 'inline-block';
    el.style.textAlign = 'left';
    el.style.verticalAlign = 'middle';
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
            (node.matches && (node.matches(mathSelectors) || node.querySelector(mathSelectors)))) {
          needsFix = true;
          break;
        }
      }
    }
  }
  if (needsFix) {
    fixAllMathDirection();
    fixSpecificMathElements();
  }
});

// Full fix function
function fullFix() {
  fixAllMathDirection();
  fixSpecificMathElements();
}

// Initial fix and start observing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    fullFix();
    observer.observe(document.body, { childList: true, subtree: true });
  });
} else {
  // Document already loaded
  fullFix();
  observer.observe(document.body, { childList: true, subtree: true });
}

// Also fix every second as a fallback
setInterval(fullFix, 1000);

// Fix again when page becomes visible (for tabs that were in background)
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    fullFix();
  }
});

// Fix again after images and other resources load
window.addEventListener('load', fullFix);