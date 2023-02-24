// Source
// https://www.spaceflightinsider.com/hangar/falcon-9/

const fuelMass = (elapsedTime) => {

    //  Constant parameters
    let firstStagePropellantMass = 395700
    let secondStagePropellantMass = 92670

    let burnRate = 1451.496 // fuel burn rate in kg / s

    // Calculate fuel mass
    let fuelMass = firstStagePropellantMass - burnRate * elapsedTime

    // Check for negative mass
    if (fuelMass < 0) {
        fuelMass = 0;
    }

    return fuelMass
}


const rocketMass = (fuelLeft) => {
    const payloadToLEO = 22800
    const payloadToGTO = 8300
    const payloadToMARS = 4020

    let firstStageRocketMass = 25600
    let secondStageRocketMass = 3900

    const tankMass = 500
    let rocketMass

    if (fuelLeft > 0) {
        rocketMass = firstStageRocketMass + payloadToLEO + fuelLeft

    } else { // fuelLeft == 0
        rocketMass = secondStageRocketMass + payloadToLEO
    }

    return rocketMass
}

export { fuelMass, rocketMass }