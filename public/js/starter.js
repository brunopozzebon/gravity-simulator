
let renderer = new Renderer();



const planets = Generator.generatePlanets(10);


const simulation = new Simulation(planets);

let animate = function () {
	requestAnimationFrame(animate);
	simulation.update();
	renderer.update(simulation.getScene())

};
animate();