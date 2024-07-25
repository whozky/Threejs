import * as THREE from 'three';
import { FontLoader, OrbitControls, TextGeometry, } from 'three/examples/jsm/Addons.js';


// Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


// Loaders
const loader = new FontLoader();


// Background
const environmentTexture = new THREE.CubeTextureLoader().setPath('https://sbcode.net/img/').load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']);

scene.environment = environmentTexture;
scene.background = environmentTexture;


// Items
const grid = new THREE.GridHelper(50,50, 0xff0000, 0xffffff);
grid.position.set(0, -.5, 0);
scene.add(grid);


// text
loader.load('./fonts/helvetiker_regular.typeface.json', (font) => {
	let textMesh;
	let currentIndex = 0;
	const texts = ["Hello World!", "Hello Dzaki"];
	
	const createText = (text) => {
	  const textGeo = new TextGeometry(text, {
		font: font,
		size: 2,
		height: 0.5,
		bevelEnabled: true,
		bevelThickness: .05,
		bevelSize: .01,
		bevelOffset: .050,
		// bevelSegments: 1,
	  });
	  const textMaterial = new THREE.MeshPhysicalMaterial({ 
		color: 0xff0000,
		roughness: 0,
		metalness: 1,
	  });

	  textGeo.computeBoundingBox();

	  const axis = -.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

	  const textMesh = new THREE.Mesh(textGeo, textMaterial);
	  textMesh.position.set(axis, -.4, 0);
	  return textMesh;
	};
	
	const updateText = (text) => {
	  if (textMesh) {
		scene.remove(textMesh);
	  }
	  textMesh = createText(text);
	  scene.add(textMesh);
	};
	
	const animateTyping = (fullText, callback) => {
	  let currentText = '';
	  let charIndex = 0;
	  const interval = setInterval(() => {
		currentText += fullText[charIndex];
		updateText(currentText);
		charIndex++;
		if (charIndex === fullText.length) {
		  clearInterval(interval);
		  setTimeout(callback, 1000);
		}
	  }, 100);
	};
	
	const animateDeleting = (fullText, callback) => {
	  let currentText = fullText;
	  let charIndex = fullText.length;
	  const interval = setInterval(() => {
		currentText = currentText.slice(0, -1);
		updateText(currentText);
		charIndex--;
		if (charIndex === 0) {
		  clearInterval(interval);
		  setTimeout(callback, 500);
		}
	  }, 100);
	};
	
	const cycleTexts = () => {
	  animateTyping(texts[currentIndex], () => {
		setTimeout(() => {
		  animateDeleting(texts[currentIndex], () => {
			currentIndex = (currentIndex + 1) % texts.length;
			cycleTexts();
		  });
		}, 1500);
	  });
	};
	
	cycleTexts();
});


// loader.load('./fonts/helvetiker_regular.typeface.json', (f) => {

// 	const textGeo = new TextGeometry('Hello World!', {
// 		font: f,
// 		size: 2,
// 		height: .5,
// 		depth: .5,
// 	});
// 	const text = new THREE.Mesh(textGeo, [
// 		new THREE.MeshBasicMaterial({color: 0xff0000}),
// 		new THREE.MeshBasicMaterial({color:0xffffff}),
// 	]);

// 	// textGeo.computeBoundingBox();

// 	// console.log(textGeo.boundingBox.max);
// 	// console.log(textGeo.boundingBox.min);

// 	// const axis = -.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

// 	// text.position.set(axis, -.4, 0);
// 	text.position.set(-6.5, -.4, 0);

// 	scene.add(text);

// });




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

	

	renderer.render( scene, camera );

}