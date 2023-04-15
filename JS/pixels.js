const pixelTypes = [
    {
        name: 'Empty',
        desc: 'Literally Nothing',
        abbr: 'EMPT',
        color: '#000000',
        
    },
    {
        name: 'Sand',
        desc: 'I hate sand! Its coarse and rough and gets everywhere!',
        abbr: 'SAND',
        color: '#C2B280',
    },
    {
        name: 'Water',
        desc: 'H2O what else do you want?',
        abbr: 'WATR',
        color: '#1b95e0'
    }, 
    {
        name: 'Metal',
        desc: 'Some kind of metallic substance idk what',
        abbr: 'METL',
        color: '#8D918D',
    }
]
/* 
    {
        name: 'particleName',
        desc: 'particleDescription',
        abbr: '4 Letter All Caps Abbreviation (Like the powder toy does!)',
        color: 'the particles hex color',
        flammability: -1, //-1 for no flammability, anything above for flammable
        conductive: false, //set to true or false for electrical conductivity
    }
*/
//Pixel Type IDs for easy remebering
const EMPT = 0;
const SAND = 1;
const WATR = 2;

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

function updatePixel() {
    let row = getRandomInt(pixelGrid.length)
    let col = getRandomInt(pixelGrid[row].length)
    if(pixelGrid[row][col] == SAND) {
        let down = row+1 < pixelGrid.length && (pixelGrid[row+1][col] === EMPT || pixelGrid[row+1][col] === WATR)
        let left = row+1 < pixelGrid.length && col-1 > -1 && (pixelGrid[row+1][col-1] === EMPT || pixelGrid[row+1][col-1] === WATR)
        let right = row+1 < pixelGrid.length && col+1 < pixelGrid[row+1].length && (pixelGrid[row+1][col+1] === EMPT || pixelGrid[row+1][col+1] === WATR)
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
    else if(pixelGrid[row][col] == WATR) {
        let rand = getRandomInt(3);
        if(rand === 0 && row+1 < pixelGrid.length) {
            if(pixelGrid[row+1][col] == EMPT) {
                pixelGrid[row][col] = EMPT;
                pixelGrid[row+1][col] = WATR;
                drawPixel(row,col)
                drawPixel(row+1,col)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(pixelGrid[row][col-1] == EMPT) {
                pixelGrid[row][col] = EMPT;
                pixelGrid[row][col-1] = WATR;
                drawPixel(row,col)
                drawPixel(row,col-1)
            }
        }
        else if(rand === 2 && col+1 < pixelGrid[row].length) {
            if(pixelGrid[row][col+1] == EMPT) {
                pixelGrid[row][col] = EMPT;
                pixelGrid[row][col+1] = WATR;
                drawPixel(row,col)
                drawPixel(row,col+1)
            }
        }
    }
}