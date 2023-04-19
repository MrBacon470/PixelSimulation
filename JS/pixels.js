const pixelTypes = [
    {
        name: 'Empty',
        desc: 'Literally Nothing',
        abbr: 'EMPT',
        color: '#000000',
        flammable: false,
        conductive: false,
        mass: 0.0,
        isLiquid: false,
        isGas: false,
        isPowder: false,
    },
    {
        name: 'Sand',
        desc: 'I hate sand! Its coarse and rough and gets everywhere!',
        abbr: 'SAND',
        color: '#C2B280',
        flammable: false,
        conductive: false,
        mass: 5.0,
        isLiquid: false,
        isGas: false,
        isPowder: true,
    },
    {
        name: 'Water',
        desc: 'H2O what else do you want?',
        abbr: 'WATR',
        color: '#1b95e0',
        flammable: false,
        conductive: true,
        mass: 0.1,
        isLiquid: true,
        isGas: false,
        isPowder: false,
    }, 
    {
        name: 'Metal',
        desc: 'Some kind of metallic substance idk what',
        abbr: 'METL',
        color: '#8D918D',
        flammable: false,
        conductive: true,
        mass: 50.0,
        isLiquid: false,
        isGas: false,
        isPowder: false,
    },
    {
        name: 'Fire',
        desc: 'Burns stuff',
        abbr: 'FIRE',
        color: '#e25822',
        flammable: false,
        conductive: false,
        mass: 0.0,
        isLiquid: false,
        isGas: false,
        isPowder: false,
    },
    {
        name: 'Water Vapor',
        desc: 'Gassy Water',
        abbr: 'WTVR',
        color: '#EBECE9',
        flammable: false,
        conductive: false,
        mass: 0.1,
        isLiquid: false,
        isGas: true,
        isPowder: false,
    }, 
    {
        name: 'Wood',
        desc: 'Organic Wood burns!',
        abbr: 'WOOD',
        color: '#7C4700',
        flammable: true,
        conductive: false,
        mass: 10.0,
        isLiquid: false,
        isGas: false,
        isPowder: false,
    },
    {
        name: 'Smoke',
        desc: 'The gas byproduct of burning',
        abbr: 'SMKE',
        color: '#848884',
        flammable: false,
        conductive: false,
        mass: 5.0,
        isLiquid: false,
        isGas: true,
        isPowder: false,
    },
    /*
    {
        name: 'Spark',
        desc: 'Transfers its self to any other conductive surface',
        abbr: 'SPRK',
        color: '#FFFF33',
        flammable: false,
        conductive: false,
        mass: 0.0,
        isLiquid: false,
        isGas: false,
        isPowder: false,
    }*/
]
/* 
    {
        name: 'particleName',
        desc: 'particleDescription',
        abbr: '4 Letter All Caps Abbreviation (Like the powder toy does!)',
        color: 'the particles hex color',
        flammable: false, //true or false lol
        conductive: false, //set to true or false for electrical conductivity
        mass: 0.0, //Determines whether is floats or sinks if its heavier or lighter (ONLY MATTERS FOR GRAVITY AFFECTED PARTICLES)
        isLiquid: false, //Allows for Liquid type movement
        isGas: false, //Allows for gas type movement
        isPowder: false, //Allows for sand-esque movement
    }
*/
//Pixel Type IDs for easy remebering
const EMPT = 0
const WATR = 2
const FIRE = 4
const WTVR = 5
const SMKE = 7
const SPRK = 8

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

