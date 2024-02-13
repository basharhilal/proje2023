import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

// Set up the scene
var renderer = new THREE.WebGLRenderer();
//zoomOut();

const aspect = window.innerWidth / window.innerHeight;
let insetWidth, insetHeight;

var scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(70, aspect, 0.01, 500);

camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 30;
camera.lookAt(0, 0, 0);

renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

const cameraTop = new THREE.PerspectiveCamera(90, aspect, 0.01, 100);

cameraTop.position.x = 1;
cameraTop.position.y = 2.5;
cameraTop.position.z = 26;

cameraTop.rotation.set(-0.3809504173655024,0.9277845123431603,0.018412182151283464)



cameraTop.name = "Telescope";

//camera.add(cameraTop);
scene.add(cameraTop);

resize();

animate();

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  insetWidth = window.innerWidth / 4;
  insetHeight = window.innerHeight / 4;

  cameraTop.aspect = insetWidth / insetHeight;
  cameraTop.updateProjectionMatrix();
}
window.addEventListener("resize", resize);

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
var btnRotateXPlus = document.getElementById("btnRotateXPlus");
var btnRotateYPlus = document.getElementById("btnRotateYPlus");
var btnRotateZPlus = document.getElementById("btnRotateZPlus");
var btnRotateXMinus = document.getElementById("btnRotateXMinus");
var btnRotateYMinus = document.getElementById("btnRotateYMinus");
var btnRotateZMinus = document.getElementById("btnRotateZMinus");
var btnMoveLeft = document.getElementById("btnMoveLeft");
var btnMoveRight = document.getElementById("btnMoveRight");
var btnMoveUp = document.getElementById("btnMoveUp");
var btnMoveDown = document.getElementById("btnMoveDown");
var btnMoveIn = document.getElementById("btnMoveIn");
var btnMoveOut = document.getElementById("btnMoveOut");

// Create the scope model
var scopeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 32);
var scopeMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
var scope = new THREE.Mesh(scopeGeometry, scopeMaterial);
scene.add(scope);

// Position the scope
scope.position.set(0, 0, -5);

const orbit = new OrbitControls(camera, renderer.domElement);

var  n100,n90,n80,n70,n60,n50;
//const geometry = new TextGeometry(0.4, 10, 1);

const fontLoader = new FontLoader();
fontLoader.load("fonts/helvetiker_regular.typeface.json", function (font) {
  const geometry100 = new TextGeometry("100", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });

  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

  n100 = new THREE.Mesh(geometry100, material);
  n100.position.set(0, 5.25, 0);
  n100.rotation.y = Math.PI;
  scene.add(n100);

  const geometry90 = new TextGeometry("90", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });
  n90 = new THREE.Mesh(geometry90, material);
  n90.position.set(0, 5, 0);
  n90.rotation.y = Math.PI;
  scene.add(n90);
  const geometry80 = new TextGeometry("80", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });
  n80 = new THREE.Mesh(geometry80, material);
  n80.position.set(0, 4.75, 0);
  n80.rotation.y = Math.PI;
  scene.add(n80);
  const geometry70 = new TextGeometry("70", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });
  n70 = new THREE.Mesh(geometry70, material);
  n70.position.set(0, 4.50, 0);
  n70.rotation.y = Math.PI;
  scene.add(n70);
  const geometry60 = new TextGeometry("60", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });
  n60 = new THREE.Mesh(geometry60, material);
  n60.position.set(0, 4.25, 0);
  n60.rotation.y = Math.PI;
  scene.add(n60);
  const geometryx = new TextGeometry("x", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });
  n90 = new THREE.Mesh(geometryx, material);
  n90.position.set(5, 0, 0);
  n90.rotation.y = Math.PI;
  scene.add(n90);
  const geometryy = new TextGeometry("y", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });
  n90 = new THREE.Mesh(geometryy, material);
  n90.position.set(0, 6, 0);
  n90.rotation.y = Math.PI;
  scene.add(n90);
  const geometryZ = new TextGeometry("z", {
    font: font,
    size: 0.2,
    height: 0.01,
    curveSegments: 10,
  });
  n90 = new THREE.Mesh(geometryZ, material);
  n90.position.set(0, 0, 5);
  n90.rotation.y = Math.PI;
  scene.add(n90);
});
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const helper = new THREE.CameraHelper( cameraTop );
scene.add( helper );

//cameraTop.lookAt(n100.position.x, n100.position.y, n100.position.z);
btnZoomIn.onclick = function () {
  cameraTop.position.z -= 0.5;
  LogInformation();
};
btnRotateXPlus.onclick = function () {
  cameraTop.rotation.x += 0.01;
  LogInformation();
};
btnRotateYPlus.onclick = function () {
  cameraTop.rotation.y += 0.01;
  LogInformation();
};
btnRotateZPlus.onclick = function () {
  cameraTop.rotation.z += 0.01;
  LogInformation();
};
btnRotateXMinus.onclick = function () {
  cameraTop.rotation.x -= 0.01;
  LogInformation();
};
btnRotateYMinus.onclick = function () {
  cameraTop.rotation.y -= 0.01;
  LogInformation();
};
btnRotateZMinus.onclick = function () {
  cameraTop.rotation.z -= 0.01;
  LogInformation();
};
btnMoveLeft.onclick = function () {
  cameraTop.position.x -= 0.5;
  LogInformation();
};
btnMoveRight.onclick = function () {
  cameraTop.position.x += 0.5;
  LogInformation();
};
btnMoveUp.onclick = function () {
  cameraTop.position.y += 0.5;
  LogInformation();
};
btnMoveDown.onclick = function () {
  cameraTop.position.y -= 0.5;
  LogInformation();
};
btnMoveIn.onclick = function () {
  cameraTop.position.z -= 0.5;
  LogInformation();
};
btnMoveOut.onclick = function () {
  cameraTop.position.z += 0.5;
  LogInformation();
};

btnZoomOut.onclick = function () {
    cameraTop.position.z += 0.5;
    LogInformation();
};
function LogInformation()
{
  console.log("*********************************************");
  console.log("cameraTop.position.x = "+cameraTop.position.x);
  console.log("cameraTop.position.y = "+cameraTop.position.y);
  console.log("cameraTop.position.z = "+cameraTop.position.z);
  console.log("cameraTop.rotation.x = "+cameraTop.rotation.x);
  console.log("cameraTop.rotation.y = "+cameraTop.rotation.y);
  console.log("cameraTop.rotation.z = "+cameraTop.rotation.z);
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

  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);

  renderer.render(scene, camera);

  renderer.clearDepth();
  renderer.setScissorTest(true);
  renderer.setScissor(
    window.innerWidth - insetWidth - 16,
    window.innerHeight - insetHeight - 16,
    insetWidth,
    insetHeight
  );
//   renderer.setViewport(
//     window.innerWidth - insetWidth - 16,
//     window.innerHeight - insetHeight - 16,
//     insetWidth,
//     insetHeight
//   );

  renderer.render(scene, cameraTop);
  renderer.setScissorTest(false);


}
