import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

// shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;


document.body.appendChild( renderer.domElement );
const canvas = document.querySelector('canvas');


// background
const environmentTexture = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

scene.environment = environmentTexture;
scene.background = environmentTexture;


// plane
const PlaneGeometry = new THREE.PlaneGeometry(1000,1000,500, 500);
const PlaneMaterial = new THREE.MeshLambertMaterial({color: 0xfabfcd,});
const Plane = new THREE.Mesh(PlaneGeometry,PlaneMaterial);

Plane.position.set(0, -1, 0);
Plane.receiveShadow = true;
Plane.rotation.x = -Math.PI/2;

scene.add(Plane)


// cube
const CubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const CubeMaterial = new THREE.MeshPhongMaterial({
	color: 0xadadad,
});
const Cube = new THREE.Mesh(CubeGeometry,CubeMaterial);
Cube.castShadow = true;
Cube.receiveShadow = true;

scene.add(Cube);



// lighting

/**
 * AmbientLight
 * 
 * Cahaya ini menerangi semua objek dalam pemandangan secara merata.
 * Cahaya ini tidak dapat digunakan untuk menghasilkan bayangan karena tidak 
 * memiliki arah.
 */
// const AmbientLight = new THREE.AmbientLight(0xababab);

// scene.add(AmbientLight);


/**
 * DirectionalLight
 * 
 * Cahaya yang dipancarkan ke arah tertentu.
 * Cahaya ini akan berperilaku seolah-olah berada sangat jauh
 * dan sinar yang dihasilkannya semuanya sejajar.
 * Kasus penggunaan umum untuk ini adalah untuk mensimulasikan cahaya matahari;
 * matahari cukup jauh sehingga posisinya dapat dianggap tak terbatas,
 * dan semua sinar cahaya yang berasal darinya sejajar.
 * 
 * DirectionalLight bisa menampung 2 parameter warna dan intensity
 */
// const DirectionalLight = new THREE.DirectionalLight(0xffbbcc,.5);
// DirectionalLight.position.set(0, 2, 0);
// DirectionalLight.target.position.set(0, 0, 0);
// DirectionalLight.castShadow = true;

// scene.add(DirectionalLight);
// scene.add(new THREE.DirectionalLightHelper(DirectionalLight, 1, 0xffff00));


/**
 * HemisphereLight
 * 
 * Sumber cahaya yang diposisikan tepat di atas pemandangan,
 * dengan warna memudar dari warna langit ke warna tanah.
 * Cahaya ini tidak dapat digunakan untuk menghasilkan bayangan.
 * 
 * HemisphereLight membutuhkan 2 parameter warna langit dan warna tanah
 */
// const HemisphereLight = new THREE.HemisphereLight(0xffffff, 0x00000);
// HemisphereLight.position.set(0, 2.5, 0)

// scene.add(HemisphereLight);
// scene.add( new THREE.HemisphereLightHelper(HemisphereLight, 1, 0xaadcfc));


/**
 * PointLight
 * 
 * Cahaya yang dipancarkan dari satu titik ke segala arah.
 * Kasus penggunaan umum untuk ini adalah untuk meniru cahaya yang dipancarkan
 * dari bola lampu biasa.
 * Cahaya ini dapat menghasilkan bayangan
 */
const PointLight = new THREE.PointLight(0xff0000);
PointLight.position.set(0, 2, 0);
PointLight.castShadow = true;

scene.add(PointLight);
scene.add(new THREE.PointLightHelper(PointLight, .2, 0xddffaa))


/**
 * SpotLight
 * 
 * Cahaya ini dipancarkan dari satu titik ke satu arah,
 * sepanjang kerucut yang ukurannya semakin membesar
 * saat semakin jauh dari cahaya yang diterimanya.
 * Cahaya ini dapat menghasilkan bayangan
 */
// const SpotLight = new THREE.SpotLight(0x16ffbb);
// SpotLight.position.set(2, 2, 0);
// SpotLight.distance = 5;
// SpotLight.angle = Math.PI/7;
// SpotLight.castShadow = true;



// scene.add(SpotLight);
// scene.add(new THREE.SpotLightHelper(SpotLight, 0xff0000))



// control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

window.addEventListener('resize', function() {
	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
	camera.aspect = this.window.innerWidth/this.window.innerHeight;
	camera.updateProjectionMatrix()
});


function animate() {

	control.update();
	Cube.rotation.x += 0.01;
	Cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}