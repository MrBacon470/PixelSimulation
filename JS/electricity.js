

function updateSPRK(r,c) {
    //SPRK can move 4 directions
    const currentParticle = getParticle(r,c)
    if(currentParticle.sparked && !getParticleType(r,c).conductive){
        particleGrid[r][c].sparked = false
        drawParticle(r,c)
    }
    if(!currentParticle.sparked) return
    //Move SPRK to other spots
    let up = isInBounds(r-1,c) && getParticleType(r-1,c).conductive
    let down = isInBounds(r+1,c) && getParticleType(r+1,c).conductive
    let left = isInBounds(r,c-1) && getParticleType(r,c-1).conductive
    let right = isInBounds(r,c+1) && getParticleType(r,c+1).conductive

    if(up) {
        particleGrid[r-1][c].sparked = !particleGrid[r-1][c].sparked
        particleGrid[r-1][c].temp = restrictNum(particleGrid[r-1][c].temp+5,MAX_TEMP,MIN_TEMP)
    }
        
    if(down) {
        particleGrid[r+1][c].sparked = !particleGrid[r+1][c].sparked
        particleGrid[r-1][c].temp = restrictNum(particleGrid[r+1][c].temp+5,MAX_TEMP,MIN_TEMP)
    }
    if(left) {
        particleGrid[r][c-1].sparked = !particleGrid[r][c-1].sparked
        particleGrid[r-1][c].temp = restrictNum(particleGrid[r][c-1].temp+5,MAX_TEMP,MIN_TEMP)
    }   
    if(right) {
        particleGrid[r][c+1].sparked = !particleGrid[r][c+1].sparked
        particleGrid[r-1][c].temp = restrictNum(particleGrid[r][c+1].temp+5,MAX_TEMP,MIN_TEMP)
    }
       
        
    setTimeout(()=>{
        drawParticle(r,c)
        if(isInBounds(r-1,c))
            drawParticle(r-1,c)
        if(isInBounds(r+1,c))
            drawParticle(r+1,c)
        if(isInBounds(r,c-1))
            drawParticle(r,c-1)
        if(isInBounds(r,c+1))
            drawParticle(r,c+1)
    },200)

}