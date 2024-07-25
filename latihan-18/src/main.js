import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


// Renderer
const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera(window.innerWidth/window.innerHeight*-5,window.innerWidth/window.innerHeight*5,5,-5,-100,100);
camera.position.set(3,3,5);

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

let teksture;
const texture = new THREE.TextureLoader();
texture.load('texture/coin_gold.png', (t) => {
	teksture = t;
	t.repeat.set(1/8,1);
	// t.offset.x= 0/8;
	const spriteMaterial = new THREE.SpriteMaterial({map: t});
	const sprite = new THREE.Sprite(spriteMaterial);
	// sprite.scale.set(2,2,1);
	scene.add(sprite);
});
let frame = 0;
let speed = 0;
const clock = new THREE.Clock();



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
	speed += clock.getDelta();
	if (speed > .05) {
		frame += 1;
		if (frame >7) {
			frame = 0;
		}
		teksture.offset.x = frame/8;
		speed = 0;
	}

	OrbitControl.update();

	renderer.render( scene, camera );

}