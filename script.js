/**
 * Animated Skills & Progress Bars
 * Uses IntersectionObserver for scroll detection and requestAnimationFrame for numerical counting.
 */

document.addEventListener('DOMContentLoaded', () => {
  const skillsCard = document.querySelector('.skills-card');
  const skillItems = document.querySelectorAll('.skill-item');
  const replayBtn = document.getElementById('replayBtn');

  let hasAnimated = false;

  /**
   * Animates a counter element from 0 to its target value.
   * @param {HTMLElement} counterElement - The text element displaying the percentage.
   * @param {number} targetValue - The final percentage to reach.
   * @param {number} duration - Animation duration in ms.
   */
  function animateCounter(counterElement, targetValue, duration = 1500) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic calculation: 1 - pow(1 - progress, 3)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * targetValue);

      counterElement.textContent = `${currentValue}%`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counterElement.textContent = `${targetValue}%`;
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Triggers the filling animation for all progress bars and counts up percentages.
   */
  function triggerAnimation() {
    skillItems.forEach((item) => {
      const bar = item.querySelector('.progress-bar');
      const counter = item.querySelector('.skill-percentage');
      const targetPercentStr = bar.getAttribute('data-progress');
      const targetNumber = parseInt(counter.getAttribute('data-count'), 10);

      // Animate width via CSS transition
      bar.style.width = targetPercentStr;

      // Animate text number counting
      animateCounter(counter, targetNumber, 1500);
    });
  }

  /**
   * Resets all progress bars to 0 for replay capability.
   */
  function resetBars() {
    skillItems.forEach((item) => {
      const bar = item.querySelector('.progress-bar');
      const counter = item.querySelector('.skill-percentage');
      bar.style.width = '0%';
      counter.textContent = '0%';
    });
  }

  /**
   * IntersectionObserver Callback
   */
  const observerOptions = {
    root: null, // viewport
    threshold: 0.2 // Trigger when 20% of the section is visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        triggerAnimation();
        hasAnimated = true;
        obs.unobserve(entry.target); // Unobserve after triggering once
      }
    });
  }, observerOptions);

  if (skillsCard) {
    observer.observe(skillsCard);
  }

  // Handle replay button click
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      resetBars();
      // Delay before re-filling to let transition reset cleanly
      setTimeout(() => {
        triggerAnimation();
      }, 100);
    });
  }
});