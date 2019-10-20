export { init, animate };

import * as THREE from './lib/three.module.js';
import { TWEEN } from './lib/jsm/tween.module.min.js';
import { TrackballControls } from './lib/jsm/TrackballControls.js';
import { OrbitControls } from './lib/jsm/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from './lib/jsm/CSS3DRenderer.js';

import { DataTable } from './data.js';
var table = DataTable;

var INIT_CAMERA_Z = 8000;
var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

function init() {
	// camera
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = INIT_CAMERA_Z;
	// scene
	scene = new THREE.Scene();
	// initialize event objects and table view
	for ( var i = 0; i < table.length; i += 5 ) {

		var element = document.createElement( 'div' );
		element.className = 'element';
		// var alpha = ( Math.random() * 0.5 + 0.25 );
		var alpha = 0.4;
		element.style.backgroundColor = 'rgba(0,40,120,' + alpha + ')';

		var number = document.createElement( 'div' );
		number.className = 'number';
		number.textContent = ( i / 5 ) + 1;
		element.appendChild( number );

		var year = document.createElement( 'div' );
		year.className = 'year';
		year.textContent = table[ i ];
		element.appendChild( year );

		var details = document.createElement( 'div' );
		details.className = 'details';
		// var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
		var dtext = table[ i + 1 ];
		details.innerHTML = dtext + '<br><img src="' + table[ i + 2 ] + '" />';
		element.appendChild( details );

		var object = new CSS3DObject( element );
		object.name = dtext;
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
		scene.add( object );

		objects.push( object );

		// create and capture TABLE view to tween to later

		var object = new THREE.Object3D();
		var xmargin = 280;
		var xoffset = 1800;
		var xpos = ( table[ i + 3 ] * xmargin ) - xoffset;
		var ypos = 300;
		// var ypos = - ( table[ i + 4 ] * 180 ) + 990;
		object.position.x = xpos * 3;
		object.position.y = ypos * 3;
		targets.table.push( object );
	}

	// create and capture SPHERE view to tween to later

	var vector = new THREE.Vector3();
	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		var phi = Math.acos( - 1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;
		var object = new THREE.Object3D();
		var size = 1400;
		object.position.setFromSphericalCoords( size, phi, theta );
		vector.copy( object.position ).multiplyScalar( 2 );
		object.lookAt( vector );
		targets.sphere.push( object );
	}

	// create and capture HELIX view to tween to later

	var vector = new THREE.Vector3();
	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		// var tune = 0.175;
		var tune = 0.5;
		var theta = i * tune + Math.PI;
		var yoffset = 1500;
		var ystretch = 200;
		var y = - ( i * ystretch ) + yoffset;
		var object = new THREE.Object3D();
		object.position.setFromCylindricalCoords( 1600, theta, y );
		vector.x = object.position.x * 2;
		vector.y = object.position.y;
		vector.z = object.position.z * 2;
		object.lookAt( vector );
		targets.helix.push( object );
	}

	// create and capture GRID view to tween to later

	for ( var i = 0; i < objects.length; i ++ ) {
		var object = new THREE.Object3D();
		var offset = 1600;
		var scalar = 800;
		object.position.x = ( ( i % 5 ) * scalar ) - offset;
		object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * scalar ) + offset;
		object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
		targets.grid.push( object );
	}

	// cube

	// for ( var i = 0; i < objects.length; i ++ ) {
	// 	var object = new THREE.Object3D();
	// 	var offset = 1600;
	// 	var scalar = 800;
	// 	object.position.x = ( ( i % 5 ) * scalar ) - offset;
	// 	object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * scalar ) + offset;
	// 	object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
	// 	targets.cube.push( object );
	// }

	//

	renderer = new CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById( 'container' ).appendChild( renderer.domElement );

	//

	controls = new TrackballControls( camera, renderer.domElement );
	// controls = new OrbitControls( camera, renderer.domElement );
	// controls.minDistance = 0;
	controls.maxDistance = 10000;
	controls.addEventListener( 'change', render );

	var button = document.getElementById( 'table' );
	button.addEventListener( 'click', function () {
		transform( targets.table, 2000 );
	}, false );

	var button = document.getElementById( 'sphere' );
	button.addEventListener( 'click', function () {
		transform( targets.sphere, 2000 );
	}, false );

	var button = document.getElementById( 'helix' );
	button.addEventListener( 'click', function () {
		transform( targets.helix, 2000 );
	}, false );

	var button = document.getElementById( 'grid' );
	button.addEventListener( 'click', function () {
		transform( targets.grid, 2000 );
	}, false );

	// set initial state
	transform( targets.helix, 2000 );
	// handle window resize
	window.addEventListener( 'resize', onWindowResize, false );
}

