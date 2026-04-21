// Testimonial Slider Logic
let currentSlideIndex = 0;
const slidesContainer = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
  if (!slidesContainer || dots.length === 0) return;
  
  if (index >= dots.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = dots.length - 1;
  } else {
    currentSlideIndex = index;
  }

  // Move slides
  slidesContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

  // Update dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
  showSlide(index);
  resetInterval();
}

function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

function startInterval() {
  slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function resetInterval() {
  clearInterval(slideInterval);
  startInterval();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('slides')) {
    startInterval();
  }
});
