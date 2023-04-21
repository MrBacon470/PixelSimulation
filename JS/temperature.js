function heatTransfer(r,c) {
    //Heat Transfers in 8 directions
    /*
        [r-1,c-1][r-1,c][r-1,c+1]
        [r,c-1]  [r,c]  [r,c+1]
        [r+1,c-1][r+1,c][r+1,c+1]
    */
   let pixel = getPixel(r,c)
   if(r-1 > -1 && c-1 > -1 && getPixel(r-1,c-1).temp < pixel.temp) {
    
   }
}

/*
    Heat Transfer Formula: Q = m * c * deltaT
    Q = Heat Supplied
    m = Mass Flow Rate -> (rho * velocity * Area)
        rho = Fluid Density
        velocity of fluid
        area of fluid
    c = Heat Transfer Coefficient -> h = q/deltaT
        q = heat flux
        deltaT = temperatur difference
    deltaT = temperature difference
*/