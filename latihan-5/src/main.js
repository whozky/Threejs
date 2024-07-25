import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const canvas = document.querySelector('canvas')

const texture_loader =  new THREE.TextureLoader()

const ambient_light = new THREE.AmbientLight({
	// intensity: 10
});

ambient_light.intensity = 0.1

scene.add(ambient_light)

const point_light = new THREE.PointLight(null,10);

point_light.position.set(1, 2, 3)

const point_light2 = new THREE.PointLight(null,10);

point_light2.position.set(-2, 1, 2)


scene.add(point_light)

const door_geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
const door_material = new THREE.MeshStandardMaterial();
const door_alpha = texture_loader.load('./door/door/alpha.jpg');
const door_ao = texture_loader.load('./door/door/ambientOcclusion.jpg');
const door_color = texture_loader.load('./door/door/color.jpg'); door_color.colorSpace = THREE.SRGBColorSpace

const door_height = texture_loader.load('./door/door/height.jpg');
const door_metal = texture_loader.load('./door/door/metalness.jpg');
const door_normal = texture_loader.load('./door/door/normal.jpg');
const door_rough = texture_loader.load('./door/door/roughness.jpg');

const door = new THREE.Mesh(door_geometry,door_material);

door.material.map = door_color
door.material.normalMap = door_normal
door.material.aoMap = door_ao
door.material.displacementMap = door_height
door.material.displacementScale = .1

door.material.metalnessMap = door_metal

door.material.roughnessMap = door_rough

door.material.transparent = true

door.material.alphaMap = door_alpha

// door.material.wireframe = true

scene.add(door)


const orbit = new OrbitControls(camera,canvas);


window.addEventListener('resize', function() {
	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
	camera.aspect = this.window.innerWidth/this.window.innerHeight;
	camera.updateProjectionMatrix()
});

function animate() {

	orbit.update()

	renderer.render( scene, camera );

}