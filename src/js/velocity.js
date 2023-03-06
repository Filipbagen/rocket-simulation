// functions

const velocity = (vector) => {
    return Math.sqrt(Math.pow(vector[3], 2) + Math.pow(vector[4], 2) + Math.pow(vector[5], 2))
}

export { velocity }