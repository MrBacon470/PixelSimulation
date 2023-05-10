
function updateSPRK(r,c) {
    //SPRK can move 4 directions
    const currentParticle = getParticle(r,c)
    const currentParticleName = getParticleType(r,c).abbr
    if(currentParticle.sparked && !getParticleType(r,c).conductive){
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
            if(!isInBounds(r-1,c)) {
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
                return
            }
            if(isInBounds(r-1,c) && particleConducts(r-1,c) && !getParticle(r-1,c).sparked && nscnTransfer(r,c,r-1,c)) {
                setParticleSparked(r-1,c,true)
                setParticleTmpVar(r-1,c,'Up')
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
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
                else {
                    setTimeout(()=>{
                        setParticleSparked(r,c,false)
                        setParticleTmpVar(r,c,null)
                    },200)
                }
            }
            break
        case 'Down':
            if(!isInBounds(r+1,c)) {
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
                return
            }
            if(isInBounds(r+1,c) && particleConducts(r+1,c) && !getParticle(r+1,c).sparked && nscnTransfer(r,c,r+1,c)) {
                setParticleSparked(r+1,c,true)
                setParticleTmpVar(r+1,c,'Down')
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
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
                else {
                    setTimeout(()=>{
                        setParticleSparked(r,c,false)
                        setParticleTmpVar(r,c,null)
                    },200)
                }
            }
            
            break
        case 'Left':
            if(!isInBounds(r,c-1)) {
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
                return
            }
            if(isInBounds(r,c-1) && particleConducts(r,c-1) && !getParticle(r,c-1).sparked && nscnTransfer(r,c,r,c-1)) {
                setParticleSparked(r,c-1,true)
                setParticleTmpVar(r,c-1,'Left')
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
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
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
                return
            }
            if(isInBounds(r,c+1) && particleConducts(r,c+1) && !getParticle(r,c+1).sparked && nscnTransfer(r,c,r,c+1)) {
                setParticleSparked(r,c+1,true)
                setParticleTmpVar(r,c+1,'Right')
                setTimeout(()=>{
                    setParticleSparked(r,c,false)
                    setParticleTmpVar(r,c,null)
                },200)
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
    }
}

//used to determine if particle can transfer or take a sprk

function particleConducts(r,c) {
    const particle = getParticle(r,c)
    const particleType = getParticleType(r,c)
    
    return particleType.conductive
}

function nscnTransfer(r1,c1,r2,c2) {
    const particle1 = getParticleType(r1,c1).abbr
    const particle2 = getParticleType(r2,c2).abbr
    return particle1 !== 'NSCN' || (particle1 === 'NSCN' && particle2 !== 'PSCN')
}