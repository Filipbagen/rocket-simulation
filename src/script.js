import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


// functions
import { rk4 } from './js/rk4'
import { rocketEquation } from './js/rocketEquation'

// styles
import './style.css'

// Scene
const scene = new THREE.Scene()

// Create our sphere
// const geometry = new THREE.SphereGeometry(3, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//     color: '#00ff83'
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Light
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.z = 30
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 20
scene.add(camera)



var loader = new GLTFLoader();
let rocket;
loader.load('rocket.glb', function (gltf) {

    rocket = gltf.scene;  // sword 3D object is loaded
    rocket.position.x = 0;
    rocket.position.y = 0;
    rocket.position.z = 0;

    rocket.rotation.x = -90

    rocket.scale.set(.005, .005, .005)

    scene.add(rocket);
});


// Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGL1Renderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// Resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

function setupKeyControls() {
    // var cube = scene.getObjectByName('cube');
    document.onkeydown = function (e) {
        switch (e.key) {
            case "ArrowUp":
                rocket.position.y += 1;
                break;
            case "ArrowDown":
                rocket.position.y -= 1;
                break;
            case "ArrowLeft":
                rocket.position.x -= 1;
                break;
            case "ArrowRight":
                rocket.position.x += 1;
                break;
            case "+":
                rocket.position.z += 1;
                break;
            case "-":
                rocket.position.z -= 1;
                break;
        }
    };
}

function setupKeyLogger() {
    document.onkeydown = function (e) {
        console.log(e);
    }
}

// _________________________________________

// Define initial conditions
let x0 = 0; // Initial x position
let y0 = 0; // Initial y position
let z0 = 0; // Initial z position
let vx0 = 0; // Initial x velocity
let vy0 = 0; // Initial y velocity
let vz0 = 0; // Initial z velocity

// Initial conditions
y0 = [x0, y0, z0, vx0, vy0, vz0]


let dz = rk4(rocketEquation, [0, 10], y0, 10)
console.log(dz)

const clock = new THREE.Clock()


const loop = () => {
    // setupKeyControls()
    // setupKeyLogger()

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}


loop()


