let mainsilder = document.querySelector('.main-container .slider-container .swiper .swiper-wrapper');
let thumbsilder = document.querySelector('.main-container .slider-container .swiper-thumbs .swiper-wrapper');
async function getMainSlider() {
    try {
        let res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
    let data = await res.json();
    // console.log(data);
    data.mainSlider.map(item => {
        mainsilder.innerHTML += `
        <div class="swiper-slide">
            <img src="${item.imgMain}" alt="${item.title}" class="slide-image">
            <div class="slide-content-container">
                <div class="slide-content">
                    <div class="logo">
                        <img src="${item.logo}" alt="${item.title}">
                    </div>
                    <h2>${item.titlemain}</h2>
                    <p>${item.describ}</p>
                    <div class="btn-container">
                        ${item.button1 ? `<a href="#" class="btn1">${item.button1}</a>` : ''}
                        ${item.button2 ? `<a href="#" class="btn2">
                            <div class="plus">
                                <div class="line1"></div>
                                <div class="line2"></div>
                            </div>
                            ${item.button2}</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
        `
    });
    data.mainSlider.map(item => {
        thumbsilder.innerHTML += `
        <div class="swiper-slide">
            <div class="img">
                <img src="${item.imgThumb}" alt="${item.title}">
            </div>
            <p>${item.title}</p>
        </div>
        `
    });
    } catch (error) {
        console.log(error);
    }
}


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
    // Add pagination here instead
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
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



export default initSwipers;
