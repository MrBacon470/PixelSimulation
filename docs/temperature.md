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
***
## **Helper Functions**
## getSurroundingParticles(r,c)
## setSurroundingParticles(r,c,arr)