function sumArray(a1, a2) {

    if (a1.length != a2.length) {
        console.log('Not same lenght!')
    }

    let sum = new Array()
    a1.map((num, i) => { sum.push(num + a2[i]) })

    return sum
}

export { sumArray }