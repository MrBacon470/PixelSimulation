//WIFI & Portals have Special Channels
const NUM_CHANNELS = Math.floor((MAX_TEMP-72)/100+2)
console.log(`Max # of Channels ${NUM_CHANNELS}`)
let portalChannels = new Array(NUM_CHANNELS)
let wifiChannels = new Array(NUM_CHANNELS)

for(let i = 0; i < NUM_CHANNELS; i++) {
    portalChannels[i] = new Array(8).fill(-1)
    wifiChannels[i] = new Array(8).fill(-1)
}
/* wifi & portal channel matrixes made 
    get & set Surrounding Particles Special function will be useful
*/

function update_PRTI(r,c) {
    if(!isInBounds) return
    particleGrid[r][c].tmp2 = Math.floor((particleGrid[r][c].temp-72)/100+1)
    if(particleGrid[r][c].tmp2 >= NUM_CHANNELS) particleGrid[r][c].tmp2 = NUM_CHANNELS-1
    else if(particleGrid[r][c].tmp2 < 0) particleGrid[r][c].tmp2 = 0
    const particle = getParticle(r,c)
    //Set Particles into Portal Channel Data
    const surroundingParticles = getSurroundingParticlesSpecial(r,c)
    for(let i = 0; i < 8; i++) {
        if(surroundingParticles[i] !== -1 && portalChannels[particle.tmp2][i] === -1 && !isParticleSolid(surroundingParticles[i].row,surroundingParticles[i].col)) {
            portalChannels[particle.tmp2][i] = surroundingParticles[i]
        }
    }
}

function update_PRTO(r,c) {
    if(!isInBounds(r,c)) return
    particleGrid[r][c].tmp2 = Math.floor((particleGrid[r][c].temp-72)/100+1)
    if(particleGrid[r][c].tmp2 >= NUM_CHANNELS) particleGrid[r][c].tmp2 = NUM_CHANNELS-1
    else if(particleGrid[r][c].tmp2 < 0) particleGrid[r][c].tmp2 = 0
    const particle = getParticle(r,c)
    const surroundingParticles = getSurroundingParticlesSpecial(r,c)
    const portalParticles = portalChannels[particle.tmp2]
    
    for(let i = 0; i < 8; i++) {
        if(surroundingParticles[i] !== -1 && surroundingParticles[i].id === VACU && portalParticles[7-i] !== -1) {
            setParticle(surroundingParticles[i].row,surroundingParticles[i].col,portalParticles[7-i].id)
            setParticle(portalParticles[7-i].row,portalParticles[7-i].col,VACU)
            portalChannels[particle.tmp2][7-i] = -1
        }
    }
}

function getSurroundingParticlesSpecial(r,c) {
    let pixels = new Array(8).fill(-1)
    //Top Row
    if(isInBounds(r-1,c-1)) pixels[0] = {id:getParticle(r-1,c-1).id,row:r-1,col:c-1}
    if(isInBounds(r-1,c)) pixels[1] = {id:getParticle(r-1,c).id,row:r-1,col:c}
    if(isInBounds(r-1,c+1)) pixels[2] = {id:getParticle(r-1,c+1).id,row:r-1,col:c+1}
    //Middle Row
    if(isInBounds(r,c-1)) pixels[3] = {id:getParticle(r,c-1).id,row:r,col:c-1}
    if(isInBounds(r,c+1)) pixels[4] = {id:getParticle(r,c+1).id,row:r,col:c+1}
    //Bottom Row
    if(isInBounds(r+1,c-1)) pixels[5] = {id:getParticle(r+1,c-1).id,row:r+1,col:c-1}
    if(isInBounds(r+1,c)) pixels[6] = {id:getParticle(r+1,c).id,row:r+1,col:c}
    if(isInBounds(r+1,c+1)) pixels[7] = {id:getParticle(r+1,c+1).id,row:r+1,col:c+1}
    return pixels
}