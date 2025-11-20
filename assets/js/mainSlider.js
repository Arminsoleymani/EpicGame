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



export default getMainSlider;
