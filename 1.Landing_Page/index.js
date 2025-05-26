// Global variables for carousel state
let desktopSlideIndex = 0;
let mobileSlideIndex = 0;
let desktopInterval = null;
let mobileInterval = null;

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Start both carousels
  startDesktopRotation();
  startMobileRotation();

  // Set up touch events for mobile
  setupTouchEvents();
});

function showDesktopSlides() {
  const desktopImages = document.querySelectorAll(".desktop-slide img");
  const desktopDots = document.querySelectorAll(".desktop .dot");

  if (desktopImages.length === 0) return;

  // Hide all images and remove active class from dots
  desktopImages.forEach((img, index) => {
    img.style.display = "none";
    if (desktopDots[index]) {
      desktopDots[index].classList.remove("active");
    }
  });

  // Update index and show current image
  desktopSlideIndex = (desktopSlideIndex + 1) % desktopImages.length;
  desktopImages[desktopSlideIndex].style.display = "block";
  if (desktopDots[desktopSlideIndex]) {
    desktopDots[desktopSlideIndex].classList.add("active");
  }
}

function showMobileSlides() {
  const mobileImages = document.querySelectorAll(".mobile-slide img");
  const mobileDots = document.querySelectorAll(".mobile .dot");

  if (mobileImages.length === 0) return;

  // Hide all images and remove active class from dots
  mobileImages.forEach((img, index) => {
    img.style.display = "none";
    if (mobileDots[index]) {
      mobileDots[index].classList.remove("active");
    }
  });

  // Update index and show current image
  mobileSlideIndex = (mobileSlideIndex + 1) % mobileImages.length;
  mobileImages[mobileSlideIndex].style.display = "block";
  if (mobileDots[mobileSlideIndex]) {
    mobileDots[mobileSlideIndex].classList.add("active");
  }
}

function startDesktopRotation() {
  // Clear any existing interval
  if (desktopInterval) {
    clearInterval(desktopInterval);
  }
  // Show first slide immediately
  showDesktopSlides();
  // Start rotation
  desktopInterval = setInterval(showDesktopSlides, 5000);
}

function startMobileRotation() {
  // Clear any existing interval
  if (mobileInterval) {
    clearInterval(mobileInterval);
  }
  // Show first slide immediately
  showMobileSlides();
  // Start rotation
  mobileInterval = setInterval(showMobileSlides, 5000);
}

function pauseDesktopBanner() {
  if (desktopInterval) {
    clearInterval(desktopInterval);
    desktopInterval = null;
  }
}

function resumeDesktopBanner() {
  if (!desktopInterval) {
    startDesktopRotation();
  }
}

function pauseMobileBanner() {
  if (mobileInterval) {
    clearInterval(mobileInterval);
    mobileInterval = null;
  }
}

function resumeMobileBanner() {
  if (!mobileInterval) {
    startMobileRotation();
  }
}

function currentDesktopSlide(n) {
  pauseDesktopBanner();
  const desktopImages = document.querySelectorAll(".desktop-slide img");
  const desktopDots = document.querySelectorAll(".desktop .dot");

  if (desktopImages.length === 0) return;

  desktopImages.forEach((img, index) => {
    img.style.display = "none";
    if (desktopDots[index]) {
      desktopDots[index].classList.remove("active");
    }
  });

  desktopSlideIndex = (n - 1) % desktopImages.length;
  desktopImages[desktopSlideIndex].style.display = "block";
  if (desktopDots[desktopSlideIndex]) {
    desktopDots[desktopSlideIndex].classList.add("active");
  }

  resumeDesktopBanner();
}

function currentMobileSlide(n) {
  pauseMobileBanner();
  const mobileImages = document.querySelectorAll(".mobile-slide img");
  const mobileDots = document.querySelectorAll(".mobile .dot");

  if (mobileImages.length === 0) return;

  mobileImages.forEach((img, index) => {
    img.style.display = "none";
    if (mobileDots[index]) {
      mobileDots[index].classList.remove("active");
    }
  });
  mobileSlideIndex = (n - 1) % mobileImages.length;
  mobileImages[mobileSlideIndex].style.display = "block";
  if (mobileDots[mobileSlideIndex]) {
    mobileDots[mobileSlideIndex].classList.add("active");
  }

  resumeMobileBanner();
}

function setupTouchEvents() {
  let touchStartX = 0;
  let touchEndX = 0;
  const mobileSlideContainer = document.querySelector(".mobile-slide");

  if (mobileSlideContainer) {
    mobileSlideContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseMobileBanner();
    });

    mobileSlideContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe(touchStartX, touchEndX);
      resumeMobileBanner();
    });

    mobileSlideContainer.addEventListener(
      "touchmove",
      (e) => {
        if (
          Math.abs(e.changedTouches[0].screenX - touchStartX) >
          Math.abs(e.changedTouches[0].screenY - touchStartY)
        ) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }
}

function handleSwipe(startX, endX) {
  const swipeThreshold = 50;
  const swipeDistance = endX - startX;
  const mobileImages = document.querySelectorAll(".mobile-slide img");
  const mobileDots = document.querySelectorAll(".mobile .dot");

  if (Math.abs(swipeDistance) > swipeThreshold) {
    // Hide all images
    mobileImages.forEach((img, index) => {
      img.style.display = "none";
      if (mobileDots[index]) {
        mobileDots[index].classList.remove("active");
      }
    });

    if (swipeDistance < 0) {
      // Swiped left - show next
      mobileSlideIndex = (mobileSlideIndex + 1) % mobileImages.length;
    } else {
      // Swiped right - show previous
      mobileSlideIndex =
        (mobileSlideIndex - 1 + mobileImages.length) % mobileImages.length;
    }

    // Show current image and update dot
    mobileImages[mobileSlideIndex].style.display = "block";
    if (mobileDots[mobileSlideIndex]) {
      mobileDots[mobileSlideIndex].classList.add("active");
    }
  }
}
