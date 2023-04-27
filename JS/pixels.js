const pixelTypes = [
    {
        name: 'Vacuum',
        desc: 'Literally Nothing',
        abbr: 'VACU',
        color: '#000000',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 0,
        defaultTemp: 0.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
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
        weight: 5,
        heatConductivity: 150,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:3090,type:9}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
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
        weight: 1,
        heatConductivity: 29,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:212,type:5}, //-1 Indicates no change
        lowTemperatureChange: {temp:32,type:-1},
        isLiquid: true,
        isGas: false,
        isPowder: false,
    }, 
    {
        name: 'Steel',
        desc: 'Iron + Carbon I think',
        abbr: 'STEL',
        color: '#8D918D',
        flammable: false,
        conductive: true,
        weight: 100,
        heatConductivity: 251,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:2500,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
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
        weight: 0,
        heatConductivity: 88,
        defaultTemp: 2000.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
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
        weight: 1,
        heatConductivity: 48,
        defaultTemp: 212.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:211,type:2},
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
        weight: 10,
        heatConductivity: 0.1,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
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
        weight: 20,
        heatConductivity: 88,
        defaultTemp: 2000.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:1000,type:0},
        isLiquid: false,
        isGas: true,
        isPowder: false,
    },
    {
        name: 'Sub Zero Flame',
        desc: 'A fire that freezes?',
        abbr: 'SFLM',
        color: '#2245e2',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 88,
        defaultTemp: -100.0,
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
    },
    {
        name: 'Glass',
        desc: 'Molten Sand or Smthn idk',
        abbr: 'GLAS',
        color: '#AFDFE5',
        flammable: false,
        conductive: false,
        weight: 2,
        heatConductivity: 2,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
    },
]
//Pixel Type IDs for easy remebering
const VACU = 0
const WATR = 2
const FIRE = 4
const WTVR = 5
const SMKE = 7
const SFLM = 8

