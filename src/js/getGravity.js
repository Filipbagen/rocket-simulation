// Source
// https://en.wikipedia.org/wiki/Gravity_of_Earth

// Constants
const earthRadius = 6.371e6
const accelerationAtSurface = 9.82

function getGravity(height) {

    let gravity = accelerationAtSurface * Math.pow((earthRadius / (earthRadius + height)), 2)

    return gravity
}

export { getGravity }