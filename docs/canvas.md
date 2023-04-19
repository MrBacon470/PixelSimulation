# Canvas.js Documentation
## Canvas Data
```js
const canvasData = {
    height: 640,
    width: 640,
    pixelSize: 16,
}
```
`height: & width:` These are both in pixels (px) and are well the canvas' height & width<br>
`pixelSize:` Is what determines the displayed size of a particle/pixel and how the math works to determine mouse position and the data matrix's size<br>
## Other Important Stuff
`function getMousePos(evt) {}` - Using an event handler it gets the mouse's current position on the canvas<br>
`function updateCanvas() {}` - Will update every pixel on the canvas only really used on start, will cause lag if called a ton of times<br>
**Note -** there is a few event handlers this file adds to the canvas which are used to place the particles modify at your own risk