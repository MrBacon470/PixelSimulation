function heatTransfer(r,c) {
    
    let pixel = getPixel(r,c)
    if(pixel.id === VACU && pixel.temp > 0) {
        setPixel(r,c,0)
        return
    }
    if(pixel.temp > 1000) {
        pixel.temp = 1000
        setPixelObj(r,c,pixel)
    }
    if(pixel.temp < -100) {
        pixel.temp = -100
        setPixelObj(r,c,pixel)
    }
    //The actual stuff
    let conductivityRate = pixelTypes[pixel.id].heatConductivity / 255
    let tempChange = pixel.temp * conductivityRate
    let count = 0
    let pixelToBeChanged = null
    if(r-1 > -1 && getPixel(r-1,c).temp < pixel.temp && getPixel(r-1,c).id !== VACU) {
        pixelToBeChanged = getPixel(r-1,c)
        pixelToBeChanged.temp += tempChange
        setPixelObj(r-1,c,pixelToBeChanged)
        if(tempViewEnabled)
        drawPixel(r-1,c)
        count++
    }
    if(r+1 < pixelGrid.length && getPixel(r+1,c).temp < pixel.temp && getPixel(r+1,c).id !== VACU) {
        pixelToBeChanged = getPixel(r+1,c)
        pixelToBeChanged.temp += tempChange
        setPixelObj(r+1,c,pixelToBeChanged)
        if(tempViewEnabled)
        drawPixel(r+1,c)
        count++
    }
    if(c-1 > -1 && getPixel(r,c-1).temp < pixel.temp && getPixel(r,c-1).id !== VACU) {
        pixelToBeChanged = getPixel(r,c-1)
        pixelToBeChanged.temp += tempChange
        setPixelObj(r,c-1,pixelToBeChanged)
        if(tempViewEnabled)
        drawPixel(r,c-1)
        count++
    }
    if(c+1 < pixelGrid[r].length && getPixel(r,c+1).temp < pixel.temp && getPixel(r,c+1).id !== VACU) {
        pixelToBeChanged = getPixel(r,c+1)
        pixelToBeChanged.temp += tempChange
        setPixelObj(r,c+1,pixelToBeChanged)
        if(tempViewEnabled)
        drawPixel(r,c+1)
        count++
    }
    pixel.temp -= tempChange * count
    setPixelObj(r,c,pixel)
    if(tempViewEnabled)
        drawPixel(r,c)
}

function updatePhase(r,c) {

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