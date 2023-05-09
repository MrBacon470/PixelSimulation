let dataObject = {
    rows: -1,
    cols: -1,
    matrix: null,
}

function importData() {
    const importedData = document.getElementById('importField').value
    if(importedData <= 0 || importData === undefined) {
        console.warn('Data Input is undefined or length 0')
        return
    }
    let dataObj = null
    try {
        dataObj = Object.assign(dataObject,JSON.parse(importedData))
    }
    catch(error) {
        console.warn(`${error} in importData()`)
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
    downloadToFile(exportedData, `${d}.txt`, 'text/plain')
}

const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
      URL.revokeObjectURL(a.href);
}