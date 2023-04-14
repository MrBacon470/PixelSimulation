const pixelTypes = [
    {
        name: 'Empty',
        color: '#000000',
    },
    {
        name: 'Sand',
        color: '#C2B280',
    },
]

let rows = canvasData.height/canvasData.pixelSize
let cols = canvasData.width/canvasData.pixelSize
let pixelGrid = new Array(rows)
for(let i = 0; i < cols; i++) {
    pixelGrid[i] = new Array(cols).fill(0)
}
console.log(`Rows: ${rows} | Columns: ${cols}`)
console.log(pixelGrid)

function setPixel(r,c,id) {
    if(r < 0 || r > pixelGrid.length) {
        console.error('r is outOfBounds in setPixel Function')
        return
    }
    if(c < 0 || c > pixelGrid[r].length) {
        console.error('c is outOfBounds in setPixel Function')
        return
    }
    pixelGrid[r][c] = id
}

function getPixelID(r,c) {
    return pixelGrid[r][c];
}

function drawPixel(r,c) {
    canvas2D.fillStyle = pixelTypes[pixelGrid[r][c]].color
    canvas2D.fillRect(c*canvasData.pixelSize,r*canvasData.pixelSize,canvasData.pixelSize,canvasData.pixelSize)
}
drawPixel(0,0)
drawPixel(5,0)