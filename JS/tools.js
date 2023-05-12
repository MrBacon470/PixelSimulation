const tools = [
    {
        name: 'Heat Tool',
        desc: 'Heats Particle by 1 Degree per frame',
        abbr: 'HEAT',
        color: '#FFDD00',
    },
    {
        name: 'Cool Tool',
        desc: 'Cools Particle by 1 Degree per frame',
        abbr: 'COOL',
        color: '#00DDFF',
    },
]

function runTool(r,c) {
    if(pixelSelectedIndex >= 0 || Math.abs(pixelSelectedIndex+1) >= tools.length) return
    const toolSelectedName = tools[Math.abs(pixelSelectedIndex+1)].abbr
    
    switch(toolSelectedName) {
        case 'HEAT':
            particleGrid[r][c].temp += 1
            break
        case 'COOL':
            particleGrid[r][c].temp -= 1
            break
    }
}