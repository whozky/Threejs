import * as THREE from 'three';
import { ArcballControls, DragControls, FirstPersonControls, MapControls, OrbitControls, PointerLockControls, TrackballControls, TransformControls } from 'three/examples/jsm/Addons.js';


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
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 500, 500);
const planeMaterial = new THREE.MeshBasicMaterial({
	color: 0xffeedd,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x= -Math.PI/2;
plane.position.set(0, -.5, 0);
scene.add(plane);


const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMAterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMAterial );
cube.position.set(-1, 0, 0);
scene.add( cube );


const cubeGeometry1 = new THREE.BoxGeometry(1, 1, 1);
const cubeMAterial1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube1 = new THREE.Mesh( cubeGeometry1, cubeMAterial1 );
cube1.position.set(1, 0, 0);
scene.add( cube1 );



// Clock
const Clock = new THREE.Clock();


// Controls

/**
 * OrbitControls
 * 
 * Control orbit memungkinkan kamera mengorbit di sekitar target.
 * OrbitControls adalah add-on, dan harus diimpor secara eksplisit.
 */
const controls = new OrbitControls(camera,renderer.domElement);


/**
 * ArcballControls
 * 
 * Controls untuk pengguna mobile
 * ArcballControls membutuhkan 3 parameter camera, domElement, scene
 */
// const controls = new ArcballControls(camera, renderer.domElement, scene);
// controls.addEventListener('change', () => {
// 	renderer.render(scene, camera);
// });


/**
 * FirstPersonControls
 * 
 * Controls yang memungkinkan untuk menjadi first person camera
 * Controls ini membutuhkan waktu/clock untuk membandingkan perubahan awal
 * dengan perubahan akhir
 * 
 * merupakancontrols alternative dari FlyControls.
 */
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.lookSpeed += 0.1;


/**
 * MapControls
 * 
 * MapControls ditujukan untuk mengubah kamera di atas peta
 * dari perspektif mata burung. Kelas ini memiliki implementasi yang sama dengan
 * OrbitControls tetapi menggunakan prasetel khusus untuk interaksi
 * mouse/sentuhan dan menonaktifkan penggeseran ruang layar secara default.
 */
// const controls = new MapControls(camera,renderer.domElement);
// controls.screenSpacePanning = true;


/**
 * TrackballControls
 * 
 * TrackballControls mirip dengan OrbitControls.Namun,
 * TrackballControls tidak mempertahankan vektor kamera ke atas yang konstan.
 * Itu berarti jika kamera mengorbit di atas kutub "utara" dan "selatan",
 * kamera tidak akan terbalik untuk tetap "berada di sisi kanan atas".
 */
// const controls = new TrackballControls(camera,renderer.domElement);


controls.enableDamping = true;



// Responsive window
window.addEventListener('resize', function() {
	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
	camera.aspect = this.window.innerWidth/this.window.innerHeight;
	camera.updateProjectionMatrix();
});


function animate() {

	// controls.update(Clock.getDelta());
	controls.update();

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}