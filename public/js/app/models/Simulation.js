class Simulation {
  constructor(planets) {

    this.planets = planets || []
    this.planets.map(p => p.simulation = this)
    this.scene = this.createScene();
  }

  createScene() {
    let scene = new THREE.Scene();
    for (let i = 0; i < this.planets.length; i++) {
      const planet = planets[i];
      scene.add(planet.sphere);
      scene.add(planet.trace);
    }
    scene.add(Generator.generateDome());
    scene.add(Generator.generateLight(100,100,100))
    return scene;
  }

  update() {
    this.planets.map(planet => planet.update())
  }

  removePlanet(planet) {
    this.planets = this.planets.filter(p => p != planet);
    this.scene.remove(planet.sphere);
    this.scene.remove(planet.trace);
    planet.sphere.geometry.dispose();
    planet.sphere.material.dispose();
    planet.trace.geometry.dispose();
    planet.trace.material.dispose();
  }

  getScene() {
    return this.scene;
  }

}