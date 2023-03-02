// Imports
import { sumArray } from "./sumArray"
import { multiplyArray } from "./multiplyArray"
import { rocketEquation } from "./rocketEquation"

let values = []

function rk4(z0, h, clock) {
    let z

    let k1 = rocketEquation(z0, clock)
    let k2 = rocketEquation(sumArray(z0, multiplyArray(k1, (h / 2))), clock)
    let k3 = rocketEquation(sumArray(z0, multiplyArray(k2, (h / 2))), clock)
    let k4 = rocketEquation(sumArray(z0, multiplyArray(k3, h)), clock)

    // Next step
    z = (sumArray(z0,
        multiplyArray(
            sumArray(
                sumArray(k1, multiplyArray(k2, 2)),
                sumArray(k4, multiplyArray(k3, 2))
            ),
            (h / 6)
        )
    )
    )


    // if (clock.elapsedTime < 9.8) {
    //     values.push(z)

    // } else if (clock.elapsedTime > 10.2 && clock.elapsedTime < 10.3) {
    //     console.log(values)
    // }

    return z;

}

export { rk4 }