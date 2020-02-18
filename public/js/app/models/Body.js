class Body {
  constructor(pos_x = 1, pos_y = 1, pos_z = 1, radious = 1, vel_x = 0, vel_y = 0, vel_z = 0) {
    let geometry = new THREE.SphereGeometry(radious, 32, 32);
    var texture = new THREE.TextureLoader().load( '../../textures/rock.jpg' );
    var material = new THREE.MeshPhongMaterial( { map: texture,shininess:20 } );
  
    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.set(pos_x, pos_y, pos_z);
    this.sphere.castShadow = true;
    this.velocity = new THREE.Vector3(vel_x, vel_y, vel_z);
    this.acceleration = new THREE.Vector3();
    this.forces = new THREE.Vector3();
    this.volume = (4 / 3) * Math.PI * (Math.pow(radious, 3));
    this.radious = radious;
    this.mass = this.volume * DENSITY;

    this.trace = Generator.generateTrace(pos_x,pos_y,pos_z);
    this.index = 0;
    this.traceJump = TRACE_JUMP;
  }

  update() {
    this.sphere.rotation.y = Date.now() * -0.0001;
    let collidingPlanet = this.collidingPlanet();
    if (collidingPlanet) {
      this.mergeWith(collidingPlanet);
    }

    this.forces = this.computeTotalForces();
    this.acceleration = this.forces.clone().multiplyScalar(1 / this.mass);
    this.checkAccelarationLimit();
    this.velocity.add(this.acceleration.clone().multiplyScalar(FIXED_DT));
    this.sphere.position.add(this.velocity.clone().multiplyScalar(FIXED_DT));

    this.computeTrace();
  }

  attractionTo(otherPlanet) {
    if (otherPlanet == this) {
      return new THREE.Vector3(0, 0, 0);
    }

    const distanceBetweenPlanetsVector = otherPlanet.sphere.position.clone().sub(this.sphere.position)
    const forceScalar = newtonGravitationLaw(this.mass, otherPlanet.mass, otherPlanet.sphere.position.distanceTo(this.sphere.position))
    const forceVector = distanceBetweenPlanetsVector.clone().normalize().multiplyScalar(forceScalar)

    return forceVector;
  }

  computeTotalForces() {
    return this.simulation.planets
      .reduce((forces, planet) => forces.add(this.attractionTo(planet)), new THREE.Vector3())
  }

  addVolume(differenceVolume) {
    this.volume+=differenceVolume;
    let oldRadios = this.radious;
    this.radious = calculateRadiousOfSphereWithVolume(this.volume);
    this.mass= this.volume * DENSITY;
    let factor = this.radious / oldRadios;
    this.sphere.scale.x *= factor;
    this.sphere.scale.y *= factor;
    this.sphere.scale.z *= factor;
  }

  mergeWith(planet) {
    let distance = planet.sphere.position.distanceTo(this.sphere.position);
    let difference = Math.abs(distance - this.radious - planet.radious);
    let volumeDifference = this.volume - (calculateVolumeOfSphere(this.radious-difference));

    planet.addVolume(volumeDifference)
    this.addVolume(-volumeDifference)

    if (this.radious <= 0.1) {
      this.removed = true
      this.simulation.removePlanet(this)
    }
  }

  collidingPlanet() {
    return this.simulation.planets.find(p => this.collidingWith(p))
  }

  collidingWith(planet) {
    if (planet == this || planet.radious < this.radious || this.removed)
      return false
    let distanceScalar = planet.sphere.position.distanceTo(this.sphere.position);
    if (distanceScalar < planet.radious + this.radious) {
      return true
    }
    return false
  }

  checkAccelarationLimit(){
    if (this.acceleration.length() > MAX_ACCELERATION_MAGNITUDE) {
      this.exceeded_max_acceleration = true
      this.acceleration.multiplyScalar(0)
    } else {
      this.exceeded_max_acceleration = false
    }
  }

  computeTrace(){

  
    this.traceJump--;
    if (this.traceJump == 0) {
      let positions = this.trace.geometry.attributes.position.array;

      if(this.index < TRACE_LENGTH * 3){
        positions[this.index++] = this.sphere.position.x;
        positions[this.index++] = this.sphere.position.y;
        positions[this.index++] = this.sphere.position.z;
        this.trace.geometry.setDrawRange(0, this.index/3);
      }else{
        
        for(let i=0;i<TRACE_LENGTH*3-3;i++){
          positions[i] = positions[i+3]
        } 
        //Change the above code, it´s consume too much processement
        positions[TRACE_LENGTH*3-3]=this.sphere.position.x;
        positions[TRACE_LENGTH*3-2]=this.sphere.position.y
        positions[TRACE_LENGTH*3-1]=this.sphere.position.z
      }

      this.trace.geometry.computeBoundingSphere();
      this.trace.geometry.attributes.position.needsUpdate = true;
      this.traceJump = TRACE_JUMP;
    }
  }
}