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


const rederTarget = new THREE.RenderTarget(100,100);
const renderCamera = new THREE.OrthographicCamera();
renderCamera.position.set(100,100,200);
renderCamera.lookAt(0,0,-15);


const cube = new THREE.Mesh(
	new THREE.BoxGeometry(),
	new THREE.MeshBasicMaterial({
		// map: rederTarget.texture,
		color: 'green'
	})
);
cube.position.set(0,0,-15);
scene.add(cube);

const PlaneGeometry = new THREE.PlaneGeometry()
const front = new THREE.Mesh(
	PlaneGeometry,
	new THREE.MeshBasicMaterial({map: rederTarget.texture})
);
scene.add(front);

const tv = new THREE.Mesh(
	new THREE.BoxGeometry(),
	new THREE.MeshBasicMaterial({color:'red'})
);
tv.scale.set(1.5,1.5,1.5);
tv.position.set(0,0,-.82);
scene.add(tv);

const back = new THREE.Mesh(
	PlaneGeometry,
	new THREE.MeshBasicMaterial({map: rederTarget.texture})
);
back.rotation.x = Math.PI/-1;
back.position.set(0,0,-1.635)
scene.add(back);


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
	cube.rotation.x += .01;
	cube.rotation.y += .01;

	renderer.setRenderTarget(rederTarget);
	renderer.render(scene,renderCamera);

	renderer.setRenderTarget(null);
	renderer.render( scene, camera );

	OrbitControl.update();
}