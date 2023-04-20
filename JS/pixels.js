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

function updatePixel() {
    let row = getRandomInt(pixelGrid.length)
    let col = getRandomInt(pixelGrid[row].length)
    if(pixelTypes[getPixel(row,col).id].isPowder) {
        let down = row+1 < pixelGrid.length && (getPixel(row+1,col).id === EMPT || (pixelTypes[getPixel(row+1,col).id].isPowder && pixelTypes[getPixel(row+1,col).id].mass < pixelTypes[getPixel(row,col).id].mass) || pixelTypes[getPixel(row+1,col).id].isLiquid || pixelTypes[getPixel(row+1,col).id].isGas)
        let left = row+1 < pixelGrid.length && col-1 > -1 && (getPixel(row+1,col-1).id === EMPT || (pixelTypes[getPixel(row+1,col-1).id].isPowder && pixelTypes[getPixel(row+1,col-1).id].mass < pixelTypes[getPixel(row,col).id].mass) || pixelTypes[getPixel(row+1,col-1).id].isLiquid || pixelTypes[getPixel(row+1,col-1).id].isGas)
        let right = row+1 < pixelGrid.length && col+1 < pixelGrid[row+1].length && (getPixel(row+1,col+1).id === EMPT || (pixelTypes[getPixel(row+1,col+1).id].isPowder && pixelTypes[getPixel(row+1,col+1).id].mass < pixelTypes[getPixel(row,col).id].mass) || pixelTypes[getPixel(row+1,col+1).id].isLiquid || pixelTypes[getPixel(row+1,col+1).id].isGas)
        if(!down && !left && !right) return //If it can't move don't waste time
        if(left && right) {
            const rand = Math.random()
            if(rand >= 0.5)
                right = false
            else
                left = false
        }
        let temp = getPixel(row,col)
        if(down) {
            setPixelObj(row,col,getPixel(row+1,col))
            setPixelObj(row+1,col,temp)
            drawPixel(row,col)
            drawPixel(row+1,col)
        }
        else if(left) {
            setPixelObj(row,col,getPixel(row+1,col-1))
            setPixelObj(row+1,col-1,temp)
            drawPixel(row,col)
            drawPixel(row+1,col-1)
        }
        else if(right) {
            setPixelObj(row,col,getPixel(row+1,col+1))
            setPixelObj(row+1,col+1,temp)
            drawPixel(row,col)
            drawPixel(row+1,col+1)
        }
    }
    else if(pixelTypes[getPixel(row,col).id].isLiquid) {
        let rand = getRandomInt(3);
        let temp = getPixel(row,col)
        if(rand === 0 && row+1 < pixelGrid.length) {
            if(getPixel(row+1,col).id == EMPT || (pixelTypes[getPixel(row+1,col).id].isLiquid && pixelTypes[getPixel(row+1,col).id].mass < pixelTypes[getPixel(row,col).id].mass) || pixelTypes[getPixel(row+1,col).id].isGas) {
                setPixelObj(row,col,getPixel(row+1,col)) 
                setPixelObj(row+1,col,temp)
                drawPixel(row,col)
                drawPixel(row+1,col)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(getPixel(row,col-1).id == EMPT || (pixelTypes[getPixel(row,col-1).id].isLiquid && pixelTypes[getPixel(row,col-1).id].mass < pixelTypes[getPixel(row,col).id].mass) || pixelTypes[getPixel(row,col-1).id].isGas) {
                setPixelObj(row,col,getPixel(row,col-1)) 
                setPixelObj(row,col-1,temp)
                drawPixel(row,col)
                drawPixel(row,col-1)
            }
        }
        else if(rand === 2 && col+1 < pixelGrid[row].length) {
            if(getPixel(row,col+1).id == EMPT || (pixelTypes[getPixel(row,col+1).id].isLiquid && pixelTypes[getPixel(row,col+1).id].mass < pixelTypes[getPixel(row,col).id].mass) || pixelTypes[getPixel(row,col+1).id].isGas) {
                setPixelObj(row,col,getPixel(row,col+1)) 
                setPixelObj(row,col+1,temp)
                drawPixel(row,col)
                drawPixel(row,col+1)
            }
        }
    }
    else if(pixelTypes[getPixel(row,col).id].isGas) {
        let rand = getRandomInt(3);
        let temp = getPixel(row,col)
        if(rand === 0 && row-1 > -1) {
            if(getPixel(row-1,col).id == EMPT || (pixelTypes[getPixel(row-1,col).id].isGas && pixelTypes[getPixel(row-1,col).id].mass > pixelTypes[getPixel(row,col).id].mass)) {
                setPixelObj(row,col,getPixel(row-1,col)) 
                setPixelObj(row-1,col,temp)
                drawPixel(row,col)
                drawPixel(row-1,col)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(getPixel(row,col-1).id == EMPT || (pixelTypes[getPixel(row,col-1).id].isGas && pixelTypes[getPixel(row,col-1).id].mass > pixelTypes[getPixel(row,col).id].mass)) {
                setPixelObj(row,col,getPixel(row,col-1)) 
                setPixelObj(row,col-1,temp)
                drawPixel(row,col)
                drawPixel(row,col-1)
            }
        }
        else if(rand === 2 && col+1 < pixelGrid[row].length) {
            if(getPixel(row,col+1).id == EMPT || (pixelTypes[getPixel(row,col+1).id].isGas && pixelTypes[getPixel(row,col+1).id].mass > pixelTypes[getPixel(row,col).id].mass)) {
                setPixelObj(row,col,getPixel(row,col+1)) 
                setPixelObj(row,col+1,temp)
                drawPixel(row,col)
                drawPixel(row,col+1)
            }
        }
    }
    else if(getPixel(row,col).id == FIRE) {
        let up = row-1 > -1 && (pixelTypes[getPixel(row-1,col).id].flammable || getPixel(row-1,col).id == WATR)
        let down = row+1 < pixelGrid.length && (pixelTypes[getPixel(row+1,col).id].flammable || getPixel(row+1,col).id == WATR)
        let left = col-1 > -1 && (pixelTypes[getPixel(row,col-1).id].flammable || getPixel(row,col-1).id == WATR)
        let right = col+1 < pixelGrid[row].length && (pixelTypes[getPixel(row,col+1).id].flammable || getPixel(row,col+1).id == WATR)
        if(up) {
            if(getPixel(row-1,col).id != WATR) 
                setPixel(row-1,col,FIRE)
            else 
                setPixel(row-1,col,WTVR)
            drawPixel(row-1,col)
        } 
        if(down) {
            if(getPixel(row+1,col).id != WATR) 
                setPixel(row+1,col,FIRE)
            else 
                setPixel(row+1,col,WTVR)
            drawPixel(row+1,col)
        }
        if(left) {
            if(getPixel(row,col-1).id != WATR) 
                setPixel(row,col-1,FIRE)
            else 
                setPixel(row,col-1,WTVR)
            drawPixel(row,col-1)
        }
        if(right) {
            if(getPixel(row,col+1).id != WATR) 
                setPixel(row,col+1,FIRE)
            else 
                setPixel(row,col+1,WTVR)
            drawPixel(row,col+1)
        }
        setTimeout(() => {
            setPixel(row,col,SMKE)
            drawPixel(row,col)
        },200)
      
    }
    else if(pixelGrid[row][col] == SPRK) {
        let up = row-1 > -1 && pixelTypes[getPixel(row-1,col)].conductive
        let down = row+1 < pixelGrid.length && pixelTypes[getPixel(row+1,col)].conductive
        let left = col-1 > -1 && pixelTypes[getPixel(row,col-1)].conductive
        let right = col+1 < pixelGrid[row].length && pixelTypes[getPixel(row,col+1)].conductive
        let temp = new Array(4).fill(-1)
        pixelGrid[row][col] = EMPT
        drawPixel(row,col)
        if(up) {
            temp[0] = getPixel(row-1,col)
            pixelGrid[row-1][col] = SPRK
            drawPixel(row-1,col)
        }
        if(down) {
            temp[1] = getPixel(row+1,col)
            pixelGrid[row+1][col] = SPRK
            drawPixel(row+1,col)
        }
        if(left) {
            temp[2] = getPixel(row,col-1)
            pixelGrid[row][col-1] = SPRK
            drawPixel(row,col-1)
        }
        if(right) {
            temp[3] = getPixel(row,col+1)
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