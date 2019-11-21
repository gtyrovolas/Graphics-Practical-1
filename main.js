// Add any resources you want to load here
// You will then be able to reference them in initialise_scene
// e.g. as "resources.vert_shader"
RESOURCES = [
  // format is:
  // ["name", "path-to-resource"]
  ["vert_shader", "shaders/default.vert"],
  ["frag_shader", "shaders/default.frag"]
]

/* 
    
    Create the scene

*/

function initialise_scene() {
  // You can use your loaded resources here; resources.vert_shader will
  // be the content of the vert_shader file listed in RESOURCES, for
  // example

  // Set up the key parts of your renderer: a camera, a scene and the renderer
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  // fov, aspect ratio, nearest, furthest

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  // Add things to your scene here

  //added cube
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshPhongMaterial({color: 0x888888});
  const cube = new THREE.Mesh(geometry, material);
  cube.position.z = -3
  scene.add(cube);

  const sphereGeom = new THREE.SphereGeometry(0.75,40,40);
  const sphereMat = new THREE.MeshPhongMaterial({color: 0x449999});
  const sphere = new THREE.Mesh(sphereGeom,sphereMat);
  sphere.position.z = -3;
  sphere.position.x = 2;
  scene.add(sphere);




  //light source
      
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);



  // Your animation loop, which will run repeatedly and renders a new frame each time
  var animate = function (time) {
    requestAnimationFrame( animate );
  	
  	const canvas = renderer.domElement;
  	camera.aspect = canvas.clientWidth / canvas.clientHeight;
  	camera.updateProjectionMatrix();


    time *= 0.001;
    cube.rotation.x = time/4;
    cube.rotation.y = time/4;
  	cube.rotation.z = time/4;

//  	sphere.rotation.x = time;
    renderer.render( scene, camera );
  };

  animate();
}





/*  Asynchronously load resources

    You shouldn't need to change this - you can add
    more resources by changing RESOURCES above */

function load_resources() {
  var promises = []

  for(let r of RESOURCES) {
    promises.push(fetch(r[1])
    .then(res => res.text()))
  }

  return Promise.all(promises).then(function(res) {
    let resources = {}
    for(let i in RESOURCES) {
      resources[RESOURCES[i][0]] = res[i]
    }
    return resources
  })
}

// Load the resources and then create the scene when resources are loaded
load_resources().then(res => initialise_scene(res))
