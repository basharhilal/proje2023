import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { DeviceRotations } from "./classes/DeviceRotations";
import { DeviceControl } from "./classes/DeviceControl";
import { Settings  } from "./classes/Settings";
import  * as Helper  from "./classes/Helper";


// define html controls
var verticalResult = document.getElementById("verticalResult");
var horizontalResult = document.getElementById("horizontalResult");
var lblVerticalChange = document.getElementById("lblVerticalChange");
var lblHorizontalChange = document.getElementById("lblHorizontalChange");
var btnSetSpeed = document.getElementById("btnSetSpeed");
var speedLabel = document.getElementById("speedLabel");
var textSpeedValue = document.getElementById("speed");
var verticalAngleTextValueInGrad = document.getElementById("verticalAngleTextValueInGrad");
var btnMeasure = document.getElementById("btnMeasure");
var btnSet = document.getElementById("btnSet");
var horizontalAngleTextValueInGrad = document.getElementById("horizontalAngleTextValueInGrad");
var btnDraw = document.getElementById("btnDraw");
var btnSetReference = document.getElementById("btnSetReference");
var labelDistance = document.getElementById("labelDistance");
var selectedModel = document.getElementById("selectedModel");


const NumberOfGrads = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);

const _Settings = new Settings();

_Settings.SetSelectedModel(selectedModel.textContent);

var isLoaded = false;


var focusedMeshs = [];

var deviceControl = new DeviceControl("measurement");
const modes = document.querySelectorAll('input[name="mode"]');

modes.forEach((mode) => {
  if (mode.checked) deviceControl.SetMode(mode.value);
});

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
const orbit = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//referencial points
var horizontalReferenceValue = 0;
var verticalReferenceValue = 0;
var y = 20;
var x0 = 0;
//var rotationPoint = new THREE.Vector3(0, 2, 0);
//verticalGroup.position.sub(rotationPoint);
//verticalGroup

btnSetSpeed.onclick = function () {
  _Settings.SetGradStep(textSpeedValue.value);
  speedLabel.textContent = _Settings.GetGradStep() + " Grad";
};

const deviceGroup = new THREE.Group(); //قروب الحركي الافقيه
const meshGroup = new THREE.Group(); 
//1 : feets
var blenderY = 2;

const blenderFeetsMesh = {mesh: null,};
LoadBlenderModel("../blender/", "1.gltf", 0, blenderY, 0, blenderFeetsMesh);

//2: horizontal device = device
const blenderDeviceMesh = {mesh: null,};
LoadBlenderModel("../blender/", "2.gltf", 0, blenderY, 0, blenderDeviceMesh);
//3: vertical device = lathe + cube2
const blenderLathCube2Mesh = { mesh: null,};
LoadBlenderModel("../blender/", "3.gltf", 0, blenderY, 0, blenderLathCube2Mesh);

const reflektorMesh = {mesh: null,};
LoadBlenderModel("../blender/","reflektor.gltf",  10, blenderY + 2,-10,reflektorMesh);

const reflektorMesh2 = {mesh: null,};
LoadBlenderModel("../blender/","reflektor.gltf",  12,blenderY + 2,-8,reflektorMesh2);
  
const reflektorMesh3 = {mesh: null,};
LoadBlenderModel("../blender/","reflektor.gltf",14, blenderY + 2,-6,reflektorMesh3);
  
const reflektorMesh4 = {mesh: null,};
LoadBlenderModel("../blender/","reflektor.gltf",16, blenderY + 2, -4,reflektorMesh4);

const pilyeMesh = {mesh: null,};
LoadBlenderModel("../blender/", "pilye.gltf", -15, blenderY, -20, pilyeMesh);

const mesh150 = {mesh: null,};
const Model2Mesh = { mesh: null,};
const Model3Mesh = { mesh: null,};
const Model4Mesh = { mesh: null,};
const Model5Mesh = { mesh: null,}; 
const Model6Mesh = { mesh: null,};
const Model7Mesh = { mesh: null,};
const Model8Mesh = { mesh: null,};
const Model9Mesh = { mesh: null,}; 

