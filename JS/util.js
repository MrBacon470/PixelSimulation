function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function addHTML(target,html) {
    document.getElementById(target).insertAdjacentHTML('beforeend',html)
}

function getPixel(r,c) {
    return pixelGrid[r][c];
}

function setPixel(r,c,id) {
    if(r < 0 || r >= pixelGrid.length) {
        console.error('r is outOfBounds in setPixel Function')
        return
    }
    if(c < 0 || c >= pixelGrid[r].length) {
        console.error('c is outOfBounds in setPixel Function')
        return
    }
    if(id < 0 || id >= pixelTypes.length) {
        console.error('id is outOfBounds in setPixel function')
        return
    }
    pixelGrid[r][c].id = id
    //pixelGrid[r][c].temp = pixelTypes[id].defaultTemp
}

function setPixelObj(r,c,obj) {
    if(r < 0 || r >= pixelGrid.length) {
        console.error('r is outOfBounds in setPixel Function')
        return
    }
    if(c < 0 || c >= pixelGrid[r].length) {
        console.error('c is outOfBounds in setPixel Function')
        return
    }
    pixelGrid[r][c].id = obj.id
    pixelGrid[r][c].temp = obj.temp
}

