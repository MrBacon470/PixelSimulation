function heatTransfer(r,c) {
    //Heat Transfers in 4 directions
    /*
                [r-1,c]
        [r,c-1]  [r,c]  [r,c+1]
                [r+1,c]
    */
   let pixel = getPixel(r,c)
   let k = pixelTypes[pixel.id].heatConductivity
   if(r-1 > -1 && getPixel(r-1,c-1).temp < pixel.temp) {
        let Q = (k*1*(pixel.temp - getPixel(r-1,c-1).temp))
        //We have Q now but how do we get how much the temperature changed
             
   }
}

/*
    Heat Transfer Conduction

    Q = (k*A*deltaT)/d
        k = thermal conductivity
        A = Area of material (will always be 1 pixel so yeah)
        deltaT = T(hot)-T(cold)
        d = thickness of material (2d material so i guess 1 lol)
*/