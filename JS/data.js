let dataObject = {
    rows: -1,
    cols: -1,
    matrix: null,
}
let importedDataStr = ''
document.getElementById("fileImport").addEventListener("change", (event) => {
    let fr = new FileReader();
    const files = event.target.files
    fr.onload = () => {
        importedDataStr = fr.result
        importData()
    };  
    fr.readAsText(files[0]);
});

function importData() {
    let dataObj = null
    try {
        dataObj = Object.assign(dataObject,JSON.parse(importedDataStr))
    }
    catch(error) {
        console.error(error)
        return
    }
    for(let r = 0; r < dataObj.rows; r++) {
        for(let c = 0; c < dataObj.cols; c++) {
            particleGrid[r][c] = dataObj.matrix[r][c]
        }
    }
    particleGrid = dataObj.matrix
    updateCanvas()
}

function exportData() {
    dataObject.rows = particleGrid.length
    dataObject.cols = particleGrid[0].length
    dataObject.matrix = particleGrid
    let exportedData = JSON.stringify(dataObject);
    const exportedDataText = document.createElement("textarea");
    const d = new Date()
    downloadToFile(exportedData, `ParticleSimData - ${d}.txt`, 'text/plain')
}

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
      URL.revokeObjectURL(a.href);
}