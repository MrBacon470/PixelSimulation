function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addHTML(target,html) {
    document.getElementById(target).insertAdjacentHTML('beforeend',html)
}

function getParticle(r,c) {
    if(!isInBounds(r,c)) {
        //console.error(`r: ${r} or c: ${c} is outOfBounds in getParticle()`)
        return {id: -1, temp: -1, type: 'None', sparked: false, tmp: null, tmp2: null}
    }
    return {id: particleGrid[r][c].id, 
        temp: particleGrid[r][c].temp, 
        type: particleGrid[r][c].type, 
        sparked: particleGrid[r][c].sparked, 
        tmp: particleGrid[r][c].tmp,
        tmp2: particleGrid[r][c].tmp2,
    };
}

function setParticle(r,c,id) {
    if(!isInBounds(r,c)) {
        //console.error(`r: ${r} or c: ${c} is outOfBounds in setParticle()`)
        return
    }
    if(id < 0 || id >= particleTypes.length) {
        console.error('id is outOfBounds in setParticle function')
        return
    }
    const pixelType = particleTypes[id]
    particleGrid[r][c].id = id
    particleGrid[r][c].temp = pixelType.defaultTemp
    particleGrid[r][c].tmp = null
    particleGrid[r][c].tmp2 = null
    if(pixelType.isGas)
        particleGrid[r][c].type = 'Gas'
    else if(pixelType.isLiquid)
        particleGrid[r][c].type = 'Liquid'
    else if(pixelType.isPowder)
        particleGrid[r][c].type = 'Powder'
    else
        particleGrid[r][c].type = 'Solid'
    drawParticle(r,c)
}

function setParticleId(r,c,id) {
    if(!isInBounds(r,c)) {
        //console.error(`r or c is outOfBounds in setParticle()`)
        return
    }
    if(id < 0 || id >= particleTypes.length) {
        //console.error('id is outOfBounds in setParticle function')
        return
    }
    particleGrid[r][c].id = id
    const pixelType = particleTypes[id]
    if(pixelType.isGas)
        particleGrid[r][c].type = 'Gas'
    else if(pixelType.isLiquid)
        particleGrid[r][c].type = 'Liquid'
    else if(pixelType.isPowder)
        particleGrid[r][c].type = 'Powder'
    else
        particleGrid[r][c].type = 'Solid'
    drawParticle(r,c)
}

function setParticleType(r,c,type) {
    if(!isInBounds(r,c)) {
        //console.error(`r or c is outOfBounds in setParticleType()`)
        return
    }
    particleGrid[r][c].type = type
    drawParticle(r,c)
}

function setParticleObj(r,c,obj) {
    if(!isInBounds(r,c)) {
        //console.error(`r or c is outOfBounds in setParticleObj()`)
        return
    }
    if(obj === null || obj === undefined) {
        console.error(`Particle Object Passed in is ${typeof obj}`)
        return
    }
    particleGrid[r][c].id = obj.id
    particleGrid[r][c].temp = obj.temp
    particleGrid[r][c].type = obj.type
    drawParticle(r,c)
}

function setParticleSparked(r,c,bool) {
    if(!isInBounds(r,c))
        return
    particleGrid[r][c].sparked = bool
}

function setParticleTmpVar(r,c,tmp) {
    if(!isInBounds(r,c))
        return
    particleGrid[r][c].tmp = tmp
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
    {r:183,g:0,b:255},
    {r:17,g:0,b:255},
    {r:0,g:208,b:255},
    {r:0,g:255,b:60},
    {r:0,g:255,b:0},
    {r:170,g:255,b:0},
    {r:246,g:255,b:0},
    {r:255,g:230,b:0},
    {r:255,g:166,b:0},
    {r:255,g:0,b:0},
    {r:255,g:0,b:179},
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
            mult = Math.abs(temp - (MIN_TEMP + (colorRange * i))) / Math.abs((MIN_TEMP + (colorRange * (i+1))) - (MIN_TEMP + (colorRange * i)))
            const lerpedColor = lerpRGB(tempColors[i].r,tempColors[i].g,tempColors[i].b,tempColors[i+1].r,tempColors[i+1].g,tempColors[i+1].b,mult)
            return `rgb(${lerpedColor.r},${lerpedColor.g},${lerpedColor.b})`
        }
    }
    return `rgb(${tempColors[tempColors.length-1].r},${tempColors[tempColors.length-1].g},${tempColors[tempColors.length-1].b})`
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function showParticleCategory(index) {
    if(index === -1) {
        for(let i = 0; i < particleCategories.length; i++) {
            document.getElementById(`particleCategoryButton${i}`).style.display = 'block'
            document.getElementById(`particleCategoryButton${i}`).classList = 'whiteButton'
            document.getElementById(`${particleCategories[i]}Holder`).style.display = 'none'
        }
    }
    else {
        for(let i = 0; i < particleCategories.length; i++) {
            document.getElementById(`${particleCategories[i]}Holder`).style.display = index === i ? 'flex' : 'none'
            document.getElementById(`particleCategoryButton${i}`).classList = index === i ? 'whiteButtonActive' : 'whiteButton'
            document.getElementById(`particleCategoryButton${i}`).style.display = index === i ? 'block' : 'none'
        }
    }
}

function getParticleType(r,c) {
    if(!isInBounds(r,c)) return particleTypes[0]
    return particleTypes[getParticle(r,c).id]
}

function clearSimulation() {
    let rows = canvasData.height/canvasData.pixelSize
    let cols = canvasData.width/canvasData.pixelSize
    particleGrid = new Array(rows)
    for(let i = 0; i < rows; i++) {
        particleGrid[i] = new Array(cols).fill(0)
        for(let j = 0; j < cols; j++) {
            particleGrid[i][j] = {
                id: 0,
                temp: particleTypes[0].defaultTemp,
                type: 'Solid',
                sparked: false,
                tmp: null,
            }
        }
    }
    updateCanvas()
}

function checkParticleAbbr(r,c,target) {
    if(isInBounds(r,c) && getParticleType(r,c).abbr === target) return true
    return false
}

function updateSelectedIndex(id) {
    if(pixelSelectedIndex === id || id >= particleTypes.length) return
    if(id < 0 && Math.abs(id+1) >= tools.length) return
    for(let i = 0; i < particleTypes.length; i++) {
        document.getElementById(`elementButton${i}`).classList = i === id ? `${particleTypes[i].abbr}ButtonActive` : `${particleTypes[i].abbr}Button`
        if(i < tools.length) {
            document.getElementById(`toolButton${i}`).classList = (i*-1) === id+1 && id < 0 ? `${tools[i].abbr}ButtonActive` : `${tools[i].abbr}Button`
        }
    }
    document.getElementById('selectedParticleText').innerText = id >= 0 ? `Selected Particle\n\n${particleTypes[id].name}\n\n${particleTypes[id].desc}` :
    `Selected Tool\n\n${tools[Math.abs(id+1)].name}\n\n${tools[Math.abs(id+1)].desc}`
    document.getElementById('selectedParticleText').style.border = id >= 0 ? `2px solid ${particleTypes[id].color}` :
    `2px solid ${tools[Math.abs(id+1)].color}`
    
    pixelSelectedIndex = id
    
}