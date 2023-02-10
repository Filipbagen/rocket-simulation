const fuelMass = (altitude) => {

    //  Constant parameters
    let m_initial = 25000 // initial fuel mass in kg
    let burn_rate = 1451.496 // fuel burn rate in kg / s

    // Calculate fuel mass
    let m_fuel = m_initial - burn_rate * altitude

    // Check for negative mass
    if (m_fuel < 0) {
        m_fuel = 0;
    }

    document.getElementById("mass").innerHTML= "Fuel left: " + m_fuel + " kg";
    console.log(m_fuel);

    return m_fuel
}


const rocketMass = (fuelLeft) => {

    let rocketMass = 3900
    const tankMass = 500
    const cargo = 25000

    if (fuelLeft > 0) {
        rocketMass = rocketMass + fuelLeft + tankMass + cargo

    } else { // fuelLeft == 0
        rocketMass = rocketMass - tankMass + cargo
    }

    return rocketMass
}



export { fuelMass, rocketMass }