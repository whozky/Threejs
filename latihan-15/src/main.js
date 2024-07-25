import * as THREE from 'three';
import CANNON from 'cannon';
import CannonDebugRenderer from 'cannon-es-debugger';
import { OrbitControls } from 'three/examples/jsm/Addons.js';




// Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );



// Background
const environmentTexture = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

scene.environment = environmentTexture;
scene.background = environmentTexture;


// Items
const grid = new THREE.GridHelper(100, 100, 0xff0000, 0xffffff);
grid.position.set(0,-.5,0);
scene.add(grid);


/**
 * Cannon
 */
const world = new CANNON.World();
world.gravity.set(0,-1.6333,0);


const plane = new CANNON.Plane();
const planeBody = new CANNON.Body({
	shape: plane,
	mass: 0,
});
planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0), -Math.PI/2);
planeBody.position.set(0,-.5,0);

world.addBody(planeBody);

const bodies = [];
const meshes = [];

function createCube() {
	// create cube body
	const cube = new CANNON.Box(new CANNON.Vec3(.5,.5,.5));
	const cubeBody = new CANNON.Body({
	  shape: cube,
	  mass: 1,
	});
	cubeBody.position.set(Math.random(),5,Math.random());
	bodies.push(cubeBody);
	world.addBody(cubeBody);
	// create cube mesh
	const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
	const cubeMAterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
	const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMAterial);
	meshes.push(cubeMesh);
	scene.add(cubeMesh);
};


function updateCube() {
	for(let i=0; i<meshes.length; i++) {
	  meshes[i].position.copy(bodies[i].position);
	  meshes[i].quaternion.copy(bodies[i].quaternion);
	}
};


setInterval(() => {
	createCube();
}, 1000);


const debugRenderer = new CannonDebugRenderer(scene,world,{
  color: 0xff00ff,
});



// Controls
const OrbitControl = new OrbitControls(camera,renderer.domElement);
OrbitControl.enableDamping = true;


// Responsive window
window.addEventListener('resize', function() {
	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
	camera.aspect = this.window.innerWidth/this.window.innerHeight;
	camera.updateProjectionMatrix()
});


function animate() {

	world.step(1/60);

	// cube1.position.copy(cubeBody.position);
	// cube1.quaternion.copy(cubeBody.quaternion);

	updateCube();
	
	debugRenderer.update();

	OrbitControl.update();


	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}
