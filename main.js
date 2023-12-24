 import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



const renderer = new THREE.WebGLRenderer();
const orbit = new OrbitControls(camera, renderer.domElement);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//var rotationPoint = new THREE.Vector3(0, 2, 0);
//verticalGroup.position.sub(rotationPoint);
//verticalGroup

//قدم يسار
const geometry = new THREE.BoxGeometry( 0.4, 10, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set(-3,-4.5,-1.5);
scene.add( cube );
const gridHelper = new THREE.GridHelper(30,100);
scene.add(gridHelper);
cube.rotation.z= - Math.PI/5;
cube.rotation.y= - Math.PI/7;
//قدم يمين
const cube3 = new THREE.Mesh(
new THREE.BoxGeometry(0.5,10,1) ,
new THREE.MeshBasicMaterial({color:0x0000ff})
    );
 scene.add(cube3);
 cube3.position.set(3,-4.5,-1.5);
 cube3.rotation.z= Math.PI/5
 cube3.rotation.y= Math.PI/7.
 //cube3.rotation.x= Math.PI/5

//قدم من جهتي
const cube11 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5,10,1) ,
    new THREE.MeshBasicMaterial({color:0x0000ff})
        );
     scene.add(cube11);     cube11.position.set(0,-4.5,+3.4);
     cube11.rotation.z= -Math.PI/5
     cube11.rotation.y= Math.PI/2
 
/*
const planeGeometry = new THREE.PlaneGeometry(30,20);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane); */

const deviceGroup = new THREE.Group();//قروب الحركي الافقيه

const verticalGroup = new THREE.Group();//قروب الحركي العمودي




//جنب يسار
const geometry6 = new THREE.BoxGeometry(0.9,3,1)
const material6 = new THREE.MeshBasicMaterial({color:0x54200})
const cube6 = new THREE.Mesh(geometry6,material6);
cube6.position.set(-1.1,2.2,0)
scene.add(cube6);
//جنب يمين
const cube7 = new THREE.Mesh(geometry6,material6);
cube7.position.set(1.1,2.2,0)
scene.add(cube7);
 //فوق مثلث على اليمين
 const cylinder8 = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.2, 0.4, 0.5, 4 ),
    new THREE.MeshBasicMaterial( {color: 0x125600} )); 
   cylinder8.rotation.y=Math.PI/4; 
   scene.add(cylinder8);
   cylinder8.position.set(1.3,3.9,0)
 // فوق مثلث على اليسار
 const cylinder9 = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.2, 0.4, 0.5, 4 ),
    new THREE.MeshBasicMaterial( {color: 0x125600} )); 
    cylinder9.rotation.y=Math.PI/4; 
    scene.add(cylinder9);
    cylinder9.position.set(-1.3,3.9,0)
//فوق 
const geometry8 = new THREE.BoxGeometry(2.8,0.2,0.2)
const material8 = new THREE.MeshBasicMaterial({color:0x55325})
const cube8 = new THREE.Mesh(geometry8,material8);
cube8.position.set(0,4.1,0)
scene.add(cube8);


// Set the background color
scene.background = new THREE.Color('');
 


window.onkeydown = function (e) {

    const GRADE = (2*Math.PI)/400;//convert radian to grad

    var code = e.keyCode ? e.keyCode : e.which;
    var vertcaltest = document.getElementById("vertcaltest");
    var horizontaltest = document.getElementById("horizontaltest");
    var latheHorizontalTest= document.getElementById("latheHorizontalTest")
   
    if(code === 37) //left key
    {
        deviceGroup.rotation.y += 10* GRADE;
    }
    else if (code === 38) 
    { //up key
       // verticalGroup.rotation.x +=0.1
        cube2.rotation.x += 10* GRADE;
        lathe.rotation.x += 10* GRADE;
    } 
    else if (code === 39) { //right key
        deviceGroup.rotation.y -= 10* GRADE;

    }
    else if (code === 40) { //down key
       // verticalGroup.rotation.x -=0.1
        cube2.rotation.x -= 10* GRADE;
        lathe.rotation.x -= 10* GRADE;
        
    }



vertcaltest.innerText="vertical rotation ="+ Math.abs( (-Math.round( cube2.rotation.x * 400 /(Math.PI*2),4)+100))%400 ;
//latheHorizontalTest.innerText="lathe horizontal rotation ="+Math.abs((Math.round( lathe.rotation.y * 400 /(Math.PI*2),4)))%400;
horizontaltest.innerText="horizontal test="+Math.abs(Math.round( deviceGroup.rotation.y * 400 /(Math.PI*2),4))%400;

};
//  لاضافه خطوط المحاور بشكل ملون
const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);





// برغي القاعده يمين
const cylinder = new THREE.Mesh(
 new THREE.CylinderGeometry( 0.2, 0.2, 0.4, 100 ),
 new THREE.MeshBasicMaterial( {color: 0x265400} )); 
