import getMainSlider from "./mainSlider.js";
import nav from "./header.js";
import news from "./news.js";
import footer from "./footer.js";
import footerbt from "./footerbt.js";
import freegames from "./freegames.js";
import initAllSliders from "./createslider.js";
import colslider from "./colslider.js";

getMainSlider();
nav();
news("news1", "n1");
news("news2", "n2");
news("news3", "n3");
news("news4", "n4");
news("news5", "n5");
news("news6", "n6");
footer();
footerbt();
freegames();
initSwipers();
initAllSliders();
colslider("colslider1", "s1");
colslider("colslide2", "s2");
colslider("closlider3", "s3");
// createSlider();
// initSlider('.slider1', 'slider1');
// initSlider(SavingsSpotlight, ".SavingsSpotlight");
async function initSwipers() {
  await getMainSlider();
  
  var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    spaceBetween: 10,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesProgress: true,
  });

  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    fadeEffect: {
      crossFade: true,
    },
  });

  swiper2.on("slideChange", function () {
    // Reset thumb animation
    const activeThumb = document.querySelector(".swiper-slide-thumb-active");
    if (activeThumb) {
      activeThumb.style.animation = "none";
      setTimeout(() => {
        activeThumb.style.animation = "";
      }, 10);
    }

    // Animate logo
    const allLogos = document.querySelectorAll(".mySwiper2 .slide-content .logo img");
    allLogos.forEach(logo => {
      logo.style.animation = "none";
      logo.classList.add("inactive");
    });

    // Get active slide logo
    const activeSlide = swiper2.slides[swiper2.activeIndex];
    const activeLogo = activeSlide.querySelector(".slide-content .logo img");
    
    if (activeLogo) {
      // Trigger reflow to restart animation
      void activeLogo.offsetWidth;
      activeLogo.classList.remove("inactive");
      activeLogo.style.animation = "logoSlideIn 0.8s ease-out forwards";
    }
  });

  // Trigger animation for first slide on load
  setTimeout(() => {
    const firstLogo = document.querySelector(".mySwiper2 .swiper-slide-active .slide-content .logo img");
    if (firstLogo) {
      firstLogo.style.animation = "logoSlideIn 0.8s ease-out forwards";
    }
  }, 100);
}


(function () {
  const btn = document.getElementById("backToTop");
  const scrollThreshold = 300;

  function checkScroll() {
    if (window.pageYOffset > scrollThreshold) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
  window.addEventListener("load", checkScroll);

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // دسترسی‌پذیری: کلیدهای میانبر
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "ArrowUp") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();


