let particleGrid = []
let isMouseDown = false
let isMouseInCanvas = false
let fillEnabled = false
let tempViewEnabled = true
const gameData = {
    pixelUpdateRate: 1250
}
const faviconSquareColors = ['black','blue','brown','green','orange','purple','red']
function Init() {
    //Favicon Selection
    document.getElementById('faviconLink').setAttribute('href',`Imgs/${faviconSquareColors[getRandomInt(faviconSquareColors.length)]}Square.png`)
    //Particle Grid Initializing
    let rows = canvasData.height/canvasData.pixelSize
    let cols = canvasData.width/canvasData.pixelSize
    particleGrid = new Array(rows)
    for(let i = 0; i < rows; i++) {
        particleGrid[i] = new Array(cols).fill(0)
        for(let j = 0; j < cols; j++) {
            particleGrid[i][j] = {
                id: 0,
                temp: particleTypes[0].defaultTemp,
                type: 'Solid'
            }
        }
    }
    console.log(`Particle Grid Successfully Generated`)
    //Generate Button Styles
    generateUI()
    updateCanvas()
}

function Update() {
    if(!tempViewEnabled && document.getElementById('temperatureDisplay').checked) {
        tempViewEnabled = true
        updateCanvas()
    }
    else if(tempViewEnabled && !document.getElementById('temperatureDisplay').checked) {
        tempViewEnabled = false
        updateCanvas()
    }
    if(isMouseDown && isMouseInCanvas) {
        
        fillEnabled = document.getElementById('bucketFillCheck').checked
        if(fillEnabled === false && (getParticle(mouseRow,mouseCol).id === VACU || pixelSelectedIndex === VACU)) {
            setParticle(mouseRow,mouseCol,pixelSelectedIndex)
            drawPixel(mouseRow,mouseCol)
        }
        else if(fillEnabled === true) {
            floodFillPixels(mouseRow,mouseCol)
            updateCanvas()
        }
    }
    for(let i = 0; i < gameData.pixelUpdateRate; i++) {
        updateParticle()
    }
    let currentPixel = getParticle(mouseRow,mouseCol)
    if(currentPixel.type === 'Liquid' && ((!particleTypes[currentPixel.id].isLiquid && !particleTypes[currentPixel.id].isGas) || particleTypes[currentPixel.id].isPowder))
    document.getElementById('particleInformation').innerText = `Position: [${mouseRow},${mouseCol}]\nParticle Type: Molten ${particleTypes[currentPixel.id].name}\nTemp: ${currentPixel.temp.toFixed(2)} ºF`
    else
        document.getElementById('particleInformation').innerText = `Position: [${mouseRow},${mouseCol}]\nParticle Type: ${particleTypes[currentPixel.id].name}\nTemp: ${currentPixel.temp.toFixed(2)} ºF`
}

function generateUI() {
    let style = document.createElement('style');
    let styleString = ''
    let htmlString = ''
    for(let i = 0; i < particleTypes.length; i++) {
        let hoverColor = i===0 ? '#FFFFFF' : '#000000'
        styleString += `
            .${particleTypes[i].abbr}Button {
                background-color: var(--bg-color);
                border: 2px solid ${particleTypes[i].color};
                color: #FFFFFF;
                font-size: 1em;
                transition-duration: 0.5s;
            }
            .${particleTypes[i].abbr}Button:hover {
                background-color: ${particleTypes[i].color};
                border: 2px solid ${particleTypes[i].color};
                color: ${hoverColor};
                font-size: 1em;
                transition-duration: 0.5s;
            }
        `
    }
    for(let i = 0; i < particleCategories.length; i++) {
        htmlString = `<button id="particleCategoryButton${i}" class="whiteButton">${particleCategories[i]}</button>`
        addHTML('elementButtonHolder',htmlString)
        document.getElementById(`particleCategoryButton${i}`).addEventListener('click',()=>showParticleCategory(i))
        htmlString = `<div id="${particleCategories[i]}Holder" class="flexCol"></div>`
        addHTML('elementButtonHolder',htmlString)
    }
    for(let i = 0; i < particleTypes.length; i++) {
        htmlString = `<button id="elementButton${i}" class="${particleTypes[i].abbr}Button">${particleTypes[i].abbr}</button>`
        if(particleCategories.indexOf(particleTypes[i].uiCategory) === -1) {
            addHTML(`MiscHolder`,htmlString)
        }
        else {
            addHTML(`${particleTypes[i].uiCategory}Holder`,htmlString)
        }
        document.getElementById(`elementButton${i}`).addEventListener('click',() => {pixelSelectedIndex = i;document.getElementById('particleNameText').innerText=particleTypes[i].name;document.getElementById('particleDescText').innerText=particleTypes[i].desc})
    }
    style.innerHTML = styleString;
    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementById('particleNameText').innerText=particleTypes[pixelSelectedIndex].name
    document.getElementById('particleDescText').innerText=particleTypes[pixelSelectedIndex].desc 
    showParticleCategory(0)
    console.log('UI Generated')
}

window.onload = function() {
    Init()
}

window.setInterval(function() {
    Update()
},50)