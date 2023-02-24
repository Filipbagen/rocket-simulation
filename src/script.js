import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// functions
import { rk4 } from './js/rk4'
import { rocketEquation } from './js/rocketEquation'
import { setupKeyControls, setupKeyLogger } from './setupKey'

// styles
import './style.css'

let scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, renderer, canvas
let loader = new GLTFLoader();

const createScene = () => {

    // Scene
    scene = new THREE.Scene()

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    aspectRatio = sizes.width / sizes.height
    fieldOfView = 45
    nearPlane = 1
    farPlane = 10000

    // Camera
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    camera.position.z = 500
    camera.position.y = 200
    scene.add(camera)

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

    // Renderer
    canvas = document.querySelector(".webgl")
    renderer = new THREE.WebGL1Renderer({ canvas })
    renderer.setSize(sizes.width, sizes.height)
    document.body.appendChild(renderer.domElement)

    // Orbit controls
    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true
}

// Light
let light
const createLight = () => {
    light = new THREE.AmbientLight(0xffffff, 1, 100)
    light.position.z = 30
    scene.add(light)
}


// 3D models
let ball, rocket, newBall

const createBall = () => {
    // Create our sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64)
    const material = new THREE.MeshStandardMaterial({
        color: '#00ff83'
    })
    ball = new THREE.Mesh(geometry, material)
    scene.add(ball)
}

const createNewBall = () => {
    // Create our sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64)
    const material = new THREE.MeshStandardMaterial({
        color: '#ff0083'
    })
    newBall = new THREE.Mesh(geometry, material)
    newBall.position.y = 100
    scene.add(newBall)
}

const createRocket = () => {
    loader.load('rocket.glb', function (gltf) {

        rocket = gltf.scene;  // sword 3D object is loaded
        rocket.position.x = 0;
        rocket.position.y = 0;
        rocket.position.z = 0;
        rocket.rotation.x = -90
        rocket.scale.set(.005, .005, .005)

        scene.add(rocket);
    })
}


// Define initial conditions
let x0 = 0 // Initial x position
let y0 = 0 // Initial y position
let z0 = 0 // Initial z position
let vx0 = 0 // Initial x velocity
let vy0 = 0 // Initial y velocity
let vz0 = 0 // Initial z velocity

// Initial conditions
y0 = [x0, y0, z0, vx0, vy0, vz0]

let clock = new THREE.Clock()

let dz = rk4(rocketEquation, y0, 0.016, clock)


const updateRocket = (delta) => {
    dz = rk4(rocketEquation, dz, delta, clock)
    ball.position.y = dz[2]
}


const loop = () => {
    // setupKeyLogger()
    // setupKeyControls(ball)

    updateRocket(clock.getDelta())

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

const init = () => {
    createScene()
    createLight()
    createBall()
    createNewBall()
    // createRocket()

    loop()
}

window.addEventListener('load', init, false);