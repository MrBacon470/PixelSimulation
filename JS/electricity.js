

function updateSPRK(r,c) {
    //SPRK can move 4 directions
    const currentParticle = getParticle(r,c)
    if(currentParticle.sparked || !getParticleType(r,c).conductive){
        particleGrid[r][c].sparked = false
        particleGrid[r][c].tmp = null
        drawParticle(r,c)
    }
    if(!currentParticle.sparked) return
    /*
        SPRK Movement
        if tmp === 'Center'
        Spread SPRK to up, down, left, right
        and set tmp to 'Up','Down,'Left' & 'Right' respectively
        if tmp !== 'Center
        Down and Up Spread to particles that are below to the left and to the right of them
        and set tmp values to 'Down' or 'Up' respectively
        Left and Right spread to particles to the left or right of them
        and as well below and above them and set the tmp val to 'Left' or 'Right'
    */    
    switch(currentParticle.tmp) {
        case 'Center':
            if(isInBounds(r-1,c) && getParticleType(r-1,c).conductive && !getParticle(r-1,c).sparked) {
                setParticleSparked(r-1,c,true)
                setParticleTmpVar(r-1,c,'Up')
                drawParticle(r-1,c)
            }
            if(isInBounds(r+1,c) && getParticleType(r+1,c).conductive && !getParticle(r+1,c).sparked) {
                setParticleSparked(r+1,c,true)
                setParticleTmpVar(r+1,c,'Down')
                drawParticle(r+1,c)
            }
            if(isInBounds(r,c-1) && getParticleType(r,c-1).conductive && !getParticle(r,c-1).sparked) {
                setParticleSparked(r,c-1,true)
                setParticleTmpVar(r,c-1,'Left')
                drawParticle(r,c-1)
            }
            if(isInBounds(r,c+1) && getParticleType(r,c+1).conductive && !getParticle(r,c+1).sparked) {
                setParticleSparked(r,c+1,true)
                setParticleTmpVar(r,c+1,'Right')
                drawParticle(r,c+1)
            }
            setTimeout(()=>{
                setParticleSparked(r,c,false)
                setParticleTmpVar(r,c,null)
            },200)
            break
        case 'Up':
        case 'Down':
            if(isInBounds(r + (currentParticle.tmp === 'Up' ? -1 : 1),c) && getParticleType(r + (currentParticle.tmp === 'Up' ? -1 : 1),c).conductive && !getParticle(r + (currentParticle.tmp === 'Up' ? -1 : 1),c).sparked) {
                setParticleSparked(r + (currentParticle.tmp === 'Up' ? -1 : 1),c,true)
                setParticleTmpVar(r + (currentParticle.tmp === 'Up' ? -1 : 1),c,currentParticle.tmp)
            }
            else {
                if(isInBounds(r + (currentParticle.tmp === 'Up' ? -1 : 1),c-1) && getParticleType(r + (currentParticle.tmp === 'Up' ? -1 : 1),c-1).conductive && !getParticle(r + (currentParticle.tmp === 'Up' ? -1 : 1),c-1).sparked) {
                    setParticleSparked(r + (currentParticle.tmp === 'Up' ? -1 : 1),c-1,true)
                    setParticleTmpVar(r + (currentParticle.tmp === 'Up' ? -1 : 1),c-1,currentParticle.tmp)
                }
                if(isInBounds(r + (currentParticle.tmp === 'Up' ? -1 : 1),c+1) && getParticleType(r + (currentParticle.tmp === 'Up' ? -1 : 1),c+1).conductive && !getParticle(r + (currentParticle.tmp === 'Up' ? -1 : 1),c+1).sparked) {
                    setParticleSparked(r + (currentParticle.tmp === 'Up' ? -1 : 1),c+1,true)
                    setParticleTmpVar(r + (currentParticle.tmp === 'Up' ? -1 : 1),c+1,currentParticle.tmp)
                }
            }
            setTimeout(()=>{
                setParticleSparked(r,c,false)
                setParticleTmpVar(r,c,null)
            },200)
            break
        case 'Left':
        case 'Right':
            if(isInBounds(r,c + (currentParticle.tmp === 'Left' ? -1 : 1)) && getParticleType(r,c + (currentParticle.tmp === 'Left' ? -1 : 1)).conductive && !getParticle(r,c + (currentParticle.tmp === 'Left' ? -1 : 1)).sparked) {
                setParticleSparked(r,c + (currentParticle.tmp === 'Left' ? -1 : 1),true)
                setParticleTmpVar(r,c + (currentParticle.tmp === 'Left' ? -1 : 1),currentParticle.tmp)
            }
            else {
                if(isInBounds(r-1,c + (currentParticle.tmp === 'Left' ? -1 : 1)) && getParticleType(r-1,c + (currentParticle.tmp === 'Left' ? -1 : 1)).conductive && !getParticle(r-1,c + (currentParticle.tmp === 'Left' ? -1 : 1)).sparked) {
                    setParticleSparked(r-1,c + (currentParticle.tmp === 'Left' ? -1 : 1),true)
                    setParticleTmpVar(r-1,c + (currentParticle.tmp === 'Left' ? -1 : 1),currentParticle.tmp)
                }
                if(isInBounds(r+1,c + (currentParticle.tmp === 'Left' ? -1 : 1)) && getParticleType(r+1,c + (currentParticle.tmp === 'Left' ? -1 : 1)).conductive && !getParticle(r+1,c + (currentParticle.tmp === 'Left' ? -1 : 1)).sparked) {
                    setParticleSparked(r+1,c + (currentParticle.tmp === 'Left' ? -1 : 1),true)
                    setParticleTmpVar(r+1,c + (currentParticle.tmp === 'Left' ? -1 : 1),currentParticle.tmp)
                }
            }
            setTimeout(()=>{
                setParticleSparked(r,c,false)
                setParticleTmpVar(r,c,null)
            },200)
            break
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