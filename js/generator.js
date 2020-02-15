let generatePlanets = (quantity)=>{
  const planets = Array();

  for(let i=0;i<quantity;i++){
    let randScale = Math.random();
    let randX = (Math.random()*4)-1;
    let randY = (Math.random()*4)-1;
    let randZ = (Math.random()*4)-1;


    let geometry = new THREE.SphereGeometry(randScale,32,32);
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(randX,randY,randZ);
    planets.push(sphere);
  }

  return planets;
}