import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
const canvas = document.querySelector('canvas')



// Background
// const environmentTexture = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])


// loader
const texture_loader = new THREE.TextureLoader();



// Texture
const A_texture = texture_loader.load('./texture/A.png');
const B_texture = texture_loader.load('./texture/B.png');
const C_texture = texture_loader.load('./texture/C.png');
const D_texture = texture_loader.load('./texture/D.png');
const E_texture = texture_loader.load('./texture/E.png');
const F_texture = texture_loader.load('./texture/F.png');



// Background
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    './texture/A.png',
    './texture/B.png',
    './texture/C.png',
    './texture/D.png',
    './texture/E.png',
    './texture/F.png'
])

scene.environment = environmentMapTexture
scene.background = environmentMapTexture


// material

/**
 * MeshBasicMaterial
 * Material yang memberikan warna dan tidak terpengaruh dengan cahaya dan bayangan
 */
const geometry_kotak1 = new THREE.BoxGeometry();
const texture_kotak1 = texture_loader.load('./texture/sand.jpeg')
const material_kotak1 = new THREE.MeshBasicMaterial({
	color: 0xffeebb,
	// wireframe: true,
	map: texture_kotak1,
});
const kotak1 = new THREE.Mesh(geometry_kotak1,material_kotak1);

scene.add(kotak1)


/**
 * MeshLambertMaterial
 * Material yang memberikan warna dan terpengaruh dengan cahaya dan bayangan
 */
const geometry_kotak2 = new THREE.BoxGeometry();
const texture_kotak2 = texture_loader.load('./texture/alpha.jpg')
const material_kotak2 = new THREE.MeshLambertMaterial({
	// wireframe: true,
	map: texture_kotak2,
	// emissive: 0xff0000,
	// emissiveIntensity: .2,
	alphaMap: texture_kotak2,
	transparent: true,
	side: THREE.DoubleSide,
});
const kotak2 = new THREE.Mesh(geometry_kotak2,material_kotak2);
kotak2.position.set(2, 0, 0)

scene.add(kotak2)


/**
 * MeshPhongMaterial
 * Material yang memberikan warna dan terpengaruh dengan cahaya dan bayangan
 * dan berpengaruh terhadap efek glossy (pantulan cahaya)
 */
const geometry_kotak3 = new THREE.BoxGeometry();
const texture_kotak3 = texture_loader.load('./texture/bata.png')
const material_kotak3 = new THREE.MeshPhongMaterial({
	// wireframe: true,
	map: texture_kotak3,
	// emissive: 0xff0000,
	// emissiveIntensity: .2,
	shininess: 100,
	bumpMap: texture_kotak3,
});
const kotak3 = new THREE.Mesh(geometry_kotak3,material_kotak3);
kotak3.position.set(-2, 0, 0)

scene.add(kotak3)


/**
 * MeshStandardMaterial
 * Material yang menggunakan perhitungan fisika
 * Seakan merupakan sebuah "real" material
 */
const geometry_kotak4 = new THREE.BoxGeometry();
const texture_kotak4 = texture_loader.load('./texture/bata.png')
const material_kotak4 = new THREE.MeshStandardMaterial({
	// wireframe: true,
	// map: texture_kotak4,
	// emissive: 0xff0000,
	color: 0xaaffaa,
	// emissiveIntensity: .2,
	// shininess: 100,
	// bumpMap: texture_kotak4,
	roughness: 0,
	roughnessMap: texture_kotak4,
	metalness: 1,
	metalnessMap: texture_kotak4,
	// flatShading: true,
});
const kotak4 = new THREE.Mesh(geometry_kotak4,material_kotak4);
kotak4.position.set(-2, -1.5, 0)

scene.add(kotak4)


/**
 * MeshPhysicalMaterial
 * Material yang menggunakan perhitungan fisika yang merupakan tingkat lanjut dari MeshStandartMaterial
 * Yang juga seakan merupakan sebuah "real" material
 */
const geometry_simpul = new THREE.TorusKnotGeometry();
const texture_simpul = texture_loader.load('./texture/bata.png')
const material_simpul = new THREE.MeshPhysicalMaterial({
	// wireframe: true,
	// map: texture_simpul,
	color: 0xff0000,
	vertexColors: true,
	// emissiveIntensity: .2,
	// shininess: 100,
	// bumpMap: texture_simpul,
	iridescence: 1,
	// iridescenceIOR: 1.222
	// roughness: 0,
	// metalness: 1,
	clearcoat: 1,
	clearcoatRoughness: 0,
	ior: 2.333,
	// depthTest: false,
	depthWrite: false,
});
const simpul = new THREE.Mesh(geometry_simpul,material_simpul);
simpul.position.set(0, -1.5, 0)
simpul.scale.set(.4, .4, .4)

scene.add(simpul)


/**
 * Uv mapping (memasukkan 2 material atau lebih kedalam sebuah mesh)
 */


