import {
	targets, transform, onWindowResize, reset,
	ADSB, AIS, GNSSRO, GNSSR, SW
} from './visuals.js';

// handle window resize
window.addEventListener( 'resize', onWindowResize, false );

// increase size of Controls text on hover
var controls = document.getElementById('controls');
controls.onmouseover = function() {
	controls.style.fontSize = '22px';
}
controls.onmouseout = function() {
	controls.style.fontSize = '12px';
}

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

// turn off all other switches
function switchChange(evt, elem) {
	if (elem == null) {
		elem = evt.target;
	}
	var switches = document.getElementsByClassName('switch-input');
	for (var i=0; i<switches.length; i++) {
		var s = switches[i];
		if (s.id != elem.id) {
			s.checked = false;
		}
	}
	if (elem.checked) {
		// reset scene with selected events data 
		var ident = elem.id;
		if (ident.indexOf(ADSB) > -1) {
			reset(ADSB);
		} else if (ident.indexOf(AIS) > -1)  {
			reset(AIS);
		} else if (ident.indexOf(GNSSRO) > -1)  {
			reset(GNSSRO);
		} else if (ident.indexOf(GNSSR) > -1)  {
			reset(GNSSR);
		} else if (ident.indexOf(SW) > -1) {
			reset(SW);
		}
	}
}

// handle switch toggle text clicks
var text = document.getElementById( 'ads-b' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('adsb-switch');
	elem.checked = !elem.checked;
	switchChange(null, elem);
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
document.getElementById('adsb-switch').addEventListener( 'change', switchChange, false );
var text = document.getElementById( 'ais' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('ais-switch');
	elem.checked = !elem.checked;
	switchChange(null, elem);
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
document.getElementById('ais-switch').addEventListener( 'change', switchChange, false );
var text = document.getElementById( 'gnss-ro' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('gnssro-switch');
	elem.checked = !elem.checked;
	switchChange(null, elem);
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
document.getElementById('gnssro-switch').addEventListener( 'change', switchChange, false );
var text = document.getElementById( 'gnss-r' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('gnssr-switch');
	elem.checked = !elem.checked;
	switchChange(null, elem);
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
document.getElementById('gnssr-switch').addEventListener( 'change', switchChange, false );
var text = document.getElementById( 'sw' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('sw-switch');
	elem.checked = !elem.checked;
	switchChange(null, elem);
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
document.getElementById('sw-switch').addEventListener( 'change', switchChange, false );

// document.body.addEventListener('keydown', function logKey(e) {
//   	console.log(camera.position)
// });

// // this handles a click on an event box within the rendered scene:
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