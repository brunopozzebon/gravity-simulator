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
    let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.7;
    controls.dynamicDampingFactor = 0.3;
    return controls;
  }

  createCamera(){
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    return camera;
  }

  update(scene){
    this.controls.update();
    this.renderer.render(scene, this.camera);
  }
}