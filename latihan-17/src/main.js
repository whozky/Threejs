import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


// Renderer
function createScene() {
	return new THREE.Scene();
}
const mainCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
mainCamera.position.z = 5;

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
function createGrid() {
	const grid = new THREE.GridHelper(100,100,0xfafafa,0xfafafa);
	grid.position.set(0,-.5,0);
	return grid;
};

function createLight() {
	const pointLight = new THREE.PointLight('white',15);
	pointLight.position.set(0,3,2);
	return pointLight;
	
};


// viewport
const cubeGeo = new THREE.BoxGeometry(1,1,1);
const cubeMat = new THREE.MeshLambertMaterial({
	color:0x00ff00,
});
const cube = new THREE.Mesh(cubeGeo,cubeMat);
const scene = createScene();
scene.add(cube);
scene.add(createGrid());
scene.add(createLight());


const cone = new THREE.Mesh(
	new THREE.ConeGeometry(1,1,10,10),
	new THREE.MeshLambertMaterial({color:'red'})
);
const scene2 = createScene();
scene2.add(cone);
scene2.add(createGrid());
scene2.add(createLight());


const cylinder = new THREE.Mesh(
	new THREE.CylinderGeometry(1,1,1,10),
	new THREE.MeshLambertMaterial({color:'blue'})
);
const scene3 = createScene();
scene3.add(cylinder);
scene3.add(createGrid());
scene3.add(createLight());


const ball = new THREE.Mesh(
	new THREE.SphereGeometry(1,20,20),
	new THREE.MeshLambertMaterial({color:'green',wireframe: true})
);
ball.position.y = .5;
const scene4 = createScene();
scene4.add(ball);
scene4.add(createGrid());
scene4.add(createLight());


const knot = new THREE.Mesh(
	new THREE.TorusKnotGeometry(.5),
	new THREE.MeshLambertMaterial({color:'yellow'})
);
knot.position.y = .5;
const scene5 = createScene();
scene5.add(knot);
scene5.add(createGrid());
scene5.add(createLight());


// Controls
const OrbitControl = new OrbitControls(camera,renderer.domElement);
OrbitControl.enableDamping = true;

const OrbitControlMain = new OrbitControls(mainCamera,renderer.domElement);
OrbitControlMain.enableDamping = true;


// Responsive window
window.addEventListener('resize', function() {
	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
	camera.aspect = this.window.innerWidth/this.window.innerHeight;
	camera.updateProjectionMatrix()
});


function animate() {
	// main
	renderer.setViewport(0,0,window.innerWidth,window.innerHeight);
	mainCamera.setViewOffset(window.innerWidth,window.innerHeight,window.innerWidth/2*.5,window.innerHeight/2*.5,500,500);
	renderer.setScissorTest(false);
	cube.rotation.x += .01;
	cube.rotation.y += .01;
	cube.rotation.z -= .01;
	renderer.render(scene,mainCamera);

	// top left
	renderer.setViewport(0,window.innerHeight-150,150,150);
	renderer.setScissorTest(true);
	renderer.setScissor(0,window.innerHeight-150,150,150);
	cone.rotation.x += .01;
	cone.rotation.y += .01;
	cone.rotation.z += .01;
	renderer.render(scene2,camera);

	// top right
	renderer.setViewport(window.innerWidth-150,window.innerHeight-150,150,150);
	renderer.setScissorTest(true);
	renderer.setScissor(window.innerWidth-150,window.innerHeight-150,150,150);
	cylinder.rotation.x += .01;
	cylinder.rotation.y += .01;
	cylinder.rotation.z += .01;
	renderer.render(scene3,camera)

	// bottom left
	renderer.setViewport(0,0,150,150);
	renderer.setScissorTest(true);
	renderer.setScissor(0,0,150,150);
	ball.rotation.x += .01;
	ball.rotation.y += .01;
	ball.rotation.z += .01;
	renderer.render( scene4, camera );

	// bottom right
	renderer.setViewport(window.innerWidth-150,0,150,150);
	renderer.setScissorTest(true);
	renderer.setScissor(window.innerWidth-150,0,150,150);
	knot.rotation.x += .01;
	knot.rotation.y += .01;
	knot.rotation.z += .01;
	renderer.render(scene5,camera);
	
	OrbitControl.update();
	OrbitControlMain.update();
}
