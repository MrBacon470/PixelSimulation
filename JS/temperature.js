function heatTransfer(r,c) {
    let pixel = getPixel(r,c)
    if(pixel.id === VACU && pixel.temp > 0) {
        setPixel(r,c,0)
        return
    }
    if(pixel.temp > 1000) {
        pixel.temp = 1000
        setPixelObj(r,c,pixel)
        return
    }
    if(pixel.temp < -100) {
        pixel.temp = -100
        setPixelObj(r,c,pixel)
        return
    }
    //The actual stuff
    let conductivityRate = pixelTypes[pixel.id].heatConductivity / 255
    let tempSum = pixel.temp
    let count = 1

    if(pixel.temp > 72.0) {
        pixel.temp -= 1 * conductivityRate
        setPixelObj(r,c,pixel)
    }

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