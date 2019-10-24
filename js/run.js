import { init, animate, targets, transform, onWindowResize } from './visuals.js';

init();
animate();

// set initial state
transform( targets.helix, 2000 );

////////////////////////
// GLOBAL EVENT HANDLERS
////////////////////////

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
text.addEventListener( 'click', function () {
	var elem = document.getElementById('adsb-switch');
	elem.checked = !elem.checked;
}, false );
var text = document.getElementById( 'ais' );
text.addEventListener( 'click', function () {
	var elem = document.getElementById('ais-switch');
	elem.checked = !elem.checked;
}, false );
var text = document.getElementById( 'gnss-ro' );
text.addEventListener( 'click', function () {
	var elem = document.getElementById('gnssro-switch');
	elem.checked = !elem.checked;
}, false );
var text = document.getElementById( 'ism' );
text.addEventListener( 'click', function () {
	var elem = document.getElementById('ism');
	elem.checked = !elem.checked;
}, false );
var text = document.getElementById( 'mag' );
text.addEventListener( 'click', function () {
	var elem = document.getElementById('mag');
	elem.checked = !elem.checked;
}, false );
var text = document.getElementById( 'tec' );
text.addEventListener( 'click', function () {
	var elem = document.getElementById('tec-switch');
	elem.checked = !elem.checked;
}, false );

// TODO - touch support

// function handleInteraction(evt) {
//   evt.preventDefault()
//   console.log('interacted')
// }
// el.addEventListener('touchstart', handleInteraction)
// el.addEventListener('click', handleInteraction)
