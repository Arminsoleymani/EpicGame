let root = document.querySelector('.footer-wrap .cols');

let footer = async () => {
  try {
    const res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
    const data = await res.json();
    
    root.innerHTML = data.Footer.map(item => `
        <nav class="col" aria-labelledby="${item.title}">
            <h3 id="${item.title}">${item.title}</h3>
            <ul>
                ${item.items.map(subItem => `<li><a href="#">${subItem}</a></li>`).join('')}
            </ul>
        </nav>
    `).join('');
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }
}

export default footer;