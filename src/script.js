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

// Rocket loader 
var loader = new GLTFLoader();
let rocket;
loader.load('rocket.glb', function (gltf) {

    rocket = gltf.scene;  
    rocket.position.x = 0;
    rocket.position.y = 0;
    rocket.position.z = -0.05;

    rocket.rotation.x = -3.14*0.5

    rocket.scale.set(.005, .005, .005)

    scene.add(rocket);
});

// Axis 
const axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );

// Temp floor mesh
const geometry = new THREE.PlaneGeometry( 15, 15 );
const material = new THREE.MeshBasicMaterial( {color: 'white', side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.rotation.x = Math.PI * 0.5;
plane.position.y = -3;


// Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGL1Renderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
//renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


// Resize window 
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

// Key controls - Arrows 
function setupKeyControls() {
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

// Define initial conditions
let x0 = 0; // Initial x position
let y0 = 0; // Initial y position
let z0 = 0; // Initial z position
let vx0 = 0; // Initial x velocity
let vy0 = 0; // Initial y velocity
let vz0 = 0; // Initial z velocity

// Initial conditions
let y1 = [x0, y0, z0, vx0, vy0, vz0]
let i = 0; 
let dz; 

function updateAnimation(){

	dz = rk4(rocketEquation, [0, i], y1, 10)

	rocket.position.y += 0.01*dz[i][2]
	camera.position.y += 0.01*dz[i][2]
	rocket.rotation.z += 0.05;
	light.position.y += 0.01*dz[i][2]
	
	y1 = [x0, dz[i][2], z0, vx0, vy0, vz0]
	i++ 

	displayData(); // Output data to display console
}

const clock = new THREE.Clock()
let reqAnim;

const loop = () => {
   
    setupKeyControls()
    
  
   if(rocket){ updateAnimation() }
    renderer.render(scene, camera)
    reqAnim = window.requestAnimationFrame(loop)
}


// Load rocket button 
// document.getElementById('load').addEventListener("click", function (){
//     loop();
//     window.cancelAnimationFrame(reqAnim);
//   })

// Start sim button 
document.getElementById('start').addEventListener("click", function (){
    loop();
    this.disabled = true;
  })

// Stop sim button 
document.getElementById('stop').addEventListener("click", function (){
  	window.cancelAnimationFrame(reqAnim);
    document.getElementById('start').disabled = false;

  })

  document.getElementById("restart").addEventListener("click", function restart() {

  	window.cancelAnimationFrame(reqAnim);
	
	 x0 = 0, y0 = 0, z0 = 0, vx0 = 0, vy0 = 0, vz0 = 0 // Reset inital

	rocket.position.y = 0
	camera.position.y = 0
	rocket.rotation.z = 0
	light.position.y = 0

	i = 0

	loop() 
	window.cancelAnimationFrame(reqAnim);
  })

function displayData(){ 
	document.getElementById("height").innerHTML= "Current height: " + dz[i][2] + " m";
	document.getElementById("velocity").innerHTML= "Current velocity: " + dz[i][5] + " m/s"; // Vilket index är hastigheten?
}


