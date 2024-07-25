import * as THREE from 'three';
import { vertexColor } from 'three/examples/jsm/nodes/Nodes.js';

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#c')});
renderer.setSize(innerWidth, innerHeight);

const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight);
camera.position.set(0,0,5);
camera.lookAt(0,0,0);

const scene = new THREE.Scene();


/**
 * Buffer Geometry
*/

// Tidak menggunakan Index
// const geometry = new THREE.BufferGeometry();

// const vertices = new Float32Array([
//     -1.0, -1.0,  0.0, // v0
// 	 1.0, -1.0,  0.0, // v1
// 	 1.0,  1.0,  0.0, // v2

// 	 1.0,  1.0,  0.0, // v3
// 	-1.0,  1.0,  0.0, // v4
// 	-1.0, -1.0,  0.0  // v5
// ]);

// geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const mesh = new THREE.Mesh( geometry, material );


// Menggunakan Index
const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2
	-1.0,  1.0,  1.0, // v3

    -1.0, -1.0,  -1.0, // v4
	 1.0, -1.0,  -1.0, // v5
	 1.0,  1.0,  -1.0, // v6
	-1.0,  1.0,  -1.0, // v7
] );


const indices = [
    // sisi depan
	0, 1, 2,
	2, 3, 0,
    
    // sisi bawah
    4, 5, 1,
    1, 0, 4,
    
    // sisi belakang
    7, 6, 5,
    5, 4, 7,
    
    // sisi atas
    3, 2, 6,
    6, 7, 3,
    
    // sisi kiri
    7, 4, 0,
    0, 3, 7,
    
    // sisi kanan
    6, 2, 1,
    1, 5, 6
];


// colors
const colors = new Float32Array([
    1.0, 1.0, 0.0, // v1
    0.0, 1.0, 1.0, // v2
    1.0, 0.0, 0.0, // v0
    0.0, 0.0, 1.0, // v3
    1.0, 1.0, 0.0, // v5
    1.0, 0.0, 1.0, // v4
    0.0, 1.0, 1.0, // v6
    1.0, 0.0, 1.0, // v7
]);


geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.MeshBasicMaterial({vertexColors: true});
const mesh = new THREE.Mesh( geometry, material );


scene.add(mesh);

window.addEventListener('resize', function() {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth/this.window.innerHeight;
    camera.updateProjectionMatrix();
})

const tick = () => {

    mesh.rotation.x += .01;
    mesh.rotation.y += .01;


    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)

};tick()