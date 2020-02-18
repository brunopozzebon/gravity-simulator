
let renderer = new Renderer();



const planets = Generator.generatePlanets(50);


const simulation = new Simulation(planets);

let animate = function () {
	requestAnimationFrame(animate);
	simulation.update();
	renderer.update(simulation.getScene())
wait(WAIT_TIME);
};
animate();