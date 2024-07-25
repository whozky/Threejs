import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry' // text
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);
// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#c')});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("beige")
renderer.shadowMap.enabled = true

/**
 * camera
 */

camera.position.z = 3
camera.position.y = 2
camera.lookAt(0,0,0)
// camera.zoom = 100

/**
 * mesh
 */

const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(), 
    new THREE.MeshStandardMaterial()
);

scene.add(mesh);

mesh.scale.set(4,4,1)
mesh.rotateX(-Math.PI/2)
mesh.material.color = new THREE.Color('lightGreen')
mesh.receiveShadow = true


const kubus = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({color: 'cyan'})
);


scene.add(kubus)

kubus.position.y = 0.5;
kubus.castShadow = true;


/**
 * text
 */
const loader = new FontLoader();

loader.load( './fonts/helvetiker_regular.typeface.json', ( font ) => {
    
    const geometry = new TextGeometry( 'Hello World!', {
        font: font,
		size: .5,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: .2,
		bevelSize: .01,
		bevelOffset: 0,
		bevelSegments: 5
	} );

    const textMesh = new THREE.Mesh(geometry, [
        new THREE.MeshStandardMaterial({color: 'blue'}), //front
        new THREE.MeshStandardMaterial({color: 'smoke'}), //side
    ])

    const temp = .4;

    textMesh.scale.set(temp, temp, .01 )
    textMesh.position.set(-.7, 1.25, 0)
    textMesh.castShadow = true

    scene.add(textMesh)

})

/**
 * light
 */

const ambient = new THREE.AmbientLight();
scene.add(ambient);

const point = new THREE.PointLight();
point.position.y = 2.5;
point.intensity = 2;
point.castShadow = true
scene.add(point);


// const pointLightHelper = new THREE.PointLightHelper( point, .3, "red");
// scene.add(pointLightHelper);


/**
 * control
 */
const control = new OrbitControls(camera, document.querySelector('#c'))
control.enableDamping = true


const clock = new THREE.Clock();

const tick = () => {

    control.update();
    // camera.lookAt(point.position)

    point.position.x = Math.sin(clock.getElapsedTime())
    point.position.z =Math.cos(clock.getElapsedTime())
    
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick)
}

tick();


