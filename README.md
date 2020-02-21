# Gravity Simulator

This project is a 3D browser application, that uses ThreeJS to create an awesome gravity simulator. 

![new](https://user-images.githubusercontent.com/37053115/74696286-c7314400-51d5-11ea-8e70-b88d3d342ab3.png)

## :file_folder: Requirements
1. Node
2. Yarn or Npm

## :rocket: How to run it
```bash
# Clone this repository
git clone https://github.com/brunopozzebon/gravity-simulator.git

# Go into the repository
cd gravity-simulator

# If you are using Yarn
yarn install 

# Run locally, on localhost:3000
yarn run start

# If you are using npm, replace the yarn command to npm

```
## :gear: How to use it
The program begins with the file starter.js.
```javascript
let renderer = new Renderer();

const planets = Generator.generateRandomPlanets(10,20);
const simulation = new Simulation(planets);

let animate = function () {
	requestAnimationFrame(animate);
	simulation.update();
	renderer.update(simulation.getScene())
};
animate();
```
To change the simulation, you can chose a different method of Generator.
```bash
Generator.generatePlanets(quantity, spread) 
#It'll create 'quantity' planets, with random position, radius and velocity, 
#The spread will affect the distance among these planets
Generator.generateDualPlanets() 
#It'll create an planet in the center, and another one orbiting it.
Generator.generateStableSystem() 
#It'll create an system, with one 'planet' in the center, two 'satellites' orbiting it, and an asteroid, orbiting the last 'moon'.
```
To a most flexible implementation, you can create your own array of objects, adding the final array to the Simulation constructor, as the following code

```javascript
const planets = new Array();
planets.push(new Body(0,0,0,2,0,20,20))
planets.push(new Body(0,100,0,10,10,10,0))
//Each body will be a "planet" on the simulation
//Body(ini_pos_x, ini_pos_y, ini_pos_z, radious, ini_vel_x, ini_vel_y, ini_vel_z )
const simulation = new Simulation(planets);
```
### Controls
```bash
Zoom - Scrolling wheel
Pan - Mouse, right button pressed
Rotate - Mouse, left button pressed

```

## :v: Acknowledgment

This project is based in a 2D version of Ivan Seidel, called BigBangJs, he created an awesome video explaining all the math concepts about the gravity theory on Youtube(I really recomment it).
I was inspired for his work, so i need to thank him for publishing his code on Github. Below, the links for his video and his respository;\
[Ivan´s Youtube Video](https://www.youtube.com/watch?v=C5_7IV9XFd4) - [BigBangJs Github Repository](https://github.com/ivanseidel/BigBang-js)