switch(selectedModel.textContent) {
  case "model1":
    LoadBlenderModel("../ta_agrat/", "scene.gltf", -10, -2, -25, mesh150, callBack);
    break;
  case "model2":
    LoadBlenderModel("../chicken_gun_town3/", "scene.gltf", 200, -11, 0, Model2Mesh, callBack);
    break;
  case "model3":
    LoadBlenderModel( "../terrain/","untitled.gltf", 0,  -10,  0,Model3Mesh,callBack);
     break;
  case "model4":
    LoadBlenderModel( "../modern_city_block/","untitled.gltf", 0,  -10,  0,Model4Mesh,callBack);
    break;
  case "model5":
    LoadBlenderModel( "../wethumid_desert_-_terrain/","scene.gltf", 0, 0,  0,Model5Mesh,callBack);
    break;  
  case "model6":
    LoadBlenderModel( "../simple_terrain_with_rock_debris/","scene.gltf", 0,-8,  0,Model6Mesh,callBack);
    break; 
  case "model7":
    LoadBlenderModel("../mountain_terrain_-_haytor_dartmoor_national_park/","scene.gltf", 0,-4,  0,Model7Mesh,callBack);
    break;
  case "model8":
    LoadBlenderModel( "../interstate_overpass/","scene.gltf", 0,-7,  0,Model8Mesh,callBack);
    break;
  case "model9":
    LoadBlenderModel("../mcdonalds_at_night/","untitled.glb", 0,-7,  0,Model9Mesh,callBack);
    break;      
}

function callBack() {
  if ((blenderDeviceMesh?.mesh, blenderLathCube2Mesh?.mesh)) {
    
    scene.add(deviceGroup);
  }

  if (reflektorMesh.mesh) {
    reflektorMesh.mesh.userData.name = "reflektor";
    //reflektorMesh.mesh.lookAt(0, 5, +5);
  }

  if (reflektorMesh2.mesh) {
    reflektorMesh2.mesh.userData.name = "reflektor2";
    //reflektorMesh2.mesh.lookAt(0, 5, +5);
  }

  if (reflektorMesh3.mesh) {
    reflektorMesh3.mesh.userData.name = "reflektor3";
    //reflektorMesh3.mesh.lookAt(0, 5, +5);
  }

  if (reflektorMesh4.mesh) {
    reflektorMesh4.mesh.userData.name = "reflektor4";
    //reflektorMesh4.mesh.lookAt(0, 5, +5);
  }

  if (pilyeMesh.mesh) {
    pilyeMesh.mesh.userData.draggable = true;
    pilyeMesh.mesh.userData.name = "pilye";
    //pilyeMesh.mesh.lookAt(0, 3, +5);
  }

  if (mesh150.mesh) mesh150.mesh.userData.ground = true;

  isLoaded = true;
}

// const gridHelper = new THREE.GridHelper(100, 100);
// scene.add(gridHelper);
/*
const planeGeometry = new THREE.PlaneGeometry(30,20);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane); */

