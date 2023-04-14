let pixelGrid = []

const gameData = {
    pixelUpdateRate: 2500
}

function Init() {
    //Pixel Grid Initializing
    let rows = canvasData.height/canvasData.pixelSize
    let cols = canvasData.width/canvasData.pixelSize
    pixelGrid = new Array(rows)
    for(let i = 0; i < cols; i++) {
        pixelGrid[i] = new Array(cols).fill(0)
    }
    console.log(`Pixel Grid Successfully Generated`)
    updateCanvas()
}

function Update() {
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