let pixelGrid = []
let isMouseDown = false
let fillEnabled = false
const gameData = {
    pixelUpdateRate: 2500
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
                temp: 0.00,
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
    fillEnabled = document.getElementById('bucketFillCheck').checked
    
    if(isMouseDown) {
        if(!fillEnabled && (getPixel(mouseRow,mouseCol).id === VACU || pixelSelectedIndex === VACU)) {
            setPixel(mouseRow,mouseCol,pixelSelectedIndex)
            drawPixel(mouseRow,mouseCol)
        }
        else {
            floodFillPixels(mouseRow,mouseCol)
            updateCanvas()
        }
    }
    for(let i = 0; i < gameData.pixelUpdateRate; i++) {
        updatePixel()
    }
}

window.onload = function() {
    Init()
}

window.setInterval(function() {
    Update()
},50)