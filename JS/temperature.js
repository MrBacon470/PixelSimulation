function heatTransfer(r,c) {
    //Heat Transfers in 4 directions
    /*
                [r-1,c]
        [r,c-1]  [r,c]  [r,c+1]
                [r+1,c]
    */
   let pixel = getPixel(r,c)
   if(pixel.id === VACU) {
        setPixel(r,c,0)
        return
   }
   if(pixel.temp > 10000) {
        setPixelObj(r,c,{id:pixel.id,temp:10000})
        return
   }
   if(pixel.temp < -10000) {
        setPixelObj(r,c,{id:pixel.id,temp:-10000})
        return
   }
   let currentPixel = null
   let k = pixelTypes[pixel.id].heatConductivity
   if(r-1 > -1 && getPixel(r-1,c).temp < pixel.temp) {
        currentPixel = getPixel(r-1,c)
        let Q = 0
        if(currentPixel.id !== VACU)
            Q = (k*1*(pixel.temp - currentPixel.temp))
        else
            Q = 5.67e-8 * (pixel.temp - currentPixel.temp) * 1
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = celsiusToFarenheit(Q/pixelTypes[currentPixel.id].heatCapacity)
        else
            tempChange = Q
        //console.log(`[${r-1},${c}] Q Val - ${Q}\ntempChange ${tempChange}`)
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r-1,c,currentPixel)
        pixel.temp -= tempChange
        setPixelObj(r,c,pixel)
        if(tempViewEnabled) {
            drawPixel(r-1,c)
            drawPixel(r,c)
        }
   }
   if(r+1 < pixelGrid.length && getPixel(r+1,c).temp < pixel.temp) {
        currentPixel = getPixel(r+1,c)
        let Q = 0
        if(currentPixel.id !== VACU)
            Q = (k*1*(pixel.temp - currentPixel.temp))
        else
            Q = 5.67e-8 * (pixel.temp - currentPixel.temp) * 1
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = celsiusToFarenheit(Q/pixelTypes[currentPixel.id].heatCapacity)
        else
            tempChange = Q
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r+1,c,currentPixel)
        pixel.temp -= tempChange
        setPixelObj(r,c,pixel)
        if(tempViewEnabled) {
            drawPixel(r+1,c)
            drawPixel(r,c)
        }
   }
   if(c-1 > -1 && getPixel(r,c-1).temp < pixel.temp) {
        currentPixel = getPixel(r,c-1)
        let Q = 0
        if(currentPixel.id !== VACU)
            Q = (k*1*(pixel.temp - currentPixel.temp))
        else
            Q = 5.67e-8 * (pixel.temp - currentPixel.temp) * 1
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = celsiusToFarenheit(Q/pixelTypes[currentPixel.id].heatCapacity)
        else
            tempChange = Q
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r,c-1,currentPixel)
        pixel.temp -= tempChange
        setPixelObj(r,c,pixel)
        if(tempViewEnabled) {
            drawPixel(r,c-1)
            drawPixel(r,c)
        }
    }
    if(c+1 < pixelGrid[r].length && getPixel(r,c+1).temp < pixel.temp) {
        currentPixel = getPixel(r,c+1)
        let Q = 0
        if(currentPixel.id !== VACU)
            Q = (k*1*(pixel.temp - currentPixel.temp))
        else
            Q = 5.67e-8 * (pixel.temp - currentPixel.temp) * 1
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = celsiusToFarenheit(Q/pixelTypes[currentPixel.id].heatCapacity)
        else
            tempChange = Q
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r,c+1,currentPixel)
        pixel.temp -= tempChange
        setPixelObj(r,c,pixel)
        if(tempViewEnabled) {
            drawPixel(r,c+1)
            drawPixel(r,c)
        }
   }
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