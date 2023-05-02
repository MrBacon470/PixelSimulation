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
    let dataObj = Object.assign(dataObject,JSON.parse(importedData))
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
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
}