// Imports
import { sumArray } from "./sumArray"
import { multiplyArray } from "./multiplyArray"

// Constants
let t = []
let z = []

// rk4 from mp3
function rk4(diffEquation, tspan, z0, n) {
    z[0] = z0
    let h = (tspan[1] - tspan[0]) / n

    let i = 0
    while (i <= n) {
        t[i] = tspan[0] + i * h
        i++
        // t = [0, 10, 20]
    }

    for (let i = 0; i < n; i++) {

        let k1 = diffEquation(z[i])
        let k2 = diffEquation(sumArray(z[i], multiplyArray(k1, (h / 2))))
        let k3 = diffEquation(sumArray(z[i], multiplyArray(k2, (h / 2))))
        let k4 = diffEquation(sumArray(z[i], multiplyArray(k3, h)))

        z.push(sumArray(z[i],
            multiplyArray(
                sumArray(
                    sumArray(k1, multiplyArray(k2, 2)),
                    sumArray(k4, multiplyArray(k3, 2))
                ),
                (h / 6)
            )
        )
        )
    }

    return z;
}

export { rk4 }