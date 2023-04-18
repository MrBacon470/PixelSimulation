# Pixel/Particle Documentation
## How to add Pixels
### Pixel Objects
```js
const pixelTypes = [
    {
        name: 'particleName',
        desc: 'particleDescription',
        abbr: 'PART',
        color: '#000000',
        flammable: false,
        conductive: false,
        mass: 0.0,
        isLiquid: false,
        isGas: false,
        isPowder: false,
    }
]
```
### Attributes Explained - All are required for a particle to work
`name:` - Simple its the name category for a particle<br>
`desc:` - The description of a particle<br>
`abbr:` - The 4 Letter **ALL CAPS** abbreviation for the particle (Like how the game "the powder toy" does it)<br>
`color:` - The hex color for the particle and its corresponding button<br>
`flammable:` - True or False determines if a particle can be burn<br>
`conductive:` - True or False determines if electrical current travels through a particle [WIP]<br>
`mass:` - Only useful for non static particles determines whether they sink or float<br>
`isLiquid:` - True or False allows for particle to move like a liquid<br>
`isGas:` - True or False allows for particle to move like a gas<br>
`isPowder:` - True of False allows for particle to move like a powder (Ex: Sand)<br>
### Tips
A particle that is not a liquid, gas or powder is static by default<br>
A particle can't act like a liquid or gas or powder at the same time, it must only be one of the types<br>
Keep your particle abbreviations recognizable to what it is
***
## How pixels update
```js
function updatePixel() {
    let row = getRandomInt(pixelGrid.length) //Selects Pixel Row to Be Updated
    let col = getRandomInt(pixelGrid[row].length) //Selects Pixel Column to Be Updated
    if(pixelTypes[getPixelID(row,col)].isPowder) {
        //Powders Update Here
    }
    else if(pixelTypes[getPixelID(row,col)].isLiquid) {
        //Liquids Update Here
    }
    else if(pixelTypes[getPixelID(row,col)].isGas) {
        //Gasses Update Here
    }
    else if(pixelGrid[row][col] == FIRE) {
        //Fire Updates Here
    }
    else if(pixelGrid[row][col] == SPRK) {
        //Sparks Update Here
    }
}
```
### Explained
Pixel Updates happen randomly in order to make the game look more seamless, hence the random number generation<br>
The first 5 updates are created by me and are by default they are: Powders, Liquids, Gasses, Fire & Spark<br>
Any particle that has the powder attribute, liquid attribute or gas attribute set to true will be updated one of those default cases<br>
The fire update handles flammables as well as converting water to water vapor on contact and can be edited to handle other conversions<br>
The spark update handles the electrical current transfer aspect of the spark particle its currently a [WIP] particle<br>
Custom particle updates can be added after the default 5 by adding another `else if(condition){}` statement<br>
### Tips
I recommend you don't modify the default update cases unless you really know what you're doing because if they break the game won't work properly<br>
If your particle isn't updating how you want make sure to verify it doesn't have one of the attributes mentioned above enabled in its object<br>
***
## Misc