/**
 * const geometry_kotak5 = new THREE.BufferGeometry();


// const vertices = new Float32Array([
// 	-1.0, -1.0, 1.0,
// 	 1.0, -1.0, 1.0,
// 	 1.0,  1.0, 1.0,

// 	 1.0,  1.0, 1.0,
// 	-1.0,  1.0, 1.0,
// 	-1.0, -1.0, 1.0,
// ]);

// const uvs = new Float32Array([
// 	0.0, 0.0,
// 	1.0, 0.0,
// 	1.0, 1.0,

// 	1.0, 1.0,
// 	0.0, 1.0,
// 	0.0, 0.0,
// ]);




const vertices = new Float32Array([

	-1.0, -1.0, 1.0, // v0
	 1.0, -1.0, 1.0, // v1
	 1.0,  1.0, 1.0, // v2
	-1.0,  1.0, 1.0, // v3
	
	
	-1.0, -1.0, -1.0, // v4
	 1.0, -1.0, -1.0, // v5
	 1.0,  1.0, -1.0, // v6
	-1.0,  1.0, -1.0, // v7
	
]);

const indices = [

	// sisi depan
	0, 1, 2,
	2, 3, 0,

	// sisi kiri
	3, 7, 4,
	4, 0, 3,

	// sisi belakang
	7, 6, 5,
	5, 4, 7,

	// sisi kanan
	6, 2, 1,
	1, 5, 6,

	// sisi atas
	7, 3, 2,
	2, 6, 7,

	// sisi bawah
	4, 5, 1,
	1, 0, 4,

];

const uvs = new Float32Array([
	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,

	0.0, 0.0,
	1.0, 0.0,
	1.0, 1.0,
	0.0, 1.0,
]);

geometry_kotak5.setIndex(indices);
geometry_kotak5.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry_kotak5.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
const material_kotak5 = new THREE.MeshBasicMaterial({
	color: 0xaabbcc,
	map: A_texture,
});

// const material_kotak5 = [
// 	new THREE.MeshBasicMaterial({map: A_texture}),
// 	new THREE.MeshBasicMaterial({map: B_texture}),
// 	new THREE.MeshBasicMaterial({map: C_texture}),
// 	new THREE.MeshBasicMaterial({map: D_texture}),
// 	new THREE.MeshBasicMaterial({map: E_texture}),
// 	new THREE.MeshBasicMaterial({map: F_texture}),
// ];


const kotak5 = new THREE.Mesh(geometry_kotak5,material_kotak5);

kotak5.scale.set(.5, .5, .5)
kotak5.position.set(2, -1.5, 0);
 */


const geometry_kotak5 = new THREE.BoxGeometry();
const material_kotak5 = [
	new THREE.MeshBasicMaterial({map: A_texture, color: 0xaabbcc}),
	new THREE.MeshBasicMaterial({map: B_texture, color: 0xbbccaa}),
	new THREE.MeshBasicMaterial({map: C_texture, color: 0xccaabb}),
	new THREE.MeshBasicMaterial({map: D_texture, color: 0xabcabc}),
	new THREE.MeshBasicMaterial({map: E_texture, color: 0xcbacba}),
	new THREE.MeshBasicMaterial({map: F_texture, color: 0xbcabca}),
];

const kotak5 = new THREE.Mesh(geometry_kotak5, material_kotak5);
kotak5.position.set(2, -1.5, 0);


scene.add(kotak5);



// Lighting
const point_light = new THREE.PointLight();
point_light.position.set(0, 2, 1);
scene.add(point_light);

const point_light1 = new THREE.PointLight();
point_light1.position.set(0, -3, 1);
scene.add(point_light1);



// Lighting Helper
// const sphere_size = .2;
// const pointLightHelper = new THREE.PointLightHelper(point_light,sphere_size);
// const pointLightHelper1 = new THREE.PointLightHelper(point_light1,sphere_size);

// scene.add(pointLightHelper);
// scene.add(pointLightHelper1);



// control
const control = new OrbitControls(camera,canvas);

control.enableDamping = true



window.addEventListener('resize', function() {
	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
	camera.aspect = this.window.innerWidth/this.window.innerHeight;
	camera.updateProjectionMatrix()
});

function animate() {

	control.update()

	kotak1.rotation.x += 0.01;
	kotak1.rotation.y += 0.01;

	kotak2.rotation.x += 0.01;
	kotak2.rotation.y += 0.01;

	kotak3.rotation.x += 0.01;
	kotak3.rotation.y += 0.01;

	kotak4.rotation.x += 0.01;
	kotak4.rotation.y += 0.01;

	kotak5.rotation.x += 0.01;
	kotak5.rotation.y += 0.01;

	simpul.rotation.x += 0.01;
	simpul.rotation.y += 0.01;

	renderer.render( scene, camera );

}