import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const NumberOfGrads = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var SelectedCircle;

const Settings = {
  RadianStep: 1 / 100,
  GradStep: ConvertRadToGrad(1 / 100),
};

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
const orbit = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//referencial points
var horizontalReferenceValue = 0;
var verticalReferenceValue = 0;
var y = 20;
//var rotationPoint = new THREE.Vector3(0, 2, 0);
//verticalGroup.position.sub(rotationPoint);
//verticalGroup

const deviceGroup = new THREE.Group(); //قروب الحركي الافقيه

//1 : feets
var blenderY = 2;
const blenderFeetsMesh = {
  mesh: null,
};
LoadBlenderModel(
  "../blender/",
  "1.gltf",
  0,
  blenderY,
  0,
  blenderFeetsMesh
);

//2: horizontal device = device
const blenderDeviceMesh = {
  mesh: null,
};
LoadBlenderModel(
  "../blender/",
  "2.gltf",
  0,
  blenderY,
  0,
  blenderDeviceMesh
);
//3: vertical device = lathe + cube2
const blenderLathCube2Mesh = {
  mesh: null,
};
LoadBlenderModel(
  "../blender/",
  "3.gltf",
  0,
  blenderY,
  0,
  blenderLathCube2Mesh
);
console.log("blender loaded");

const mesh150 = {
  mesh: null,
};
///
const reflektorMesh = {
  mesh: null,
};
LoadBlenderModel(
  "../blender/",
  "reflektor.gltf",
  -10,
  blenderY+1,
  -20,
  reflektorMesh
);
console.log("blender loaded");

///
const reflektorMesh2 = {
  mesh: null,
};
LoadBlenderModel(
  "../blender/",
  "reflektor.gltf",
  20,
  blenderY+1,
  -20,
  reflektorMesh2
);
console.log("blender loaded");
const pilyeMesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../blender/",
  "pilye.gltf",
  -3,
  blenderY-5,
  -1,
  pilyeMesh
);
console.log("blender loaded");

LoadBlenderModel(
  "../ta_agrat/",
  "scene.gltf",
  -10,
  -2 ,
  -25,
  mesh150,
  callBack
);

function callBack() {
  
  if ((blenderDeviceMesh?.mesh, blenderLathCube2Mesh?.mesh)) {
    console.log("callback 111111111111 ");
    deviceGroup.add(blenderDeviceMesh.mesh, blenderLathCube2Mesh.mesh);
    scene.add(deviceGroup);
  }
}

// const gridHelper = new THREE.GridHelper(100, 100);
// scene.add(gridHelper);
/*
const planeGeometry = new THREE.PlaneGeometry(30,20);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane); */

//const verticalGroup = new THREE.Group(); //قروب الحركي العمودي

// define html controls
var verticalResult = document.getElementById("verticalResult");
var horizontalResult = document.getElementById("horizontalResult");
var lblVerticalChange = document.getElementById("lblVerticalChange");
var lblHorizontalChange = document.getElementById("lblHorizontalChange");

// Set the background color
scene.background = new THREE.Color("");

window.onkeydown = function (e) {
  const GRADE = (2 * Math.PI) / 400; //convert radian to grad

  var code = e.keyCode ? e.keyCode : e.which;

  if (code === 37) {
    //left key

    deviceGroup.rotation.y += NumberOfGrads * GRADE;
    // blenderDeviceMesh.mesh.rotation.y += NumberOfGrads * GRADE;
    // blenderLathCube2Mesh.mesh.rotation.y += NumberOfGrads * GRADE;
  } else if (code === 38) {
    //up key
    // verticalGroup.rotation.x +=0.1
    //lathe.rotation.x += NumberOfGrads * GRADE;
    blenderLathCube2Mesh.mesh.rotation.x += NumberOfGrads * GRADE;
  } else if (code === 39) {
    //right key

    deviceGroup.rotation.y -= NumberOfGrads * GRADE;
    // blenderDeviceMesh.mesh.rotation.y -= NumberOfGrads * GRADE;
    // blenderLathCube2Mesh.mesh.rotation.y -= NumberOfGrads * GRADE;
  } else if (code === 40) {
    //down key
    // verticalGroup.rotation.x -=0.1
    //lathe.rotation.x -= NumberOfGrads * GRADE;
    blenderLathCube2Mesh.mesh.rotation.x -= NumberOfGrads * GRADE;
  }

  var verticalValue =
    -parseFloat(ConvertRadToGrad(blenderLathCube2Mesh.mesh.rotation.x)).toFixed(
      4
    ) + 100;

  verticalResult.textContent = verticalValue % 400;

  var horizontalValue = -parseFloat(
    ConvertRadToGrad(deviceGroup.rotation.y)
  ).toFixed(4);

  horizontalResult.textContent = horizontalValue;
};
//  لاضافه خطوط المحاور بشكل ملون
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);