// this is the bit that makes every event seize up
// when a transform is initiated via button-press:
function companyHalt() {
	// camera.position.set(0, 0, INIT_CAMERA_Z); // Set position like this
	// camera.lookAt(new THREE.Vector3(0,0,10000)); // Set look at coordinate like this
	for (var i=0; i<objects.length; i++) {
		objects[i].rotation.x = 0;
		objects[i].rotation.y = 0;
		objects[i].rotation.z = 0;
		objects[i].quaternion.w = 1;
		objects[i].quaternion.x = 0;
		objects[i].quaternion.y = 0;
		objects[i].quaternion.z = 0;
	}
}

function transform( targets, duration ) {
	companyHalt();
	TWEEN.removeAll();
	for ( var i = 0; i < objects.length; i ++ ) {
		var object = objects[ i ];
		var target = targets[ i ];
		new TWEEN.Tween( object.position )
			.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
		new TWEEN.Tween( object.rotation )
			.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
			.easing( TWEEN.Easing.Exponential.InOut )
			.start();
	}
	new TWEEN.Tween( this )
		.to( {}, duration * 2 )
		.onUpdate( render )
		.start();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}

// document.getElementById('info').addEventListener('click', function info(e) {
// 	window.location.href = 'https://github.com/eio/gnss-ro-timeline';
// });

// document.body.addEventListener('keydown', function logKey(e) {
//   	console.log(camera.position)
// });

// // what happens when you click a thing:
// document.body.addEventListener('click', function down(e) {
// 	var elem = e.target;
// 	var parent = elem.parentElement;
// 	var classes = [elem.className,parent.className,parent.parentElement.className];
// 	var proceed = false;
// 	switch(classes.indexOf('element')) {
// 	 	case 0:
// 	 		proceed = true;
// 	    	// console.log(elem);
// 	    	break;
// 	  	case 1:
// 	  		proceed = true;
// 	  		elem = parent;
// 	    	// console.log(parent);
// 	    	break;
// 	  	case 2:
// 	  		proceed = true;
// 	  		elem = parent.parentElement;
// 	  		// console.log(parent.parentElement);
// 	    	break;
// 	}
// 	if (proceed == true) {
// 		var details = null;
// 		for (var i = 0; i < elem.childNodes.length; i++) {
// 		    if (elem.childNodes[i].className == "details") {
// 		      	details = elem.childNodes[i].innerHTML;
// 		      	break;
// 		    }        
// 		}
// 		var clickedObject = null;
// 		for (var i=0; i<objects.length; i++) {
// 			var object = objects[i];
// 			if (details.indexOf(object.name) > -1) {
// 				clickedObject = object;
// 				break;
// 			}
// 		}
// 		console.log(clickedObject);
// 		var duration = 2000;
// 		var distance = 2000;
// 		new TWEEN.Tween( camera.position )
// 			.to( { x: clickedObject.position.x, y: clickedObject.position.y, z: clickedObject.position.z + distance }, Math.random() * duration + duration )
// 			.easing( TWEEN.Easing.Exponential.InOut )
// 			.start();
// 		new TWEEN.Tween( camera.quaternion )
// 			.to( { x: clickedObject.quaternion.x, y: clickedObject.quaternion.y, z: clickedObject.quaternion.z, w: clickedObject.quaternion.w }, Math.random() * duration + duration )
// 			.easing( TWEEN.Easing.Exponential.InOut )
// 			.start();
// 		new TWEEN.Tween( camera.rotation )
// 			.to( { x: clickedObject.rotation.x, y: clickedObject.rotation.y, z: clickedObject.rotation.z }, Math.random() * duration + duration )
// 			.easing( TWEEN.Easing.Exponential.InOut )
// 			.start();
// 		new TWEEN.Tween( camera.up )
// 			.to( { x: clickedObject.up.x, y: clickedObject.up.y, z: clickedObject.up.z }, Math.random() * duration + duration )
// 			.easing( TWEEN.Easing.Exponential.InOut )
// 			.start();
// 	}
//  });