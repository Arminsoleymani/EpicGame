let root = document.querySelector('.footer-wrap .cols');

let footer = async () => {
  const renderContent = (isMobile) => {
    try {
      fetch('https://arminsoleymani.github.io/EG-DB/db.json')
        .then(res => res.json())
        .then(data => {
          if (isMobile) {
            // Mobile: Accordion
            root.className = 'cols accordion';
            root.innerHTML = data.Footer.map((item, index) => `
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button 
                    class="accordion-button ${index !== 0 ? 'collapsed' : ''}" 
                    type="button" 
                    onclick="toggleAccordion('collapse${index}')"
                    aria-expanded="${index === 0 ? 'true' : 'false'}" 
                    aria-controls="collapse${index}"
                  >
                    ${item.title}
                  </button>
                </h2>
                <div 
                  id="collapse${index}" 
                  class="accordion-collapse collapse ${index === 0 ? 'show' : ''}"
                >
                  <div class="accordion-body">
                    <ul>
                      ${item.items.map(subItem => `<li><a href="#">${subItem}</a></li>`).join('')}
                    </ul>
                  </div>
                </div>
              </div>
            `).join('');
          } else {
            // Desktop: Normal columns
            root.className = 'cols';
            root.innerHTML = data.Footer.map(item => `
              <nav class="col" aria-labelledby="${item.title}">
                <h3 id="${item.title}">${item.title}</h3>
                <ul>
                  ${item.items.map(subItem => `<li><a href="#">${subItem}</a></li>`).join('')}
                </ul>
              </nav>
            `).join('');
          }
        });
    } catch (error) {
      console.error('Error fetching footer data:', error);
    }
  };

  // Initial render
  const isMobile = window.innerWidth < 768;
  renderContent(isMobile);

  // Add resize listener
  if (!root.dataset.resizeListenerAdded) {
    root.dataset.resizeListenerAdded = 'true';
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newIsMobile = window.innerWidth < 768;
        const currentIsMobile = root.classList.contains('accordion');
        
        if (newIsMobile !== currentIsMobile) {
          renderContent(newIsMobile);
        }
      }, 250);
    });
  }
}

// Accordion toggle function (vanilla JS, no Bootstrap needed)
window.toggleAccordion = function(targetId) {
  const target = document.getElementById(targetId);
  const button = document.querySelector(`[aria-controls="${targetId}"]`);
  const allCollapses = document.querySelectorAll('.accordion-collapse');
  const allButtons = document.querySelectorAll('.accordion-button');
  
  // Close all other accordions
  allCollapses.forEach(collapse => {
    if (collapse.id !== targetId) {
      collapse.classList.remove('show');
    }
  });
  
  allButtons.forEach(btn => {
    if (btn !== button) {
      btn.classList.add('collapsed');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Toggle current accordion
  if (target.classList.contains('show')) {
    target.classList.remove('show');
    button.classList.add('collapsed');
    button.setAttribute('aria-expanded', 'false');
  } else {
    target.classList.add('show');
    button.classList.remove('collapsed');
    button.setAttribute('aria-expanded', 'true');
  }
}

export default footer;