const geometrycircle = new THREE.CircleGeometry(1, 32);
const materialcircle = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const circle1 = new THREE.Mesh(geometrycircle, materialcircle);
const circle2 = new THREE.Mesh(geometrycircle, materialcircle);
circle1.position.set(-25, 5.5, -20);
circle2.position.set(10, 9.5, -20);

const geometryCylinder = new THREE.CylinderGeometry(0.1, 0.1, 14, 32);
const materialCylinder = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cylinderCircle1 = new THREE.Mesh(geometryCylinder, materialCylinder);
cylinderCircle1.position.set(-25, -2.5, -20.1);
scene.add(cylinderCircle1);

const geometryCylinder2 = new THREE.CylinderGeometry(0.1, 0.1, 19, 32);
const cylinderCircle2 = new THREE.Mesh(geometryCylinder2, materialCylinder);
cylinderCircle2.position.set(10, -0.5, -20.1);
scene.add(cylinderCircle2);

//كبسه القياس الاماميه
const cylinderMeaure = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x880000 })
);
cylinderMeaure.position.set(-0.5, 1.2 + y, 1.5);
cylinderMeaure.rotation.x = Math.PI / 3;
//create line
var geometryLine = new THREE.BufferGeometry();

// Define line material
var materialLine = new THREE.LineBasicMaterial({ color: 0xff0000 });

// Create the line
var line = new THREE.Line(geometryLine, materialLine);
scene.add(line);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
document.addEventListener("click", onDocumentClick, false);

function onDocumentClick(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with the cube

  var intersects = raycaster.intersectObject(circle1);
  var circle1X = document.getElementById("circle1X");
  var circle1Y = document.getElementById("circle1Y");
  var circle1Z = document.getElementById("circle1Z");

  if (intersects.length > 0) {
    alert("circle1 clicked!");
    circle1X.textContent = circle1.position.x;
    circle1Y.textContent = circle1.position.y;
    circle1Z.textContent = circle1.position.z;

    var verticalAngel = Math.atan(
      (circle1.position.z - blenderLathCube2Mesh.mesh.position.z) /
      -(circle1.position.y - blenderLathCube2Mesh.mesh.position.y)
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);

    var verticaltest = document.getElementById("verticaltest");
    verticaltest.value = verticalAngel;
    console.log(verticaltest.value);
    verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
    console.log(verticaltest.value);

    var horizontalAngel = Math.atan(
      (circle1.position.x - blenderLathCube2Mesh.mesh.position.x) /
      -(circle1.position.z - blenderLathCube2Mesh.mesh.position.z)
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);

    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);

    SelectedCircle = circle1;
  }
  var intersects3 = raycaster.intersectObject(reflektorMesh.mesh);
  if (intersects3.length > 0) {
    alert("reflektor clicked!");

    var verticalAngel = Math.atan(
      (reflektorMesh.mesh.position.z - blenderLathCube2Mesh.mesh.position.z) /
      -(reflektorMesh.mesh.position.y - blenderLathCube2Mesh.mesh.position.y)
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);
    var verticaltest = document.getElementById("verticaltest");
    verticaltest.value = verticalAngel;
    console.log(verticaltest.value);
    verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
    console.log(verticaltest.value);

    var horizontalAngel = Math.atan(
      (reflektorMesh.mesh.position.x - blenderLathCube2Mesh.mesh.position.x) /
      -(reflektorMesh.mesh.position.z - blenderLathCube2Mesh.mesh.position.z)
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);
  }

  var intersects2 = raycaster.intersectObject(circle2);
  var circle2X = document.getElementById("circle2X");
  var circle2Y = document.getElementById("circle2Y");
  var circle2Z = document.getElementById("circle2Z");
  if (intersects2.length > 0) {
    alert("circle2 clicked!");
    circle2X.textContent = circle2.position.x;
    circle2Y.textContent = circle2.position.y;
    circle2Z.textContent = circle2.position.z;

    var verticalAngel = Math.atan(
      (circle2.position.z - blenderLathCube2Mesh.mesh.position.z) /
      -(circle2.position.y - blenderLathCube2Mesh.mesh.position.y)
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);

    var verticaltest = document.getElementById("verticaltest");
    verticaltest.value = verticalAngel;
    console.log(verticaltest.value);
    verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
    console.log(verticaltest.value);

    var horizontalAngel = Math.atan(
      (circle2.position.x - blenderLathCube2Mesh.mesh.position.x) /
      -(circle2.position.z - blenderLathCube2Mesh.mesh.position.z)
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    
    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);

    // Define line geometry

    SelectedCircle = circle2;
  }

  var intersects3 = raycaster.intersectObject(blenderLathCube2Mesh.mesh);

  var cubeX = document.getElementById("cubeX");
  var cubeY = document.getElementById("cubeY");
  var cubeZ = document.getElementById("cubeZ");
  if (intersects3.length > 0) {
    alert("cube clicked!");
    cubeX.textContent = cube2.position.x;
    cubeY.textContent = cube2.position.y;
    cubeZ.textContent = cube2.position.z;
  }

  var intersects4 = raycaster.intersectObject(cylinderMeaure);
  if (intersects4.length > 0) {
    DrawCircle1Line(SelectedCircle);
  }
}
scene.add(
  circle1,
  circle2,
  cylinderMeaure
);

