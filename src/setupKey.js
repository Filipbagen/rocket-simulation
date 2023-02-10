const setupKeyControls = (mesh) => {
    // var cube = scene.getObjectByName('cube');
    document.onkeydown = function (e) {
        switch (e.key) {
            case "ArrowUp":
                mesh.position.y += 1;
                break;
            case "ArrowDown":
                mesh.position.y -= 1;
                break;
            case "ArrowLeft":
                mesh.position.x -= 1;
                break;
            case "ArrowRight":
                mesh.position.x += 1;
                break;
            case "+":
                mesh.position.z += 1;
                break;
            case "-":
                mesh.position.z -= 1;
                break;
        }
    };
}

const setupKeyLogger = () => {
    document.onkeydown = function (e) {
        console.log(e);
    }
}

export { setupKeyControls, setupKeyLogger }