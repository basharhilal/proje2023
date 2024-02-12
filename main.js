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

const Settings = {
  RadianStep:1/100,
  GradStep:ConvertRadToGrad(1/100)
}

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
const orbit = new OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//referencial points
var horizontalReferenceValue = 0;
var verticalReferenceValue = 0;

//var rotationPoint = new THREE.Vector3(0, 2, 0);
//verticalGroup.position.sub(rotationPoint);
//verticalGroup

//قدم يسار
const geometry = new THREE.BoxGeometry(0.4, 10, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-3, -4.5, -1.5);
scene.add(cube);

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

// const gridHelper = new THREE.GridHelper(100, 100);
// scene.add(gridHelper);
cube.rotation.z = -Math.PI / 5;
cube.rotation.y = -Math.PI / 7;
//قدم يمين
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 10, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(cube3);
cube3.position.set(3, -4.5, -1.5);
cube3.rotation.z = Math.PI / 5;
cube3.rotation.y = Math.PI / 7;
//cube3.rotation.x= Math.PI/5

//قدم من جهتي
const cube11 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 10, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(cube11);
cube11.position.set(0, -4.5, +3.4);
cube11.rotation.z = -Math.PI / 5;
cube11.rotation.y = Math.PI / 2;

/*
const planeGeometry = new THREE.PlaneGeometry(30,20);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane); */

const deviceGroup = new THREE.Group(); //قروب الحركي الافقيه

const verticalGroup = new THREE.Group(); //قروب الحركي العمودي

//جنب يسار
const geometry6 = new THREE.BoxGeometry(0.9, 3, 1);
const material6 = new THREE.MeshBasicMaterial({ color: 0x54200 });
const cube6 = new THREE.Mesh(geometry6, material6);
cube6.position.set(-1.1, 2.2, 0);
scene.add(cube6);
//جنب يمين
const cube7 = new THREE.Mesh(geometry6, material6);
cube7.position.set(1.1, 2.2, 0);
scene.add(cube7);
//فوق مثلث على اليمين
const cylinder8 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.4, 0.5, 4),
  new THREE.MeshBasicMaterial({ color: 0x125600 })
);
cylinder8.rotation.y = Math.PI / 4;
scene.add(cylinder8);
cylinder8.position.set(1.3, 3.9, 0);
// فوق مثلث على اليسار
const cylinder9 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.4, 0.5, 4),
  new THREE.MeshBasicMaterial({ color: 0x125600 })
);
cylinder9.rotation.y = Math.PI / 4;
scene.add(cylinder9);
cylinder9.position.set(-1.3, 3.9, 0);
//فوق
const geometry8 = new THREE.BoxGeometry(2.8, 0.2, 0.2);
const material8 = new THREE.MeshBasicMaterial({ color: 0x55325 });
const cube8 = new THREE.Mesh(geometry8, material8);
cube8.position.set(0, 4.1, 0);
scene.add(cube8);

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
  } else if (code === 38) {
    //up key
    // verticalGroup.rotation.x +=0.1
    cube2.rotation.x += NumberOfGrads * GRADE;
    lathe.rotation.x += NumberOfGrads * GRADE;
  } else if (code === 39) {
    //right key

    deviceGroup.rotation.y -= NumberOfGrads * GRADE;
  } else if (code === 40) {
    //down key
    // verticalGroup.rotation.x -=0.1
    cube2.rotation.x -= NumberOfGrads * GRADE;
    lathe.rotation.x -= NumberOfGrads * GRADE;
  }

  var verticalValue =
    -parseFloat((cube2.rotation.x * 400) / (Math.PI * 2)).toFixed(4) + 100;
  while (verticalValue < 0) verticalValue += 400;
  verticalResult.textContent = (verticalValue + 400) % 400;

  var horizontalValue = -parseFloat(
    (deviceGroup.rotation.y * 400) / (Math.PI * 2)
  ).toFixed(4);
  console.log(horizontalValue);
  while (horizontalValue < 0) horizontalValue += 400;
  horizontalResult.textContent = horizontalValue % 400;
};
//  لاضافه خطوط المحاور بشكل ملون
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

// برغي القاعده يمين
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x265400 })
);
cylinder.position.set(0.8, 0.1, 0.5);
//برغي القاعد يسار
const cylinder1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x265400 })
);
cylinder1.position.set(-0.8, 0.1, 0.5);
//برغي القاعده امام
const cylinder2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x265400 })
);
cylinder2.position.set(0, 0.1, -1);
//برغي القاعده وسط
const cylinder3 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 1.2, 100),
  new THREE.MeshBasicMaterial({ color: 0x265456 })
);
cylinder3.position.set(0, -0.4, 0);
//القاعده المرتبطه بالاقدام
const cylinder4 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1.6, 0.5, 3),
  new THREE.MeshBasicMaterial({ color: 0x265400 })
);
cylinder4.position.set(0, -0.6, 0);
cylinder4.rotation.y = Math.PI / 3;
//القاعده اسفل البراغي
const cylinder5 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1.6, 0.3, 3),
  new THREE.MeshBasicMaterial({ color: 0x223600 })
);
cylinder5.position.set(0, -0.1, 0);
cylinder5.rotation.y = Math.PI / 3;
// القاعده فوق البراغي
const cylinder6 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1.6, 0.3, 3),
  new THREE.MeshBasicMaterial({ color: 0x223600 })
);
cylinder6.position.set(0, 0.4, 0);
cylinder6.rotation.y = Math.PI / 3;
//قاعده الجهاز
const cylinder7 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1, 0.3, 10),
  new THREE.MeshBasicMaterial({ color: 0x125600 })
);
cylinder7.position.set(0, 0.6, 0);
cylinder7.rotation.y = Math.PI / 3;

