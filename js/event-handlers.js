import { targets, transform, onWindowResize } from './visuals.js';

// handle window resize
window.addEventListener( 'resize', onWindowResize, false );

// handle button press
var button = document.getElementById( 'line' );
button.addEventListener( 'click', function () {
	transform( targets.line, 2000 );
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

// var datatypes = ['ads-b', 'ais', 'gnss-ro', 'ism', 'mag', 'tec'];

// handle switch toggle text clicks
var text = document.getElementById( 'ads-b' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('adsb-switch');
	elem.checked = !elem.checked;
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
var text = document.getElementById( 'ais' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('ais-switch');
	elem.checked = !elem.checked;
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
var text = document.getElementById( 'gnss-ro' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('gnssro-switch');
	elem.checked = !elem.checked;
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
var text = document.getElementById( 'ism' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('ism-switch');
	elem.checked = !elem.checked;
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
var text = document.getElementById( 'mag' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('mag-switch');
	elem.checked = !elem.checked;
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
var text = document.getElementById( 'tec' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('tec-switch');
	elem.checked = !elem.checked;
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );

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