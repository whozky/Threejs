import * as THREE from 'three';
import { BufferGeometryUtils, OrbitControls } from 'three/examples/jsm/Addons.js';


// Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );



// Background
// const environmentTexture = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

// scene.environment = environmentTexture;
// scene.background = environmentTexture;


// Items
const grid = new THREE.GridHelper(100,100,0xff0000,0xffffff);
grid.position.set(0,-.5,0);
scene.add(grid);





const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMAterial = new THREE.MeshBasicMaterial( { 
	color: 0x00ff00, 
	// wireframe: true
} );


/**
 * Grouping mesh
 */
// const cube1 = new THREE.Mesh( cubeGeometry, cubeMAterial );
// cube1.position.set(-2,0,0);
// const cube2 = new THREE.Mesh( cubeGeometry, cubeMAterial );
// cube2.position.set(0,0,0);
// const cube3 = new THREE.Mesh( cubeGeometry, cubeMAterial );
// cube3.position.set(2,0,0);

// scene.add( cube1 );
// scene.add( cube2 );
// scene.add( cube3 );


// const grouCube = new THREE.Group();
// grouCube.add(cube1);
// grouCube.add(cube2);
// grouCube.add(cube3);

// scene.add(grouCube);


/**
 * Childing mesh
 */
// const cube1 = new THREE.Mesh(cubeGeometry,cubeMAterial);
// const cube2 = new THREE.Mesh(cubeGeometry,cubeMAterial);
// cube2.position.set(0,1,0);
// cube2.scale.set(.5,.5,.5);

// cube1.add(cube2);

// scene.add(cube1);


/**
 * Merging mesh
 */
const sphereGeometry = new THREE.SphereGeometry(1,32,32);
sphereGeometry.scale(.5,.5,.5);
sphereGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0,.5,0));

const mergedGeometry = BufferGeometryUtils.mergeGeometries([sphereGeometry,cubeGeometry],true);


const mesh = new THREE.Mesh(mergedGeometry,cubeMAterial);

scene.add(mesh);






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

	OrbitControl.update();

	// grouCube.rotation.y += .01;
	// cube1.rotation.y -= .05;
	// cube3.rotation.y += .05;

	// cube1.rotation.y += .01;

	mesh.rotation.y += .01;

	renderer.render( scene, camera );

}