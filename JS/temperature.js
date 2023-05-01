const MAX_TEMP = 5000
const MIN_TEMP = -500

function heatTransfer(r,c) {
    let Particle = getParticle(r,c)
    
    if(Particle.id === VACU && Particle.temp > 0) {
        setParticle(r,c,0)
        return
    }
    if(Particle.temp > MAX_TEMP) {
        Particle.temp = MAX_TEMP
        setParticleObj(r,c,Particle)
        return
    }
    if(Particle.temp < MIN_TEMP) {
        Particle.temp = MIN_TEMP
        setParticleObj(r,c,Particle)
        return
    }
    if((r === 0 || c === 0 || r === particleGrid.length-1 || c === particleGrid[r].length-1) && Particle.id !== VACU) {
        if(Particle.temp > 72.0) {
            let change = Math.random()*((1)*(particleTypes[Particle.id].heatConductivity/255))
            Particle.temp -= change
            setParticleObj(r,c,Particle)
        }
        else if(Particle.temp < 72.0) {
            let change = Math.random()*(Math.abs(1)*(particleTypes[Particle.id].heatConductivity/255))
            Particle.temp += change
            setParticleObj(r,c,Particle)
        }
    }
    //The actual stuff
    let surroundingParticles = getSurroundingParticles(r,c)
    let tempSum = Particle.temp
    let tempCount = 1
    let tempAvg = 0
    for(let i = 0; i < 8; i++) {
        if(surroundingParticles[i] !== -1 && surroundingParticles[i].id !== VACU) {
            tempSum += surroundingParticles[i].temp
            tempCount += 1
        }
    }
    tempAvg = tempSum/tempCount
    if(tempAvg-Particle.temp !== 0 && Particle.id !== FIRE && Particle.id !== SFLM) {
        Particle.temp += (tempAvg-Particle.temp)*(particleTypes[Particle.id].heatConductivity/255)
    }
    if(Particle.id !== FIRE && Particle.id !== SFLM)
    Particle.temp = restrictNum(Particle.temp,MAX_TEMP,MIN_TEMP)

    for(let i = 0; i < 8; i++) {
        if(surroundingParticles[i] !== -1 && surroundingParticles[i].id !== VACU) {
            if(tempAvg-surroundingParticles[i].temp !== 0) {
                surroundingParticles[i].temp += (tempAvg-surroundingParticles[i].temp)*(particleTypes[Particle.id].heatConductivity/255)
                surroundingParticles[i].temp = restrictNum(surroundingParticles[i].temp,MAX_TEMP,MIN_TEMP)
            }
            
        }
    }
    setSurroundingParticles(r,c,surroundingParticles)
    setParticleObj(r,c,Particle)
}

function updatePhase(r,c) {
    const currentParticle = getParticle(r,c)
    const particleType = particleTypes[currentParticle.id]
    const highTemp = particleType.highTemperatureChange
    const lowTemp = particleType.lowTemperatureChange
    if(highTemp.temp === -1 && lowTemp.temp === -1) {
        return
    }
    else if(highTemp.temp !== -1 && currentParticle.temp >= highTemp.temp) {
        switch(highTemp.type) {
            case -1:
                if((currentParticle.type === 'Solid' || currentParticle.type === 'Powder') && (particleType.isPowder || (!particleType.isLiquid && !particleType.isGas)))
                    setParticleType(r,c,'Liquid')
                else if(currentParticle.type === 'Liquid' && particleType.isLiquid)
                    setParticleType(r,c,'Gas')
                break
            default:
                    setParticleId(r,c,highTemp.type)
                break
        }
    }
    else if(highTemp.temp !== -1 && currentParticle.temp < highTemp.temp) {
        if(currentParticle.type === 'Liquid' && (particleType.isPowder || (!particleType.isLiquid && !particleType.isGas)))
            setParticleType(r,c, particleType.isPowder ? 'Powder' : 'Solid')
        if(currentParticle.type === 'Gas' && particleType.isLiquid)
            setParticleType(r,c,'Liquid')
    }
    if(lowTemp.temp !== -1 && currentParticle.temp <= lowTemp.temp) {
        switch(lowTemp.type) {
            case -1:
                if(currentParticle.type === 'Liquid' && particleType.isLiquid)
                    setParticleType(r,c,'Solid')
                if(currentParticle.type === 'Gas' && particleType.isGas)
                    setParticleType(r,c,'Liquid')
                break
            default:
                setParticleId(r,c,lowTemp.type)
                break
        }
    }
    else if(lowTemp.temp !== -1 && currentParticle.temp > lowTemp.temp) {
        if(currentParticle.type === 'Solid' && particleType.isLiquid)
                setParticleType(r,c,'Liquid')
        if(currentParticle.type === 'Liquid' && particleType.isGas)
                setParticleType(r,c,'Gas')
    }
    
}

function getSurroundingParticles(r,c) {
    let pixels = new Array(8).fill(-1)
    if(isInBounds(r-1,c-1)) pixels[0] = getParticle(r-1,c-1)
    if(isInBounds(r-1,c)) pixels[1] = getParticle(r-1,c)
    if(isInBounds(r-1,c+1)) pixels[2] = getParticle(r-1,c+1)
    if(isInBounds(r,c-1)) pixels[3] = getParticle(r,c-1)
    if(isInBounds(r,c+1)) pixels[4] = getParticle(r,c+1)
    if(isInBounds(r+1,c-1)) pixels[5] = getParticle(r+1,c-1)
    if(isInBounds(r+1,c)) pixels[6] = getParticle(r+1,c)
    if(isInBounds(r+1,c+1)) pixels[7] = getParticle(r+1,c+1)
    return pixels
}

function setSurroundingParticles(r,c,arr) {
    for(let i = 0; i < 8; i++) {
        if(arr[i] !== -1 && arr[i].id !== VACU) {
            switch(i) {
                case 0:
                    setParticleObj(r-1,c-1,arr[i])
                    break
                case 1:
                    setParticleObj(r-1,c,arr[i])
                    break
                case 2:
                    setParticleObj(r-1,c+1,arr[i])
                    break
                case 3:
                    setParticleObj(r,c-1,arr[i])
                    break
                case 4:
                    setParticleObj(r,c+1,arr[i])
                    break
                case 5:
                    setParticleObj(r+1,c-1,arr[i])
                    break
                case 6:
                    setParticleObj(r+1,c,arr[i])
                    break
                case 7:
                    setParticleObj(r+1,c+1,arr[i])
            }
        }
    }
}

/*
    Heat Transfer Conduction

    Q = (k*A*deltaT)/d
        k = thermal conductivity
        A = Area of material (will always be 1 Particle so yeah)
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