const canvasData = {
    height: 640,
    width: 640,
    pixelSize: 16,
}

let canvas = document.getElementById('simulationCanvas')
canvas.setAttribute('height',`${canvasData.height}px`)
canvas.setAttribute('width',`${canvasData.width}px`)

let canvas2D = canvas.getContext('2d')
let pixelSelectedIndex = 1
function updateCanvas() {
    for(let r = 0; r < pixelGrid.length; r++) {
        for(let c = 0; c < pixelGrid[r].length; c++) {
            drawPixel(r,c)
        }
    }
}

let vars = null
let mouseCol = null
let mouseRow = null
canvas.addEventListener('mousemove',(e) => { //Click Event
    vars = getMousePos(e)
    mouseCol = Math.floor(vars.x/canvasData.pixelSize)
    mouseRow = Math.floor(vars.y/canvasData.pixelSize)
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
