
function updateSPRK(r,c) {
    //SPRK can move 4 directions
    const currentParticle = getParticle(r,c)
    const currentParticleName = getParticleType(r,c).abbr
    if(currentParticle.sparked && !particleConducts(r,c)){
        setParticleSparked(r,c,false)
        setParticleTmpVar(r,c,null)
        return
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
            if(isInBounds(r-1,c) && particleConducts(r-1,c) && !getParticle(r-1,c).sparked && nscnTransfer(r,c,r-1,c)) {
                setParticleSparked(r-1,c,true)
                setParticleTmpVar(r-1,c,'Up')
                drawParticle(r-1,c)
            }
            if(isInBounds(r+1,c) && particleConducts(r+1,c) && !getParticle(r+1,c).sparked && nscnTransfer(r,c,r+1,c)) {
                setParticleSparked(r+1,c,true)
                setParticleTmpVar(r+1,c,'Down')
                drawParticle(r+1,c)
            }
            if(isInBounds(r,c-1) && particleConducts(r,c-1) && !getParticle(r,c-1).sparked && nscnTransfer(r,c,r,c-1)) {
                setParticleSparked(r,c-1,true)
                setParticleTmpVar(r,c-1,'Left')
                drawParticle(r,c-1)
            }
            if(isInBounds(r,c+1) && particleConducts(r,c+1) && !getParticle(r,c+1).sparked && nscnTransfer(r,c,r,c+1)) {
                setParticleSparked(r,c+1,true)
                setParticleTmpVar(r,c+1,'Right')
                drawParticle(r,c+1)
            }
            break
        case 'Up':
            if(isInBounds(r-1,c) && particleConducts(r-1,c) && !getParticle(r-1,c).sparked && nscnTransfer(r,c,r-1,c)) {
                setParticleSparked(r-1,c,true)
                setParticleTmpVar(r-1,c,'Up')
            }
            else {
                if(isInBounds(r,c-1) && particleConducts(r,c-1) && !getParticle(r,c-1).sparked && nscnTransfer(r,c,r,c-1)) {
                    setParticleSparked(r,c-1,true)
                    setParticleTmpVar(r,c-1,'Left')
                }
                else if(isInBounds(r,c+1) && particleConducts(r,c+1) && !getParticle(r,c+1).sparked && nscnTransfer(r,c,r,c+1)) {
                    setParticleSparked(r,c+1,true)
                    setParticleTmpVar(r,c+1,'Right')
                }
            }
            break
        case 'Down':
            if(isInBounds(r+1,c) && particleConducts(r+1,c) && !getParticle(r+1,c).sparked && nscnTransfer(r,c,r+1,c)) {
                setParticleSparked(r+1,c,true)
                setParticleTmpVar(r+1,c,'Down')
            }
            else {
                if(isInBounds(r,c-1) && particleConducts(r,c-1) && !getParticle(r,c-1).sparked && nscnTransfer(r,c,r,c-1)) {
                    setParticleSparked(r,c-1,true)
                    setParticleTmpVar(r,c-1,'Left')
                }
                else if(isInBounds(r,c+1) && particleConducts(r,c+1) && !getParticle(r,c+1).sparked && nscnTransfer(r,c,r,c+1)) {
                    setParticleSparked(r,c+1,true)
                    setParticleTmpVar(r,c+1,'Right')
                }
            }
            
            break
        case 'Left':
            if(isInBounds(r,c-1) && particleConducts(r,c-1) && !getParticle(r,c-1).sparked && nscnTransfer(r,c,r,c-1)) {
                setParticleSparked(r,c-1,true)
                setParticleTmpVar(r,c-1,'Left')
            }
            else {
                if(isInBounds(r+1,c) && particleConducts(r+1,c) && !getParticle(r+1,c).sparked && nscnTransfer(r,c,r+1,c)) {
                    setParticleSparked(r+1,c,true)
                    setParticleTmpVar(r+1,c,'Down')
                }
                else if(isInBounds(r-1,c) && particleConducts(r-1,c) && !getParticle(r-1,c).sparked && nscnTransfer(r,c,r-1,c)) {
                    setParticleSparked(r-1,c,true)
                    setParticleTmpVar(r-1,c,'Up')
                }
                else {
                    setTimeout(()=>{
                        setParticleSparked(r,c,false)
                        setParticleTmpVar(r,c,null)
                    },200)
                }
            }
            break
        case 'Right':
            if(!isInBounds(r,c+1)) {
                return
            }
            if(isInBounds(r,c+1) && particleConducts(r,c+1) && !getParticle(r,c+1).sparked && nscnTransfer(r,c,r,c+1)) {
                setParticleSparked(r,c+1,true)
                setParticleTmpVar(r,c+1,'Right')
            }
            else {
                if(isInBounds(r+1,c) && particleConducts(r+1,c) && !getParticle(r+1,c).sparked && nscnTransfer(r,c,r+1,c)) {
                    setParticleSparked(r+1,c,true)
                    setParticleTmpVar(r+1,c,'Down')
                }
                else if(isInBounds(r-1,c) && particleConducts(r-1,c) && !getParticle(r-1,c).sparked && nscnTransfer(r,c,r-1,c)) {
                    setParticleSparked(r-1,c,true)
                    setParticleTmpVar(r-1,c,'Up')
                }
            }
            break
    }

    if(currentParticleName === 'PSCN') {
        if(getParticleType(r-1,c).abbr === 'SWCH' && getParticle(r-1,c).tmp2 !== true) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r-1,c,true)
        }
        else if(getParticleType(r+1,c).abbr === 'SWCH' && getParticle(r+1,c).tmp2 !== true) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r+1,c,true)
        }
        else if(getParticleType(r,c-1).abbr === 'SWCH' && getParticle(r,c-1).tmp2 !== true) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r,c-1,true)
        }
        else if(getParticleType(r,c+1).abbr === 'SWCH' && getParticle(r,c+1).tmp2 !== true) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r,c+1,true)
        }
    }
    else if(currentParticleName === 'NSCN') {
        if(getParticleType(r-1,c).abbr === 'SWCH' && getParticle(r-1,c).tmp2 !== false) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r-1,c,false)
        }
        else if(getParticleType(r+1,c).abbr === 'SWCH' && getParticle(r+1,c).tmp2 !== false) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r+1,c,false)
        }
        else if(getParticleType(r,c-1).abbr === 'SWCH' && getParticle(r,c-1).tmp2 !== false) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r,c-1,false)
        }
        else if(getParticleType(r,c+1).abbr === 'SWCH' && getParticle(r,c+1).tmp2 !== false) {
            particleGrid[r][c].sparked = false
            floodFillSWCH(r,c+1,false)
        }
    }

    setTimeout(()=>{
        setParticleSparked(r,c,false)
        setParticleTmpVar(r,c,null)
    },100)
}

//used to determine if particle can transfer or take a sprk

function particleConducts(r,c) {
    const particle = getParticle(r,c)
    const particleType = getParticleType(r,c)
    if(particleType.abbr === 'SWCH')
        return (particle.tmp2 == true)
    else
        return particleType.conductive
}

function nscnTransfer(r1,c1,r2,c2) {
    const particle1 = getParticleType(r1,c1).abbr
    const particle2 = getParticleType(r2,c2).abbr
    return particle1 !== 'NSCN' || (particle1 === 'NSCN' && particle2 !== 'PSCN')
}

function floodFillSWCH(r,c,bool) {
    if(!isInBounds(r,c)) return
    if(getParticleType(r,c).abbr !== 'SWCH' || getParticle(r,c).tmp2 === bool) return

    particleGrid[r][c].tmp2 = bool
    drawParticle(r,c)

    floodFillSWCH(r-1,c,bool)
    floodFillSWCH(r+1,c,bool)
    floodFillSWCH(r,c-1,bool)
    floodFillSWCH(r,c+1,bool)
}