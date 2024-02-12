import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// Set up the scene
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 15;
camera.position.x = 2;
camera.position.y = 2;

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new GLTFLoader().setPath("../ta_agrat/");

loader.load(
  "scene.gltf",
  function (gltf) {
    const mesh = gltf.scene;
    mesh.position.set(-10, 0, -25);
    scene.add(mesh);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// define html controls
var btnZoomIn = document.getElementById("btnZoomIn");
var btnZoomOut = document.getElementById("btnZoomOut");


// Create the scope model
var scopeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
var scopeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
var scope = new THREE.Mesh(scopeGeometry, scopeMaterial);
scene.add(scope);

// Position the scope
scope.position.set(0, 0, -5);

const orbit = new OrbitControls(camera, renderer.domElement);

var n99,n100;
//const geometry = new TextGeometry(0.4, 10, 1);

const fontLoader = new FontLoader();
fontLoader.load("fonts/helvetiker_regular.typeface.json", function (font) {
  const geometry100 = new TextGeometry("100", {
    font: font,
    size: 0.10,
    height: 0.01,
    curveSegments: 10
  });

  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  
  n100 = new THREE.Mesh(geometry100, material);
  n100.position.set(-3, 2, -1.5);
  scene.add(n100);

  const geometry99 = new TextGeometry("99", {
    font: font,
    size: 0.10,
    height: 0.01,
    curveSegments: 10
  });
  n99 = new THREE.Mesh(geometry99, material);
  n99.position.set(-3, 1, -1.5);
  scene.add(n99);
});

btnZoomIn.onclick = function()
{
    camera.position.z = (camera.position.z + n99.position.z)/2;
    camera.position.x = (camera.position.x + n99.position.x)/2 ;
    camera.position.y = (camera.position.y + n99.position.y)/2;
}

btnZoomOut.onclick = function()
{
    camera.position.z = (camera.position.z + 15)/2;
    camera.position.x = (camera.position.x + 2)/2;
    camera.position.y = (camera.position.y + 2)/2;
}

// Implement zoom functionality (adjusting FOV)
function zoomIn() {
  camera.fov -= 5;
  camera.updateProjectionMatrix();
}

function zoomOut() {
  camera.fov += 5;
  camera.updateProjectionMatrix();
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  //zoomOut();
  renderer.render(scene, camera);
}
animate();
