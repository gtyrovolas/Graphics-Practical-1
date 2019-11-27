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

function initialise_scene(resources) {
  // You can use your loaded resources here; resources.vert_shader will
  // be the content of the vert_shader file listed in RESOURCES, for
  // example

  // Set up the key parts of your renderer: a camera, a scene and the renderer
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.x = 20;
  camera.position.y = 40;
  camera.position.z = 20;
  camera.lookAt(0,0,0); 
  // fov, aspect ratio, nearest, furthest

  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  // Add things to your scene here

  const objects = [];

// Parent node



  //Then God said, "Let there be light"; and there was light.
  const color = 0xEEEEEE;
  const intensity = 3;
  const light = new THREE.PointLight(color, intensity);
  scene.add(light);


/*So God made the dome and separated the waters that were under the dome from the 
  waters that were above the dome. And it was so. God called the dome Sky. 
  And there was evening and there was morning, the second day.*/
  
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  /*And God said, "Let there be lights in the dome of the sky to separate the day from the night; 
  and let them be for signs and for seasons and for days and years, and let them be lights in the
   dome of the sky to give light upon the earth." And it was so.
  */

  /* God made the two great lights - the greater light to rule the day */

  const sphereGeometry = new THREE.SphereGeometry(1,40,40);
  const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(3,3,3);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

 /*And God said, "Let the waters under the sky be gathered together into one place,
  and let the dry land appear." And it was so. God called the dry land Earth,
  and the waters that were gathered together he called Seas. And God saw that it was good.*/

  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 20;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);


  const earthMaterial = new THREE.ShaderMaterial({vertexShader: resources["vert_shader"], fragmentShader: resources["frag_shader"], uniforms: {color: {value: new THREE.Vector3(34.0/255,(3 * 16.0 + 3.0)/255,1) } } });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  /*and the lesser light to rule the night*/

  const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(.5,.5,.5); 
  moonMesh.position.x = 2;
  earthMesh.add(moonMesh);
  objects.push(moonMesh);





  // Your animation loop, which will run repeatedly and renders a new frame each time
  var animate = function (time) {
    requestAnimationFrame( animate );
  	
  	const canvas = renderer.domElement;
  	camera.aspect = canvas.clientWidth / canvas.clientHeight;
  	camera.updateProjectionMatrix();


    time *= 0.001;

     objects.forEach((obj) => {
      obj.rotation.y = time/3;
    });

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
