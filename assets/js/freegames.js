let root = document.querySelector('.freegames');

let freegames = async () => {
    try {
        const res = await fetch('https://arminsoleymani.github.io/EG-DB/db.json');
        const data = await res.json();
        data.FreeGames.map((item)=>{
            root.innerHTML += `
            <div class="cards">
        <div class="img">
        <img src="${item.imgsrc}" alt="${item.alt}" />
        <div class="imgtitle${item.imgtitle === 'COMMING SOON' ? ' secimgtitle' : ''}">${item.imgtitle}</div>
        </div>
        <div class="title">${item.title}</div>
        <div class="dis">${item.dis}</div>
      </div>
            `
        })
    } catch (error) {
        console.log(error);
    }
}

export default freegames;