function updatePixel() {
    let row = getRandomInt(pixelGrid.length)
    let col = getRandomInt(pixelGrid[row].length)
    if(pixelTypes[getPixelID(row,col)].isPowder) {
        let down = row+1 < pixelGrid.length && (getPixelID(row+1,col) === EMPT || (pixelTypes[getPixelID(row+1,col)].isPowder && pixelTypes[getPixelID(row+1,col)].mass < pixelTypes[getPixelID(row,col)].mass) || pixelTypes[getPixelID(row+1,col)].isLiquid || pixelTypes[getPixelID(row+1,col)].isGas)
        let left = row+1 < pixelGrid.length && col-1 > -1 && (getPixelID(row+1,col-1) === EMPT || (pixelTypes[getPixelID(row+1,col-1)].isPowder && pixelTypes[getPixelID(row+1,col-1)].mass < pixelTypes[getPixelID(row,col)].mass) || pixelTypes[getPixelID(row+1,col-1)].isLiquid || pixelTypes[getPixelID(row+1,col-1)].isGas)
        let right = row+1 < pixelGrid.length && col+1 < pixelGrid[row+1].length && (getPixelID(row+1,col+1) === EMPT || (pixelTypes[getPixelID(row+1,col+1)].isPowder && pixelTypes[getPixelID(row+1,col+1)].mass < pixelTypes[getPixelID(row,col)].mass) || pixelTypes[getPixelID(row+1,col+1)].isLiquid || pixelTypes[getPixelID(row+1,col+1)].isGas)
        if(!down && !left && !right) return //If it can't move don't waste time
        if(left && right) {
            const rand = Math.random()
            if(rand >= 0.5)
                right = false
            else
                left = false
        }
        let temp = getPixelID(row,col)
        if(down) {
            pixelGrid[row][col] = pixelGrid[row+1][col]
            pixelGrid[row+1][col] = temp
            drawPixel(row,col)
            drawPixel(row+1,col)
        }
        else if(left) {
            pixelGrid[row][col] = pixelGrid[row+1][col-1]
            pixelGrid[row+1][col-1] = temp
            drawPixel(row,col)
            drawPixel(row+1,col-1)
        }
        else if(right) {
            pixelGrid[row][col] = pixelGrid[row+1][col+1]
            pixelGrid[row+1][col+1] = temp
            drawPixel(row,col)
            drawPixel(row+1,col+1)
        }
    }
    else if(pixelTypes[getPixelID(row,col)].isLiquid) {
        let rand = getRandomInt(3);
        let temp = getPixelID(row,col)
        if(rand === 0 && row+1 < pixelGrid.length) {
            if(pixelGrid[row+1][col] == EMPT || (pixelTypes[getPixelID(row+1,col)].isLiquid && pixelTypes[getPixelID(row+1,col)].mass < pixelTypes[getPixelID(row,col)].mass) || pixelTypes[getPixelID(row+1,col)].isGas) {
                pixelGrid[row][col] = pixelGrid[row+1][col]
                pixelGrid[row+1][col] = temp
                drawPixel(row,col)
                drawPixel(row+1,col)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(pixelGrid[row][col-1] == EMPT || (pixelTypes[getPixelID(row,col-1)].isLiquid && pixelTypes[getPixelID(row,col-1)].mass < pixelTypes[getPixelID(row,col)].mass) || pixelTypes[getPixelID(row,col-1)].isGas) {
                pixelGrid[row][col] = pixelGrid[row][col-1]
                pixelGrid[row][col-1] = temp
                drawPixel(row,col)
                drawPixel(row,col-1)
            }
        }
        else if(rand === 2 && col+1 < pixelGrid[row].length) {
            if(pixelGrid[row][col+1] == EMPT || (pixelTypes[getPixelID(row,col+1)].isLiquid && pixelTypes[getPixelID(row,col+1)].mass < pixelTypes[getPixelID(row,col)].mass) || pixelTypes[getPixelID(row,col+1)].isGas) {
                pixelGrid[row][col] = pixelGrid[row][col+1]
                pixelGrid[row][col+1] = temp
                drawPixel(row,col)
                drawPixel(row,col+1)
            }
        }
    }
    else if(pixelTypes[getPixelID(row,col)].isGas) {
        let rand = getRandomInt(3);
        let temp = getPixelID(row,col)
        if(rand === 0 && row-1 > -1) {
            if(pixelGrid[row-1][col] == EMPT || (pixelTypes[getPixelID(row-1,col)].isGas && pixelTypes[getPixelID(row-1,col)].mass > pixelTypes[getPixelID(row,col)].mass)) {
                pixelGrid[row][col] = pixelGrid[row-1][col]
                pixelGrid[row-1][col] = temp
                drawPixel(row,col)
                drawPixel(row-1,col)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(pixelGrid[row][col-1] == EMPT || (pixelTypes[getPixelID(row,col-1)].isGas && pixelTypes[getPixelID(row,col-1)].mass > pixelTypes[getPixelID(row,col)].mass)) {
                pixelGrid[row][col] = pixelGrid[row][col-1]
                pixelGrid[row][col-1] = temp
                drawPixel(row,col)
                drawPixel(row,col-1)
            }
        }
        else if(rand === 2 && col+1 < pixelGrid[row].length) {
            if(pixelGrid[row][col+1] == EMPT || (pixelTypes[getPixelID(row,col+1)].isGas && pixelTypes[getPixelID(row,col+1)].mass > pixelTypes[getPixelID(row,col)].mass)) {
                pixelGrid[row][col] = pixelGrid[row][col+1]
                pixelGrid[row][col+1] = temp
                drawPixel(row,col)
                drawPixel(row,col+1)
            }
        }
    }
    else if(pixelGrid[row][col] == FIRE) {
        let up = row-1 > -1 && (pixelTypes[getPixelID(row-1,col)].flammable || getPixelID(row-1,col) == WATR)
        let down = row+1 < pixelGrid.length && (pixelTypes[getPixelID(row+1,col)].flammable || getPixelID(row+1,col) == WATR)
        let left = col-1 > -1 && (pixelTypes[getPixelID(row,col-1)].flammable || getPixelID(row,col-1) == WATR)
        let right = col+1 < pixelGrid[row].length && (pixelTypes[getPixelID(row,col+1)].flammable || getPixelID(row,col+1) == WATR)
        if(up) {
            if(getPixelID(row-1,col) != WATR) 
                pixelGrid[row-1][col] = FIRE
            else 
                pixelGrid[row-1][col] = WTVR
            drawPixel(row-1,col)
        } 
        if(down) {
            if(getPixelID(row+1,col) != WATR) 
                pixelGrid[row+1][col] = FIRE
            else 
                pixelGrid[row+1][col] = WTVR
            drawPixel(row+1,col)
        }
        if(left) {
            if(getPixelID(row,col-1) != WATR) 
                pixelGrid[row][col-1] = FIRE
            else 
                pixelGrid[row][col-1] = WTVR
            drawPixel(row,col-1)
        }
        if(right) {
            if(getPixelID(row,col+1) != WATR) 
                pixelGrid[row][col+1] = FIRE
            else 
                pixelGrid[row][col+1] = WTVR
            drawPixel(row,col+1)
        }
        setTimeout(() => {
            pixelGrid[row][col] = SMKE
            drawPixel(row,col)
        },200)
      
    }
    else if(pixelGrid[row][col] == SPRK) {
        let up = row-1 > -1 && pixelTypes[getPixelID(row-1,col)].conductive
        let down = row+1 < pixelGrid.length && pixelTypes[getPixelID(row+1,col)].conductive
        let left = col-1 > -1 && pixelTypes[getPixelID(row,col-1)].conductive
        let right = col+1 < pixelGrid[row].length && pixelTypes[getPixelID(row,col+1)].conductive
        let temp = new Array(4).fill(-1)
        pixelGrid[row][col] = EMPT
        drawPixel(row,col)
        if(up) {
            temp[0] = getPixelID(row-1,col)
            pixelGrid[row-1][col] = SPRK
            drawPixel(row-1,col)
        }
        if(down) {
            temp[1] = getPixelID(row+1,col)
            pixelGrid[row+1][col] = SPRK
            drawPixel(row+1,col)
        }
        if(left) {
            temp[2] = getPixelID(row,col-1)
            pixelGrid[row][col-1] = SPRK
            drawPixel(row,col-1)
        }
        if(right) {
            temp[3] = getPixelID(row,col+1)
            pixelGrid[row][col+1] = SPRK
            drawPixel(row,col+1)
        }
        let counter = 0.0
        while(counter <= 5) {
            counter += 0.01
        }
        if(temp[0] != -1) {
            pixelGrid[row-1][col] = temp[0]
            drawPixel(row-1,col)
        }
        if(temp[1] != -1) {
            pixelGrid[row+1][col] = temp[1]
            drawPixel(row+1,col)
        }
        if(temp[2] != -1) {
            pixelGrid[row][col-1] = temp[2]
            drawPixel(row,col-1)
        }
        if(temp[3] != -1) {
            pixelGrid[row][col+1] = temp[3]
            drawPixel(row,col+1)
        }
    }
}