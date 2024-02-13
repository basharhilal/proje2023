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
const deviceGroup = new THREE.Group(); //قروب الحركي الافقيه

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

const orbit = new OrbitControls(camera, renderer.domElement);

var n99, n100;
//const geometry = new TextGeometry(0.4, 10, 1);

const fontLoader = new FontLoader();
fontLoader.load("fonts/helvetiker_regular.typeface.json", function (font) {
  const geometry100 = new TextGeometry("100", {
    font: font,
    size: 0.1,
    height: 0.01,
    curveSegments: 10,
  });

  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

  n100 = new THREE.Mesh(geometry100, material);
  n100.position.set(-20, 2, -15);
  scene.add(n100);

  const geometry99 = new TextGeometry("99", {
    font: font,
    size: 0.1,
    height: 0.01,
    curveSegments: 10,
  });
  n99 = new THREE.Mesh(geometry99, material);
  n99.position.set(-20, 1, -15);
  scene.add(n99);
});

let linex,
  mesh1,
  added = false;
btnZoomIn.onclick = function () {
  if (added) {
    scene.remove(linex);
    scene.remove(mesh1);
  }
  added = true;

  camera.position.z = n99.position.z + 1;
  camera.position.x = n99.position.x;
  camera.position.y = n99.position.y;
  // camera.rotation.y -= 0.2;
  //camera.rotation.x += 0.1;
  const geometry = new THREE.RingGeometry(0.5, 10, 50, 30);
  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
  });
  mesh1 = new THREE.Mesh(geometry, material);
  scene.add(mesh1);
  mesh1.position.set(
    camera.position.x,
    camera.position.y,
    camera.position.z - 0.5
  );
  // mesh1.rotation.y -= 0.2;
  //mesh1.rotation.x += 0.1;
  const material1 = new THREE.LineBasicMaterial({
    color: 0xff0000,
  });
  const points = [];
  points.push(
    new THREE.Vector3(
      camera.position.x - 10,
      camera.position.y,
      camera.position.z - 3
    )
  );
  points.push(
    new THREE.Vector3(
      camera.position.x + 10,
      camera.position.y,
      camera.position.z - 3
    )
  );

  points.push(
    new THREE.Vector3(
      camera.position.x,
      camera.position.y - 10,
      camera.position.z - 3
    )
  );
  points.push(
    new THREE.Vector3(
      camera.position.x,
      camera.position.y + 10,
      camera.position.z - 3
    )
  );

  points.push(
    new THREE.Vector3(
      camera.position.x,
      camera.position.y + 1.5,
      camera.position.z - 3
    )
  );
  points.push(
    new THREE.Vector3(
      camera.position.x + 2,
      camera.position.y + 1.5,
      camera.position.z - 3
    )
  );

  points.push(
    new THREE.Vector3(
      camera.position.x,
      camera.position.y + 1.5,
      camera.position.z - 3
    )
  );

  points.push(
    new THREE.Vector3(
      camera.position.x,
      camera.position.y - 1.5,
      camera.position.z - 3
    )
  );
  points.push(
    new THREE.Vector3(
      camera.position.x + 2,
      camera.position.y - 1.5,
      camera.position.z - 3
    )
  );

  const geometryx = new THREE.BufferGeometry().setFromPoints(points);
  linex = new THREE.Line(geometryx, material1);
  //linex.rotation.y -= 0.1;
  //linex.rotation.x -= 0.01;
  scene.add(linex);
};

btnZoomOut.onclick = function () {
  camera.position.z = (camera.position.z + 15) / 2;
  camera.position.x = (camera.position.x + 2) / 2;
  camera.position.y = (camera.position.y + 2) / 2;

  // camera.rotation.y += 0.2;
  //camera.rotation.x -= 0.1;

  scene.remove(linex);
  scene.remove(mesh1);
};

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

//  لاضافه خطوط المحاور بشكل ملون
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const NumberOfGrads = 1;
let y = 0;

window.onkeydown = function (e) {
  const GRADE = (2 * Math.PI) / 400; //convert radian to grad

  var code = e.keyCode ? e.keyCode : e.which;

  if (code === 37) {
    //left key

    deviceGroup.rotation.y += NumberOfGrads * GRADE;
  } else if (code === 38) {
    //up key
    // verticalGroup.rotation.x +=0.1
    // cube2.rotation.x += NumberOfGrads * GRADE;
    // lathe.rotation.x += NumberOfGrads * GRADE;
  } else if (code === 39) {
    //right key

    deviceGroup.rotation.y -= NumberOfGrads * GRADE;
  } else if (code === 40) {
    //down key
    // verticalGroup.rotation.x -=0.1
    //cube2.rotation.x -= NumberOfGrads * GRADE;
    // lathe.rotation.x -= NumberOfGrads * GRADE;
  }
};

