let desktopSlideIndex = 0;
let mobileSlideIndex = 0;
let desktopInterval;
let mobileInterval;

function showDesktopSlides() {
  const desktopImages = document.querySelectorAll(".desktop-slide img");
  const desktopDots = document.querySelectorAll(".desktop .dot");

  desktopImages.forEach((img, index) => {
    img.style.display = "none";
    desktopDots[index].classList.remove("active");
  });

  desktopSlideIndex++;
  if (desktopSlideIndex >= desktopImages.length) {
    desktopSlideIndex = 0;
  }

  desktopImages[desktopSlideIndex].style.display = "block";
  desktopDots[desktopSlideIndex].classList.add("active");
}

function showMobileSlides() {
  const mobileImages = document.querySelectorAll(".mobile-slide img");
  const mobileDots = document.querySelectorAll(".mobile .dot");

  mobileImages.forEach((img, index) => {
    img.style.display = "none";
    mobileDots[index].classList.remove("active");
  });

  if (mobileSlideIndex >= mobileImages.length) {
    mobileSlideIndex = 0;
  }

  mobileImages[mobileSlideIndex].style.display = "block";
  mobileDots[mobileSlideIndex].classList.add("active");
  mobileSlideIndex++;
}

function startDesktopRotation() {
  showDesktopSlides();
  desktopInterval = setInterval(showDesktopSlides, 5000);
}

function startMobileRotation() {
  showMobileSlides();
  mobileInterval = setInterval(showMobileSlides, 5000);
}

function pauseDesktopBanner() {
  clearInterval(desktopInterval);
}

function resumeDesktopBanner() {
  startDesktopRotation();
}

function pauseMobileBanner() {
  clearInterval(mobileInterval);
}

function resumeMobileBanner() {
  startMobileRotation();
}

function currentDesktopSlide(n) {
  clearInterval(desktopInterval);
  const desktopImages = document.querySelectorAll(".desktop-slide img");
  const desktopDots = document.querySelectorAll(".desktop .dot");

  desktopImages.forEach((img, index) => {
    img.style.display = "none";
    desktopDots[index].classList.remove("active");
  });

  desktopSlideIndex = n - 1;
  desktopImages[desktopSlideIndex].style.display = "block";
  desktopDots[desktopSlideIndex].classList.add("active");

  resumeDesktopBanner();
}

function currentMobileSlide(n) {
  clearInterval(mobileInterval);
  const mobileImages = document.querySelectorAll(".mobile-slide img");
  const mobileDots = document.querySelectorAll(".mobile .dot");

  mobileImages.forEach((img, index) => {
    img.style.display = "none";
    mobileDots[index].classList.remove("active");
  });

  mobileSlideIndex = n % mobileImages.length;
  mobileImages[mobileSlideIndex].style.display = "block";
  mobileDots[mobileSlideIndex].classList.add("active");

  mobileSlideIndex++; // increment index for next interval display
  resumeMobileBanner();
}

function showNextImage(images, currentIndex) {
  images[currentIndex].style.display = "none";
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].style.display = "block";
  return currentIndex;
}

function showPreviousImage(images, currentIndex) {
  images[currentIndex].style.display = "none";
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  images[currentIndex].style.display = "block";
  return currentIndex;
}

function showPreviousDesktopImage() {
  desktopSlideIndex = showPreviousImage(
    document.querySelectorAll(".desktop-slide img"),
    desktopSlideIndex
  );
  updateDotState("desktop", desktopSlideIndex);
}

function showNextDesktopImage() {
  desktopSlideIndex = showNextImage(
    document.querySelectorAll(".desktop-slide img"),
    desktopSlideIndex
  );
  updateDotState("desktop", desktopSlideIndex);
}

function showPreviousMobileImage() {
  clearInterval(mobileInterval);
  mobileSlideIndex =
    (mobileSlideIndex -
      1 +
      document.querySelectorAll(".mobile-slide img").length) %
    document.querySelectorAll(".mobile-slide img").length;
  showMobileSlides();
  resumeMobileBanner();

  clearInterval(mobileInterval);
  // update mobileSlideIndex
  showMobileSlides();
  resumeMobileBanner();
}

function showNextMobileImage() {
  clearInterval(mobileInterval);
  mobileSlideIndex =
    (mobileSlideIndex + 1) %
    document.querySelectorAll(".mobile-slide img").length;
  showMobileSlides();
  resumeMobileBanner();
}

function updateDotState(type, index) {
  const dots = document.querySelectorAll(`.${type} .dot`);
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  startDesktopRotation();
  startMobileRotation();
});
let touchStartX = 0;
let touchEndX = 0;

const mobileSlideContainer = document.querySelector(".mobile-slide");

mobileSlideContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

mobileSlideContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50; // minimum swipe distance in pixels
  const swipeDistance = touchEndX - touchStartX;

  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance < 0) {
      // Swiped left → show next
      showNextMobileImage();
    } else {
      // Swiped right → show previous
      showPreviousMobileImage();
    }
  }
}
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
document.addEventListener("DOMContentLoaded", () => {
  startDesktopRotation();
  startMobileRotation();

  let touchStartX = 0;
  let touchEndX = 0;

  const mobileSlideContainer = document.querySelector(".mobile-slide");

  mobileSlideContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  mobileSlideContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance < 0) {
        showNextMobileImage();
      } else {
        showPreviousMobileImage();
      }
    }
  }
});
