// Source
// https://www.grc.nasa.gov/www/k-12/airplane/atmosmet.html

// functions
import { getAirPressure } from "./getAirPressure"

const getAirDensity = (altitude) => {
    let output = getAirPressure(altitude)

    let T = output[0]
    let p = output[1]

    let airDensity = p / (0.2869 * (T + 273.1))

    return airDensity
}

export { getAirDensity }