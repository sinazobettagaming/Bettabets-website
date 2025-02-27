
let desktopSlideIndex = 0;
let mobileSlideIndex = 0;
let desktopInterval;
let mobileInterval;

function showDesktopSlides() {
  const desktopImages = document.querySelectorAll('.desktop-slide img');
  const desktopDots = document.querySelectorAll('.desktop .dot');

  desktopImages.forEach((img, index) => {
    img.style.display = 'none';
    desktopDots[index].classList.remove('active');
  });

  desktopSlideIndex++;
  if (desktopSlideIndex >= desktopImages.length) {
    desktopSlideIndex = 0;
  }

  desktopImages[desktopSlideIndex].style.display = 'block';
  desktopDots[desktopSlideIndex].classList.add('active');
}

function showMobileSlides() {
  const mobileImages = document.querySelectorAll('.mobile-slide img');
  const mobileDots = document.querySelectorAll('.mobile .dot');

  mobileImages.forEach((img, index) => {
    img.style.display = 'none';
    mobileDots[index].classList.remove('active');
  });

  mobileSlideIndex++;
  if (mobileSlideIndex >= mobileImages.length) {
    mobileSlideIndex = 0;
  }

  mobileImages[mobileSlideIndex].style.display = 'block';
  mobileDots[mobileSlideIndex].classList.add('active');
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
  const desktopImages = document.querySelectorAll('.desktop-slide img');
  const desktopDots = document.querySelectorAll('.desktop .dot');

  desktopImages.forEach((img, index) => {
    img.style.display = 'none';
    desktopDots[index].classList.remove('active');
  });

  desktopSlideIndex = n - 1;
  desktopImages[desktopSlideIndex].style.display = 'block';
  desktopDots[desktopSlideIndex].classList.add('active');

  resumeDesktopBanner();
}

function currentMobileSlide(n) {
  clearInterval(mobileInterval);
  const mobileImages = document.querySelectorAll('.mobile-slide img');
  const mobileDots = document.querySelectorAll('.mobile .dot');

  mobileImages.forEach((img, index) => {
    img.style.display = 'none';
    mobileDots[index].classList.remove('active');
  });

  mobileSlideIndex = n - 1;
  mobileImages[mobileSlideIndex].style.display = 'block';
  mobileDots[mobileSlideIndex].classList.add('active');

  resumeMobileBanner();
}

function showNextImage(images, currentIndex) {
  images[currentIndex].style.display = 'none';
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].style.display = 'block';
  return currentIndex;
}

function showPreviousImage(images, currentIndex) {
  images[currentIndex].style.display = 'none';
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  images[currentIndex].style.display = 'block';
  return currentIndex;
}

function showPreviousDesktopImage() {
  desktopSlideIndex = showPreviousImage(document.querySelectorAll('.desktop-slide img'), desktopSlideIndex);
  updateDotState('desktop', desktopSlideIndex);
}

function showNextDesktopImage() {
  desktopSlideIndex = showNextImage(document.querySelectorAll('.desktop-slide img'), desktopSlideIndex);
  updateDotState('desktop', desktopSlideIndex);
}

function showPreviousMobileImage() {
  mobileSlideIndex = showPreviousImage(document.querySelectorAll('.mobile-slide img'), mobileSlideIndex);
  updateDotState('mobile', mobileSlideIndex);
}

function showNextMobileImage() {
  mobileSlideIndex = showNextImage(document.querySelectorAll('.mobile-slide img'), mobileSlideIndex);
  updateDotState('mobile', mobileSlideIndex);
}

function updateDotState(type, index) {
  const dots = document.querySelectorAll(`.${type} .dot`);
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  startDesktopRotation();
  startMobileRotation();
});