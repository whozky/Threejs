import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import * as dat from 'dat.gui';


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
const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMAterial1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cubeMAterial2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const cube1 = new THREE.Mesh( cubeGeometry, cubeMAterial1 );
cube1.position.set(-2, 0, 0);
cube1.name = "cube1";
scene.add( cube1 );

const cube2 = new THREE.Mesh( cubeGeometry, cubeMAterial2 );
cube2.position.set(2, 0, 0);
cube2.name = "cube2";
scene.add( cube2 );


const planeGeometry = new THREE.PlaneGeometry(100,100,500,500);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.set(0, -.6, 0);
scene.add(plane);


const gird = new THREE.GridHelper(100,100, 0xa0a0a0, 0x000000);
gird.position.set(0, -.6, 0);
scene.add(gird);



// Controls
const OrbitControl = new OrbitControls(camera,renderer.domElement);
OrbitControl.enableDamping = true;

const controlGUI = new Object();
controlGUI.x = 0;
controlGUI.y = 0;
controlGUI.z = 0;
controlGUI.wireframe = false;

// datGUI
const GUI = new dat.GUI();
GUI.add(controlGUI, 'x', -4, 4, .1);
GUI.add(controlGUI, 'y', -4, 4);
GUI.add(controlGUI, 'z', -4, 4);
GUI.add(controlGUI, 'wireframe');

// raycasing
const raycast = new THREE.Raycaster();
const arrow = new THREE.ArrowHelper(raycast.ray.direction,camera.position,10, 0xff0000);
scene.add(arrow);

const mouse = {};
let item;


addEventListener('mousedown', (e) => {
	mouse.x = (e.clientX/window.innerWidth)*2-1;
	mouse.y = (e.clientY/window.innerHeight)*-2+1;
	// console.log(mouse.x, mouse.y);


	raycast.setFromCamera(mouse,camera);
	arrow.setDirection(raycast.ray.direction);
	const items = raycast.intersectObjects(scene.children);
	items.forEach((i) => {
		if (i.object.name != '') {
			// console.log(i.object.name);
			item = i.object;
			console.log(item);
		};
	});


});










// Responsive window
window.addEventListener('resize', function() {
	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
	camera.aspect = this.window.innerWidth/this.window.innerHeight;
	camera.updateProjectionMatrix()
});


function animate() {

	OrbitControl.update();

	if (item != undefined) {
		// item.rotation.x += 0.01;

		item.rotation.set(controlGUI.x,controlGUI.y,controlGUI.z);
		item.material.wireframe = controlGUI.wireframe;
	};


	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}