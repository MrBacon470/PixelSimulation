function heatTransfer(r,c) {
    //Heat Transfers in 4 directions
    /*
                [r-1,c]
        [r,c-1]  [r,c]  [r,c+1]
                [r+1,c]
    */
   let pixel = getPixel(r,c)
   let currentPixel = null
   let k = pixelTypes[pixel.id].heatConductivity
   if(r-1 > -1 && getPixel(r-1,c).temp < pixel.temp) {
        currentPixel = getPixel(r-1,c)
        let Q = (k*1*(pixel.temp - currentPixel.temp))
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = Q/pixelTypes[currentPixel.id].heatCapacity
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r-1,c,currentPixel)
   }
   if(r+1 < pixelGrid.length && getPixel(r+1,c).temp < pixel.temp) {
        currentPixel = getPixel(r+1,c)
        let Q = (k*1*(pixel.temp - currentPixel.temp))
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = Q/pixelTypes[currentPixel.id].heatCapacity
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r+1,c,currentPixel)
   }
   if(c-1 > -1 && getPixel(r,c-1).temp < pixel.temp) {
        currentPixel = getPixel(r,c-1)
        let Q = (k*1*(pixel.temp - currentPixel.temp))
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = Q/pixelTypes[currentPixel.id].heatCapacity
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r,c-1,currentPixel)
    }
    if(c+1 < pixelGrid[r].length && getPixel(r,c+1).temp < pixel.temp) {
        currentPixel = getPixel(r,c+1)
        let Q = (k*1*(pixel.temp - currentPixel.temp))
        //We have Q now but how do we get how much the temperature changed
        let tempChange = 0
        if(pixelTypes[currentPixel.id].heatCapacity !== 'Infinite')
            tempChange = Q/pixelTypes[currentPixel.id].heatCapacity
        //Convert Celsius to Farenheit and add to particle's temp
        currentPixel.temp += tempChange
        setPixelObj(r,c+1,currentPixel)
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
*/