function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addHTML(target,html) {
    document.getElementById(target).insertAdjacentHTML('beforeend',html)
}

function getPixel(r,c) {
    return {id: pixelGrid[r][c].id, temp: pixelGrid[r][c].temp};
}

function setPixel(r,c,id) {
    if(r < 0 || r >= pixelGrid.length) {
        console.error('r is outOfBounds in setPixel Function')
        return
    }
    if(c < 0 || c >= pixelGrid[r].length) {
        console.error('c is outOfBounds in setPixel Function')
        return
    }
    if(id < 0 || id >= pixelTypes.length) {
        console.error('id is outOfBounds in setPixel function')
        return
    }
    pixelGrid[r][c].id = id
    pixelGrid[r][c].temp = pixelTypes[id].defaultTemp
}

function setPixelObj(r,c,obj) {
    if(r < 0 || r >= pixelGrid.length) {
        console.error('r is outOfBounds in setPixel Function')
        return
    }
    if(c < 0 || c >= pixelGrid[r].length) {
        console.error('c is outOfBounds in setPixel Function')
        return
    }
    if(obj === null || obj === undefined) {
        console.error(`Particle Object Passed in is ${obj.typeOf()}`)
        return
    }
    pixelGrid[r][c].id = obj.id
    pixelGrid[r][c].temp = obj.temp
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

const tempColors = [
    {r:0,g:21,b:255},
    {r:0,g:217,b:255},
    {r:0,g:255,b:47},
    {r:229,g:255,b:0},
    {r:255,g:191,b:0},
    {r:255,g:0,b:0},
    {r:255,g:0,b:251}
]
//-100()F -> +1000()F
//Range is 157.142857143 per color
let colorRange = 157.142857143
function getPixelTempColor(r,c) {
    if(getPixel(r,c).id === VACU) return `#000000`
    let temp = getPixel(r,c).temp
    let mult = 0.0
    if(temp === Infinity || temp === NaN || temp === -Infinity) {
        console.error('Temperature Passed in is Infinity or NaN')
        return 'rgb(255,255,255)'
    }
    if(temp <= -100) return `rgb(${tempColors[0].r},${tempColors[0].g},${tempColors[0].b})`
    if(temp >= 1000.0) return `rgb(${tempColors[tempColors.length-1].r},${tempColors[tempColors.length-1].g},${tempColors[tempColors.length-1].b})`
    //-100 -> 57
    for(let i = 0; i < tempColors.length-1; i++) {
        
        if(temp >= (-100.0 + (colorRange * i)) && temp <= (-100 + (colorRange * (i+1)))) {
            mult = (temp - (-100.0 + colorRange * i)) / ((-100 + colorRange * i+1) - (-100.0 + colorRange * i))
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