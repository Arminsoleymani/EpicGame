let swiperInstances = {};

let news = async (endpoint, id) => {
  let newsbox = document.querySelector(`.newsbox.${id}`);

  const renderContent = async (isMobile) => {
    // Clear previous content
    newsbox.innerHTML = "";
    newsbox.className = `newsbox ${id}`; // Reset classes

    try {
      const res = await fetch(`https://arminsoleymani.github.io/EG-DB/db.json`);
      const data = await res.json();

      if (isMobile) {
        // Mobile: Use Swiper
        newsbox.classList.add("swiper");
        let swiperWrapper = document.createElement("div");
        swiperWrapper.classList.add("swiper-wrapper");

        data[endpoint].forEach((item) => {
          let card = document.createElement("div");
          card.classList.add("swiper-slide", "card");
          card.innerHTML = `
                        <div class="img">
                            <img src="${item.imgsrc}" alt="${item.alt}">
                        </div>
                        <div class="text">
                            <h3 class="title">${item.titlebig}</h3>
                            <p class="desc">${item.titlelit}</p>
                            ${
                              item.button
                                ? `<button class="button">${item.button}</button>`
                                : ""
                            }
                        </div>
                    `;
          swiperWrapper.appendChild(card);
        });
        // Add pagination
        let pagination = document.createElement("div");
        pagination.classList.add("swiper-pagination");
        newsbox.appendChild(pagination);

        newsbox.appendChild(swiperWrapper);

        // Add navigation
        let navNext = document.createElement("div");
        navNext.classList.add("swiper-button-next-custom");
        let navPrev = document.createElement("div");
        navPrev.classList.add("swiper-button-prev-custom");
        newsbox.appendChild(navNext);
        newsbox.appendChild(navPrev);

        // Destroy old instance if exists
        if (swiperInstances[id]) {
          swiperInstances[id].destroy(true, true);
        }

        // Initialize new Swiper
        swiperInstances[id] = new Swiper(`.newsbox.${id}`, {
          slidesPerView: 1.5,
          spaceBetween: 20,
          navigation: {
            nextEl: `.newsbox.${id} .swiper-button-next-custom`,
            prevEl: `.newsbox.${id} .swiper-button-prev-custom`,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      } else {
        // Desktop: Use normal grid
        // Destroy swiper if exists
        if (swiperInstances[id]) {
          swiperInstances[id].destroy(true, true);
          delete swiperInstances[id];
        }

        data[endpoint].forEach((item) => {
          let card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
                        <div class="img">
                            <img src="${item.imgsrc}" alt="${item.alt}">
                        </div>
                        <div class="text">
                            <h3 class="title">${item.titlebig}</h3>
                            <p class="desc">${item.titlelit}</p>
                            ${
                              item.button
                                ? `<button class="button">${item.button}</button>`
                                : ""
                            }
                        </div>
                    `;
          newsbox.appendChild(card);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Initial render
  const isMobile = window.innerWidth < 768;
  await renderContent(isMobile);

  // Add resize listener (only once per id)
  if (!newsbox.dataset.resizeListenerAdded) {
    newsbox.dataset.resizeListenerAdded = "true";

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newIsMobile = window.innerWidth < 768;
        const currentIsMobile = !!swiperInstances[id];

        // Only re-render if the state changed
        if (newIsMobile !== currentIsMobile) {
          renderContent(newIsMobile);
        }
      }, 250);
    });
  }
};

export default news;

// let newsbox = document.querySelector('.newsbox');
// let currentSlide = 0;
// let newsData = [];

// let news = async () => {
//     try {
//         const res = await fetch('http://localhost:5000/news');
//         const data = await res.json();
//         newsData = data;

//         // Check if mobile view
//         const isMobile = window.innerWidth <= 768;

//         if (isMobile) {
//             createMobileSlider(data);
//         } else {
//             createDesktopView(data);
//         }

//         // Handle window resize
//         window.addEventListener('resize', () => {
//             const isMobileNow = window.innerWidth <= 768;
//             newsbox.innerHTML = '';
//             if (isMobileNow) {
//                 createMobileSlider(newsData);
//             } else {
//                 createDesktopView(newsData);
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

// // Desktop view - original layout
// function createDesktopView(data) {
//     data.forEach((item) => {
//         let card = document.createElement('div');
//         card.classList.add('card');
//         card.innerHTML = `
//             <div class="img">
//                 <img src="${item.imgsrc}" alt="${item.alt}">
//             </div>
//             <div class="text">
//                 <h3 class="title">${item.titlebig}</h3>
//                 <p class="desc">${item.titlelit}</p>
//                 <button class="button">${item.button}</button>
//             </div>
//         `;
//         newsbox.appendChild(card);
//     });
// }

// // Mobile view - slider with pagination
// function createMobileSlider(data) {
//     // Create slider container
//     let sliderContainer = document.createElement('div');
//     sliderContainer.classList.add('slider-container');

//     // Create slides wrapper
//     let slidesWrapper = document.createElement('div');
//     slidesWrapper.classList.add('slides-wrapper');

//     // Create slides
//     data.forEach((item, index) => {
//         let card = document.createElement('div');
//         card.classList.add('card', 'slide');
//         if (index === 0) card.classList.add('active');
//         card.innerHTML = `
//             <div class="img">
//                 <img src="${item.imgsrc}" alt="${item.alt}">
//             </div>
//             <div class="text">
//                 <h3 class="title">${item.titlebig}</h3>
//                 <p class="desc">${item.titlelit}</p>
//                 <button class="button">${item.button}</button>
//             </div>
//         `;
//         slidesWrapper.appendChild(card);
//     });

//     // Create pagination
//     let pagination = document.createElement('div');
//     pagination.classList.add('pagination');

//     data.forEach((_, index) => {
//         let dot = document.createElement('span');
//         dot.classList.add('dot');
//         if (index === 0) dot.classList.add('active');
//         dot.addEventListener('click', () => goToSlide(index, data.length));
//         pagination.appendChild(dot);
//     });

//     sliderContainer.appendChild(slidesWrapper);
//     sliderContainer.appendChild(pagination);
//     newsbox.appendChild(sliderContainer);

//     // Add touch support
//     addTouchSupport(slidesWrapper, data.length);
// }

// function goToSlide(index, totalSlides) {
//     currentSlide = index;
//     const slides = document.querySelectorAll('.slide');
//     const dots = document.querySelectorAll('.dot');

//     slides.forEach((slide, i) => {
//         slide.classList.toggle('active', i === index);
//     });

//     dots.forEach((dot, i) => {
//         dot.classList.toggle('active', i === index);
//     });

//     const slidesWrapper = document.querySelector('.slides-wrapper');
//     slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
// }

// function addTouchSupport(element, totalSlides) {
//     let startX = 0;
//     let currentX = 0;
//     let isDragging = false;

//     element.addEventListener('touchstart', (e) => {
//         startX = e.touches[0].clientX;
//         isDragging = true;
//     });

//     element.addEventListener('touchmove', (e) => {
//         if (!isDragging) return;
//         currentX = e.touches[0].clientX;
//     });

//     element.addEventListener('touchend', () => {
//         if (!isDragging) return;
//         isDragging = false;

//         const diff = startX - currentX;

//         if (Math.abs(diff) > 50) {
//             if (diff > 0 && currentSlide < totalSlides - 1) {
//                 goToSlide(currentSlide + 1, totalSlides);
//             } else if (diff < 0 && currentSlide > 0) {
//                 goToSlide(currentSlide - 1, totalSlides);
//             }
//         }
//     });
// }

// export default news;
