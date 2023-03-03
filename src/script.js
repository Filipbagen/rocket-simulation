import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// functions
import { rk4 } from './js/rk4'
import { rocketEquation } from './js/rocketEquation'
import { setupKeyControls, setupKeyLogger } from './setupKey'
import { addSphere, generateStars } from './js/createStars'

// styles
import './style.css'

let scene, camera, fieldOfView, aspectRatio, nearPlane, farPlane, renderer, canvas, stars = []
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
    camera.position.z = 200
    camera.position.y = 100
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
let ball, rocket, newBall, earth, sun

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

        rocket = gltf.scene
        rocket.rotation.x = -90
        rocket.scale.set(.005, .005, .005)

        scene.add(rocket)
    })
}

const createEarth = () => {
    loader.load('earth.glb', function (gltf) {

        earth = gltf.scene
        earth.scale.set(10, 10, 10)
        earth.position.y = -100
        earth.position.x = 30

        scene.add(earth)
    })
}

const createSun = () => {
    loader.load('sun.glb', function (gltf) {

        sun = gltf.scene
        sun.position.set(100, 300, 0)
        sun.scale.set(20, 20, 20)

        scene.add(sun)
    })
}

const createStars = () => {

    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
    for (let z = -1000; z < -100; z += 10) {

        // Make a sphere (exactly the same as before). 
        let geometry = new THREE.SphereGeometry(1, 8, 8)
        let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        let star = new THREE.Mesh(geometry, material)

        // This time we give the sphere random x and y positions
        star.position.x = Math.random() * window.innerWidth - window.innerWidth / 2
        star.position.y = Math.random() * window.innerHeight - window.innerHeight / 2

        // Then set the z position to where it is in the loop (distance of camera)
        star.position.z = z;

        //add the sphere to the scene
        scene.add(star);

        //finally push it to the stars array 
        stars.push(star);
    }
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

let dz = rk4(y0, 0.016, clock)

const updateRocket = (delta) => {
    dz = rk4(dz, delta, clock)

    if (rocket) {
        rocket.position.x = dz[0]
        rocket.position.z = dz[1]
        rocket.position.y = dz[2]

        rocket.rotation.y = document.querySelector("#theta").value
        rocket.rotation.z = document.querySelector("#phi").value

        if (rocket.position.y <= 0) {
            dz[0] = dz[1] = dz[2] = dz[3] = dz[4] = dz[5] = 0
        }
    }
}

const updateCamera = () => {
    camera.position.x = dz[0]
    camera.position.y = dz[2]
    // camera.position.z = dz[1]
}












const loop = () => {
    // setupKeyLogger()
    // setupKeyControls(ball)

    updateRocket(clock.getDelta())
    updateCamera()
    generateStars(rocket, stars)

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}



const init = () => {
    createScene()
    createLight()
    // createEarth()
    // createSun()
    // createBall()
    createNewBall()
    createRocket()
    createStars()

    // Stars
    // let skyBox = new THREE.BoxGeometry(120, 120, 120);
    // let skyBoxMaterial = new THREE.MeshBasicMaterial({
    //     map: getRandomStarField(600, 2048, 2048),
    //     side: THREE.BackSide
    // })
    // let sky = new THREE.Mesh(skyBox, skyBoxMaterial)
    // scene.add(sky)

    loop()
}

window.addEventListener('load', init, false);