//const verticalGroup = new THREE.Group(); //قروب الحركي العمودي


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
  else if (code === 100) //4 : left
  {
    focusedMeshs.forEach((element) => {element.position.x -= _Settings.GetMoveStep();});    
  }
  else if (code === 102) //6 : right
  {
    focusedMeshs.forEach((element) => {element.position.x += _Settings.GetMoveStep();});
  }
  else if (code === 104) //8 : up
  {
    focusedMeshs.forEach((element) => {element.position.z += _Settings.GetMoveStep();});
  }
  else if (code === 98) //2 : down
  {
    focusedMeshs.forEach((element) => {element.position.z -= _Settings.GetMoveStep();});
  }
  else if (code === 103) //7 : y-up
  {
    focusedMeshs.forEach((element) => {element.position.y += _Settings.GetMoveStep();});
  }
  else if (code === 97) //1 : y-down
  {
    focusedMeshs.forEach((element) => {element.position.y -= _Settings.GetMoveStep();});
  }
  else if (code === 105) //9 : rotate left
  {
    focusedMeshs.forEach((element) => {element.rotation.y -= _Settings.GetRotateStep();});
  }
  else if (code === 99) //3 : rotate right
  {
    focusedMeshs.forEach((element) => {element.rotation.y += _Settings.GetRotateStep();});
  }
  else if (code === 87) //W : move up 
  {
    meshGroup.position.y -= _Settings.GetMoveStep();
/*
    reflektorMesh.mesh.position.y -= _Settings.GetMoveStep();
    reflektorMesh2.mesh.position.y -= _Settings.GetMoveStep();
    reflektorMesh3.mesh.position.y -= _Settings.GetMoveStep();
    reflektorMesh4.mesh.position.y -= _Settings.GetMoveStep();

    mesh150.mesh.position.y -= _Settings.GetMoveStep();
    Model2Mesh.mesh.position.y -= _Settings.GetMoveStep();
    Model3Mesh.mesh.position.y -= _Settings.GetMoveStep();
    Model4Mesh.mesh.position.y -= _Settings.GetMoveStep();
    Model5Mesh.mesh.position.y -= _Settings.GetMoveStep();
    Model6Mesh.mesh.position.y -= _Settings.GetMoveStep();
    Model7Mesh.mesh.position.y -= _Settings.GetMoveStep();
    Model8Mesh.mesh.position.y -= _Settings.GetMoveStep();
    Model9Mesh.mesh.position.y -= _Settings.GetMoveStep();
*/
  }
  else if (code === 83) //S : move dawn 
  {
    reflektorMesh.mesh.position.y += _Settings.GetMoveStep();
    reflektorMesh2.mesh.position.y += _Settings.GetMoveStep();
    reflektorMesh3.mesh.position.y += _Settings.GetMoveStep();
    reflektorMesh4.mesh.position.y += _Settings.GetMoveStep();

    mesh150.mesh.position.y += _Settings.GetMoveStep();
    Model2Mesh.mesh.position.y += _Settings.GetMoveStep();
    Model3Mesh.mesh.position.y += _Settings.GetMoveStep();
    Model4Mesh.mesh.position.y += _Settings.GetMoveStep();
    Model5Mesh.mesh.position.y += _Settings.GetMoveStep();
    Model6Mesh.mesh.position.y += _Settings.GetMoveStep();
    Model7Mesh.mesh.position.y += _Settings.GetMoveStep();
    Model8Mesh.mesh.position.y += _Settings.GetMoveStep();
    Model9Mesh.mesh.position.y += _Settings.GetMoveStep();


  }
  else if (code === 68) //D : move right
  {
    reflektorMesh.mesh.position.x -= _Settings.GetMoveStep();
    reflektorMesh2.mesh.position.x -= _Settings.GetMoveStep();
    reflektorMesh3.mesh.position.x -= _Settings.GetMoveStep();
    reflektorMesh4.mesh.position.x -= _Settings.GetMoveStep();

    mesh150.mesh.position.x -= _Settings.GetMoveStep();
    Model2Mesh.mesh.position.x -= _Settings.GetMoveStep();
    Model3Mesh.mesh.position.x -= _Settings.GetMoveStep();
    Model4Mesh.mesh.position.x -= _Settings.GetMoveStep();
    Model5Mesh.mesh.position.x -= _Settings.GetMoveStep();
    Model6Mesh.mesh.position.x -= _Settings.GetMoveStep();
    Model7Mesh.mesh.position.x -= _Settings.GetMoveStep();
    Model8Mesh.mesh.position.x -= _Settings.GetMoveStep();
    Model9Mesh.mesh.position.x -= _Settings.GetMoveStep();


  }
  else if (code === 65) //A : move left
  {
    mesh150.mesh.position.x += _Settings.GetMoveStep();
    Model3Mesh.mesh.position.x += _Settings.GetMoveStep();


  }
  else if (code === 90) //Z : move left
  {
    mesh150.mesh.position.z += _Settings.GetMoveStep();
    Model3Mesh.mesh.position.z += _Settings.GetMoveStep();


  }
  else if (code === 88) //X : move left
  {
    mesh150.mesh.position.z -= _Settings.GetMoveStep();
    Model3Mesh.mesh.position.z -= _Settings.GetMoveStep();


  }
  

  var verticalValue = parseFloat(
    (Helper.ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
  ).toFixed(4);

  verticalResult.textContent = verticalValue % 400;

  var horizontalValue = parseFloat(
    Helper.ConvertRadToGrad(-deviceGroup.rotation.y - Helper.ConvertGradToRad(x0))
  ).toFixed(4);

  horizontalResult.textContent = horizontalValue;
};

//  لاضافه خطوط المحاور بشكل ملون
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const geometrycircle = new THREE.CircleGeometry(1, 32);
const materialcircle = new THREE.MeshBasicMaterial({ color: 0x00ffff });