cylinder.position.set(0.8,0.1,0.5);
 //برغي القاعد يسار
const cylinder1 = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.2, 0.2, 0.4, 100 ),
    new THREE.MeshBasicMaterial( {color: 0x265400} )); 
   cylinder1.position.set(-0.8,0.1,0.5);
//برغي القاعده امام
   const cylinder2 = new THREE.Mesh(
    new THREE.CylinderGeometry( 0.2, 0.2, 0.4, 100 ),
    new THREE.MeshBasicMaterial( {color: 0x265400} )); 
   cylinder2.position.set(0,0.1,-1);
//برغي القاعده وسط
const cylinder3 = new THREE.Mesh(
 new THREE.CylinderGeometry( 0.2, 0.2, 1.2, 100 ),
 new THREE.MeshBasicMaterial( {color: 0x265456} )); 
cylinder3.position.set(0,-0.4,0);
//القاعده المرتبطه بالاقدام
const cylinder4 = new THREE.Mesh(
    new THREE.CylinderGeometry( 1.6, 1.6, 0.5, 3 ),
    new THREE.MeshBasicMaterial( {color: 0x265400} )); 
   cylinder4.position.set(0,-0.6,0); 
   cylinder4.rotation.y=Math.PI/3;
   //القاعده اسفل البراغي
const cylinder5 = new THREE.Mesh(
    new THREE.CylinderGeometry( 1.6, 1.6, 0.3, 3 ),
    new THREE.MeshBasicMaterial( {color: 0x223600} )); 
   cylinder5.position.set(0,-0.1,0); 
   cylinder5.rotation.y=Math.PI/3;
// القاعده فوق البراغي
const cylinder6 = new THREE.Mesh(
    new THREE.CylinderGeometry( 1.6, 1.6, 0.3, 3 ),
    new THREE.MeshBasicMaterial( {color: 0x223600} )); 
   cylinder6.position.set(0,0.4,0); 
   cylinder6.rotation.y=Math.PI/3; 
   //قاعده الجهاز
   const cylinder7 = new THREE.Mesh(
    new THREE.CylinderGeometry( 1.6, 1, 0.3, 10 ),
    new THREE.MeshBasicMaterial( {color: 0x125600} )); 
   cylinder7.position.set(0,0.6,0); 
   cylinder7.rotation.y=Math.PI/3; 

scene.add( cylinder,cylinder1,cylinder2,cylinder3,cylinder4,cylinder5,cylinder6 ,cylinder7 );


const points1 = [];
for ( let i = 0; i < 20; i ++ ) {
	points1.push( new THREE.Vector2( Math.sin( i * 0.3 ) * 0.2 + 0.3, ( i - 10 ) * 0.15 ) );
}

// الداخلي
const geometry2 = new THREE.BoxGeometry( 1.1, 1.2, 2 );
const material2 = new THREE.MeshBasicMaterial( { color: 0x55325 } );
const cube2 = new THREE.Mesh( geometry2, material2 );
cube2.position.set(0,2.5,0);
scene.add( cube2);
//الوسط
/**/
const geometry11 = new THREE.LatheGeometry( points1 );
const material11 = new THREE.MeshBasicMaterial( { color: 0x645300 } );
const lathe = new THREE.Mesh( geometry11, material11 );
scene.add( lathe );
lathe.position.set(0,2.5,0)
lathe.rotation.x =Math.PI/2;

// الشاشه الاماميه
const cube9 = new THREE.Mesh(
    new THREE.BoxGeometry( 2.3,1.2, 0.5 ),
    new THREE.MeshBasicMaterial( {color: 0x16365} )); 
    //cube9.rotation.y=Math.PI/4;
    cube9.rotation.x=-Math.PI/5;
    //cylinder10.rotation.z=Math.PI/2;
    scene.add(cube9);
    cube9.position.set(0,1.1,1.1)
// الشاشه الخلفيه
const cube10 = new THREE.Mesh(
    new THREE.BoxGeometry( 2.3,1.2, 0.5 ),
    new THREE.MeshBasicMaterial( {color: 0x12365} )); 
    //cube9.rotation.y=Math.PI/4;
    cube10.rotation.x=Math.PI/5;
    //cylinder10.rotation.z=Math.PI/2;
    scene.add(cube10);
    cube10.position.set(0,1.1,-1.1)



const loader = new THREE.TextureLoader();
//scene.background = loader.load( 'background.png' );




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



verticalGroup.add(cube2,lathe);
scene.add(verticalGroup);


deviceGroup.add(cube6,cube7,cube8,cylinder7,cylinder8,cylinder9
    ,cube9,cube10 ,verticalGroup);

scene.add(deviceGroup);

renderer.render( scene, camera );