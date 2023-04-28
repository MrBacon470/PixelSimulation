# Particle Documentation Page
## Particle Type Objects
```js
    //Example Particle Type Object
    {
        name: 'Vacuum',
        desc: 'Literally Nothing',
        abbr: 'VACU',
        color: '#000000',
        flammable: false,
        conductive: false,
        weight: 0,
        heatConductivity: 0,
        defaultTemp: 0.0, 
        highTemperatureChange: {temp:-1,type:-1},
        lowTemperatureChange: {temp:-1,type:-1},
        isLiquid: false,
        isGas: false,
        isPowder: false,
    },
```
This is just an example particle (yes the vacuum particle is in game though). Particle Types are housed in the **const particleTypes = []** array inside the pixels.js script, To add your own just add an object just like the one you see above to the end of the array. Now I'm going to explain every particle attribute and how they work.
### Particle Attributes
`name:` The name attribute is the display name of the particle to the user.<br>
`desc:` Its the display description of the particle to the user.<br>
`abbr:` A 3-4 Letter all caps abbreviation of the particle's name, this concept is copied from [The Powder Toy](https://powdertoy.co.uk/) and is the display name for the particle's button in game.<br>
`color:` Any hexadecimal CSS color string for the particle's display and button color.<br>
`flammable:` This boolean determines whether or not fire will spread to this particle.<br>
`conductive:` This boolean determines whether or not the particle conducts electricity. [Electricity is not implemented yet]<br>
`weight:` This number only affects gravity affected particles: Powders, Gasses and Liquids. Heavier liquids, powders and gasses will sink below lighter versions of their type.<br>
`heatConductivity:` A number from 0-255 that determines how heat transfers itself from that particle to others. (0 is a perfect insulator & 255 is a perfect conductor)<br>
`defaultTemp:` This is the temperature in Farenheit that a new particle spawns in at.<br>
### **Warning complicated attributes below**
`highTemperatureChange: {temp: Number, type: Number}` The temp attribute in the highTemperatureChange object determines what temperature the particle will either A) Melt or Boil a particle into a Liquid or Gas, or B) turn into the particle defined in the type attribute. (Ex: Sand melts into glass)<br>
`lowTemperatureChange: {temp: Number, type: Number}` This object attribute is very similar to the highTemperatureChange attribute except Liquids will freeze solid and Gasses will condense into liquids.
### Note for both attributes if temp: is -1 then no conversions will happen if type: is -1 and temp isn't than the particle will by default, freeze, condense, melt or boil.
### **Gravity affected particle attributes**
`isLiquid:` Determines if a particle by default moves like a liquid and is the liquid type.<br>
`isGas:` Determines if a particle by default moves like a gas and is the gas type.<br>
`isPowder:` Determines if a particle by default moves like a powder and is the type powder.<br>
### Note: If a particle has the isLiquid, isGas and isPowder attributes false is will be of type Solid which is static. Also a particle can only have one of those attributes set to true
## Particle Objects in the particleGrid matrix
```js
//Example Particle (VACU)
{id: 0, temp: 0.0, type: 'Solid'}
```
The **particleGrid** matrix holds all of the particle positions in the game I would recommend you not change data in the matrix unless know what you are doing. You can change particle data in the matrix easily using the built in setParticle functions which are documented in the Utility Functions section.<br>
## updateParticle()
## particleConversions(r,c)