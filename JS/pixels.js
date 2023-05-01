const particleCategories = ['Solids','Powders','Liquids','Gases','Explosives','Special','Misc','Tools']

const particleTypes = [
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
        uiCategory: 'Special'
    },
    {
        name: 'Sand',
        desc: 'I hate sand! Its coarse and rough and gets everywhere!',
        abbr: 'SAND',
        color: '#FFD090',
        flammable: false,
        conductive: false,
        weight: 90,
        heatConductivity: 150,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:3090,type:9}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas: false,
        isPowder: true,
        uiCategory: 'Powders'
    },
    {
        name: 'Water',
        desc: 'H2O what else do you want?',
        abbr: 'WATR',
        color: '#2030D0',
        flammable: false,
        conductive: true,
        weight: 1,
        heatConductivity: 29,
        defaultTemp: 72.0, // In farenheit lol not celsius
        highTemperatureChange: {temp:212,type:5}, //-1 Indicates no change
        lowTemperatureChange: {temp:32,type:10},
        isLiquid: true,
        isGas: false,
        isPowder: false,
        uiCategory: 'Liquids'
    }, 
    {
        name: 'Metal',
        desc: 'Your basic conductive metallic metal',
        abbr: 'METL',
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
        uiCategory: 'Solids'
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
        uiCategory: 'Special'
    },
    {
        name: 'Water Vapor',
        desc: 'Gassy Water',
        abbr: 'WTRV',
        color: '#A0A0FF',
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
        uiCategory: 'Gases'
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
        uiCategory: 'Solids'
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
        uiCategory: 'Gases'
    },
    {
        name: 'Sub Zero Flame',
        desc: 'A fire that freezes?',
        abbr: 'SFLM',
        color: '#8080FF',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 88,
        defaultTemp: -500.0,
        highTemperatureChange: {temp:-1,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Special'
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
        highTemperatureChange: {temp:3090,type:-1}, //-1 Indicates no change
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
        uiCategory: 'Solids'
    },
    {
        name: 'Ice',
        desc: 'Frozen Water :O',
        abbr: 'ICE',
        color: '#A0C0FF',
        flammable: false,
        conductive: false,
        weight: 100,
        heatConductivity: 29,
        defaultTemp: 32.0,
        highTemperatureChange: {temp:32.1,type:2},
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Solids'
    },
    {
        name: 'Thermite',
        desc: 'Heat it up too much and itll combust (3:1 Al + Fe Oxide)',
        abbr: 'THRM',
        color: '#A08090',
        flammable: false,
        conductive: false,
        weight: 90,
        heatConductivity: 211,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas:false,
        isPowder:true,
        uiCategory: 'Explosives'
    },
    {
        name: 'Spark',
        desc: 'Electrifying!',
        abbr: 'SPRK',
        color: '#FFFF80',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 0,
        defaultTemp: 72.0,
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas:false,
        isPowder:false,
        uiCategory: 'Electronics'
    }
]
//Particle Type IDs for easy remebering
const VACU = 0
const WATR = 2
const FIRE = 4
const WTRV = 5
const SMKE = 7
const SFLM = 8
const SPRK = 12

