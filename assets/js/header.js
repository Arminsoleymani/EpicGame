// Image paths object
const iconPaths = {
  LogoArtStationIcon: './assets/images/LogoArtStationIcon.svg',
  LogoEpicGamesShield: './assets/images/LogoEpicGamesShield.svg',
  LogoEpicGamesStore: './assets/images/LogoEpicGamesStore.svg',
  LogoFabIcon: './assets/images/LogoFabIcon.svg',
  LogoFallGuysIcon: './assets/images/LogoFallGuysIcon.svg',
  LogoFortniteIcon: './assets/images/LogoFortniteIcon.svg',
  LogoKidsWebServicesIcon: './assets/images/LogoKidsWebServicesIcon.svg',
  LogoMetaHumanIcon: './assets/images/LogoMetahumanIcon.svg',
  LogoRealityScanIcon: './assets/images/LogoRealityScanIcon.svg',
  LogoRocketLeagueIcon: './assets/images/LogoRocketLeagueIcon.svg',
  LogoTwinmotionIcon: './assets/images/LogoTwinmotionIcon.svg',
  LogoUnrealEngineIcon: './assets/images/LogoUnrealEngineIcon.svg',
  LogoSketchfabIcon: './assets/images/LogoSketchfabIcon.svg'
};

const nav = async () => {
  try {
    // Fetch menu data from GitHub Pages
    const res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
    const data = await res.json();
    const menuSections = data.menu[0].submenu;
    
    const isMobile = window.innerWidth < 768;
    
    // Get the SVG icon element
    const menuIcon = document.querySelector('.top-bar .top-left .img svg');
    
    if (isMobile) {
      // Mobile: Create offcanvas and add click event
      createOffcanvas(menuSections);
      
      if (menuIcon) {
        menuIcon.style.cursor = 'pointer';
        menuIcon.onclick = toggleOffcanvas;
      }
    } else {
      // Desktop: Use normal submenu
      createDesktopMenu(menuSections);
      
      if (menuIcon) {
        menuIcon.style.cursor = 'default';
        menuIcon.onclick = null;
      }
    }
    
    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(async () => {
        const newIsMobile = window.innerWidth < 768;
        const hasOffcanvas = document.getElementById('navOffcanvas');
        
        if (newIsMobile && !hasOffcanvas) {
          // Switch to offcanvas
          const res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
          const data = await res.json();
          createOffcanvas(data.menu[0].submenu);
          
          const menuIcon = document.querySelector('.top-bar .top-left .img svg');
          if (menuIcon) {
            menuIcon.style.cursor = 'pointer';
            menuIcon.onclick = toggleOffcanvas;
          }
        } else if (!newIsMobile && hasOffcanvas) {
          // Switch to desktop menu
          removeOffcanvas();
          const res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
          const data = await res.json();
          createDesktopMenu(data.menu[0].submenu);
          
          const menuIcon = document.querySelector('.top-bar .top-left .img svg');
          if (menuIcon) {
            menuIcon.style.cursor = 'default';
            menuIcon.onclick = null;
          }
        }
      }, 250);
    });
  } catch (error) {
    console.error('Error loading menu:', error);
  }
};

function createDesktopMenu(menuSections) {
  const submenuContent = document.querySelector('.top-bar .top-left .img .submenu .submenu-content');
  const submenu = document.querySelector('.top-bar .top-left .img .submenu');
  
  if (!submenuContent || !submenu) {
    console.error('Submenu elements not found');
    return;
  }
  
  // Clear existing content
  submenuContent.innerHTML = '';
  submenu.querySelectorAll('ul').forEach(ul => ul.remove());
  
  // Generate HTML for each section
  menuSections.forEach(section => {
    const listItems = section.items.map(item => {
      const iconPath = iconPaths[item.href] || iconPaths.LogoEpicGamesShield;
      
      return `
        <li>
          <a href="#">
            <img
              src="${iconPath}"
              alt="${item.title}"
              class="logo"
            />
            <span>${item.title}</span>
          </a>
        </li>
      `;
    }).join('');
    
    const sectionHTML = `
      <ul>
        <p>${section.title}</p>
        ${listItems}
      </ul>
    `;
    
    if (section.id == 3) {
      submenu.innerHTML += sectionHTML;
    } else {
      submenuContent.innerHTML += sectionHTML;
    }
  });
}

function createOffcanvas(menuSections) {
  // Remove existing offcanvas if any
  removeOffcanvas();
  
  // Create offcanvas structure
  const offcanvas = document.createElement('div');
  offcanvas.className = 'offcanvas offcanvas-top';
  offcanvas.id = 'navOffcanvas';
  offcanvas.setAttribute('tabindex', '-1');
  
  // Generate sections HTML
  const sectionsHTML = menuSections.map(section => {
    const listItems = section.items.map(item => {
      const iconPath = iconPaths[item.href] || iconPaths.LogoEpicGamesShield;
      
      return `
        <li>
          <a href="#">
            <img src="${iconPath}" alt="${item.title}" class="logo" />
            <span>${item.title}</span>
          </a>
        </li>
      `;
    }).join('');
    
    return `
      <div class="offcanvas-section">
        <h3>${section.title}</h3>
        <ul>${listItems}</ul>
      </div>
    `;
  }).join('');
  
  offcanvas.innerHTML = `
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Menu</h5>
      <button type="button" class="btn-close" onclick="closeOffcanvas()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <div class="offcanvas-body">
      ${sectionsHTML}
    </div>
  `;
  
  document.body.appendChild(offcanvas);
}

function removeOffcanvas() {
  const offcanvas = document.getElementById('navOffcanvas');
  if (offcanvas) {
    offcanvas.remove();
  }
  const backdrop = document.querySelector('.offcanvas-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
}

// Global functions for offcanvas control
window.toggleOffcanvas = function() {
  const offcanvas = document.getElementById('navOffcanvas');
  const backdrop = document.querySelector('.offcanvas-backdrop');
  
  if (offcanvas.classList.contains('show')) {
    closeOffcanvas();
  } else {
    // Create backdrop
    if (!backdrop) {
      const newBackdrop = document.createElement('div');
      newBackdrop.className = 'offcanvas-backdrop fade';
      newBackdrop.onclick = closeOffcanvas;
      document.body.appendChild(newBackdrop);
      
      setTimeout(() => {
        newBackdrop.classList.add('show');
      }, 10);
    }
    
    offcanvas.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

window.closeOffcanvas = function() {
  const offcanvas = document.getElementById('navOffcanvas');
  const backdrop = document.querySelector('.offcanvas-backdrop');
  
  if (!offcanvas) return;
  
  offcanvas.classList.remove('show');
  document.body.style.overflow = '';
  
  if (backdrop) {
    backdrop.classList.remove('show');
    setTimeout(() => {
      backdrop.remove();
    }, 300);
  }
}

export default nav;