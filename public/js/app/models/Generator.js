class Generator{
  static generateRandomPlanets (quantity=10, spread=50){
    const planets = Array();
    for(let i=0;i<quantity;i++){
      let randRadious = Math.random();
      let randX = ((Math.random()*spread)-spread/2);
      let randY = ((Math.random()*spread)-spread/2);
      let randZ = ((Math.random()*spread)-spread/2);
      let velX = (Math.random()*1)-1;
      let velY = (Math.random()*1)-1;
      let velZ = (Math.random()*1)-1;
      let body = new Body(randX, randY, randZ, randRadious,velX,velY,velZ);
      planets.push(body);
    }
    return planets;
  }

  static generateDualPlanets(){
    const planets = Array();
    planets.push(new Body(0, 0, 0, 10,0,0,0));
    planets.push(new Body(40, 40, 0, 1,-20,10,0));
    return planets;
  }

  static generateStableSystem(){
    const planets = Array();
    planets.push(new Body(0, 0, 0, 10,0,0,0));
    planets.push(new Body(20, 20, 0, 1,-20,20,0));
    planets.push(new Body(120, 120, 0, 3,-10,10,0));
    planets.push(new Body(128, 128, 0, 0.05,-15,15,0));
    return planets;
  }

  static generateLight(x,y,z){
    let bulbGeometry = new THREE.SphereBufferGeometry(4, 16, 8);
    let bulbLight = new THREE.PointLight(0xffffff, 2, 1000, 2);

    let bulbMat = new THREE.MeshStandardMaterial({
      emissive: 0xffffee,
      emissiveIntensity: 1000,
      color: 0x000000
    });
    bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
    bulbLight.position.set(x, y, z);
    return bulbLight;
  }

  static generateDome(){
    var skyGeo = new THREE.SphereGeometry(10000, 25, 25);
    var loader = new THREE.TextureLoader(),
      texture = loader.load("../../textures/background.jpg");
    var material = new THREE.MeshBasicMaterial({
      map: texture, transparent: true, opacity: 0.5
    });
    var sky = new THREE.Mesh(skyGeo, material);
    sky.material.side = THREE.BackSide;
   return sky;
  }

  static generateTrace(pos_x,pos_y,pos_z){
    let traceMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
    let traceGeometry = new THREE.BufferGeometry();
    let buffer = new Float32Array(TRACE_LENGTH * 3);
    fillBufferWithInicialValue(buffer,pos_x,pos_y,pos_z);
    traceGeometry.setAttribute('position', new THREE.BufferAttribute(buffer, 3));
    traceGeometry.setDrawRange(0, 3);
    return new THREE.Line(traceGeometry, traceMaterial);
  }
}