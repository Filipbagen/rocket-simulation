import * as THREE from 'three'

function smoke(){

	const geometry = new THREE.BoxGeometry( 1, 1, 1 );

	const uniforms = {
		u_resolution: { value: { x: null, y: null } },
		u_time: { value: 0.0 },
		u_mouse: { value: { x: null, y: null } },
	  }


	const vShader = ``

	const fShader = ``

	const material = new THREE.ShaderMaterial({
		vertexShader: vShader,
		fragmentShader: fShader,
		uniforms
	});

	const cube = new THREE.Mesh(geometry, material);
		  
	return cube;

}

export{smoke}