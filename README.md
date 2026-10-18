# Animated Skill / Progress Bars

A clean, modern, and accessible **Skills & Progress Bars** component built with HTML5, CSS3 transitions, and vanilla JavaScript using the **Intersection Observer API**.

---

## 📌 Project Overview
This project displays a skill proficiency dashboard with animated progress bars that automatically detect when they scroll into the viewport and transition smoothly from `0%` to their designated percentage while incrementing numerical percentage counters simultaneously.

---

## 🚀 Features
- **6 Detailed Skill Bars** (exceeds the 5-item requirement): HTML5, CSS3, JavaScript (ES6+), React, Git, and RESTful APIs.
- **Scroll Detection with IntersectionObserver**: The animation is only activated when the skills card enters the viewport (eliminates unnecessary animations off-screen).
- **Smooth Cubic-Bezier CSS Transitions**: Provides natural acceleration and deceleration while filling the bar.
- **Synchronized Numeric Counter**: Numbers count up from `0%` to target values simultaneously using `requestAnimationFrame`.
- **Accessible (a11y)**: Includes ARIA attributes (`role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`).
- **Responsive Design**: Adapts cleanly across mobile, tablet, and desktop screens.
- **Replay Capability**: Includes a "Replay Animation" button to test and preview the animations repeatedly.

---

## 🛠️ Approach & Architecture

### 1. HTML Architecture
- Standard semantic markup wrapped in a `.skills-section`.
- Each skill item maintains a track (`.progress-track`) and dynamic bar (`.progress-bar`).
- Target percentages are stored cleanly in HTML5 `data-*` attributes (`data-progress` and `data-count`), keeping JavaScript decoupled from hardcoded layout numbers.

### 2. CSS Styling & Transitions
- Applied modern CSS variables for theme flexibility.
- The progress bar width initializes at `width: 0%`.
- Used `transition: width 1.5s cubic-bezier(0.25, 1, 0.5, 1)` on the `.progress-bar` class, offloading animation computation to the GPU.

### 3. JavaScript Logic
- **Viewport Detection**: Utilized `IntersectionObserver` with a `threshold: 0.2` to detect when 20% of the container enters view.
- **Decoupled Counting Function**: Implemented `requestAnimationFrame` with a cubic easing formula (`1 - (1 - progress)^3`) to align number increments with the CSS transition curve.
- **Performance Optimization**: Automatically calls `observer.unobserve()` once triggered to prevent wasted execution cycles.

---

## 📈 Outcome & Results
- **Seamless User Experience**: Eliminates layout shifts and animations occurring while the user is still at the top of the page.
- **High Performance**: 60fps animations leveraging CSS hardware-accelerated transitions and optimized paint cycles.
- **Extensible**: New skills can be added in `index.html` simply by duplicating a `.skill-item` block and setting the desired `data-progress` value without editing any JavaScript.

---

## 📂 File Structure
```text
├── index.html        # Semantic HTML layout and data attributes
├── style.css         # Styling, responsive design, and CSS transitions
├── script.js         # Intersection Observer & number counting animation
└── README.md         # Documentation and implementation details