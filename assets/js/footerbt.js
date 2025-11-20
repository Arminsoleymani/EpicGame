let Footerend = document.querySelector('.footer-wrap .footer-bottom');

let footerbt = async () => {
  try {
    const res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
    const data = await res.json();
    
    Footerend.innerHTML = `
        <p class="copyright">${data.footerend.desc}</p>
        <div class="footer-links" aria-hidden="false">
            ${data.footerend.items.map(item => `<a href="#">${item}</a>`).join('')}
        </div>
    `;
  } catch (error) {
    console.error('Error fetching footer data:', error);
  }
}

export default footerbt;