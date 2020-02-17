class Renderer{
  constructor(){
    this.renderer = this.createAndSetUpRenderer();
    this.camera = this.createCamera();
    this.controls = this.createControls();
   
  }

  createAndSetUpRenderer(){
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
  }

  createControls(){
    let controls = new THREE.TrackballControls(this.camera, this.renderer.domElement);
    controls.rotateSpeed = 1;
    controls.zoomSpeed = 5;
    controls.panSpeed =2;
    controls.maxDistance = 1500;
    controls.dynamicDampingFactor = 0.5;
    
    return controls;
  }

  createCamera(){
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 30000);
    camera.position.z = 50;
    return camera;
  }

  update(scene){
    this.controls.update();
    this.renderer.render(scene, this.camera);
  }
}