// Import functions
import { getAirDensity } from "./getAirDensity"
import { getGravity } from "./getGravity"
import { getThrust } from "./getThrust"
import { rocketMass, fuelMass } from "./mass"

const thetaInput = document.querySelector("#theta")
const phiInput = document.querySelector("#phi")


// Constants
const Cd = 0.6 // Drag coefficient
const A = 1 // Reference area of the rocket
let theta = 0 // Angle in radians of thrust vector in y-z plane
let phi = 0 // Angle in radians of thrust vector in x-y plane

// Inputs array of position and velocity (6 values)
function rocketEquation(y, clock) {

    // console.log(input.value)
    theta = thetaInput.value
    // phi = phiInput.value

    let altitude = y[2]
    let dy = new Array(6).fill(0); // Initialize output

    let rho = getAirDensity(altitude) // Air density, DONE
    let v = Math.sqrt(Math.pow(y[3], 2) + Math.pow(y[4], 2) + Math.pow(y[5], 2)) // Velocity
    let Fdrag = (Cd * A * rho * Math.pow(v, 2)) / 2 // Drag force on the rocket
    let Fthrust = getThrust(clock.elapsedTime)
    let m = rocketMass(fuelMass(clock.elapsedTime))
    let g = getGravity(altitude) // DONE

    // console.log(rho)

    dy[0] = y[3] // x velocity
    dy[1] = y[4] // y velocity
    dy[2] = y[5] // z velocity

    dy[3] = (Fthrust * Math.sin(theta) * Math.cos(phi) - Fdrag * y[3]) / m // x acceleration
    dy[4] = (Fthrust * Math.sin(theta) * Math.sin(phi) - Fdrag * y[4]) / m // y acceleration
    dy[5] = (Fthrust * Math.cos(theta) - Fdrag * y[5] - m * g) / m // z acceleration

    return dy
}

export { rocketEquation }