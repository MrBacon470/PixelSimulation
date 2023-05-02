# Main Functions and Utility Functions Documentation
## **Main Script Functions (2)**
### Init()
For those with experience in unity and many other game engines will know what this is. The **Init()** function is the simulator's start function and will run on the page's load and it only runs that one time
### Update()
The update function should be utilized sparingly due to the nature it runs every 50ms. Putting too many things in this function will cause lag and performance hits.
## Warning: Do not modify code inside these two functions unless you know what you're doing as it will affect the basic behaviors of the simulator
***
## **Utility Script Functions (16)**
### **Miscellaneous Functions**
### getRandomInt(max)
Very simple it returns a number randomly from 0 to max-1
### addHTML(target,html) 
Both parameters are strings, **target** is the DOM Element where the **html** parameter will be placed. The new HTML is always placed at the end of the **target** element.
### celsiusToFarenheit(temperature) & farenheitToCelsius(temperature)
Does what you think you pass in the temperature and it will return the converted version
### isInBounds(r,c)
Returns a boolean based on if r & c is in bounds
### restrictNum(num,max,min)
If num is NaN will return 0, if num is greater than max returns max or if num is less than min returns min otherwise it will return num
### lerpRGB(r1,g1,b1,r2,g2,b2,scale)
Returns an object that is **{r:lerpedRed,g:lerpedGreen,b:lerpedBlue}** the result of linearly intepolating between two colors and the scale is a number that is from 0 to 1 that determines how close to one color or the other it is
### getPixelTempColor(r,c)
Will return the temperature scale of the particle only used when the temperature display mode is enabled
### rgbToHex(r,g,b) & hexToRgb(hex)
Converts a css rgb color string to a hexadecimal color string and a hexadecimal color string to an object that is **{r: red, g: green, b: blue}**

### **Particle Related Functions**
### getParticle(r,c)
Will get the particle object at the position **(r,c)**:
r is the row and c is the column. It will return nothing if either parameter is OutOfBounds. Otherwise it returns an particle object that looks like this **{id: particleID, temp: particleTemperature, type: howTheParticleMoves}**
### getParticleType(r,c)
Returns the Particle Type Object Based on the id parameter of the particle at r,c
### setParticle(r,c,id)
This setParticle function will set the particle at **(r,c)** to the default version of the particle defined in the particleTypes array at **id**. If r or c is OutOfBounds or id is OutOfBounds it will return and do nothing.
### setParticleId(r,c,id)
This is different than the previous function it will only change the id and the type parameter of the particle object at **(r,c)**. It will change the particle type parameter to whatever the default for the particleType at id is. It will do nothing if r,c or id is OutOfBounds
### setParticleType(r,c,type)
This function will only change the type parameter of the particle object at **(r,c)**. Currently accepted types are as follows ('Solid','Powder','Liquid','Gas'). It will do nothing if r or c is OutOfBounds.
### setParticleObj(r,c,obj) 
This function will return and do nothing if r or c is OutOfBounds or if obj is null or undefined
This function will set the three parameters of obj to the particle at **(r,c)**. The correct format of a particle object is **{id: particleID, temp: particleTemperature, type: howTheParticleMoves}**
### Note: All setParticle functions will call the drawParticle function after they set their data.