const geometryCylinder = new THREE.CylinderGeometry(0.1, 0.1, 14, 32);
const materialCylinder = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cylinderCircle1 = new THREE.Mesh(geometryCylinder, materialCylinder);
cylinderCircle1.position.set(-25, -2.5, -20.1);
//scene.add(cylinderCircle1);

const geometryCylinder2 = new THREE.CylinderGeometry(0.1, 0.1, 19, 32);
const cylinderCircle2 = new THREE.Mesh(geometryCylinder2, materialCylinder);
cylinderCircle2.position.set(10, -0.5, -20.1);
//scene.add(cylinderCircle2);
/*/angle
const angle = new THREE.Mesh(
  new THREE.RingGeometry( 3, 5, 32,20,horizontalAngel,horizontalAngel),
  new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } ),
);
angle.position.set(0, 5, 0);
angle.rotation.x = Math.PI / 2;
*/
//كبسه القياس الاماميه
const cylinderMeaure = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x880000 })
);
cylinderMeaure.position.set(-0.5, 1.2, 1.5);
cylinderMeaure.rotation.x = Math.PI / 3;
//create line
var geometryLine = new THREE.BufferGeometry();

// Define line material
var materialLine = new THREE.LineBasicMaterial({ color: 0xff0000 });

// Create the line
var line = new THREE.Line(geometryLine, materialLine);
scene.add(line);
var horizontalAngel = 1;
var raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2(); // create once
const moveMouse = new THREE.Vector2(); // create once
var draggable = new THREE.Object3D();
var mouse = new THREE.Vector2();

//
const onWindowClickListener = function (event) {
  modes.forEach((element) => {
    if (element.checked) deviceControl.SetMode(element.value);
  });

  if (deviceControl.GetMode() === "measurement") {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with the cube
    calculateAngle(reflektorMesh.mesh);
    calculateAngle(reflektorMesh2.mesh);
    calculateAngle(reflektorMesh3.mesh);
    calculateAngle(reflektorMesh4.mesh);
    calculateAngle(pilyeMesh.mesh);
    calculateAngle(blenderDeviceMesh.mesh);
  } else {
    if (draggable != null) {
      draggable = null;
      return;
    }
    // THREE RAYCASTER
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const found = intersect(clickMouse);

    if (found != null) {
      draggable = found;
      console.log(`found draggable ${draggable.userData.name}`);
    }
  }
};