const points1 = [];
for (let i = 0; i < 40; i++) {
  points1.push(
    new THREE.Vector2(Math.sin(i * 0.3) * 0.2 + 0.3, (i - 20) * 0.075)
  );
}

// الداخلي
const geometry2 = new THREE.BoxGeometry(1.1, 1.2, 2);
const material2 = new THREE.MeshNormalMaterial({ color: 0xff0000 });
//const cube2 = new THREE.Mesh(geometry2, material2);
//blenderLathCube2Mesh.mesh.position.set(0, 2.5 + y, 0);
//scene.add(cube2);

//light
const light = new THREE.PointLight(0xffffff, 500, 100);
light.position.set(-5, 10 , -5);
light.castShadow = true;
//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
scene.add(light);

const DirectionalLight = new THREE.DirectionalLight(0xff0000, 10000);

//light
const light1 = new THREE.PointLight(0xffffff, 500, 100);
light1.position.set(5, 10 , +5);
light1.castShadow = true;
//Set up shadow properties for the light
light1.shadow.mapSize.width = 512; // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5; // default
light1.shadow.camera.far = 500; // default
scene.add(light1);


//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry(30, 30, 32, 32);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0 + y, -10);
//plane.rotation.x = Math.PI/2;
plane.receiveShadow = true;
//scene.add( plane );

//Create a helper for the shadow camera (optional)
// const helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

//blenderLathCube2Mesh.mesh.castShadow = true;
//الوسط
/**/
const geometry11 = new THREE.LatheGeometry(points1);
const material11 = new THREE.MeshBasicMaterial({ color: 0x645300 });
//const lathe = new THREE.Mesh(geometry11, material11);
//scene.add(lathe);
// lathe.position.set(0, 2.5 + y, 0);
// lathe.rotation.x = Math.PI / 2;

camera.position.z = 15;
camera.position.x = 2;
camera.position.y = 2;

//logic
var horizontalRotation = 0;
var rotateHorizontal = false;
var verticalRotation = 0;
var rotateVertical = false;
var btnSet = document.getElementById("btnSet");
btnSet.onclick = function () {
  verticalRotation = document.getElementById("verticaltest").value;
  horizontalRotation = document.getElementById("horizontaltest").value;

  verticalRotation %= 400;
  horizontalRotation %= 400;

  verticalRotation = 100 - verticalRotation;
  horizontalRotation = -horizontalRotation;

  verticalRotation *= (Math.PI * 2) / 400;
  horizontalRotation *= (Math.PI * 2) / 400;

  rotateHorizontal = true;
  animateHorizontalRotation();

  rotateVertical = true;
  //animateVerticalRotation();

  //blenderLathCube2Mesh.mesh.rotation.y = horizontalRotation;

  verticalResult.textContent = verticaltest.value;
  horizontalResult.textContent = horizontaltest.value;
};

