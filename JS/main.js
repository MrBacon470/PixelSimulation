let particleGrid = []
let isMouseDown = false
let isMouseInCanvas = false
let fillEnabled = false
let tempViewEnabled = true
let debugMode = false
const gameData = {
    pixelUpdateRate: 2500
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
                type: 'Solid',
                sparked: false,
                tmp: null,
            }
        }
    }
    console.log(`Particle Grid Successfully Generated`)
    //Generate Button Styles
    generateUI()
    updateSelectedIndex(0)
    const el = document.getElementsByClassName('SPRKButton')
    //el[0].style.display = 'none'
    updateCanvas()
}

function Update() {
    debugMode = document.getElementById('debugMode').checked
    fillEnabled = document.getElementById('bucketFillCheck').checked
    if(!tempViewEnabled && document.getElementById('temperatureDisplay').checked) {
        tempViewEnabled = true
        updateCanvas()
    }
    else if(tempViewEnabled && !document.getElementById('temperatureDisplay').checked) {
        tempViewEnabled = false
        updateCanvas()
    }
    if(isMouseDown && isMouseInCanvas) {
        if(pixelSelectedIndex === SPRK && getParticleType(mouseRow,mouseCol).conductive) {
            particleGrid[mouseRow][mouseCol].sparked = true
            particleGrid[mouseRow][mouseCol].tmp = 'Center'
            updateSPRK(mouseRow,mouseCol)
            drawParticle(mouseRow,mouseCol)
        }
        else if(fillEnabled === false && (getParticle(mouseRow,mouseCol).id === VACU || pixelSelectedIndex === VACU) && pixelSelectedIndex !== SPRK) {
            setParticle(mouseRow,mouseCol,pixelSelectedIndex)
            drawParticle(mouseRow,mouseCol)
        }
        else if(fillEnabled === true && pixelSelectedIndex !== SPRK) {
            floodFillPixels(mouseRow,mouseCol)
            updateCanvas()
        }
    }
    for(let i = 0; i < gameData.pixelUpdateRate; i++) {
        updateParticle()
    }
    const currentParticle = getParticle(mouseRow,mouseCol)
    const particleInfoString = debugMode ? `Grid Pos: [${mouseRow},${mouseCol}]\nMouse Pos: [${mousePositions.x.toFixed(2)},${mousePositions.y.toFixed(2)}]\nParticle: ${getParticleType(mouseRow,mouseCol).abbr}\nTemp: ${currentParticle.temp.toFixed(2)} ºF\nType: ${currentParticle.type}\nTmp: ${currentParticle.tmp}\nSparked: ${currentParticle.sparked}` :
    `[${mouseRow},${mouseCol}]\nParticle: ${getParticleType(mouseRow,mouseCol).abbr}\nTemp: ${currentParticle.temp.toFixed(2)} ºF`
    if(currentParticle.type === 'Liquid' && ((!particleTypes[currentParticle.id].isLiquid && !particleTypes[currentParticle.id].isGas) || particleTypes[currentParticle.id].isPowder))
    document.getElementById('particleInformation').innerText = `Position: [${mouseRow},${mouseCol}]\nParticle Type: Molten ${getParticleType(mouseRow,mouseCol).abbr}\nTemp: ${currentParticle.temp.toFixed(2)} ºF`
    else
        document.getElementById('particleInformation').innerText = particleInfoString
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
            .${particleTypes[i].abbr}ButtonActive {
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
        htmlString = `<button class="whiteButton" onclick="showParticleCategory(-1)">Go Back</button>`
        addHTML(`${particleCategories[i]}Holder`,htmlString)
    }
    for(let i = 0; i < particleTypes.length; i++) {
        htmlString = `<button id="elementButton${i}" class="${particleTypes[i].abbr}Button">${particleTypes[i].abbr}</button>`
        if(particleCategories.indexOf(particleTypes[i].uiCategory) === -1) {
            addHTML(`MiscHolder`,htmlString)
        }
        else {
            addHTML(`${particleTypes[i].uiCategory}Holder`,htmlString)
        }
        document.getElementById(`elementButton${i}`).addEventListener('click',() => updateSelectedIndex(i))
    }
    style.innerHTML = styleString;
    document.getElementsByTagName('head')[0].appendChild(style);
    showParticleCategory(0)
    document.getElementById('clearSimButton').addEventListener('click',()=>clearSimulation())
    document.getElementById('exportSimButton').addEventListener('click',()=>exportData())
    document.getElementById('importSimButton').addEventListener('click',()=>importData())
    console.log('UI Generated')
}

window.onload = function() {
    Init()
}

window.setInterval(function() {
    Update()
},50)