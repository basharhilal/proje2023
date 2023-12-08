import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
const orbit = new OrbitControls(camera, renderer.domElement);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 8, 1, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const cube = new THREE.Mesh( geometry, material );
cube.position.y = -3;
scene.add( cube );
const gridHelper = new THREE.GridHelper(30,100);
scene.add(gridHelper);
/*
const planeGeometry = new THREE.PlaneGeometry(30,20);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane); */

const geometry1 = new THREE.BoxGeometry( 3, 3, 3 );
const material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube1 = new THREE.Mesh( geometry1, material1 );
cube1.position.set(0,4,0);
scene.add( cube1 );

const geometry4 = new THREE.BoxGeometry( 3, 3, 3 );
const material4 = new THREE.MeshBasicMaterial( { color:  0x0ffff } );
const cube4 = new THREE.Mesh( geometry4, material4 );
cube1.position.set(0,4,3);
scene.add( cube4 );
// Set the background color
scene.background = new THREE.Color('skyblue');
  

window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if(code === 37) //left key
    {
        cube1.rotation.y -= 0.1;
    }
    else if (code === 38) 
    { //up key
        cube2.rotation.x += 0.1;
    } 
    else if (code === 39) { //right key
        cube1.rotation.y += 0.1;
    }
    else if (code === 40) { //down key
        cube2.rotation.x -= 0.1;
    }
else if(code === 65) //a
{
    scene.position.x -= 0.1;
}
else if (code === 87) 
{ //up key
    scene.position.y += 0.1;
} 
else if (code === 83) { //right key

    scene.position.y -= 0.1;
}
else if (code === 68) { //down key
    scene.position.x += 0.1;
    }
//..................
else if(code === 98) //2
{
    camera.position.z += 0.1;
}
else if (code === 104) //8
{ //up key
    cube.position.z -= 0.1;
    cube2.position.z -= 0.1;
} 
else if (code === 100) { //right key

    camera.position.x += 0.1;
}
else if (code === 102) { //down key
    camera.position.x -= 0.1;
    }

};
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);
const geometry2 = new THREE.BoxGeometry( 3, 3, 3 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.set(4,4,0);
scene.add( cube2);

const geometry3 = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 
const material3 = new THREE.MeshBasicMaterial( {color: 0x00ffff} ); 
const capsule = new THREE.Mesh( geometry3, material3 ); 
capsule.position.set(0,2,0);
scene.add( capsule );

const loader = new THREE.TextureLoader();
scene.background = loader.load( 'background.png' );

camera.position.z = 15;
camera.position.x = 2;
camera.position.y = 2;


function animate() {
	requestAnimationFrame( animate );
    
   // camera.position.y += 0.01;
   //cube1.rotation.y += 0.02;
	renderer.render( scene, camera );
}
animate();