const mousemoveListener = function (event) {
  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

window.addEventListener("click", onWindowClickListener);
window.addEventListener("mousemove", mousemoveListener);



function calculateAngle(mesh)
{
  var intersects = raycaster.intersectObject(mesh);
  if (intersects.length > 0) {

    _Settings.SetCanDraw(false);
    _Settings.SetCanMeasure(false);

    alert("reflektor clicked!");

    var verticalAngel = Math.atan(
      (mesh.position.z - blenderLathCube2Mesh.mesh.position.z) /
        -(mesh.position.y - blenderLathCube2Mesh.mesh.position.y)
    );

    verticalAngel = Helper.calculateVerticalAngel(
      blenderLathCube2Mesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.y,
      mesh.position.z,
      mesh.position.y
    );
    verticalAngel = Helper.ConvertRadToGrad(verticalAngel);

    verticalAngleTextValueInGrad.value = verticalAngel;
    verticalAngleTextValueInGrad.value = parseFloat(verticalAngleTextValueInGrad.value).toFixed(4);

    var horizontalAngel = Math.atan(
      (mesh.position.x - blenderLathCube2Mesh.mesh.position.x) /
        -(mesh.position.z - blenderLathCube2Mesh.mesh.position.z)
    );

    horizontalAngel = Helper.calculateHorizontalAngel(
      mesh.position.x,
      mesh.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );
    horizontalAngel = Helper.ConvertRadToGrad(horizontalAngel);
    horizontalAngleTextValueInGrad.value = horizontalAngel;
    horizontalAngleTextValueInGrad.value = parseFloat(horizontalAngleTextValueInGrad.value).toFixed(4);
    focusedMeshs.forEach((element) => {focusedMeshs.pop(element);});
    if(mesh == blenderDeviceMesh.mesh)
      SelectAllDeviceParts();
    else
    focusedMeshs.push(mesh);
  }
}

function SelectAllDeviceParts()
{
  focusedMeshs.push(blenderDeviceMesh.mesh);
  focusedMeshs.push(blenderLathCube2Mesh.mesh);
  focusedMeshs.push(blenderFeetsMesh.mesh);
}

btnMeasure.onclick = function () {
  if(!_Settings.CanMeasure())
    {
      alert("Can't measure now");
      return;
    }
  var distance = Helper.calculateDistance(blenderLathCube2Mesh.mesh.position, focusedMeshs.position);
  labelDistance.textContent = distance.toFixed(3);
  DrawCircle1Line(focusedMeshs);
};
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
const light = new THREE.PointLight(0xffffff, 500, 300);
light.position.set(-5, 20, -5);
light.castShadow = true;
//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 50000; // default
scene.add(light);

const DirectionalLight = new THREE.DirectionalLight(0xff0000, 10000);

//light
const light1 = new THREE.PointLight(0xffffff, 500, 300);
light1.position.set(5, 15, +5);
light1.castShadow = true;
//Set up shadow properties for the light
light1.shadow.mapSize.width = 512; // default
light1.shadow.mapSize.height = 512; // default
light1.shadow.camera.near = 0.5; // default
light1.shadow.camera.far = 500; // default
scene.add(light1);
const light2 = new THREE.PointLight(0xffffff, 500000, 10000);
light2.position.set(5, 500, +5);
scene.add(light2);
const light3 = new THREE.PointLight(0xffffff, 500000, 10000);
light3.position.set(500, 500, +5);
scene.add(light3);
const light4 = new THREE.PointLight(0xffffff, 500000, 10000);
light4.position.set(-500, 500, +5);
scene.add(light4);
const light5 = new THREE.PointLight(0xffffff, 500000, 10000);
light5.position.set(5, 500, -500);
scene.add(light5);
const light6 = new THREE.PointLight(0xffffff, 500000, 10000);
light6.position.set(5, 500, +500);
scene.add(light6);

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
var deviceRotation = new DeviceRotations();

var rotateHorizontal = false;

var rotateVertical = false;
btnSet.onclick = function () {
  deviceRotation.SetVerticalRotationInGrad(
    verticalAngleTextValueInGrad.value
  );
  deviceRotation.SetHorizontalRotationInGrad(
    horizontalAngleTextValueInGrad.value
  );

  rotateHorizontal = true;
  animateHorizontalRotation();

  rotateVertical = true;

  verticalResult.textContent = verticalAngleTextValueInGrad.value;
  horizontalResult.textContent = horizontalAngleTextValueInGrad.value;
};
var previuosVerticalArc ;
var previuosHorizontalArc ;
var previuosHorizontalAngleTextValueMesh;
var previuosVerticalAngleTextValueMesh;


btnDraw.onclick = function () {
  // verticalRotation
  //  horizontalRotation
if(!_Settings.CanDraw())
  {
    alert("Can't draw now");
    return;
  }

  scene.remove(previuosVerticalArc, previuosHorizontalArc, previuosVerticalAngleTextValueMesh, previuosHorizontalAngleTextValueMesh);

  const horizontalArc = new THREE.Mesh(
    new THREE.RingGeometry(
      4,
      5,
      50,
      20,
      deviceRotation.GetHorizontalArcStartAngle(),
      deviceRotation.GetHorizontalArcLongAngle()
    ), //1,57=Pİ/4,,-1.57+
    new THREE.MeshBasicMaterial({ color: 0x0050ff, side: THREE.DoubleSide })
  );
  previuosHorizontalArc = horizontalArc;
  horizontalArc.position.set(0, 2, 0);
  horizontalArc.rotation.x = Math.PI / 2;
  scene.add(horizontalArc);
  const verticalArc = new THREE.Mesh(
    new THREE.RingGeometry(
      4,
      5,
      32,
      20,
      deviceRotation.GetVerticalArcStartAngle(),
      deviceRotation.GetVerticalArcLongAngle()
    ), //1,57=Pİ/4,,-1.57+
    new THREE.MeshBasicMaterial({ color: 0xff0055, side: THREE.DoubleSide })
  );
  previuosVerticalArc = verticalArc;
  verticalArc.position.set(0, 2, 0);
  verticalArc.rotation.y = deviceRotation.GetVerticalArcStartRotation();
  scene.add(verticalArc);

  var horizontalAngleTextValueMesh, verticalAngleTextValueMesh;
  var text99 = horizontalAngleTextValueInGrad.value + ` grad`;
  var text100 = verticalAngleTextValueInGrad.value + ` grad`;

  const fontLoader = new FontLoader();
  fontLoader.load("fonts/helvetiker_regular.typeface.json", function (font) {
    const geometry100 = new TextGeometry(text100, {
      font: font,
      size: 1,
      height: 0.1,
      curveSegments: 10,
    });

    const material = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const material1 = new THREE.MeshBasicMaterial({ color: 0x0050ff });
    verticalAngleTextValueMesh = new THREE.Mesh(geometry100, material);
    verticalAngleTextValueMesh.position.set(0, 7, 0);
    scene.add(verticalAngleTextValueMesh);
    verticalAngleTextValueMesh.rotation.y = Math.PI / 2 + deviceRotation.HorizontalRotationInRadian();
    const geometry99 = new TextGeometry(text99, {
      font: font,
      size: 1,
      height: 0.1,
      curveSegments: 10,
    });
    horizontalAngleTextValueMesh = new THREE.Mesh(geometry99, material1);
    horizontalAngleTextValueMesh.position.set(1, 2, -5);
    horizontalAngleTextValueMesh.rotation.x = -Math.PI / 2;
    horizontalAngleTextValueMesh.rotation.z = -Math.PI / 10;

    previuosVerticalAngleTextValueMesh = verticalAngleTextValueMesh;
    previuosHorizontalAngleTextValueMesh = horizontalAngleTextValueMesh;
    
    scene.add(horizontalAngleTextValueMesh);
  });

  setTimeout(() => {
    scene.remove(verticalArc, horizontalArc, horizontalAngleTextValueMesh, verticalAngleTextValueMesh);
  }, 30000);
};

btnSetReference.onclick = function () {
  x0 = 100;
};

function animateVerticalRotation() {
  if (rotateVertical) requestAnimationFrame(animateVerticalRotation);

  if (
    rotateHorizontal ||
    Math.abs(
      blenderLathCube2Mesh.mesh.rotation.x -
        deviceRotation.VerticalRotationInRadian()
    ) < _Settings.GetRadianStep()
  ) {
    lblVerticalChange.textContent = verticalAngleTextValueInGrad.value;

    _Settings.SetCanDraw(true);
    _Settings.SetCanMeasure(true);

    rotateVertical = false;
  } else if (
    blenderLathCube2Mesh.mesh.rotation.x >
    deviceRotation.VerticalRotationInRadian()
  ) {
    blenderLathCube2Mesh.mesh.rotation.x -= _Settings.GetRadianStep();

    lblVerticalChange.textContent = parseFloat(
      (Helper.ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
    ).toFixed(4);
  } else if (
    blenderLathCube2Mesh.mesh.rotation.x <
    deviceRotation.VerticalRotationInRadian()
  ) {
    blenderLathCube2Mesh.mesh.rotation.x += _Settings.GetRadianStep();

    lblVerticalChange.textContent = parseFloat(
      (Helper.ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
    ).toFixed(4);
  }

  renderer.render(scene, camera);
}
function animateHorizontalRotation() {
  console.log("_Settings.GetRadianStep():" + _Settings.GetRadianStep());
  console.log("deviceGroup.rotation.y:" + deviceGroup.rotation.y);
  console.log("deviceRotation.HorizontalRotationInRadian():" + deviceRotation.HorizontalRotationInRadian());
  console.log("difference:" + (deviceGroup.rotation.y - deviceRotation.HorizontalRotationInRadian()));
  if (rotateHorizontal) requestAnimationFrame(animateHorizontalRotation);

  if (
    Math.abs(
      deviceGroup.rotation.y - deviceRotation.HorizontalRotationInRadian()
    ) < _Settings.GetRadianStep()
  ) {
    rotateHorizontal = false;

    lblHorizontalChange.textContent = horizontalAngleTextValueInGrad.value;
    animateVerticalRotation();
  } else if (
    deviceGroup.rotation.y > deviceRotation.HorizontalRotationInRadian()
  ) {
    console.log("Settings.RadianStep<< " + _Settings.GetRadianStep());
    deviceGroup.rotation.y -= Math.abs(_Settings.GetRadianStep());

    //blenderLathCube2Mesh.mesh.rotation.y -= Math.abs(Settings.RadianStep);
    lblHorizontalChange.textContent = parseFloat(
      Helper.ConvertRadToGrad(-deviceGroup.rotation.y)
    ).toFixed(4);
  } else if (
    deviceGroup.rotation.y < deviceRotation.HorizontalRotationInRadian()
  ) {
    deviceRotation.DecreaseHorizontalRotationInGrad(400);
  }

  renderer.render(scene, camera);
}
verticalAngleTextValueInGrad.onchange = function () {
  while (verticalAngleTextValueInGrad.value < 0)
    verticalAngleTextValueInGrad.value = 400 + Number(verticalAngleTextValueInGrad.value);
  while (verticalAngleTextValueInGrad.value >= 400)
    verticalAngleTextValueInGrad.value = -400 + Number(verticalAngleTextValueInGrad.value);
  console.log(verticalAngleTextValueInGrad.value);
  verticalAngleTextValueInGrad.value = parseFloat(verticalAngleTextValueInGrad.value).toFixed(4);
  console.log(verticalAngleTextValueInGrad.value);

  verticalResult.textContent = verticalAngleTextValueInGrad.value;
};

horizontalAngleTextValueInGrad.onchange = function () {
  console.log("horizontalAngleTextValueInGrad.onchange");
  console.log(horizontalAngleTextValueInGrad.value);
  while (horizontalAngleTextValueInGrad.value < 0)
    horizontalAngleTextValueInGrad.value = 400 + Number(horizontalAngleTextValueInGrad.value);
  while (horizontalAngleTextValueInGrad.value >= 400)
    horizontalAngleTextValueInGrad.value = -400 + Number(horizontalAngleTextValueInGrad.value);
  console.log(horizontalAngleTextValueInGrad.value);

  horizontalAngleTextValueInGrad.value = parseFloat(horizontalAngleTextValueInGrad.value).toFixed(4);
  horizontalResult.textContent = horizontalAngleTextValueInGrad.value;
};

async function LoadBlenderModel(
  path,
  gltfFileName,
  x,
  y,
  z,
  object,
  callBack = function () {}
) {
  const loader = new GLTFLoader().setPath(path);
  var result = await loader.load(
    gltfFileName,
    function (gltf) {
      object.mesh = gltf.scene;
      object.mesh.position.set(x, y, z);
      object.mesh.userData.draggable = true;
      object.mesh.userData.name = "object2222222222222222222";
      //object.mesh.userData.ground = true;
      scene.add(object.mesh);
      console.log("onLoad");
      callBack();
    },
    undefined,
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

  const light7 = new THREE.PointLight(0xff0000, 500000, 1);
  light7.position.set(
    circle.position.x ,
    circle.position.y ,
    circle.position.z 
  );
  light7.rotation.set(0, 0, 0);
  scene.add(light7);
  setTimeout(() => {
    scene.remove(line, light7);
  }, 5000);
}

function dragObject() {
  if (draggable != null) {
    const found = intersect1(moveMouse);
    if (found.length > 0) {
      for (let i = 0; i < found.length; i++) {
        let target = found[i].point;
        draggable.position.x = target.x;
        draggable.position.z = target.z;
      }
    }
  }
}

function intersect(pos = new THREE.Vector2()) {
  raycaster.setFromCamera(pos, camera);

  // scene.children.forEach((child) => {
  //   console.log(child.name);
  // });
  var intersection = raycaster.intersectObject(reflektorMesh.mesh);
  if (intersection.length > 0) return reflektorMesh.mesh;
  intersection = raycaster.intersectObject(reflektorMesh2.mesh);
  if (intersection.length > 0) return reflektorMesh2.mesh;
  intersection = raycaster.intersectObject(reflektorMesh3.mesh);
  if (intersection.length > 0) return reflektorMesh3.mesh;
  intersection = raycaster.intersectObject(reflektorMesh4.mesh);
  if (intersection.length > 0) return reflektorMesh4.mesh;
  intersection = raycaster.intersectObject(pilyeMesh.mesh);
  if (intersection.length > 0) return pilyeMesh.mesh;
}
function intersect1(pos = new THREE.Vector2()) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObjects(scene.children);
}

function animate() {
  requestAnimationFrame(animate);
  if (isLoaded) dragObject();
  // camera.position.y += 0.01;
  //cube1.rotation.y += 0.02;
  renderer.render(scene, camera);
  callBack();
}
animate();

renderer.render(scene, camera);
