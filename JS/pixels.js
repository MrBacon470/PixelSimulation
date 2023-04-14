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
//Pixel Type IDs for easy remebering
const EMPT = 0;
const SAND = 1;

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

function updatePixel(row,col) {
    if(pixelGrid[row][col] == SAND) {
        let down = row+1 < pixelGrid.length && (pixelGrid[row+1][col] == EMPT)
        let left = row+1 < pixelGrid.length && col-1 > -1 && (pixelGrid[row+1][col] == EMPT)
        let right = row+1 < pixelGrid.length && col+1 < pixelGrid[row+1].length && (pixelGrid[row+1][col+1] == EMPT)
        if(!down && !left && !right) return //If it can't move don't waste time
        if(left && right) {
            const rand = Math.random()
            if(rand >= 0.5)
                right = false
            else
                left = false
        }

        if(down) {
            pixelGrid[row][col] = pixelGrid[row+1][col]
            pixelGrid[row+1][col] = SAND
            drawPixel(row,col)
            drawPixel(row+1,col)
        }
        else if(left) {
            pixelGrid[row][col] = pixelGrid[row+1][col-1]
            pixelGrid[row+1][col-1] = SAND
            drawPixel(row,col)
            drawPixel(row+1,col-1)
        }
        else if(right) {
            pixelGrid[row][col] = pixelGrid[row+1][col+1]
            pixelGrid[row+1][col+1] = SAND
            drawPixel(row,col)
            drawPixel(row+1,col+1)
        }

    }
}