function updateParticle() {
    let row = getRandomInt(particleGrid.length)
    let col = getRandomInt(particleGrid[row].length)
    let currentPixel = getParticle(row,col)
    particleConversions(row,col)
    heatTransfer(row,col)
    updatePhase(row,col)
    updateSPRK(row,col)
    if(currentPixel.type === 'Powder') {
        let down = isInBounds(row+1,col) && (getParticle(row+1,col).id === VACU || (getParticle(row+1,col).type === 'Powder' && particleTypes[getParticle(row+1,col).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col).type === 'Liquid' || getParticle(row+1,col).type === 'Gas')
        let left = isInBounds(row+1,col-1) && (getParticle(row+1,col-1).id === VACU || (getParticle(row+1,col-1).type === 'Powder' && particleTypes[getParticle(row+1,col-1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col-1).type === 'Liquid' || getParticle(row+1,col-1).type === 'Gas')
        let right = isInBounds(row+1,col+1) && (getParticle(row+1,col+1).id === VACU || (getParticle(row+1,col+1).type === 'Powder' && particleTypes[getParticle(row+1,col+1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col+1).type === 'Liquid' || getParticle(row+1,col+1).type === 'Gas')
        if(!down && !left && !right) return //If it can't move don't waste time
        if(left && right) {
            const rand = Math.random()
            if(rand >= 0.5)
                right = false
            else
                left = false
        }
        let temp = getParticle(row,col)
        if(down) {
            setParticleObj(row,col,getParticle(row+1,col))
            setParticleObj(row+1,col,temp)
        }
        else if(left) {
            setParticleObj(row,col,getParticle(row+1,col-1))
            setParticleObj(row+1,col-1,temp)
        }
        else if(right) {
            setParticleObj(row,col,getParticle(row+1,col+1))
            setParticleObj(row+1,col+1,temp)
        }
    }
    else if(currentPixel.type === 'Liquid') {
        let rand = getRandomInt(3);
        if(rand === 0 && isInBounds(row+1,col)) {
            if(getParticle(row+1,col).id == VACU || (getParticle(row+1,col).type === 'Liquid' && particleTypes[getParticle(row+1,col).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row+1,col).type === 'Gas') {
                setParticleObj(row,col,getParticle(row+1,col)) 
                setParticleObj(row+1,col,currentPixel)
            }
        }
        else if(rand === 1 && isInBounds(row,col-1)) {
            if(getParticle(row,col-1).id == VACU || (getParticle(row,col-1).type === 'Liquid' && particleTypes[getParticle(row,col-1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row,col-1).type === 'Gas') {
                setParticleObj(row,col,getParticle(row,col-1)) 
                setParticleObj(row,col-1,currentPixel)
            }
        }
        else if(rand === 2 && isInBounds(row,col+1)) {
            if(getParticle(row,col+1).id == VACU || (getParticle(row,col+1).type === 'Liquid' && particleTypes[getParticle(row,col+1).id].weight < particleTypes[getParticle(row,col).id].weight) || getParticle(row,col+1).type === 'Gas') {
                setParticleObj(row,col,getParticle(row,col+1)) 
                setParticleObj(row,col+1,currentPixel)
            }
        }
    }
    else if(currentPixel.type === 'Gas') {
        let rand = getRandomInt(3);
        if(rand === 0 && row-1 > -1) {
            if(getParticle(row-1,col).id == VACU || (getParticle(row-1,col).type === 'Gas' && particleTypes[getParticle(row-1,col).id].weight > particleTypes[getParticle(row,col).id].weight)) {
                setParticleObj(row,col,getParticle(row-1,col)) 
                setParticleObj(row-1,col,currentPixel)
            }
        }
        else if(rand === 1 && col-1 > -1) {
            if(getParticle(row,col-1).id == VACU || (getParticle(row,col-1).type === 'Gas' && particleTypes[getParticle(row,col-1).id].weight > particleTypes[getParticle(row,col).id].weight)) {
                setParticleObj(row,col,getParticle(row,col-1)) 
                setParticleObj(row,col-1,currentPixel)
            }
        }
        else if(rand === 2 && col+1 < particleGrid[row].length) {
            if(getParticle(row,col+1).id == VACU || (getParticle(row,col+1).type === 'Gas' && particleTypes[getParticle(row,col+1).id].weight > particleTypes[getParticle(row,col).id].weight)) {
                setParticleObj(row,col,getParticle(row,col+1)) 
                setParticleObj(row,col+1,currentPixel)
            }
        }
    }
    else if(currentPixel.id == FIRE) {
        let up = row-1 > -1 && (particleTypes[getParticle(row-1,col).id].flammable || getParticle(row-1,col).id == WATR)
        let down = row+1 < particleGrid.length && (particleTypes[getParticle(row+1,col).id].flammable || getParticle(row+1,col).id == WATR)
        let left = col-1 > -1 && (particleTypes[getParticle(row,col-1).id].flammable || getParticle(row,col-1).id == WATR)
        let right = col+1 < particleGrid[row].length && (particleTypes[getParticle(row,col+1).id].flammable || getParticle(row,col+1).id == WATR)
        
        if(up) {
            if(getParticle(row-1,col).id != WATR)
                setParticle(row-1,col,FIRE)
            else {
                particleGrid[row-1][col] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row-1,col)
                    drawParticle(row,col)
                },200)
                return
            }
        } 
        if(down) {
            if(getParticle(row+1,col).id != WATR) 
                setParticle(row+1,col,FIRE)
            else {
                particleGrid[row+1][col] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row+1,col)
                    drawParticle(row,col)
                },200)
                return
            }
        }
        if(left) {
            if(getParticle(row,col-1).id != WATR)
                setParticle(row,col-1,FIRE)
            else {
                particleGrid[row][col-1] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row,col-1)
                    drawParticle(row,col)
                },200)
                return
            }
        }
        if(right) {
            if(getParticle(row,col+1).id != WATR)
                setParticle(row,col+1,FIRE)
            else {
                particleGrid[row][col+1] = {id:WTRV,temp:particleTypes[WTRV].defaultTemp,type:'Gas'}
                particleGrid[row][col] = {id:SMKE,temp:particleTypes[SMKE].defaultTemp,type:'Gas'}
                setTimeout(() => {
                    drawParticle(row,col+1)
                    drawParticle(row,col)
                },200)
                return
            }
        }
        setTimeout(() => {
            setParticle(row,col,SMKE)
        },200)
      
    }
    else if(currentPixel.id == SFLM) {
        setTimeout(()=>{
            setParticle(row,col,0)
        },200)
            
    }
    
}

function particleConversions(r,c) {
    let particle = getParticle(r,c)
    let particleType = particleTypes[particle.id]
    switch(particleType.abbr) {
        case 'THRM':
            if(particle.temp >= 100) {
                setParticleObj(r,c,{id:3,temp:4000.0,type:'Liquid'})
            }
            break
    }
}