import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/Addons.js';


// Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();
camera.position.z = 800;
const renderer = new CSS3DRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera();
camera2.position.set(.5,0,3);
const renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer2.domElement);

// Items
const element= document.createElement('div');
element.innerHTML= `<h1>Mantra</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A est eos perferendis amet, nam quam perspiciatis saepe consequatur adipisci mollitia iure facilis ad ducimus iusto, cupiditate aspernatur molestias. Adipisci, nesciunt tempek perspiciatis beatae animi voluptatibus ad quae quaerat assumenda? At, repellat tempora voluptas pace kont tolesentium doloribus qui numquam inventore ab in quia doloremque, veniam impedit, repellendus officia dolorem error nobis amet ex! Quas sit accusantium quia, nemo laborum illo consequatur labore dolores vitae fugiat rerum?</p>`;

const card = new CSS3DObject(element);
card.position.set(-250,250,0);
scene.add(card);


const cube = new THREE.Mesh(
	new THREE.BoxGeometry(),
	new THREE.MeshBasicMaterial({color:'green'})
);
cube.position.x = 1;
scene2.add(cube);


function animate() {
	renderer.render(scene,camera);
	renderer2.render(scene2,camera2)
	cube.rotation.x += .01;
	cube.rotation.y += .01;
	requestAnimationFrame(animate);
}
animate();
