import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { DeviceRotations } from "./classes/DeviceRotations";
import { DeviceControl } from "./classes/DeviceControl";

const NumberOfGrads = 1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000
);

var isLoaded = false;
var SelectedCircle;

const Settings = {
  RadianStep: 1 / 100,
  GradStep: ConvertRadToGrad(1 / 100),
};

var deviceControl = new DeviceControl("measurement");
var mode = document.querySelector('input[name="mode"]:checked');
deviceControl.SetMode(mode.value);

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

const deviceGroup = new THREE.Group(); //قروب الحركي الافقيه

//1 : feets
var blenderY = 2;
const blenderFeetsMesh = {
  mesh: null,
};
LoadBlenderModel("../blender/", "1.gltf", 0, blenderY, 0, blenderFeetsMesh);

//2: horizontal device = device
const blenderDeviceMesh = {
  mesh: null,
};
LoadBlenderModel("../blender/", "2.gltf", 0, blenderY, 0, blenderDeviceMesh);
//3: vertical device = lathe + cube2
const blenderLathCube2Mesh = {
  mesh: null,
};
LoadBlenderModel("../blender/", "3.gltf", 0, blenderY, 0, blenderLathCube2Mesh);
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
  -35,
  blenderY + 5,
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
  blenderY - 2,
  -10,
  reflektorMesh2
);

console.log("blender loaded");
///
const reflektorMesh3 = {
  mesh: null,
};
LoadBlenderModel(
  "../blender/",
  "reflektor.gltf",
  -5,
  blenderY + 5,
  -40,
  reflektorMesh3
);

console.log("blender loaded");
///
const reflektorMesh4 = {
  mesh: null,
};
LoadBlenderModel(
  "../blender/",
  "reflektor.gltf",
  30,
  blenderY + 1,
  25,
  reflektorMesh4
);

console.log("blender loaded");

//

const pilyeMesh = {
  mesh: null,
};
LoadBlenderModel("../blender/", "pilye.gltf", -15, blenderY, -20, pilyeMesh);

