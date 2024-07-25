import * as THREE from 'three';
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
// const environmentTexture = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

// scene.environment = environmentTexture;
// scene.background = environmentTexture;


// Items
const grid = new THREE.GridHelper(100,100,0xfafafa,0xfafafa);
grid.position.set(0,-.5,0);
scene.add(grid);

const ambientLight = new THREE.AmbientLight();
ambientLight.position.set(0,5,0);
scene.add(ambientLight);

// Shape
const heartShape = new THREE.Shape();

heartShape.moveTo( 25, 25 );
heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

const extrudeSettings = { 
	depth: 4, 
	steps: 2,
};

const shapeGeometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

const mesh = new THREE.Mesh( shapeGeometry, new THREE.MeshPhongMaterial({
	color: 'red', 
	// wireframe: true
}) );
mesh.scale.set(.2,.2,.2);
mesh.rotation.x = Math.PI/2;

scene.add(mesh);


// Path
const path = new THREE.Path();

path.lineTo( 0, 0.8 );
path.quadraticCurveTo( 0, 1, 0.2, 1 );
path.lineTo( 1, 1 );

const points = path.getPoints();

const pathGeometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial( { color: 0xffffff } );

const line = new THREE.Line( pathGeometry, material );
line.position.set(2.5,1,8.5);
line.rotation.x = Math.PI/2;

scene.add( line );



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

	renderer.render( scene, camera );

}