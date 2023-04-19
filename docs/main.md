# Main.js Information
## Important Functions
### **Init()**
`function Init() {}` - Is called on page load essentially think of this as the start() method from the Unity game engine<br>
This function does contain a lot of important code to generate UI and other elements on page load modify at your own risk
### **Update()**
`function Update() {}` - This is well the simulator's equivalent of the update() method from unity<br>
Be warned this function is called every 50ms so make sure you're not overusing it or you will experience lag.
***
# Util.js Information
## Important Functions
### **getRandomInt(max)**
`function getRandomInt(max) {}` - Is able to get you a a number randomly in a range of 0-(max-1)
### **addHTML(target,html)**
`function addHTML(target,html) {}` - Adds a new html element based on the string passed in through the `html` argument at the end of the parent object specified by its ID in string form through the `target` argument