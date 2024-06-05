function fixMathDirection() {
  // Find all <p> tags that contain <span class="katex">
  const paragraphs = document.querySelectorAll('p:has(span.katex)');
  
  // For each such paragraph, set its direction to LTR
  paragraphs.forEach(p => {
    p.style.direction = 'ltr';
  });
}

// Run this function when the page loads and whenever its content changes
document.addEventListener('DOMContentLoaded', fixMathDirection);
document.addEventListener('DOMSubtreeModified', fixMathDirection);