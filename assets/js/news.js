let news = async (endpoint, id) => {
    let newsbox = document.querySelector(`.newsbox.${id}`);
    try {
        const res = await fetch(`https://arminsoleymani.github.io/EG-DB/db.json`);
        const data = await res.json();
        data[endpoint].map((item) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
        <div class="img">
          <img src="${item.imgsrc}" alt="${item.alt}">
        </div>
        <div class="text">
          <h3 class="title">${item.titlebig}</h3>
          <p class="desc">${item.titlelit}</p>
          ${item.button ? `<button class="button">${item.button}</button>` : ''}
        </div>
            `;
            newsbox.appendChild(card);
        })
    } catch (error) {
        console.log(error);
    }
}

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