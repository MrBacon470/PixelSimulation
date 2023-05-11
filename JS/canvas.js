const canvasData = {
    height: 640,
    width: 640,
    pixelSize: 16,
}

let canvas = document.getElementById('simulationCanvas')
canvas.setAttribute('height',`${canvasData.height}px`)
canvas.setAttribute('width',`${canvasData.width}px`)

const heatGradientParticles = ['METL','SAND','GLAS','SLCN','TUNG','IRON','BRMT','STNE','NSCN','PSCN','GOLD','CRMC','BREL']

let canvas2D = canvas.getContext('2d')
let pixelSelectedIndex = -1
function updateCanvas() {
    canvas2D.clearRect(0,0,canvasData.width,canvasData.height)
    for(let r = 0; r < particleGrid.length; r++) {
        for(let c = 0; c < particleGrid[r].length; c++) {
            drawParticle(r,c)
        }
    }
}

let mousePositions = {x:0,y:0}
let mouseCol = 0
let mouseRow = 0
canvas.addEventListener('mousemove',(e) => { //Click Event
    mousePositions = getMousePos(e)
    mouseCol = Math.floor(mousePositions.x/canvasData.pixelSize)
    mouseRow = Math.floor(mousePositions.y/canvasData.pixelSize)
})

canvas.addEventListener('mousedown',() => {isMouseDown = true})
canvas.addEventListener('mouseup',() => {isMouseDown = false})
canvas.addEventListener('mouseenter',()=>{isMouseInCanvas = true})
canvas.addEventListener('mouseleave',() => {isMouseInCanvas = false; isMouseDown = false})


function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

function drawParticle(r,c) {
    canvas2D.fillStyle = getParticleColor(r,c)
    canvas2D.fillRect(c*canvasData.pixelSize,r*canvasData.pixelSize,canvasData.pixelSize,canvasData.pixelSize)
}

function getParticleColor(r,c) {
    const part = getParticle(r,c)
    const partType = getParticleType(r,c)
    if(!tempViewEnabled) {
        if(part.sparked && particleConducts(r,c)) {
            return particleTypes[SPRK].color
        }
        else if(partType.abbr === 'SWCH' && part.tmp2 === true) {
            return '#11d918'
        }
        else if((partType.isPowder || (!partType.isPowder && !partType.isLiquid && !partType.isGas)) && part.type === 'Liquid') {
            return '#f9f37c'
        }
        else if((partType.isPowder || (!partType.isPowder && !partType.isGas && !partType.isLiquid)) && heatGradientParticles.indexOf(partType.abbr) !== -1) {
            let mult = (part.temp - (partType.defaultTemp)) / partType.highTemperatureChange.temp
            const startRGB = mult < 0.5 ? hexToRgb(partType.color) : hexToRgb('#ff9b35')
            const endRGB = mult < 0.5 ? hexToRgb('#ff9b35') : hexToRgb('#f9f37c')
            
            mult = mult < 0.5 ? mult * 2 : mult / 2
            mult = restrictNum(mult,1,0)
            const lerpedColor = lerpRGB(startRGB.r,startRGB.g,startRGB.b,endRGB.r,endRGB.g,endRGB.b,mult)
            const fillColor = `rgb(${lerpedColor.r},${lerpedColor.g},${lerpedColor.b})`
            return fillColor
        }
        else 
            return partType.color
    }
    else {
        return getPixelTempColor(r,c)
    }
}

//Flood Fill Runner
function floodFillPixels(row,col) {
    const current = getParticle(row,col).id

    if(current === pixelSelectedIndex) 
        return
    
    fill(row,col,current)
}
//Recursive Flood Fill Algorithm
function fill(row,col,current) {
    //Base Cases
    if(row < 0 || row >= particleGrid.length)
        return
    if(col < 0 || col >= particleGrid[row].length)
        return
    if(getParticle(row,col).id !== current)
        return
    //Rest of Algorithm
    setParticle(row,col,pixelSelectedIndex)

    fill(row+1,col,current)
    fill(row-1,col,current)
    fill(row,col+1,current)
    fill(row,col-1,current)
}