function animateVerticalRotation() {
  console.log("rotateVertical:" + rotateVertical);
  if (rotateVertical) requestAnimationFrame(animateVerticalRotation);

  if (
    rotateHorizontal ||
    Math.abs(blenderLathCube2Mesh.mesh.rotation.x - verticalRotation) < 0.01
  ) {
    lblVerticalChange.textContent = verticaltest.value;

    rotateVertical = false;
  } else if (blenderLathCube2Mesh.mesh.rotation.x > verticalRotation) {
    console.log(
      "blenderLathCube2Mesh.mesh.rotation.x:" +
      blenderLathCube2Mesh.mesh.rotation.x
    );
    console.log("verticalRotation:" + verticalRotation);

    console.log("Settings.RadianStep<< " + Settings.RadianStep);
    blenderLathCube2Mesh.mesh.rotation.x -= Settings.RadianStep;
    //lathe.rotation.x -= Settings.RadianStep;

    lblVerticalChange.textContent = parseFloat(
      (ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
    ).toFixed(4);
  } else if (blenderLathCube2Mesh.mesh.rotation.x < verticalRotation) {
    // console.log("blenderLathCube2Mesh.mesh.rotation.x:" + blenderLathCube2Mesh.mesh.rotation.x);
    // console.log("verticalRotation:" + verticalRotation);

    console.log("Settings.RadianStep<< " + Settings.RadianStep);

    // const axis = new THREE.Vector3(1, 0, 0); // X-axis
    // blenderLathCube2Mesh.mesh.rotateOnAxis(axis, );

    blenderLathCube2Mesh.mesh.rotation.x += Settings.RadianStep;
    //lathe.rotation.x += Settings.RadianStep;
    lblVerticalChange.textContent = parseFloat(
      (ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
    ).toFixed(4);
  }

  renderer.render(scene, camera);
}
function animateHorizontalRotation() {
  console.log("rotateHorizontal:" + rotateHorizontal);
  if (rotateHorizontal) requestAnimationFrame(animateHorizontalRotation);

  if (Math.abs(deviceGroup.rotation.y - horizontalRotation) < 0.01) {
    rotateHorizontal = false;

    lblHorizontalChange.textContent = horizontaltest.value;
    animateVerticalRotation();
  } else if (deviceGroup.rotation.y > horizontalRotation) {
    console.log("Settings.RadianStep<< " + Settings.RadianStep);
    deviceGroup.rotation.y -= Math.abs(Settings.RadianStep);

    //blenderLathCube2Mesh.mesh.rotation.y -= Math.abs(Settings.RadianStep);
    lblHorizontalChange.textContent = parseFloat(
      ConvertRadToGrad(-deviceGroup.rotation.y)
    ).toFixed(4);
  } else if (deviceGroup.rotation.y < horizontalRotation) {
    // console.log("blenderLathCube2Mesh.mesh.rotation.y:" + blenderLathCube2Mesh.mesh.rotation.y);
    // console.log("horizontalRotation:" + horizontalRotation);

    horizontalRotation -= 2 * Math.PI;
  }

  renderer.render(scene, camera);
}
document.getElementById("verticaltest").onchange = function () {
  var verticaltest = document.getElementById("verticaltest");
  if (verticaltest.value < 0)
    verticaltest.value = 400 + Number(verticaltest.value);
  if (verticaltest.value >= 400)
    verticaltest.value = -400 + Number(verticaltest.value);
  console.log(verticaltest.value);
  verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
  console.log(verticaltest.value);

  verticalResult.textContent = verticaltest.value;
};

document.getElementById("horizontaltest").onchange = function () {
  console.log("horizontaltest.onchange");
  var horizontaltest = document.getElementById("horizontaltest");
  console.log(horizontaltest.value);
  if (horizontaltest.value < 0)
    horizontaltest.value = 400 + Number(horizontaltest.value);
  if (horizontaltest.value >= 400)
    horizontaltest.value = -400 + Number(horizontaltest.value);
  console.log(horizontaltest.value);

  horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);
  horizontalResult.textContent = horizontaltest.value;
};

async function LoadBlenderModel(
  path,
  gltfFileName,
  x,
  y,
  z,
  object,
  callBack = function () { }
) {
  const loader = new GLTFLoader().setPath(path);
  var result = await loader.load(
    gltfFileName,
    function (gltf) {
      object.mesh = gltf.scene;
      object.mesh.position.set(x, y, z);
      scene.add(object.mesh);
      console.log("onLoad");
      callBack();
    },
    undefined
    ,
    function (error) {
      console.error(error);
      console.log("onError");
    }
  );
  console.log("result >>>>>>>>>>>>>>", typeof result);
  return result;
}

function calculateDistance(point1, point2) {
  var dx = point2.x - point1.x;
  var dy = point2.y - point1.y;
  var dz = point2.z - point1.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function DrawCircle1Line(circle) {
  scene.add(line);
  //Define line geometry
  var points = [];
  points.push(new THREE.Vector3(0, 2.5 + y, 0));
  points.push(
    new THREE.Vector3(circle.position.x, circle.position.y, circle.position.z)
  );
  geometryLine.setFromPoints(points);

  setTimeout(() => {
    scene.remove(line);
  }, 5000);
}

function ConvertRadToGrad(angel) {
  var result = (angel * 400) / (2 * Math.PI);
  while (result < 0) result += 400;
  while (result >= 400) result -= 400;
  return result;
}

function animate() {
  requestAnimationFrame(animate);

  // camera.position.y += 0.01;
  //cube1.rotation.y += 0.02;
  renderer.render(scene, camera);
}
animate();

renderer.render(scene, camera);
