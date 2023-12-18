

//تكبير الشكل من المنتصف
//cube1.scale.x=0.5;
// تدوير الشكل بزاويه
//cube.rotation.x= Math.PI*0.5;
// التدوير على اكثر من محور في نفس الزاويه وبالترتيب
//cube1.rotation.reorder("XYZ") اكنبهم احرف كبيره وبالترتيب

////////////////////////
// اضافه خطوط 
const points = [];
points.push( new THREE.Vector3(  10, 0, 0 ) );
points.push( new THREE.Vector3( 10, 10, 0 ) );
points.push( new THREE.Vector3( 0, 10, 10) );
points.push( new THREE.Vector3( 0, 0, 10 ) );
points.push( new THREE.Vector3( 0, 10, 10 ) );
points.push( new THREE.Vector3( -10, 10, 0) );
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( -10, 10, 0 ) );
points.push( new THREE.Vector3( 0, 10, -10 ) );
points.push( new THREE.Vector3(10, 10, 0) );
points.push( new THREE.Vector3( 0, 10, -100 ) );
points.push( new THREE.Vector3( -10, 10, 0 ) );
const geometry5 = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry5, material );
scene.add( line );
renderer.render( scene, camera );
/////////////////////////
// اضافه اسطح من خلال النقاط
const geometry10 = new THREE.BufferGeometry();
	
// إنشاء شكل مربع بسيط. نحن نكرر الأعلى الأيسر والأسفل الأيمن
// الرؤوس لأن كل رأس يحتاج إلى الظهور مرة واحدة لكل مثلث.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2
	
	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );
	
// itemSize = 3 لأنه يوجد 3 قيم (مكونات) لكل رأس
geometry10.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material10 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry10, material10 );
scene.add( mesh );
mesh.position.set(0,10,-10)
///////////////////////////