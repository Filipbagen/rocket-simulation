
const starOutsideScreen = (rocket, star) => {
    let removeLeft = 1
    let removeRight = 2
    let removeTop = 3
    let removeDown = 4
    let margin = 0

    // returns true if stars are outside view + margin and false if stars can be seen
    if (rocket) {
        if (star.position.y < rocket.position.y - window.innerHeight / 2 - margin) {
            return removeDown

        } else if (star.position.y > rocket.position.y + window.innerHeight / 2 + margin) {
            return removeTop

        } else if (star.position.x < rocket.position.x - window.innerWidth / 2 - margin) {
            return removeLeft

        } else if (star.position.x > rocket.position.x + window.innerWidth / 2 + margin) {
            return removeRight
        }

        // return (
        //     star.position.y < rocket.position.y - window.innerHeight / 2 ||
        //     star.position.y > rocket.position.y + window.innerHeight / 2 ||
        //     star.position.x < rocket.position.x - window.innerWidth / 2 ||
        //     star.position.x > rocket.position.x + window.innerWidth / 2
        // )
    }



}




const generateStars = (rocket, stars) => {
    let starLenght = stars.length
    let i = 0
    const lessMargin = 100

    while (i < starLenght) {

        if (rocket) {
            if (starOutsideScreen(rocket, stars[i]) == 4) {
                // Add top
                stars[i].position.y = rocket.position.y + window.innerHeight / 2 + lessMargin * Math.random()

            } else if (starOutsideScreen(rocket, stars[i]) == 3) {
                // Add down
                stars[i].position.y = rocket.position.y - window.innerHeight / 2 - lessMargin * Math.random()

            } else if (starOutsideScreen(rocket, stars[i]) == 1) {
                // Add right
                stars[i].position.x = rocket.position.x + window.innerHeight / 2 + lessMargin * Math.random()

            } else if ((starOutsideScreen(rocket, stars[i]) == 2)) {
                // Add left
                stars[i].position.x = rocket.position.x - window.innerHeight / 2 - lessMargin * Math.random()
            }
        }

        i++
    }

    // for (let i = 0; i < stars.length; i++) {

    //     if (rocket) {
    //         if (starOutsideScreen(rocket, stars[i]) == 4) {
    //             // Add top
    //             stars[i].position.y = rocket.position.y + window.innerHeight / 2 + lessMargin * Math.random()

    //         } else if (starOutsideScreen(rocket, stars[i]) == 3) {
    //             // Add down
    //             stars[i].position.y = rocket.position.y - window.innerHeight / 2 - lessMargin * Math.random()

    //         } else if (starOutsideScreen(rocket, stars[i]) == 1) {
    //             // Add right
    //             stars[i].position.x = rocket.position.x + window.innerHeight / 2 + lessMargin * Math.random()

    //         } else if ((starOutsideScreen(rocket, stars[i]) == 2)) {
    //             // Add left
    //             stars[i].position.x = rocket.position.x - window.innerHeight / 2 - lessMargin * Math.random()
    //         }
    //     }
    // }
}

export { generateStars }