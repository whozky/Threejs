import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 8;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Items
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cubeMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial1);
cube1.position.set(-2, 0, 0);
cube1.name = "cube1";
scene.add(cube1);

const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
cube2.position.set(2, 0, 0);
cube2.name = "cube2";
scene.add(cube2);

// Plane and Grid
const planeGeometry = new THREE.PlaneGeometry(100, 100, 500, 500);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.set(0, -0.6, 0);
scene.add(plane);

const grid = new THREE.GridHelper(100, 100, 0xa0a0a0, 0x000000);
grid.position.set(0, -0.6, 0);
scene.add(grid);

// Controls
const orbitControl = new OrbitControls(camera, renderer.domElement);
orbitControl.enableDamping = true;

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let clickedCube1 = false;
let clickedCube2 = false;

// Event listener for clicks
addEventListener('mousedown', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * -2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([cube1, cube2]);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const timeline = gsap.timeline();
        const t1 = timeline;
        const t2 = timeline;

        if (clickedObject.name === 'cube1') {
            if (!clickedCube1) {
                
                t1.to(clickedObject.position, { x: 5, duration: 1 });
                t1.to(clickedObject.position, { y: 5, duration: 1 });
                t1.to(clickedObject.position, { z: 5, duration: 1 });
            } else {
                
                t2.to(clickedObject.position, { z: 0, duration: 1 });
                t2.to(clickedObject.position, { y: 0, duration: 1 });
                t2.to(clickedObject.position, { x: -2, duration: 1 });
            }
            clickedCube1 = !clickedCube1;
        }

        if (clickedObject.name === 'cube2') {
            if (!clickedCube2) {
                clickedObject.position.set(2, 0, 0);

                t1.to(clickedObject.position, { z: -5, duration: 1 });
                t1.to(clickedObject.position, { y: 5, duration: 1 });
                t1.to(clickedObject.position, { x: -5, duration: 1 });
            } else {
                clickedObject.position.set(2, 0, 0);

                t2.to(clickedObject.position, { z: -5, duration: 1 });
                t2.to(clickedObject.position, { y: 5, duration: 1 });
                t2.to(clickedObject.position, { x: -5, duration: 1 });
            }
            clickedCube2 = !clickedCube2;
        }
    }
});

// Responsive window
window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect = this.window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    orbitControl.update();
    renderer.render(scene, camera);
}




// ==========================batas code==============================




// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import gsap from 'gsap';


// const scene = new THREE.Scene();

// // Camera
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// camera.position.z = 8;

// // Renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
// document.body.appendChild( renderer.domElement );



// // Background
// // const environmentTexture = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

// // scene.environment = environmentTexture;
// // scene.background = environmentTexture;



// // Items
// const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
// const cubeMAterial1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cubeMAterial2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

// const cube1 = new THREE.Mesh( cubeGeometry, cubeMAterial1 );
// cube1.position.set(-2, 0, 0);
// cube1.name = "cube1";
// scene.add( cube1 );

// const cube2 = new THREE.Mesh( cubeGeometry, cubeMAterial2 );
// cube2.position.set(2, 0, 0);
// cube2.name = "cube2";
// scene.add( cube2 );


// const planeGeometry = new THREE.PlaneGeometry(100,100,500,500);
// const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
// const plane = new THREE.Mesh(planeGeometry,planeMaterial);
// plane.rotation.x = -Math.PI / 2;
// plane.position.set(0, -.6, 0);
// scene.add(plane);


// const gird = new THREE.GridHelper(100,100, 0xa0a0a0, 0x000000);
// gird.position.set(0, -.6, 0);
// scene.add(gird);



// // Controls
// const OrbitControl = new OrbitControls(camera,renderer.domElement);
// OrbitControl.enableDamping = true;


// // raycasing
// const raycast = new THREE.Raycaster();
// // const arrow = new THREE.ArrowHelper(raycast.ray.direction,camera.position,10, 0xff0000);
// // scene.add(arrow);

// const mouse = {};
// let item;
// let clickedCube1 = false;
// let clickedCube2 = false;


// addEventListener('mousedown', (e) => {
// 	mouse.x = (e.clientX/window.innerWidth)*2-1;
// 	mouse.y = (e.clientY/window.innerHeight)*-2+1;
// 	// console.log(mouse.x, mouse.y);


// 	raycast.setFromCamera(mouse,camera);
// 	// arrow.setDirection(raycast.ray.direction);
// 	const items = raycast.intersectObjects(scene.children);
// 	items.forEach((i) => {
// 		if (i.object.name != '') {
// 			// console.log(i.object.name);
// 			item = i.object;
// 			// console.log(item);
// 		};
// 	});

	

// 	/**
// 	 * Animating if the cube clicked
// 	 */
// 	if (item.name === 'cube1') {

// 		const timeline = gsap.timeline();

//         if (!clickedCube1) {
// 			const t1 = timeline;
//             t1.to(item.position, { x: 5, duration: 1 });
//             t1.to(item.position, { y: 5, duration: 1 });
//             t1.to(item.position, { z: 5, duration: 1 });
//         } else {
// 			const t2 = timeline;
//             t2.to(item.position, { z: 0, duration: 1 });
//             t2.to(item.position, { y: 0, duration: 1 });
//             t2.to(item.position, { x: -2, duration: 1 });
//         };

//         clickedCube1 = !clickedCube1;


//     } else if (item.name === 'cube2') {

// 		const timeline = gsap.timeline();

//         if (!clickedCube2) {
// 			item.position.set(2, 0, 0);

// 			const t1 = timeline;
//             t1.to(item.position, { z: -5, duration: 1 });
//             t1.to(item.position, { y: 5, duration: 1 });
//             t1.to(item.position, { x: -5, duration: 1 });
//         } else {
// 			item.position.set(2, 0, 0);

// 			const t2 = timeline;
//             t2.to(item.position, { z: -5, duration: 1 });
//             t2.to(item.position, { y: 5, duration: 1 });
//             t2.to(item.position, { x: -5, duration: 1 });
//         };

//         clickedCube2 = !clickedCube2;
//     } else {
// 		return null;
// 	}





// });


// // Animating
// // gsap.to(cube1.position, {x: 10, duration: 2});
// // gsap.from(cube2.position, {y: 3, z: 3, delay: 2, duration: 3});













// // Responsive window
// window.addEventListener('resize', function() {
// 	renderer.setSize( this.window.innerWidth, this.window.innerHeight );
// 	camera.aspect = this.window.innerWidth/this.window.innerHeight;
// 	camera.updateProjectionMatrix()
// });


// function animate() {

// 	OrbitControl.update();

// 	// if (item != undefined) {
// 	// 	item.rotation.x += 0.01;

// 	// 	item.rotation.set(controlGUI.x,controlGUI.y,controlGUI.z);
// 	// 	item.material.wireframe = controlGUI.wireframe;
// 	// };


// 	// cube.rotation.x += 0.01;
// 	// cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );

// }
