// Source
// https://math.stackexchange.com/questions/3415023/how-to-calculate-drag-force-vector

// functions
import { velocity } from "./velocity"

// Constants
const Cd = 0.6 // Drag coefficient
const A = 1 // Reference area of the rocket

const Fdrag = (airDensity, vel, y) => {
    let v = velocity(y) // Velocity
    document.querySelector('#velocity').innerHTML = Math.floor(v) + ' m/s'

    return (Cd * A * airDensity * Math.abs(v) * vel) / 2
}

export { Fdrag }