let colswiperInstances = {};

let colslider = async (endpoint, id) => {
  let root = document.querySelector(`.colslider.${id}`);
  
  const renderContent = async (isMobile) => {
    // Clear previous content
    root.innerHTML = '';
    root.className = `colslider ${id}`; // Reset classes
    
    try {
      const res = await fetch(`https://arminsoleymani.github.io/EG-DB/db.json`);
      const data = await res.json();
      
      if (isMobile) {
        // Mobile: Use Swiper
        root.classList.add('swiper');
        let swiperWrapper = document.createElement('div');
        swiperWrapper.classList.add('swiper-wrapper');
        
        data[endpoint].forEach((item) => {
          let slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          slide.innerHTML = `
            <div class="col">
              <h3 class="title">${item.title}</h3>
              ${item.product
                .map(
                  (product) => `
                  <div class="col-content-box">
                    <div class="content">
                      <div class="img">
                        <img src="${product.imgsrc}" alt="${product.alt}" />
                        <div class="plus"></div>
                      </div>
                      <div class="info">
                        <p>${product.title}</p>
                        <div class="box">
                          ${product.badge ? `<div class="badge ${product.badge === 'First Run' ? 'first-run' : ''}">${product.badge}</div>` : ''}
                          ${product.dis ? `<div class="dis">${product.dis}</div>` : ''}
                        </div>
                        <div class="pricebox">
                          ${product.off ? `<span class="price-discount">${product.off}</span>` : ''}
                          ${product.before ? `<span class="price-before">${product.before}</span>` : ''}
                          ${product.after ? `<span class="price-after">${product.after}</span>` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
          `;
          swiperWrapper.appendChild(slide);

        });
                          let pagination = document.createElement("div");
        pagination.classList.add("swiper-pagination");
        root.appendChild(pagination);
        root.appendChild(swiperWrapper);
        
        // Add navigation
        let navNext = document.createElement('div');
        navNext.classList.add('swiper-button-next-custom');
        let navPrev = document.createElement('div');
        navPrev.classList.add('swiper-button-prev-custom');
        root.appendChild(navNext);
        root.appendChild(navPrev);
        
        // Destroy old instance if exists
        if (colswiperInstances[id]) {
          colswiperInstances[id].destroy(true, true);
        }
        
        // Initialize new Swiper
        colswiperInstances[id] = new Swiper(`.colslider.${id}`, {
          slidesPerView: 1.2,
          spaceBetween: 20,
          navigation: {
            nextEl: `.colslider.${id} .swiper-button-next-custom`,
            prevEl: `.colslider.${id} .swiper-button-prev-custom`,
          },
                    pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      } else {
        // Desktop: Use normal layout
        // Destroy swiper if exists
        if (colswiperInstances[id]) {
          colswiperInstances[id].destroy(true, true);
          delete colswiperInstances[id];
        }
        
        root.innerHTML = data[endpoint]
          .map(
            (item) => `
            <div class="col">
              <h3 class="title">${item.title}</h3>
              ${item.product
                .map(
                  (product) => `
                  <div class="col-content-box">
                    <div class="content">
                      <div class="img">
                        <img src="${product.imgsrc}" alt="${product.alt}" />
                        <div class="plus"></div>
                      </div>
                      <div class="info">
                        <p>${product.title}</p>
                        <div class="box">
                          ${product.badge ? `<div class="badge ${product.badge === 'First Run' ? 'first-run' : ''}">${product.badge}</div>` : ''}
                          ${product.dis ? `<div class="dis">${product.dis}</div>` : ''}
                        </div>
                        <div class="pricebox">
                          ${product.off ? `<span class="price-discount">${product.off}</span>` : ''}
                          ${product.before ? `<span class="price-before">${product.before}</span>` : ''}
                          ${product.after ? `<span class="price-after">${product.after}</span>` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
            ${item.id < 3 ? `<div class="line"></div>` : ''}
          `
          )
          .join("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // Initial render
  const isMobile = window.innerWidth < 768;
  await renderContent(isMobile);
  
  // Add resize listener (only once per id)
  if (!root.dataset.resizeListenerAdded) {
    root.dataset.resizeListenerAdded = 'true';
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newIsMobile = window.innerWidth < 768;
        const currentIsMobile = !!colswiperInstances[id];
        
        // Only re-render if the state changed
        if (newIsMobile !== currentIsMobile) {
          renderContent(newIsMobile);
        }
      }, 250);
    });
  }
};

export default colslider;