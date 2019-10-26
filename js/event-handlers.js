import { targets, transform, onWindowResize } from './visuals.js';

// handle window resize
window.addEventListener( 'resize', onWindowResize, false );

// handle button press
var button = document.getElementById( 'line' );
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
	var elem = document.getElementById('ism');
	elem.checked = !elem.checked;
};
text.addEventListener( 'click', handler, false );
text.addEventListener( 'touchstart', handler, false );
var text = document.getElementById( 'mag' );
var handler = function (e) {
	e.preventDefault();
	var elem = document.getElementById('mag');
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