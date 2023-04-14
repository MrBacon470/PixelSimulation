let pixelGrid = []

function Init() {
    //Pixel Grid Initializing
    let rows = canvasData.height/canvasData.pixelSize
    let cols = canvasData.width/canvasData.pixelSize
    pixelGrid = new Array(rows)
    for(let i = 0; i < cols; i++) {
        pixelGrid[i] = new Array(cols).fill(0)
    }
    console.log(`Pixel Grid Successfully Generated`)
    //Extra Stuff
    updateCanvas()
}

function Update() {
    for(let r = 0; r < pixelGrid.length; r++) {
        for(let c = 0; c < pixelGrid[r].length; c++) {
            updatePixel(r,c)
        }
    }
    
}

window.onload = function() {
    Init()
}

window.setInterval(function() {
    Update()
},50)