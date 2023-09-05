// 사용법 slider
let slideIndex = 1;
showSlide(slideIndex);

function moveSlide(moveStep) {
  showSlide((slideIndex += moveStep));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hidden");
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("bg-yellow-500");
    dots[i].classList.add("bg-green-600");
  }

  slides[slideIndex - 1].classList.remove("hidden");
}