//قدم يسار
const geometry = new THREE.BoxGeometry(0.4, 10, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-3, -4.5 + y, -1.5);
scene.add(cube);
cube.rotation.z = -Math.PI / 5;
cube.rotation.y = -Math.PI / 7;
//قدم يمين
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 10, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(cube3);
cube3.position.set(3, -4.5 + y, -1.5);
cube3.rotation.z = Math.PI / 5;
cube3.rotation.y = Math.PI / 7;
//قدم من جهتي
const cube11 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 10, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(cube11);
cube11.position.set(0, -4.5 + y, +3.4);
cube11.rotation.z = -Math.PI / 5;
cube11.rotation.y = Math.PI / 2;

// برغي القاعده يمين
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x665400 })
);
cylinder.position.set(0.8, -0.2 + y, 0.5);
//برغي القاعد يسار
const cylinder1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x665400 })
);
cylinder1.position.set(-0.8, -0.2 + y, 0.5);
//برغي القاعده امام
const cylinder2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.4, 100),
  new THREE.MeshBasicMaterial({ color: 0x665400 })
);
cylinder2.position.set(0, -0.2 + y, -1);
//برغي القاعده وسط
const cylinder3 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 1.2, 100),
  new THREE.MeshBasicMaterial({ color: 0x265456 })
);
cylinder3.position.set(0, -0.4 + y, 0);
//القاعده المرتبطه بالاقدام
const cylinder4 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.6, 1.6, 0.5, 3),
  new THREE.MeshBasicMaterial({ color: 0x265400 })
);
cylinder4.position.set(0, -0.6 + y, 0);
cylinder4.rotation.y = Math.PI / 3;
//القاعده اسفل البراغي
const cylinder5 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.3, 1.3, 0.7, 30),
  new THREE.MeshBasicMaterial({ color: 0x223600 })
);
cylinder5.position.set(0, 0.3 + y, 0);
cylinder5.rotation.y = Math.PI / 3;

//قاعده الجهاز
const cylinder7 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.1, 1.3, 0.3, 30),
  new THREE.MeshBasicMaterial({ color: 0x125600 })
);
cylinder7.position.set(0, 0.8 + y, 0);
cylinder7.rotation.y = Math.PI / 3;

// الجهاز
const cylinder8 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.9, 0.9, 3, 4),
  new THREE.MeshNormalMaterial({ color: 0x18933 })
);
cylinder8.position.set(0, 1.5 + y, 0);
cylinder8.rotation.x = Math.PI / 2;
cylinder8.rotation.y = Math.PI / 4;

//المنظار من جهة الناظر
const cylinder9 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.25, 0.25, 2, 30),
  new THREE.MeshBasicMaterial({ color: 0x343434 })
);
cylinder9.position.set(0, 1.5 + y, +1);
cylinder9.rotation.x = Math.PI / 2;
cylinder9.rotation.y = Math.PI / 4;
//المنظار
const cylinder10 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 2, 30),
  new THREE.MeshBasicMaterial({ color: 0x343434 })
);
cylinder10.position.set(0, 1.5 + y, -1);
cylinder10.rotation.x = Math.PI / 2;
cylinder10.rotation.y = Math.PI / 4;

//العمود
const cube12 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(cube12);
cube12.position.set(-3, 0, 3);
cube11.rotation.z = -Math.PI / 5;
cube12.rotation.y = Math.PI / 2;

const geometry10 = new THREE.BufferGeometry();

// إنشاء شكل مربع بسيط. نحن نكرر الأعلى الأيسر والأسفل الأيمن
// الرؤوس لأن كل رأس يحتاج إلى الظهور مرة واحدة لكل مثلث.
const vertices = new Float32Array([
  -0.3,
  -0.3,
  0.3, // v0
  0.3,
  -0.3,
  0.3, // v1
  0.1,
  0.3,
  0.3, // v2

  // 0.3,  0.3,  0.3, // v3
  //-0.3,  0.3,  0.3, // v4
  //-0.3, -0.3,  0.3  // v5
]);

// itemSize = 3 لأنه يوجد 3 قيم (مكونات) لكل رأس
geometry10.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material10 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry10, material10);
scene.add(mesh);
mesh.position.set(-3, 0, 3);

deviceGroup.add(cylinder7, cylinder8, cylinder9, cylinder10);
scene.add(
  cylinder,
  cylinder1,
  cylinder2,
  cylinder3,
  cylinder4,
  cylinder5,
  deviceGroup
);

camera.position.z = 15;
camera.position.x = 2;
camera.position.y = 2;
