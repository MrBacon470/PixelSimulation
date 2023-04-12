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
let pixelGrid = new Array(rows).fill(new Array(cols).fill(0))
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
    
}