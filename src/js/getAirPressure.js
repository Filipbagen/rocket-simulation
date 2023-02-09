// Source
// https://www.grc.nasa.gov/www/k-12/airplane/atmosmet.html

// constants
let T   // Temperature
let p   // pressure

const getAirPressure = (altitude) => {
    let output = []


    if (altitude < 11000) {   // Troposphere
        T = 15.04 - 0.00649 * altitude
        p = 101.29 * Math.pow(((T + 273.1) / 288.08), 5.256)

    } else if (altitude > 11000 && altitude < 25000) {    // Lower Stratosphere
        T = -56.46
        p = 22.65 * Math.pow(Math.E, (1.73 - 0.000157 * altitude))

    } else if (altitude > 25000) {  // Upper Stratosphere
        T = -131.21 + 0.00299 * altitude
        p = 2.488 * Math.pow(((T + 273.1) / 216.6), (-11.388))
    }

    output.push(T, p)

    return output
}

export { getAirPressure }