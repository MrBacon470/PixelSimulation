const canvasData = {
    height: 800,
    width: 800,
    pixelSize: 16,
}

let canvas = document.getElementById('simulationCanvas')
canvas.setAttribute('height',`${canvasData.height}px`)
canvas.setAttribute('width',`${canvasData.width}px`)


let size = 16;
let canvas2D = canvas.getContext('2d')
canvas2D.fillStyle = '#ff0000'
canvas2D.fillRect(0,0,size,size)
canvas2D.fillStyle = '#123123'
canvas2D.fillRect(16,0,size,size)
