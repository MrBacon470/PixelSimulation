# Simulation Canvas & Canvas.js Documentation

## Canvas Data

The **canvasData** object in canvas.js determines a few things when the Init() function is called: the height and width of the simulation canvas, size of a particle on the screen, and how large the particleGrid matrix variable is. The default values are a height and width of 640px and a pixel size of 16px.

## Event Listeners on the Canvas

### mousemove

This is the most important of the event listeners as it calculates the mouse position on the canvas and then calculates it into a row and column value for use in creating particles and display the particle data the mouse is over.

### mouseup

This sets the isMouseDown boolean flag to false.

### mousedown

This sets the isMouseDown boolean flag to true.

### mouseenter

This sets the isMouseInCanvas boolean flag to true.

### mouseleave

This sets the isMouseInCanvas boolean flag to true.

### Why are these important?

The isMouseDown and isMouseInCanvas flags are what allow holding the mouse to place particles and determine whether a particle should be created.

## getMousePosition(evt)

This is the function called by the **mousemove event listener** it returns the exact position of the mouse on the canvas it does take in an event for the evt parameter. It returns an object in this format: **{x: xPos, y: yPos}**

## updateCanvas()

The updateCanvas function should not be used often as it will cause lag, this function will update and redisplay every particle on the screen using a nested for-loop, hence why overuse can cause major performance issues.

## drawParticle(r,c)

The drawParticle function is what displays the particles on the canvas. It sets the color of a particle by default to 3 different things:

- Its color as defined in its particleType object
- Its lerped temperature scale color if the temperature display is enabled
- \*A lerped color scale for materials that melt such as METL and GLAS.

## floodFillPixels(row,col)

This is the bucket fill runner function that runs the floodFillAlgorithms in the function called **fill(row,col,current)**. I would recommend not tampering with this either.
