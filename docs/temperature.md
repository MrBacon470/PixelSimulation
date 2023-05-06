# Temperature System Documentation
## **Important Functions**<br>**Don't Modify either of these functions unless you know what you're doing**
## heatTransfer(r,c)
### Base Cases
- VACU Particles are set to a temperature of 0 degrees and the function returns
- Particle's temperature > MAX_TEMP the Particle's temp is set to MAX_TEMP and returns
- Particle's temperature < MIN_TEMP the Particle's temp is set to MIN_TEMP and returns
- Particle's temp is > or < 72.0 degrees (room temperature) then it is increased or decreased accordingly
### Temperature Change Explained
Temperature Change is based on an average temperature of the particle selected based on position r,c. And all of its 8 surrounding particles.
## phaseChange(r,c)
This determines if a particle's type or what the particle is should change its determined off of 4 factors: the highTemperatureChange temp & type & the lowTemperatureChange temp & type attributes.
### Default Changes
### Particle Temp >= HighTempChange.temp && type != -1
Particle being changed becomes the particle defined in the type attribute
### Particle Temp >= HighTempChange.temp && type == -1
Particle will either boil if its liquid or melt if its solid
### Particle Temp <= LowTempChange.temp && type != -1
Particle will turn into the particle defined in the type attribute
### Particle Temp <= LowTempChange.temp && type == -1
Particle will condense if Gas or Freeze if Liquid
### Note particles will convert back to their original type automatically in this method
***
## **Helper Functions**
## getSurroundingParticles(r,c)
Returns an array with a size of 8 if a particle is outOfBounds it is represented by -1 otherwise it is the particleObject. The range is **(r-1,c-1)** -> **(r+1,c+1)** it does not include the particle at (r,c).
## setSurroundingParticles(r,c,arr)
sets the particles around (r,c) with the length 8 array from getSurroundingParticles(r,c).