function updatePixel() {
    let row = getRandomInt(pixelGrid.length)
    let col = getRandomInt(pixelGrid[row].length)
    let currentPixel = getPixel(row,col)
    heatTransfer(row,col)
    updatePhase(row,col)
    if(currentPixel.type === 'Powder') {
        let down = row+1 < pixelGrid.length && (getPixel(row+1,col).id === VACU || (getPixel(row+1,col).type === 'Powder' && pixelTypes[getPixel(row+1,col).id].weight < pixelTypes[getPixel(row,col).id].weight) || getPixel(row+1,col).type === 'Liquid' || getPixel(row+1,col).type === 'Gas')
        let left = row+1 < pixelGrid.length && col-1 > -1 && (getPixel(row+1,col-1).id === VACU || (getPixel(row+1,col-1).type === 'Powder' && pixelTypes[getPixel(row+1,col-1).id].weight < pixelTypes[getPixel(row,col).id].weight) || getPixel(row+1,col-1).type === 'Liquid' || getPixel(row+1,col-1).type === 'Gas')
        let right = row+1 < pixelGrid.length && col+1 < pixelGrid[row+1].length && (getPixel(row+1,col+1).id === VACU || (getPixel(row+1,col+1).type === 'Powder' && pixelTypes[getPixel(row+1,col+1).id].weight < pixelTypes[getPixel(row,col).id].weight) || getPixel(row+1,col+1).type === 'Liquid' || getPixel(row+1,col+1).type === 'Gas')
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
        }
        else if(left) {
            setPixelObj(row,col,getPixel(row+1,col-1))
            setPixelObj(row+1,col-1,temp)
        }
        else if(right) {
            setPixelObj(row,col,getPixel(row+1,col+1))
            setPixelObj(row+1,col+1,temp)
        }
    }
    else if(currentPixel.type === 'Liquid') {
        let rand = getRandomInt(3);
        if(rand === 0 && isInBounds(row+1,col)) {
            if(getPixel(row+1,col).id == VACU || (getPixel(row+1,col).type === 'Liquid' && pixelTypes[getPixel(row+1,col).id].weight < pixelTypes[getPixel(row,col).id].weight) || getPixel(row+1,col).type === 'Gas') {
                setPixelObj(row,col,getPixel(row+1,col)) 
                setPixelObj(row+1,col,currentPixel)
            }
        }
        else if(rand === 1 && isInBounds(row,col-1)) {
            if(getPixel(row,col-1).id == VACU || (getPixel(row,col-1).type === 'Liquid' && pixelTypes[getPixel(row,col-1).id].weight < pixelTypes[getPixel(row,col).id].weight) || getPixel(row,col-1).type === 'Gas') {
                setPixelObj(row,col,getPixel(row,col-1)) 
                setPixelObj(row,col-1,currentPixel)
            }
        }
        else if(rand === 2 && isInBounds(row,col+1)) {
            if(getPixel(row,col+1).id == VACU || (getPixel(row,col+1).type === 'Liquid' && pixelTypes[getPixel(row,col+1).id].weight < pixelTypes[getPixel(row,col).id].weight) || getPixel(row,col+1).type === 'Gas') {
                setPixelObj(row,col,getPixel(row,col+1)) 
                setPixelObj(row,col+1,currentPixel)
            }
        }
    }
    else if(currentPixel.type === 'Gas') {
        let rand = getRandomInt(3);
        if(rand === 0 && row-1 > -1) {
            if(getPixel(row-1,col).id == VACU || (getPixel(row-1,col).type === 'Gas' && pixelTypes[getPixel(row-1,col).id].weight > pixelTypes[getPixel(row,col).id].weight)) {
                setPixelObj(row,col,getPixel(row-1,col)) 
                setPixelObj(row-1,col,currentPixel)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(getPixel(row,col-1).id == VACU || (getPixel(row,col-1).type === 'Gas' && pixelTypes[getPixel(row,col-1).id].weight > pixelTypes[getPixel(row,col).id].weight)) {
                setPixelObj(row,col,getPixel(row,col-1)) 
                setPixelObj(row,col-1,currentPixel)
            }
        }
        else if(rand === 2 && col+1 < pixelGrid[row].length) {
            if(getPixel(row,col+1).id == VACU || (getPixel(row,col+1).type === 'Gas' && pixelTypes[getPixel(row,col+1).id].weight > pixelTypes[getPixel(row,col).id].weight)) {
                setPixelObj(row,col,getPixel(row,col+1)) 
                setPixelObj(row,col+1,currentPixel)
            }
        }
    }
    else if(currentPixel.id == FIRE) {
        let up = row-1 > -1 && (pixelTypes[getPixel(row-1,col).id].flammable || getPixel(row-1,col).id == WATR)
        let down = row+1 < pixelGrid.length && (pixelTypes[getPixel(row+1,col).id].flammable || getPixel(row+1,col).id == WATR)
        let left = col-1 > -1 && (pixelTypes[getPixel(row,col-1).id].flammable || getPixel(row,col-1).id == WATR)
        let right = col+1 < pixelGrid[row].length && (pixelTypes[getPixel(row,col+1).id].flammable || getPixel(row,col+1).id == WATR)
        const index = getRandomInt(4)
        if(up && index === 0) {
            if(getPixel(row-1,col).id != WATR)
                setPixel(row-1,col,FIRE)
            else {
                pixelGrid[row-1][col] = {id:WTVR,temp:pixelTypes[WTVR].defaultTemp}
                pixelGrid[row][col] = {id:SMKE,temp:pixelTypes[SMKE].defaultTemp}
                setTimeout(() => {
                    drawPixel(row-1,col)
                    drawPixel(row,col)
                },200)
                return
            }
        } 
        if(down && index === 1) {
            if(getPixel(row+1,col).id != WATR) 
                setPixel(row+1,col,FIRE)
            else {
                pixelGrid[row+1][col] = {id:WTVR,temp:pixelTypes[WTVR].defaultTemp}
                pixelGrid[row][col] = {id:SMKE,temp:pixelTypes[SMKE].defaultTemp}
                setTimeout(() => {
                    drawPixel(row+1,col)
                    drawPixel(row,col)
                },200)
                return
            }
        }
        if(left && index === 2) {
            if(getPixel(row,col-1).id != WATR)
                setPixel(row,col-1,FIRE)
            else {
                pixelGrid[row][col-1] = {id:WTVR,temp:pixelTypes[WTVR].defaultTemp}
                pixelGrid[row][col] = {id:SMKE,temp:pixelTypes[SMKE].defaultTemp}
                setTimeout(() => {
                    drawPixel(row,col-1)
                    drawPixel(row,col)
                },200)
                return
            }
        }
        if(right && index === 3) {
            if(getPixel(row,col+1).id != WATR)
                setPixel(row,col+1,FIRE)
            else {
                pixelGrid[row][col+1] = {id:WTVR,temp:pixelTypes[WTVR].defaultTemp}
                pixelGrid[row][col] = {id:SMKE,temp:pixelTypes[SMKE].defaultTemp}
                setTimeout(() => {
                    drawPixel(row,col+1)
                    drawPixel(row,col)
                },200)
                return
            }
        }
        setTimeout(() => {
            setPixel(row,col,SMKE)
        },200)
      
    }
    else if(currentPixel.id == SMKE) {
        for(let i = 0; i < 3; i++) {
            let rand = Math.random()*4
            if(rand >= 1) {
                setPixel(row,col,0)
                break
            }
        }

    }
    else if(currentPixel.id == SFLM) {
        setTimeout(()=>{
            setPixel(row,col,0)
        },200)
            
    }
}