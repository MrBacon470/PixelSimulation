function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addHTML(target,html) {
    document.getElementById(target).insertAdjacentHTML('beforeend',html)
}

function getPixel(r,c) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in getPixel()`)
        return {id: -1, temp: -1, type: 'None'}
    }
    return {id: pixelGrid[r][c].id, temp: pixelGrid[r][c].temp, type: pixelGrid[r][c].type};
}

function setPixel(r,c,id) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setPixel()`)
        return
    }
    if(id < 0 || id >= pixelTypes.length) {
        console.error('id is outOfBounds in setPixel function')
        return
    }
    const pixelType = pixelTypes[id]
    pixelGrid[r][c].id = id
    pixelGrid[r][c].temp = pixelType.defaultTemp
    if(pixelType.isGas)
        pixelGrid[r][c].type = 'Gas'
    else if(pixelType.isLiquid)
        pixelGrid[r][c].type = 'Liquid'
    else if(pixelType.isPowder)
        pixelGrid[r][c].type = 'Powder'
    else
        pixelGrid[r][c].type = 'Solid'
    drawPixel(r,c)
}

function setPixelId(r,c,id) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setPixel()`)
        return
    }
    if(id < 0 || id >= pixelTypes.length) {
        console.error('id is outOfBounds in setPixel function')
        return
    }
    pixelGrid[r][c].id = id
    const pixelType = pixelTypes[id]
    if(pixelType.isGas)
        pixelGrid[r][c].type = 'Gas'
    else if(pixelType.isLiquid)
        pixelGrid[r][c].type = 'Liquid'
    else if(pixelType.isPowder)
        pixelGrid[r][c].type = 'Powder'
    else
        pixelGrid[r][c].type = 'Solid'
    drawPixel(r,c)
}

function setPixelType(r,c,type) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setPixelType()`)
        return
    }
    pixelGrid[r][c].type = type
    drawPixel(r,c)
}

function setPixelObj(r,c,obj) {
    if(!isInBounds(r,c)) {
        console.error(`r or c is outOfBounds in setPixelObj()`)
        return
    }
    if(obj === null || obj === undefined) {
        console.error(`Particle Object Passed in is ${obj.typeOf()}`)
        return
    }
    pixelGrid[r][c].id = obj.id
    pixelGrid[r][c].temp = obj.temp
    pixelGrid[r][c].type = obj.type
    drawPixel(r,c)
}

function celsiusToFarenheit(temperature) {
    return (temperature * 9/5) + 32
}

function farenheitToCelsius(temperature) {
    return (temperature - 32) * 5/9
}

function isInBounds(r,c) {
    if(r > -1 && r < pixelGrid.length && c > -1 && c < pixelGrid[r].length) 
        return true
    return false
}

function restrictNum(num,max,min) {
    if(num === NaN) return 0
    if(num > max) return max
    if(num < min) return min
    return num
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
    if(getPixel(r,c).id === VACU) return `#000000`
    let colorRange = (MAX_TEMP-MIN_TEMP)/tempColors.length
    let temp = getPixel(r,c).temp
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
            let r = Math.floor(tempColors[i].r + (tempColors[i+1].r - tempColors[i].r) * mult)
            if(r < 0) r = 0
            else if(r > 255) r = 255
            let g = Math.floor(tempColors[i].g + (tempColors[i+1].g - tempColors[i].g) * mult)
            if(g < 0) g = 0
            else if(g > 255) g = 255
            let b = Math.floor(tempColors[i].b + (tempColors[i+1].b - tempColors[i].b) * mult)
            if(b < 0) b = 0
            else if(b > 255) b = 255
            return `rgb(${r},${g},${b})`
        }
    }
    return `rgb(${tempColors[tempColors.length-1].r},${tempColors[tempColors.length-1].g},${tempColors[tempColors.length-1].b})`
}