const geometrycircle = new THREE.CircleGeometry(1, 32);
const materialcircle = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const circle1 = new THREE.Mesh(geometrycircle, materialcircle);
const circle2 = new THREE.Mesh(geometrycircle, materialcircle);
circle1.position.set(-25, 8, -20);
circle2.position.set(10, 12, -20);

const geometryCylinder = new THREE.CylinderGeometry(0.1, 0.1, 14, 32);
const materialCylinder = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cylinderCircle1 = new THREE.Mesh(geometryCylinder, materialCylinder);
scene.add(cylinder);
cylinderCircle1.position.set(-25, 0, -20.1);
scene.add(cylinderCircle1);

const geometryCylinder2 = new THREE.CylinderGeometry(0.1, 0.1, 19, 32);
const cylinderCircle2 = new THREE.Mesh(geometryCylinder2, materialCylinder);
scene.add(cylinder);
cylinderCircle2.position.set(10, 2, -20.1);
scene.add(cylinderCircle2);
//create line
var geometryLine = new THREE.BufferGeometry();

// Define line material
var materialLine = new THREE.LineBasicMaterial({ color: 0x00ff00 });

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
      (circle1.position.z - cube2.position.z) /
        -(circle1.position.y - cube2.position.y)
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);

    vertcaltest.value = verticalAngel;
    console.log(vertcaltest.value);
    vertcaltest.value = parseFloat(vertcaltest.value).toFixed(4);
    console.log(vertcaltest.value);

    var horizontalAngel = Math.atan(
      (circle1.position.x - cube2.position.x) /
        -(circle1.position.z - cube2.position.z)
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);

    // Define line geometry
    var points = [];
    points.push(new THREE.Vector3(0, 2.5, 0));
    points.push(
      new THREE.Vector3(
        circle1.position.x,
        circle1.position.y,
        circle1.position.z
      )
    );
    geometryLine.setFromPoints(points);
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
      (circle2.position.z - cube2.position.z) /
        -(circle2.position.y - cube2.position.y)
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);

    vertcaltest.value = verticalAngel;
    console.log(vertcaltest.value);
    vertcaltest.value = parseFloat(vertcaltest.value).toFixed(4);
    console.log(vertcaltest.value);

    var horizontalAngel = Math.atan(
      (circle2.position.x - cube2.position.x) /
        -(circle2.position.z - cube2.position.z)
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);

    // Define line geometry
    var points = [];
    points.push(new THREE.Vector3(0, 2.5, 0));
    points.push(
      new THREE.Vector3(
        circle2.position.x,
        circle2.position.y,
        circle2.position.z
      )
    );

    geometryLine.setFromPoints(points);
  }

  var intersects3 = raycaster.intersectObject(cube2);

  var cubeX = document.getElementById("cubeX");
  var cubeY = document.getElementById("cubeY");
  var cubeZ = document.getElementById("cubeZ");
  if (intersects3.length > 0) {
    alert("cube clicked!");
    cubeX.textContent = cube2.position.x;
    cubeY.textContent = cube2.position.y;
    cubeZ.textContent = cube2.position.z;
  }
}

scene.add(
  cylinder,
  cylinder1,
  cylinder2,
  cylinder3,
  cylinder4,
  cylinder5,
  cylinder6,
  cylinder7,
  circle1,
  circle2
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
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(0, 2.5, 0);
scene.add(cube2);

//light
const light = new THREE.PointLight(0x00ff00, 500, 100);
light.position.set(0, 10, -5);
light.castShadow = true;
//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default
scene.add(light);

//Create a plane that receives shadows (but does not cast them)
const planeGeometry = new THREE.PlaneGeometry(30, 30, 32, 32);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0, 0, -10);
//plane.rotation.x = Math.PI/2;
plane.receiveShadow = true;
//scene.add( plane );

//Create a helper for the shadow camera (optional)
// const helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );

cube2.castShadow = true;
//الوسط
/**/
const geometry11 = new THREE.LatheGeometry(points1);
const material11 = new THREE.MeshBasicMaterial({ color: 0x645300 });
const lathe = new THREE.Mesh(geometry11, material11);
scene.add(lathe);
lathe.position.set(0, 2.5, 0);
lathe.rotation.x = Math.PI / 2;

