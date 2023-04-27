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
    let dataObj = Object.assign(dataObject,JSON.parse(atob(importedData)))
    pixelGrid = dataObj.matrix
    updateCanvas()
}

function exportData() {
    dataObject.rows = pixelGrid.length
    dataObject.cols = pixelGrid[0].length
    dataObject.matrix = pixelGrid
    let exportedData = JSON.stringify(dataObject);
    const exportedDataText = document.createElement("textarea");
    exportedDataText.value = exportedData;
    document.body.appendChild(exportedDataText);
    exportedDataText.select();
    exportedDataText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(exportedDataText);
}