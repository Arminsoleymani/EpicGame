async function createSlider(swiperClass, endpoint) {
  const root = document.querySelector(`${swiperClass} .swiper-wrapper`);
  if (!root) return;
  
  try {
    const res = await fetch(`https://arminsoleymani.github.io/EG-DB/db.json`);
    const data = await res.json();
    root.innerHTML = data[endpoint].map(item => `
          <div class="swiper-slide">
            <div class="game-card">
              <div class="game-image-container">
                <img
                  src="${item.img}"
                  alt="${item.title}"
                  class="game-image"
                />
                <div class="add-icon"></div>
              </div>
              <div class="game-info">
                <div class="game-type">Base Game</div>
                <div class="game-title">${item.title}</div>
                  ${item.badge ? `<div class="badge ${item.badge === 'First Run' ? 'first-run' : ''}">${item.badge}</div>` : ''}
                <div class="pricebox">
                  ${item.off ? `<span class="price-discount">${item.off}</span>` : ''}
                  ${item.before ? `<span class="price-before">${item.before}</span>` : ''}
                  ${item.after ? `<span class="price-after">${item.after}</span>` : ''}
                </div>
              </div>
            </div>
          </div>
        `).join('');
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
  }
}

async function initSlider(swiperClass, endpoint) {
  // Check if slider exists FIRST, before doing anything
  const swiperEl = document.querySelector(swiperClass);
  
  if (!swiperEl) {
    return; // Exit early if slider doesn't exist on this page
  }

  // Now create the slider content
  await createSlider(swiperClass, endpoint);
  
  // Find parent container
  const container = swiperEl.closest('.container');
  
  if (!container) {
    console.error(`Container not found for ${swiperClass}`);
    return;
  }

  new Swiper(swiperClass, {
    slidesPerView: 1.5,
    slidesPerGroup: 1,
    spaceBetween: 20,
    watchOverflow: true,
    navigation: {
      nextEl: container.querySelector('.swiper-button-next-custom'),
      prevEl: container.querySelector('.swiper-button-prev-custom'),
      disabledClass: "swiper-button-disabled",
    },
    breakpoints: {
      640: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
      768: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
      1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
      1280: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
    },
  });
}

async function initAllSliders() {

  for (let i = 1; i <= 7; i++) {
    await initSlider(`.slider${i}`, `slider${i}`);
  }
}

export default initAllSliders;
