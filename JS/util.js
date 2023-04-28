function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addHTML(target,html) {
    document.getElementById(target).insertAdjacentHTML('beforeend',html)
}

function getParticle(r,c) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in getParticle()`)
        return {id: -1, temp: -1, type: 'None'}
    }
    return {id: particleGrid[r][c].id, temp: particleGrid[r][c].temp, type: particleGrid[r][c].type};
}

function setParticle(r,c,id) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setParticle()`)
        return
    }
    if(id < 0 || id >= pixelTypes.length) {
        console.error('id is outOfBounds in setParticle function')
        return
    }
    const pixelType = pixelTypes[id]
    particleGrid[r][c].id = id
    particleGrid[r][c].temp = pixelType.defaultTemp
    if(pixelType.isGas)
        particleGrid[r][c].type = 'Gas'
    else if(pixelType.isLiquid)
        particleGrid[r][c].type = 'Liquid'
    else if(pixelType.isPowder)
        particleGrid[r][c].type = 'Powder'
    else
        particleGrid[r][c].type = 'Solid'
    drawPixel(r,c)
}

function setParticleId(r,c,id) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setParticle()`)
        return
    }
    if(id < 0 || id >= pixelTypes.length) {
        console.error('id is outOfBounds in setParticle function')
        return
    }
    particleGrid[r][c].id = id
    const pixelType = pixelTypes[id]
    if(pixelType.isGas)
        particleGrid[r][c].type = 'Gas'
    else if(pixelType.isLiquid)
        particleGrid[r][c].type = 'Liquid'
    else if(pixelType.isPowder)
        particleGrid[r][c].type = 'Powder'
    else
        particleGrid[r][c].type = 'Solid'
    drawPixel(r,c)
}

function setParticleType(r,c,type) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setParticleType()`)
        return
    }
    particleGrid[r][c].type = type
    drawPixel(r,c)
}

function setParticleObj(r,c,obj) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setParticleObj()`)
        return
    }
    if(obj === null || obj === undefined) {
        console.error(`Particle Object Passed in is ${obj.typeOf()}`)
        return
    }
    particleGrid[r][c].id = obj.id
    particleGrid[r][c].temp = obj.temp
    particleGrid[r][c].type = obj.type
    drawPixel(r,c)
}

function celsiusToFarenheit(temperature) {
    return (temperature * 9/5) + 32
}

function farenheitToCelsius(temperature) {
    return (temperature - 32) * 5/9
}

function isInBounds(r,c) {
    if(r > -1 && r < particleGrid.length && c > -1 && c < particleGrid[r].length) 
        return true
    return false
}

function restrictNum(num,max,min) {
    if(num === NaN) return 0
    if(num > max) return max
    if(num < min) return min
    return num
}

function lerpRGB(r1,g1,b1,r2,g2,b2,scale) {
    const r = r1 + ((r2 - r1) * scale)
    const g = g1 + ((g2 - g1) * scale)
    const b = b1 + ((b2 - b1) * scale)
    return {
        r: restrictNum(r,255,0),
        g: restrictNum(g,255,0),
        b: restrictNum(b,255,0)
    }
}

const tempColors = [
    {r:111,g:0,b:255},
    {r:0,g:21,b:255},
    {r:0,g:81,b:255},
    {r:0,g:162,b:255},
    {r:0,g:217,b:255},
    {r:0,g:255,b:98},
    {r:0,g:255,b:47},
    {r:229,g:255,b:0},
    {r:238,g:255,b:0},
    {r:255,g:204,b:0},
    {r:255,g:191,b:0},
    {r:255,g:81,b:0},
    {r:255,g:0,b:0},
    {r:255,g:0,b:251}
]
//-100()F -> +1000()F
//Range is 157.142857143 per color
function getPixelTempColor(r,c) {
    if(getParticle(r,c).id === VACU) return `#000000`
    let colorRange = (MAX_TEMP-MIN_TEMP)/tempColors.length
    let temp = getParticle(r,c).temp
    let mult = 0.0
    if(temp === Infinity || temp === NaN || temp === -Infinity) {
        console.error('Temperature Passed in is Infinity or NaN')
        return 'rgb(255,255,255)'
    }
    if(temp <= MIN_TEMP) return `rgb(${tempColors[0].r},${tempColors[0].g},${tempColors[0].b})`
    if(temp >= MAX_TEMP) return `rgb(${tempColors[tempColors.length-1].r},${tempColors[tempColors.length-1].g},${tempColors[tempColors.length-1].b})`
    //-100 -> 57
    for(let i = 0; i < tempColors.length-1; i++) {
        
        if(temp >= (MIN_TEMP + (colorRange * i)) && temp <= (MIN_TEMP + (colorRange * (i+1)))) {
            mult = (temp - (MIN_TEMP + colorRange * i)) / ((MIN_TEMP + colorRange * i+1) - (MIN_TEMP + colorRange * i))
            const lerpedColor = lerpRGB(tempColors[i].r,tempColors[i].g,tempColors[i].b,tempColors[i+1].r,tempColors[i+1].g,tempColors[i+1].b,mult)
            return `rgb(${lerpedColor.r},${lerpedColor.g},${lerpedColor.b})`
        }
    }
    return `rgb(${tempColors[tempColors.length-1].r},${tempColors[tempColors.length-1].g},${tempColors[tempColors.length-1].b})`
}