let scene = new THREE.Scene();
let renderer = new Renderer();

const planets = generatePlanets(4);

for (let i = 0; i < planets.length; i++) {
	const planet = planets[i];
	scene.add(planet);
}

let animate = function () {
	requestAnimationFrame(animate);
	renderer.update(scene)
};
animate();