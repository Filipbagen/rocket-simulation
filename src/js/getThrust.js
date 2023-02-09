import { getAirPressure } from "./getAirPressure";

// constants
const M = 2100 // Mass flow rate
const V_e = 3000 // Velocity of exhaust
const P_e = 0.7 // Exhaust pressure
const A_e = 0.7 // Exit area

const getThrust = (altitude) => {

    let output = getAirPressure(getAirPressure) // Atmotsphere pressure
    let P0 = output[1]
    let thrust = M * V_e + (P_e - P0) * A_e

    return thrust // Thrust in Newton
}

export { getThrust }