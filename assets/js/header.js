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
    // Select the submenu containers
    const submenuContent = document.querySelector('.top-bar .top-left .img .submenu .submenu-content');
    const submenu = document.querySelector('.top-bar .top-left .img .submenu');
    
    if (!submenuContent || !submenu) {
      console.error('Submenu elements not found');
      return;
    }
    
    // Fetch menu data from GitHub Pages
    const res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
    const data = await res.json();
    
    // Access the menu array, then get the first item's submenu
    // console.log('Menu data:', data.menu[0].submenu);
    
    const menuSections = data.menu[0].submenu;
    
    // Clear existing content
    submenuContent.innerHTML = '';
    
    // Generate HTML for each section
    menuSections.forEach(section => {
      const listItems = section.items.map(item => {
        // Use the icon path from the imported iconPaths object based on JSON's href value
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
      
      // If section id is 3 (Create), append directly to .submenu (outside .submenu-content)
      if (section.id == 3) {
        submenu.innerHTML += sectionHTML;
      } else {
        // For id 1 (Play) and id 2 (Discover), append inside .submenu-content
        submenuContent.innerHTML += sectionHTML;
      }
    });
  } catch (error) {
    console.error('Error loading menu:', error);
  }
};

export default nav;