// الشاشه الاماميه
const cube9 = new THREE.Mesh(
  new THREE.BoxGeometry(2.3, 1.2, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x16365 })
);
//cube9.rotation.y=Math.PI/4;
cube9.rotation.x = -Math.PI / 5;
//cylinder10.rotation.z=Math.PI/2;
scene.add(cube9);
cube9.position.set(0, 1.1, 1.1);
// الشاشه الخلفيه
const cube10 = new THREE.Mesh(
  new THREE.BoxGeometry(2.3, 1.2, 0.5),
  new THREE.MeshBasicMaterial({ color: 0x12365 })
);
//cube9.rotation.y=Math.PI/4;
cube10.rotation.x = Math.PI / 5;
//cylinder10.rotation.z=Math.PI/2;
scene.add(cube10);
cube10.position.set(0, 1.1, -1.1);

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
  console.log(deviceGroup.rotation.y);

  verticalRotation = document.getElementById("vertcaltest").value;
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
 
  //deviceGroup.rotation.y = horizontalRotation;
  console.log(deviceGroup.rotation.y);

  verticalResult.textContent = vertcaltest.value;
  horizontalResult.textContent = horizontaltest.value;
};

function animateVerticalRotation() {
 
  console.log("rotateVertical:" + rotateVertical);
  if(rotateVertical)
    requestAnimationFrame(animateVerticalRotation);

  if (rotateHorizontal || Math.abs(cube2.rotation.x - verticalRotation)<0.01) {
   // lblVerticalChange.textContent = vertcaltest.value;
    rotateVertical = false;
  }
  else if (cube2.rotation.x > verticalRotation) {
     console.log("cube2.rotation.x:" + cube2.rotation.x);
     console.log("verticalRotation:" + verticalRotation);

     console.log("Settings.RadianStep<< " + Settings.RadianStep);
     cube2.rotation.x -= Settings.RadianStep;
     lathe.rotation.x -= Settings.RadianStep;
     
     lblVerticalChange.textContent =parseFloat( ConvertRadToGrad(-lathe.rotation.x)).toFixed(4);
     
  } else if (cube2.rotation.x < verticalRotation) {
    // console.log("cube2.rotation.x:" + cube2.rotation.x);
    // console.log("verticalRotation:" + verticalRotation);

    console.log("Settings.RadianStep<< " + Settings.RadianStep);
    cube2.rotation.x += Settings.RadianStep;
    lathe.rotation.x += Settings.RadianStep;
    lblVerticalChange.textContent =parseFloat( ConvertRadToGrad(-lathe.rotation.x)).toFixed(4);
  }  

  renderer.render(scene, camera);
}
function animateHorizontalRotation() {
 
  console.log("rotateHorizontal:" + rotateHorizontal);
  if(rotateHorizontal)
    requestAnimationFrame(animateHorizontalRotation);

  if (Math.abs(deviceGroup.rotation.y - horizontalRotation)<0.01) {
    rotateHorizontal = false;
    lblHorizontalChange.textContent = horizontaltest.value;
    animateVerticalRotation();
  }
  else if (deviceGroup.rotation.y > horizontalRotation) {
    //  console.log("deviceGroup.rotation.y:" + deviceGroup.rotation.y);
    //  console.log("horizontalRotation:" + horizontalRotation);

    console.log("Settings.RadianStep<< " + Settings.RadianStep);
    deviceGroup.rotation.y -= Math.abs(Settings.RadianStep);
    lblHorizontalChange.textContent =parseFloat( ConvertRadToGrad(-deviceGroup.rotation.y)).toFixed(4);

  } else if (deviceGroup.rotation.y < horizontalRotation) {
    // console.log("deviceGroup.rotation.y:" + deviceGroup.rotation.y);
    // console.log("horizontalRotation:" + horizontalRotation);

    horizontalRotation -= 2 * Math.PI;
  }  

  renderer.render(scene, camera);
}
document.getElementById("vertcaltest").onchange = function () {
  var vertcaltest = document.getElementById("vertcaltest");
  if (vertcaltest.value < 0)
    vertcaltest.value = 400 + Number(vertcaltest.value);
  if (vertcaltest.value >= 400)
    vertcaltest.value = -400 + Number(vertcaltest.value);
  console.log(vertcaltest.value);
  vertcaltest.value = parseFloat(vertcaltest.value).toFixed(4);
  console.log(vertcaltest.value);

  verticalResult.textContent = vertcaltest.value;
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

function calculateDistance(point1, point2) {
  var dx = point2.x - point1.x;
  var dy = point2.y - point1.y;
  var dz = point2.z - point1.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
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

verticalGroup.add(cube2, lathe);
scene.add(verticalGroup);

deviceGroup.add(
  cube6,
  cube7,
  cube8,
  cylinder7,
  cylinder8,
  cylinder9,
  cube9,
  cube10,
  verticalGroup
);

scene.add(deviceGroup);

renderer.render(scene, camera);
