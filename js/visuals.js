// adapted from https://threejs.org/examples/css3d_periodictable.html

export {
	init, animate, reset, targets, transform, onWindowResize,
	ADSB, AIS, GNSSRO, SW
};

import * as THREE from './lib/three.module.js';
import { TWEEN } from './lib/jsm/tween.module.min.js';
import { FlyControls } from './lib/jsm/FlyControls.js';
// import { TrackballControls } from './lib/jsm/TrackballControls.js';
import { OrbitControls } from './lib/jsm/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from './lib/jsm/CSS3DRenderer.js';

import { ADSB_EVENTS } from '../data/json/ads-b.js';
import { AIS_EVENTS } from '../data/json/ais.js';
import { RO_EVENTS } from '../data/json/gnss-ro.js';
import { SW_EVENTS } from '../data/json/space-weather.js';

// // Datatypes from:
// // https://www.spire.com/en/sample-data
var ADSB = 'adsb';
var AIS = 'ais';
var GNSSRO = 'gnssro';
var SW = 'sw';

// var ELEMENT_ALPHA = ( Math.random() * 0.5 + 0.25 );
var ELEMENT_ALPHA = 0.7;
var MIN_CONTROLS_DISTANCE = 0;
var MAX_CONTROLS_DISTANCE = 12300;
var INIT_CAMERA_Z = 8000;
var camera, scene, renderer;
var controls;
var ORBIT = false;

var CONT_MVMT_SPEED = 2000;
var CONT_ROLL_SPEED = 0.7;

var objects = [];
var targets = { line: [], sphere: [], helix: [], grid: [] };

var clock = new THREE.Clock();

function getEventsData(category) {
	var events = [];
	if (category == ADSB) {
		events = events.concat(ADSB_EVENTS);
	} else if (category == AIS)  {
		events = events.concat(AIS_EVENTS);
	} else if (category == GNSSRO)  {
		events = events.concat(RO_EVENTS);
	} else if (category == SW) {
		events = events.concat(SW_EVENTS);
	}
	return events;
}

function init() {
	document.getElementById('widget').style.visibility = 'visible';
	// camera
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = INIT_CAMERA_Z;
	// scene
	scene = new THREE.Scene();
	renderer = new CSS3DRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.getElementById( 'container' ).appendChild( renderer.domElement );
	// setup controls
	if (ORBIT == true) {
		controls = new OrbitControls( camera, renderer.domElement );
	} else {
		// CONTROLS
		controls = new FlyControls( camera, renderer.domElement );
		controls.movementSpeed = CONT_MVMT_SPEED;
		controls.domElement = container;
		// controls.rollSpeed = Math.PI / 24;
		controls.rollSpeed = CONT_ROLL_SPEED;
		controls.autoForward = false;
		controls.dragToLook = true;
		// controls.dragToLook = false;
	}
	controls.minDistance = MIN_CONTROLS_DISTANCE;
	controls.maxDistance = MAX_CONTROLS_DISTANCE;
	// controls.addEventListener( 'change', render );
	// init with Space Weather events
	reset(SW);
}

function clearScene() {
	while(scene.children.length > 0) { 
	    scene.remove(scene.children[0]);
	}
}

function reset(category) {
	clearScene();
	objects = [];
	targets = { line: [], sphere: [], helix: [], grid: [] };
	// reset camera position
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = INIT_CAMERA_Z;
	// make sure camera is pointed correctly
	camera.lookAt( scene.position );
	var events = getEventsData(category);
	// initialize event objects and line view
	for ( var i = 0; i < events.length; i ++ ) {

		var event = events[i];

		var element = document.createElement( 'div' );
		element.className = 'element';
		element.style.backgroundColor = 'rgba(0,40,120,' + ELEMENT_ALPHA + ')';

		var number = document.createElement( 'div' );
		number.className = 'number';
		number.textContent = ( i / 5 ) + 1;
		element.appendChild( number );

		var year = document.createElement( 'div' );
		year.className = 'year';
		year.textContent = event['date']; // date
		element.appendChild( year );

		var details = document.createElement( 'div' );
		details.className = 'details';
		// var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
		var dtext = event['description'];
		details.innerHTML = dtext + '<br><img src="' + event['imgsrc'] + '" />';
		element.appendChild( details );

		var object = new CSS3DObject( element );
		object.name = dtext;
		object.position.x = Math.random() * 4000 - 2000;
		object.position.y = Math.random() * 4000 - 2000;
		object.position.z = Math.random() * 4000 - 2000;
		scene.add( object );

		objects.push( object );

		// create and capture LINE view to tween to later

		var object = new THREE.Object3D();
		var xmargin = 280;
		var xoffset = 1800;
		// var order = event['order'];
		var order = i;
		var xpos = ( order * xmargin ) - xoffset;
		var ypos = 300;
		// var ypos = - ( table[ i + 4 ] * 180 ) + 990;
		object.position.x = xpos * 3;
		object.position.y = ypos * 3;
		targets.line.push( object );
	}

	// create and capture SPHERE view to tween to later

	var vector = new THREE.Vector3();
	for ( var i = 0, l = objects.length; i < l; i ++ ) {
		var phi = Math.acos( - 1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;
		var object = new THREE.Object3D();
		var size = 1500;
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

	// set initial state
	transform( targets.helix, 2000 );
}

function transform( targets, duration ) {
	// companyHalt();
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
	renderer.render( scene, camera );

	requestAnimationFrame( animate );
	TWEEN.update();
	// controls.update();

	var delta = clock.getDelta();
	controls.update( delta );
}

function render() {
	renderer.render( scene, camera );
}

// // this is the bit that makes every event seize up
// // when a transform is initiated via button-press:
// function companyHalt() {
// 	// camera.position.set(0, 0, INIT_CAMERA_Z); // Set position like this
// 	// camera.lookAt(new THREE.Vector3(0,0,10000)); // Set look at coordinate like this
// 	// var duration = 100;
// 	for (var i=0; i<objects.length; i++) {
// 		objects[i].rotation.x = 0;
// 		objects[i].rotation.y = 0;
// 		objects[i].rotation.z = 0;
// 		objects[i].quaternion.w = 1;
// 		objects[i].quaternion.x = 0;
// 		objects[i].quaternion.y = 0;
// 		objects[i].quaternion.z = 0;
// 		// var object = objects[ i ];
// 		// new TWEEN.Tween( object.rotation )
// 		// 	.to( { x: 0, y: 0, z: 0 }, Math.random() * duration + duration )
// 		// 	.easing( TWEEN.Easing.Exponential.InOut )
// 		// 	.start();
// 		// new TWEEN.Tween( object.quaternion )
// 		// 	.to( { x: 0, y: 0, z: 0, w: 1 }, Math.random() * duration + duration )
// 		// 	.easing( TWEEN.Easing.Exponential.InOut )
// 		// 	.start();
// 	}
// }