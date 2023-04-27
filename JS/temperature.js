const MAX_TEMP = 10000
const MIN_TEMP = -10000

function heatTransfer(r,c) {
    let pixel = getPixel(r,c)
    
    if(pixel.id === VACU && pixel.temp > 0) {
        setPixel(r,c,0)
        return
    }
    if(pixel.temp > MAX_TEMP) {
        pixel.temp = MAX_TEMP
        setPixelObj(r,c,pixel)
        return
    }
    if(pixel.temp < MIN_TEMP) {
        pixel.temp = MIN_TEMP
        setPixelObj(r,c,pixel)
        return
    }
    //The actual stuff
    let surroundingParticles = getSurroundingParticles(r,c)
    let tempSum = pixel.temp
    let tempCount = 1
    let tempAvg = 0
    for(let i = 0; i < 8; i++) {
        if(surroundingParticles[i] !== -1 && surroundingParticles[i].id !== VACU) {
            tempSum += surroundingParticles[i].temp
            tempCount += 1
        }
    }
    tempAvg = tempSum/tempCount
    if(tempAvg-pixel.temp !== 0) {
        pixel.temp += (tempAvg-pixel.temp)*(pixelTypes[pixel.id].heatConductivity/255)
    }
    pixel.temp = restrictNum(pixel.temp,MAX_TEMP,MIN_TEMP)

    for(let i = 0; i < 8; i++) {
        if(surroundingParticles[i] !== -1 && surroundingParticles[i].id !== VACU) {
            if(tempAvg-surroundingParticles[i].temp !== 0)
            surroundingParticles[i].temp += (tempAvg-surroundingParticles[i].temp)*(pixelTypes[pixel.id].heatConductivity/255)
            surroundingParticles[i].temp = restrictNum(surroundingParticles[i].temp,MAX_TEMP,MIN_TEMP)
        }
    }
    setSurroundingParticles(r,c,surroundingParticles)
    setPixelObj(r,c,pixel)
}

function updatePhase(r,c) {
    let currentPixel = getPixel(r,c)
    let pixelAttrs = pixelTypes[currentPixel.id]
    if(pixelAttrs.highTemperatureChange.temp !== -1 && pixelAttrs.highTemperatureChange.type !== -1) {
        if(currentPixel.temp >= pixelAttrs.highTemperatureChange.temp) {
            setPixelType(r,c,pixelAttrs.highTemperatureChange.type)
        }
    }
    else if(pixelAttrs.lowTemperatureChange.temp !== -1 && pixelAttrs.lowTemperatureChange.type !== -1) {
        if(currentPixel.temp <= pixelAttrs.lowTemperatureChange.temp) {
            setPixelType(r,c,pixelAttrs.lowTemperatureChange.type)
        }
    }
}

function getSurroundingParticles(r,c) {
    let pixels = new Array(8).fill(-1)
    if(isInBounds(r-1,c-1)) pixels[0] = getPixel(r-1,c-1)
    if(isInBounds(r-1,c)) pixels[1] = getPixel(r-1,c)
    if(isInBounds(r-1,c+1)) pixels[2] = getPixel(r-1,c+1)
    if(isInBounds(r,c-1)) pixels[3] = getPixel(r,c-1)
    if(isInBounds(r,c+1)) pixels[4] = getPixel(r,c+1)
    if(isInBounds(r+1,c-1)) pixels[5] = getPixel(r+1,c-1)
    if(isInBounds(r+1,c)) pixels[6] = getPixel(r+1,c)
    if(isInBounds(r+1,c+1)) pixels[7] = getPixel(r+1,c+1)
    return pixels
}

function setSurroundingParticles(r,c,arr) {
    for(let i = 0; i < 8; i++) {
        if(arr[i] !== -1 && arr[i].id !== VACU) {
            switch(i) {
                case 0:
                    setPixelObj(r-1,c-1,arr[i])
                    break
                case 1:
                    setPixelObj(r-1,c,arr[i])
                    break
                case 2:
                    setPixelObj(r-1,c+1,arr[i])
                    break
                case 3:
                    setPixelObj(r,c-1,arr[i])
                    break
                case 4:
                    setPixelObj(r,c+1,arr[i])
                    break
                case 5:
                    setPixelObj(r+1,c-1,arr[i])
                    break
                case 6:
                    setPixelObj(r+1,c,arr[i])
                    break
                case 7:
                    setPixelObj(r+1,c+1,arr[i])
            }
        }
    }
}

/*
    Heat Transfer Conduction

    Q = (k*A*deltaT)/d
        k = thermal conductivity
        A = Area of material (will always be 1 pixel so yeah)
        deltaT = T(hot)-T(cold)
        d = thickness of material (2d material so i guess 1 lol)

    Heat Transfer Convection

    Q = H * A * deltaT
        H = Heat Transfer Coefficient
        A = Surface Area
        deltaT = T(hot)-T(cold)
    
    Heat Transfer Radiation

    Q = σ {T4(Hot) – T4(Cold)} A
        σ = 5.67e-8
        A = Surface Area
*/