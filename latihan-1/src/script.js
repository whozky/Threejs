import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()

const canvas = document.querySelector("canvas");

const size = {
    "width": window.innerWidth,
    "height": window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)

const control = new OrbitControls(camera,canvas)

camera.position.x = 4
camera.position.y = 4
camera.position.z = 5
camera.lookAt(0,0,0)

scene.add(camera)

control.enableDamping = true

const kotak = new THREE.BoxGeometry()
const donat = new THREE.TorusGeometry()

const material1 = new THREE.MeshMatcapMaterial({
    color: "Cornsilk",
    side: THREE.BackSide
})

const material2 = new THREE.MeshMatcapMaterial({
    color: "Chartreuse",
    // side: THREE.FrontSide
})

const mesh = new THREE.Mesh(kotak, material1)

mesh.scale.set(5,5,5)

const muter = new THREE.Mesh(donat, material2)

scene.add(mesh);
scene.add(muter);

const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas
    }
)

renderer.setClearColor("Cyan",)

renderer.setSize(size.width, size.height);

const clock = new THREE.Clock();


const tick = () => {
    muter.rotation.y = Math.sin(clock.getElapsedTime())
    muter.rotation.x = clock.getElapsedTime() * 0.85
    muter.rotation.y = clock.getElapsedTime() * 1

    control.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)

};

tick();