console.log("blender loaded");
/*
const Model2Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../jaaninoja_bridge_in_turku_kurala_finland/",
  "scene.gltf",
  -15,
  blenderY-15,
  -20,
  Model2Mesh,
)*/
/*
const Model4Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../terrain/",
  "untitled.gltf",
 0,
  -10,
  0,
  Model4Mesh,
  callBack
);*/
/*
console.log("blender loaded");

const Model5Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../modern_city_block/",
  "untitled.gltf",
 0,
 -10,
  0,
  Model5Mesh,
  callBack
);
console.log("blender loaded");

console.log("blender loaded");

const Model6Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../wethumid_desert_-_terrain/",
  "scene.gltf",
 0,
 0,
  0,
  Model6Mesh,
  callBack
);
console.log("blender loaded");

const Model7Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../simple_terrain_with_rock_debris/",
  "scene.gltf",
 0,
 -8,
  0,
  Model7Mesh,
  callBack
);
console.log("blender loaded");
const Model8Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../mountain_terrain_-_haytor_dartmoor_national_park/",
  "scene.gltf",
 0,
 -4,
  0,
  Model8Mesh,
  callBack
);
console.log("blender loaded");

const Model9Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../interstate_overpass/",
  "scene.gltf",
 0,
 -7,
  0,
  Model9Mesh,
  callBack
);
console.log("blender loaded");

const Model10Mesh = {
  mesh: null,
}; 
LoadBlenderModel(
  "../mcdonalds_at_night/",
  "untitled.glb",
 0,
 -7,
  0,
  Model10Mesh,
  callBack
);
console.log("blender loaded");*/
/**/ /**/
const Model3Mesh = {
  mesh: null,
};
LoadBlenderModel(
  "../chicken_gun_town3/",
  "scene.gltf",
  200,
  -11,
  0,
  Model3Mesh,
  callBack
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
    deviceGroup.add(blenderDeviceMesh.mesh, blenderLathCube2Mesh.mesh);
    scene.add(deviceGroup);
  }

  if (reflektorMesh.mesh) {
    reflektorMesh.mesh.userData.name = "reflektor";
    reflektorMesh.mesh.lookAt(0, 5, +5);
  }

  if (reflektorMesh2.mesh) {
    reflektorMesh2.mesh.userData.name = "reflektor2";
    reflektorMesh2.mesh.lookAt(0, 5, +5);
  }

  if (reflektorMesh3.mesh) {
    reflektorMesh3.mesh.userData.name = "reflektor3";
    reflektorMesh3.mesh.lookAt(0, 5, +5);
  }

  if (reflektorMesh4.mesh) {
    reflektorMesh4.mesh.userData.name = "reflektor4";
    reflektorMesh4.mesh.lookAt(0, 5, +5);
  }

  if (pilyeMesh.mesh) {
    pilyeMesh.mesh.userData.draggable = true;
    pilyeMesh.mesh.userData.name = "pilye";
    pilyeMesh.mesh.lookAt(0, 3, +5);
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

  var verticalValue = parseFloat(
    (ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
  ).toFixed(4);

  verticalResult.textContent = verticalValue % 400;

  var horizontalValue = parseFloat(
    ConvertRadToGrad(-deviceGroup.rotation.y - ConvertGradToRad(x0))
  ).toFixed(4);

  horizontalResult.textContent = horizontalValue;
};
/*
window.onkeydown = function (e) {
 var code = e.keyCode ? e.keyCode : e.which;
  if (code === 37) {
    //left key
  deviceGroup.rotation.y += NumberOfGrads * GRADE;
  } else if (code === 38) {
    //up key//  8 
  blenderLathCube2Mesh.mesh.rotation.x += NumberOfGrads * GRADE;
  } else if (code === 39) {
    //right key
  deviceGroup.rotation.y -= NumberOfGrads * GRADE;
  } else if (code === 40) {
    //down key
  blenderLathCube2Mesh.mesh.rotation.x -= NumberOfGrads * GRADE;
  }
};*/
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

mode.onchange = function () {
  if (deviceControl.GetMode() === "measurement") {
    
    window.removeEventListener("click", (event) => {
      console.log(`draggable ${draggable?.userData?.name}`);
      if (draggable != null) {
        console.log(`dropping draggable ${draggable.userData.name}`);
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
    });
    window.removeEventListener("mousemove", (event) => {
      moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    document.addEventListener("click", onDocumentClick, false);
  } else {
    
    document.removeEventListener("click", onDocumentClick, false);
    
    window.addEventListener("click", (event) => {
      console.log(`draggable ${draggable?.userData?.name}`);
      if (draggable != null) {
        console.log(`dropping draggable ${draggable.userData.name}`);
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
    });

    window.addEventListener("mousemove", (event) => {
      moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }
};
//

function onDocumentClick(event) {
  {
    console.log(`draggable ${draggable}`);
    if (draggable != null) {
      console.log(`dropping draggable ${draggable.userData.name}`);
      draggable = null;
      return;
    }
    // THREE RAYCASTER
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const found = intersect(clickMouse);
    //var found = raycaster.intersectObject(reflektorMesh.mesh);

    if (found != null) {
      draggable = found;
      console.log(`found draggable ${draggable.userData.name}`);
    }
    // for (let i = 0; i < found.length; i++) {
    //   if (found[i].object.userData.draggable) {
    //     draggable = found[i].object
    //     console.log(`found draggable ${draggable.userData.name}`)
    //     break;
    //   }}

    //  if (found.length > 0) {
    //    if (found[0].object.userData.draggable) {
    //      draggable = found[0].object
    //      console.log(`found draggable ${draggable.userData.name}`)
    //    }
    //  }
  }

  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with the cube

  var intersects = raycaster.intersectObject(reflektorMesh.mesh);
  var circle1X = document.getElementById("circle1X");
  var circle1Y = document.getElementById("circle1Y");
  var circle1Z = document.getElementById("circle1Z");

  if (intersects.length > 0) {
    alert("reflektorMesh clicked!");
    circle1X.textContent = reflektorMesh.mesh.position.x;
    circle1Y.textContent = reflektorMesh.mesh.position.y;
    circle1Z.textContent = reflektorMesh.mesh.position.z;

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

    horizontalAngel = Math.atan(
      (reflektorMesh.mesh.position.x - blenderLathCube2Mesh.mesh.position.x) /
        -(reflektorMesh.mesh.position.z - blenderLathCube2Mesh.mesh.position.z)
    );

    horizontalAngel = calculateHorizontalAngel(
      reflektorMesh.mesh.position.x,
      reflektorMesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);

    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);

    SelectedCircle = reflektorMesh.mesh;
  }
  var intersects3 = raycaster.intersectObject(reflektorMesh.mesh);
  if (intersects3.length > 0) {
    alert("reflektor clicked!");

    var verticalAngel = Math.atan(
      (reflektorMesh.mesh.position.z - blenderLathCube2Mesh.mesh.position.z) /
        -(reflektorMesh.mesh.position.y - blenderLathCube2Mesh.mesh.position.y)
    );

    verticalAngel = calculateHorizontalAngel(
      blenderLathCube2Mesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.y,
      reflektorMesh.mesh.position.z,
      reflektorMesh.mesh.position.y
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

    horizontalAngel = calculateHorizontalAngel(
      reflektorMesh.mesh.position.x,
      reflektorMesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);
    SelectedCircle = reflektorMesh.mesh;
  }

  var intersects4 = raycaster.intersectObject(reflektorMesh2.mesh);
  if (intersects4.length > 0) {
    alert("reflektor clicked!");
    var verticalAngel = Math.atan(
      (reflektorMesh2.mesh.position.z - blenderLathCube2Mesh.mesh.position.z) /
        -(reflektorMesh2.mesh.position.y - blenderLathCube2Mesh.mesh.position.y)
    );

    verticalAngel = calculateHorizontalAngel(
      blenderLathCube2Mesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.y,
      reflektorMesh2.mesh.position.z,
      reflektorMesh2.mesh.position.y
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);
    var verticaltest = document.getElementById("verticaltest");
    verticaltest.value = verticalAngel;
    console.log(verticaltest.value);
    verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
    console.log(verticaltest.value);

    var horizontalAngel = Math.atan(
      (reflektorMesh2.mesh.position.x - blenderLathCube2Mesh.mesh.position.x) /
        -(reflektorMesh2.mesh.position.z - blenderLathCube2Mesh.mesh.position.z)
    );

    horizontalAngel = calculateHorizontalAngel(
      reflektorMesh2.mesh.position.x,
      reflektorMesh2.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);
    SelectedCircle = reflektorMesh2.mesh;
  }

  var intersects5 = raycaster.intersectObject(reflektorMesh3.mesh);
  if (intersects5.length > 0) {
    alert("reflektor clicked!");

    var verticalAngel = Math.atan(
      (reflektorMesh3.mesh.position.z - blenderLathCube2Mesh.mesh.position.z) /
        -(reflektorMesh3.mesh.position.y - blenderLathCube2Mesh.mesh.position.y)
    );
    verticalAngel = calculateHorizontalAngel(
      blenderLathCube2Mesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.y,
      reflektorMesh3.mesh.position.z,
      reflektorMesh3.mesh.position.y
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);
    var verticaltest = document.getElementById("verticaltest");
    verticaltest.value = verticalAngel;
    console.log(verticaltest.value);
    verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
    console.log(verticaltest.value);

    var horizontalAngel = Math.atan(
      (reflektorMesh3.mesh.position.x - blenderLathCube2Mesh.mesh.position.x) /
        -(reflektorMesh3.mesh.position.z - blenderLathCube2Mesh.mesh.position.z)
    );
    horizontalAngel = calculateHorizontalAngel(
      reflektorMesh3.mesh.position.x,
      reflektorMesh3.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );

    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);
    SelectedCircle = reflektorMesh3.mesh;
  }

  var intersects6 = raycaster.intersectObject(reflektorMesh4.mesh);
  if (intersects6.length > 0) {
    alert("reflektor clicked!");

    var verticalAngel = Math.atan(
      (reflektorMesh4.mesh.position.z - blenderLathCube2Mesh.mesh.position.z) /
        -(reflektorMesh4.mesh.position.y - blenderLathCube2Mesh.mesh.position.y)
    );

    verticalAngel = calculateHorizontalAngel(
      blenderLathCube2Mesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.y,
      reflektorMesh4.mesh.position.z,
      reflektorMesh4.mesh.position.y
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);
    var verticaltest = document.getElementById("verticaltest");
    verticaltest.value = verticalAngel;
    console.log(verticaltest.value);
    verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
    console.log(verticaltest.value);

    horizontalAngel = calculateHorizontalAngel(
      reflektorMesh4.mesh.position.x,
      reflektorMesh4.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);
    SelectedCircle = reflektorMesh4.mesh;
  }
  var intersects8 = raycaster.intersectObject(pilyeMesh.mesh);
  if (intersects8.length > 0) {
    alert("pilye clicked!");

    var verticalAngel = Math.atan(
      (pilyeMesh.mesh.position.z - blenderLathCube2Mesh.mesh.position.z) /
        -(pilyeMesh.mesh.position.y - blenderLathCube2Mesh.mesh.position.y)
    );

    verticalAngel = calculateHorizontalAngel(
      blenderLathCube2Mesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.y,
      pilyeMesh.mesh.position.z,
      pilyeMesh.mesh.position.y
    );
    verticalAngel = ConvertRadToGrad(verticalAngel);
    var verticaltest = document.getElementById("verticaltest");
    verticaltest.value = verticalAngel;
    console.log(verticaltest.value);
    verticaltest.value = parseFloat(verticaltest.value).toFixed(4);
    console.log(verticaltest.value);

    var horizontalAngel = Math.atan(
      (pilyeMesh.mesh.position.x - blenderLathCube2Mesh.mesh.position.x) /
        -(pilyeMesh.mesh.position.z - blenderLathCube2Mesh.mesh.position.z)
    );

    horizontalAngel = calculateHorizontalAngel(
      pilyeMesh.mesh.position.x,
      pilyeMesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);
    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);
    SelectedCircle = pilyeMesh.mesh;
  }
  /////////////////////////////////////////////////////

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

    verticalAngel = calculateHorizontalAngel(
      blenderLathCube2Mesh.mesh.position.z,
      blenderLathCube2Mesh.mesh.position.y,
      circle2.position.z,
      circle2.position.y
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

    horizontalAngel = calculateHorizontalAngel(
      circle2.position.x,
      circle2.position.z,
      blenderLathCube2Mesh.mesh.position.x,
      blenderLathCube2Mesh.mesh.position.z
    );
    horizontalAngel = ConvertRadToGrad(horizontalAngel);

    var horizontaltest = document.getElementById("horizontaltest");
    horizontaltest.value = horizontalAngel;
    horizontaltest.value = parseFloat(horizontaltest.value).toFixed(4);

    // Define line geometry

    SelectedCircle = circle2;
  }

  var intersects7 = raycaster.intersectObject(blenderLathCube2Mesh.mesh);

  var cubeX = document.getElementById("cubeX");
  var cubeY = document.getElementById("cubeY");
  var cubeZ = document.getElementById("cubeZ");
  if (intersects7.length > 0) {
    alert("cube clicked!");
    cubeX.textContent = blenderLathCube2Mesh.mesh.position.x;
    cubeY.textContent = blenderLathCube2Mesh.mesh.position.y;
    cubeZ.textContent = blenderLathCube2Mesh.mesh.position.z;
  }

  var btnMeasure = document.getElementById("btnMeasure");
  btnMeasure.onclick = function () {
    DrawCircle1Line(SelectedCircle);
  };

  var intersects4 = raycaster.intersectObject(cylinderMeaure);
  if (intersects4.length > 0) {
    DrawCircle1Line(SelectedCircle);
  }
}

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
var btnSet = document.getElementById("btnSet");
btnSet.onclick = function () {
  deviceRotation.SetVerticalRotationInGrad(
    document.getElementById("verticaltest").value
  );
  deviceRotation.SetHorizontalRotationInGrad(
    document.getElementById("horizontaltest").value
  );

  rotateHorizontal = true;
  animateHorizontalRotation();

  rotateVertical = true;

  verticalResult.textContent = verticaltest.value;
  horizontalResult.textContent = horizontaltest.value;
};

var btnDraw = document.getElementById("btnDraw");
btnDraw.onclick = function () {
  // verticalRotation
  //  horizontalRotation

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
  verticalArc.position.set(0, 2, 0);
  verticalArc.rotation.y = deviceRotation.GetVerticalArcStartRotation();
  scene.add(verticalArc);

  var n99, n100;
  var text99 = horizontaltest.value + ` grad`;
  var text100 = verticaltest.value + ` grad`;

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
    n100 = new THREE.Mesh(geometry100, material);
    n100.position.set(0, 7, 0);
    scene.add(n100);
    n100.rotation.y = Math.PI / 2 + deviceRotation.HorizontalRotationInRadian();
    const geometry99 = new TextGeometry(text99, {
      font: font,
      size: 1,
      height: 0.1,
      curveSegments: 10,
    });
    n99 = new THREE.Mesh(geometry99, material1);
    n99.position.set(1, 2, -5);
    n99.rotation.x = -Math.PI / 2;
    n99.rotation.z = -Math.PI / 10;
    scene.add(n99);
  });

  setTimeout(() => {
    scene.remove(verticalArc, horizontalArc, n99, n100);
  }, 30000);
};

var btnSetReference = document.getElementById("btnSetReference");
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
    ) < 0.01
  ) {
    lblVerticalChange.textContent = verticaltest.value;

    rotateVertical = false;
  } else if (
    blenderLathCube2Mesh.mesh.rotation.x >
    deviceRotation.VerticalRotationInRadian()
  ) {
    blenderLathCube2Mesh.mesh.rotation.x -= Settings.RadianStep;

    lblVerticalChange.textContent = parseFloat(
      (ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
    ).toFixed(4);
  } else if (
    blenderLathCube2Mesh.mesh.rotation.x <
    deviceRotation.VerticalRotationInRadian()
  ) {
    blenderLathCube2Mesh.mesh.rotation.x += Settings.RadianStep;

    lblVerticalChange.textContent = parseFloat(
      (ConvertRadToGrad(-blenderLathCube2Mesh.mesh.rotation.x) + 100) % 400
    ).toFixed(4);
  }

  renderer.render(scene, camera);
}
function animateHorizontalRotation() {
  console.log("rotateHorizontal:" + rotateHorizontal);
  if (rotateHorizontal) requestAnimationFrame(animateHorizontalRotation);

  if (
    Math.abs(
      deviceGroup.rotation.y - deviceRotation.HorizontalRotationInRadian()
    ) < 0.01
  ) {
    rotateHorizontal = false;

    lblHorizontalChange.textContent = horizontaltest.value;
    animateVerticalRotation();
  } else if (
    deviceGroup.rotation.y > deviceRotation.HorizontalRotationInRadian()
  ) {
    console.log("Settings.RadianStep<< " + Settings.RadianStep);
    deviceGroup.rotation.y -= Math.abs(Settings.RadianStep);

    //blenderLathCube2Mesh.mesh.rotation.y -= Math.abs(Settings.RadianStep);
    lblHorizontalChange.textContent = parseFloat(
      ConvertRadToGrad(-deviceGroup.rotation.y)
    ).toFixed(4);
  } else if (
    deviceGroup.rotation.y < deviceRotation.HorizontalRotationInRadian()
  ) {
    deviceRotation.DecreaseHorizontalRotationInGrad(400);
  }

  renderer.render(scene, camera);
}
document.getElementById("verticaltest").onchange = function () {
  var verticaltest = document.getElementById("verticaltest");
  while (verticaltest.value < 0)
    verticaltest.value = 400 + Number(verticaltest.value);
  while (verticaltest.value >= 400)
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
  while (horizontaltest.value < 0)
    horizontaltest.value = 400 + Number(horizontaltest.value);
  while (horizontaltest.value >= 400)
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
  //Define line geometry
  var points = [];
  points.push(
    new THREE.Vector3(
      blenderLathCube2Mesh.mesh.rotation.x - 0.33,
      blenderLathCube2Mesh.mesh.rotation.y + 2.1,
      blenderLathCube2Mesh.mesh.rotation.z
    )
  );
  points.push(
    new THREE.Vector3(circle.position.x, circle.position.y, circle.position.z)
  ); /*
  geometryLine.setFromPoints(points);
  var light7x=circle.position.x-0.5
  if ( circle.position.x>0 ) {
    var light7x =+ 1;
  } else if (code === 38) {
     
  }*/

  const light7 = new THREE.PointLight(0xff0000, 50000, 1);
  light7.position.set(
    circle.position.x - 0.5,
    circle.position.y + 0.5,
    circle.position.z + 0.5
  );
  light7.rotation.set(0, 0, 0);
  scene.add(light7);
  setTimeout(() => {
    scene.remove(line, light7);
  }, 5000);
}
function ConvertGradToRad(angel) {
  var result = (angel * 2 * Math.PI) / 400;
  while (result < 0) result += 2 * Math.PI;
  while (result >= 2 * Math.PI) result -= 2 * Math.PI;
  return result;
}

function ConvertRadToGrad(angel) {
  var result = (angel * 400) / (2 * Math.PI);
  while (result < 0) result += 400;
  while (result >= 400) result -= 400;
  return result;
}

function calculateHorizontalAngel(x1, y1, x2, y2) {
  var tmp =
    (x1 - x2) /
    (y2 - y1 - Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)));

  var horizontalAngel = 2 * Math.atan(tmp) + Math.PI;

  return horizontalAngel;
}

function calculateVerticalAngel(x1, y1, x2, y2) {
  var tmp =
    (x1 - x2) /
    (y2 - y1 - Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1)));

  var horizontalAngel = 2 * Math.atan(tmp) + Math.PI;

  return horizontalAngel;
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
