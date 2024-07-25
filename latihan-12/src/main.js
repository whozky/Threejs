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
const grid = new THREE.GridHelper(100, 100, 0xff0000, 0xffffff);
grid.position.set(0, -.6, 0);
scene.add(grid);



const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMAterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( cubeGeometry, cubeMAterial );
scene.add( cube );

// particle
const snowVertices = [];
const snowVelocities = [];


// snow loop
for ( let i = 0; i < 10000; i ++ ) {
	const snowX = THREE.MathUtils.randFloatSpread( 100 );
	const snowY = THREE.MathUtils.randFloat( 50, 100 );
	const snowZ = THREE.MathUtils.randFloatSpread( 100 );

	snowVertices.push( snowX, snowY, snowZ );
	snowVelocities.push(Math.random()* .02 + .04);
}


// wave loop
const lebar = 100;
const jarak = 1;
const waveVertices = [];

for (let i = 0; i < lebar; i++) {

	for (let j = 0; j < lebar; j++) {

		const waveX = i * jarak - (lebar * jarak) /2;
		const waveY = 0;
		const waveZ = j * jarak - (lebar * jarak) /2;

		waveVertices.push(waveX, waveY, waveZ);

	}

}


const snowGeo = new THREE.BufferGeometry();
snowGeo.setAttribute( 'position', new THREE.Float32BufferAttribute( snowVertices, 3 ) );
const snowMat = new THREE.PointsMaterial( { 
	color: 0xffffff,
	size: 0.3, 
 } );
const snow = new THREE.Points( snowGeo, snowMat );
scene.add( snow );

// console.log(snowGeo.attributes.position.array);


const waveGeo = new THREE.BufferGeometry();
waveGeo.setAttribute('position', new THREE.Float32BufferAttribute(waveVertices, 3));
const waveMat = new THREE.PointsMaterial({
	color: 0x0000ff,
	size: .03,
});

const wave = new THREE.Points(waveGeo, waveMat);
scene.add(wave);


// time
let time = 0

// console.log(waveGeo.attributes.position.array)




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

	const position = snowGeo.attributes.position.array;

	for (let i = 0; i < position.length; i += 3) {

		position[i+1] -= snowVelocities[i/3];

		if (position[i+1] < 0) {
			position[i+1] = 50;
		};

	};
	
	const wavePosition = waveGeo.attributes.position.array;
	time += 0.005;
	
	for (let i = 0; i < wavePosition.length; i += 3) {
		
		const x = wavePosition[i];
		const z = wavePosition[i+2];
		wavePosition[i+1] = Math.sin(x * 0.03 + time) * Math.cos(z * 0.03 + time) * 10;
		
	};
	
	snowGeo.attributes.position.needsUpdate = true;
	waveGeo.attributes.position.needsUpdate = true;





	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}