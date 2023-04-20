const canvasData = {
    height: 640,
    width: 640,
    pixelSize: 16,
}

let canvas = document.getElementById('simulationCanvas')
canvas.setAttribute('height',`${canvasData.height}px`)
canvas.setAttribute('width',`${canvasData.width}px`)

let canvas2D = canvas.getContext('2d')
let pixelSelectedIndex = 0
function updateCanvas() {
    for(let r = 0; r < pixelGrid.length; r++) {
        for(let c = 0; c < pixelGrid[r].length; c++) {
            drawPixel(r,c)
        }
    }
}

let mousePositions = null
let mouseCol = null
let mouseRow = null
canvas.addEventListener('mousemove',(e) => { //Click Event
    mousePositions = getMousePos(e)
    mouseCol = Math.floor(mousePositions.x/canvasData.pixelSize)
    mouseRow = Math.floor(mousePositions.y/canvasData.pixelSize)
})

canvas.addEventListener('mousedown',() => {isMouseDown = true})
canvas.addEventListener('mouseup',() => {isMouseDown = false})
canvas.addEventListener('mouseleave',() => {isMouseDown = false})


function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    return {
      x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

function drawPixel(r,c) {
    canvas2D.fillStyle = pixelTypes[getPixel(r,c).id].color
    canvas2D.fillRect(c*canvasData.pixelSize,r*canvasData.pixelSize,canvasData.pixelSize,canvasData.pixelSize)
}
//Flood Fill Runner
function floodFillPixels(row,col) {
    const current = getPixel(row,col)

    if(current.id === pixelSelectedIndex) 
        return
    
    fill(row,col,current)
}
//Recursive Flood Fill Algorithm
function fill(row,col,current) {
    //Base Cases
    if(row < 0 || row >= pixelGrid.length)
        return
    if(col < 0 || col >= pixelGrid[row].length)
        return
    if(getPixel(row,col).id !== current.id)
        return
    //Rest of Algorithm
    setPixel(row,col,pixelSelectedIndex)

    fill(row+1,col,current)
    fill(row-1,col,current)
    fill(row,col+1,current)
    fill(row,col-1,current)
}