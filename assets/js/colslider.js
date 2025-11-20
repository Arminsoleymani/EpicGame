let colslider = async (endpoint, id) => {
  let root = document.querySelector(`.colslider.${id}`);
  try {
    const res = await fetch(`https://arminsoleymani.github.io/EG-DB/db.json`);
    const data = await res.json();
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
              <img
                src="${product.imgsrc}"
                alt="${product.alt}"
              />
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
      </div>
      ${item.id<3 ? `<div class="line"></div>` : ''}
        `
      )
      .join("");
  } catch (error) {
    console.log(error.message);
  }
};

export default colslider;