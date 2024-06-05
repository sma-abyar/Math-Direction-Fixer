function fixMathDirection() {
    // Find all <span> tags with class "katex"
    const mathSpans = document.querySelectorAll('span.katex');
    
    // For each such span, set its direction to LTR
    mathSpans.forEach(span => {
      span.style.direction = 'ltr';
      span.style.display = 'inline-block'; // This ensures the span respects the direction
    });
  }
  
  // Run this function when the page loads and whenever its content changes
  document.addEventListener('DOMContentLoaded', fixMathDirection);
  document.addEventListener('DOMSubtreeModified', fixMathDirection);