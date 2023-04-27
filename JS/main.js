let pixelGrid = []
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
    //Pixel Grid Initializing
    let rows = canvasData.height/canvasData.pixelSize
    let cols = canvasData.width/canvasData.pixelSize
    pixelGrid = new Array(rows)
    for(let i = 0; i < rows; i++) {
        pixelGrid[i] = new Array(cols).fill(0)
        for(let j = 0; j < cols; j++) {
            pixelGrid[i][j] = {
                id: 0,
                temp: pixelTypes[0].defaultTemp,
                type: 'Solid'
            }
        }
    }
    console.log(`Pixel Grid Successfully Generated`)
    //Generate Button Styles
    let style = document.createElement('style');
    let styleString = ''
    let htmlString = ''
    for(let i = 0; i < pixelTypes.length; i++) {
        styleString += `
            .${pixelTypes[i].abbr}Button {
                background-color: var(--bg-color);
                border: 2px solid ${pixelTypes[i].color};
                color: ${pixelTypes[i].color};
                font-size: 1em;
                transition-duration: 0.5s;
            }
            .${pixelTypes[i].abbr}Button:hover {
                background-color: ${pixelTypes[i].color};
                border: 2px solid ${pixelTypes[i].color};
                color: var(--bg-color);
                font-size: 1em;
                transition-duration: 0.5s;
            }
        `
        htmlString = `<button id="elementButton${i}" class="${pixelTypes[i].abbr}Button">${pixelTypes[i].abbr}</button>`
        addHTML('elementButtonHolder',htmlString)
        document.getElementById(`elementButton${i}`).addEventListener('click',() => {pixelSelectedIndex = i;document.getElementById('particleNameText').innerText=pixelTypes[i].name;document.getElementById('particleDescText').innerText=pixelTypes[i].desc})
    }
    style.innerHTML = styleString;
    document.getElementsByTagName('head')[0].appendChild(style);
    document.getElementById('particleNameText').innerText=pixelTypes[pixelSelectedIndex].name;
    document.getElementById('particleDescText').innerText=pixelTypes[pixelSelectedIndex].desc
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
        if(fillEnabled === false && (getPixel(mouseRow,mouseCol).id === VACU || pixelSelectedIndex === VACU)) {
            setPixel(mouseRow,mouseCol,pixelSelectedIndex)
            drawPixel(mouseRow,mouseCol)
        }
        else if(fillEnabled === true) {
            floodFillPixels(mouseRow,mouseCol)
            updateCanvas()
        }
    }
    for(let i = 0; i < gameData.pixelUpdateRate; i++) {
        updatePixel()
    }
    let currentPixel = getPixel(mouseRow,mouseCol)
    if(currentPixel.type === 'Liquid' && !pixelTypes[currentPixel.id].isLiquid)
    document.getElementById('particleInformation').innerText = `Position: [${mouseRow},${mouseCol}]\nParticle Type: Molten ${pixelTypes[currentPixel.id].name}\nTemp: ${currentPixel.temp.toFixed(2)} ºF`
    else
        document.getElementById('particleInformation').innerText = `Position: [${mouseRow},${mouseCol}]\nParticle Type: ${pixelTypes[currentPixel.id].name}\nTemp: ${currentPixel.temp.toFixed(2)} ºF`
}

window.onload = function() {
    Init()
}

window.setInterval(function() {
    Update()
},50)