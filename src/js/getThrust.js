// Source
// https://www.grc.nasa.gov/www/k-12/rocket/rktthsum.html

import { getAirPressure } from "./getAirPressure";

// constants
const M = 2100 // Mass flow rate
const V_e = 3000 // Velocity of exhaust
const P_e = 0.7 // Exhaust pressure
const A_e = 0.7 // Exit area

const firstStageBurnTime = 162
const secondStageBurnTime = 397

const thrustFactor = document.querySelector("#thrust")

const getThrust = (elapsedTime) => {

    let output = getAirPressure(elapsedTime) // Atmotsphere pressure, DONE

    let P0 = output[1]
    let thrust = (M * V_e + (P_e - P0) * A_e) * thrustFactor.value

    // True thrust
    // approx. 7 561 976.72
    // second stage thrust approx. 934 kN

    if (elapsedTime < firstStageBurnTime) {
        return thrust // Thrust in Newton

    } else {
        return 0
    }


}

export { getThrust }