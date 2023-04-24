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
const tempColors = [
    {
        r:156,
        g:184,
        b:223,
    }, 
    {
        r:38,
        g:67,
        b:111,
    }, 
    {
        r:69,
        g:124,
        b:144,
    }, 
    {
        r:195,
        g:138,
        b:82,
    },
    {
        r:195,
        g:138,
        b:82,
    },
    {
        r:60,
        g:1,
        b:2,
    }
]
//0-35, 35-60, 60-90, 90-150+
function getPixelTempColor(r,c) {
    let temp = getPixel(r,c).temp
    let mult = 0.0
    if(temp === Infinity || temp === NaN || temp === -Infinity) {
        console.error('Temperature Passed in is Infinity or NaN')
        return 'rgb(255,255,255)'
    }
    if(temp < 0) return `rgb(${tempColors[0].r},${tempColors[0].g},${tempColors[0].b})`
    if(temp >= 0 || temp <= 35) {
        const scale = temp / 35
        const r = Math.floor(tempColors[1].r + (tempColors[0].r - tempColors[1].r) * scale)
        const g = Math.floor(tempColors[1].g + (tempColors[0].g - tempColors[1].g) * scale)
        const b = Math.floor(tempColors[1].b + (tempColors[0].b - tempColors[1].b) * scale)
        return `rgb(${r},${g},${b})`
    }
    if(temp > 35 && temp <= 60) {
        const scale = temp / 35
        const r = Math.floor(tempColors[1].r + (tempColors[2].r - tempColors[1].r) * scale)
        const g = Math.floor(tempColors[1].g + (tempColors[2].g - tempColors[1].g) * scale)
        const b = Math.floor(tempColors[1].b + (tempColors[2].b - tempColors[1].b) * scale)
        return `rgb(${r},${g},${b})`
    }
    if(temp > 60 && temp <= 90) {
        const scale = temp / 35
        const r = Math.floor(tempColors[2].r + (tempColors[3].r - tempColors[2].r) * scale)
        const g = Math.floor(tempColors[2].g + (tempColors[3].g - tempColors[2].g) * scale)
        const b = Math.floor(tempColors[3].b + (tempColors[2].b - tempColors[3].b) * scale)
        return `rgb(${r},${g},${b})`
    }
}