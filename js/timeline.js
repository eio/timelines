THREE.Cache.enabled = true;
var EVENT_COUNT = EVENTS.length;
for (var i = 0; i < EVENT_COUNT; i++) {
	EVENTS[i].index = i;
}
console.log(EVENT_COUNT.toString() + ' events in this collection:', EVENTS);

var SPIN = false;
var clock = new THREE.Clock();
var container;
var camera, scene, controls, renderer, raycaster;
var group, entities;

var mouse = new THREE.Vector2();
var INTERSECTED = null;
var MOUSE_CLICKING = false;

function addEvents( events ) {
	if (!events) {
		events = EVENTS;
	}
	for (var i = 0; i < EVENT_COUNT; i++) {
		var event = events[i];
		if (event['ImageURI'] && event['ImageURI'] !== '') {
			addImage(events[i]);
		} else {
			console.log('Missing image for event ' + i + ': ' + event['Title']);
		}
	}
};

function addImage( image ) {
	var title = image['Title'];
	var picture = image['ImageURI'];
	new THREE.ImageLoader()
		.setCrossOrigin( '*' )
		.load( picture, function( imageFile ) {
			var texture = new THREE.CanvasTexture( imageFile );
			texture.name = title;
			addEntity( texture, title, image['URL'] );
		}
	);
	// var year = image['Year'];
	// new THREE.FontLoader()
	// 	.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
	// 		var geometry = new THREE.TextGeometry( year, {
	// 			font: font,
	// 			size: 80,
	// 			height: 5,
	// 			curveSegments: 12,
	// 			bevelEnabled: true,
	// 			bevelThickness: 10,
	// 			bevelSize: 8,
	// 			bevelOffset: 0,
	// 			bevelSegments: 5
	// 		});
	// 	}
	// );
};

function positionEvent( entity ) {
	var index;
	for (var i = 0; i < EVENT_COUNT; i++) {
		var event = EVENTS[i];
		if (event['Title'] == entity.name) {
			index = event.index;
			break;
		}
	}
	// var x = index - (EVENT_COUNT / 2);
	var offset = -18;
	var x = (index * 4) + offset;
	entity.position.set( x, 0, -20 );
	entity.rotation.set( 0, 0, 0);
	return entity;
};

function addEntity( texture, name, link ) {
	// console.log("Entity Width:", texture.image.naturalWidth, "Entity Height:", texture.image.naturalHeight);
	var aspectRatio = texture.image.naturalWidth / texture.image.naturalHeight;
	// console.log("Aspect Ratio:", aspectRatio);
	var geometry = new THREE.PlaneGeometry( aspectRatio, 1);
	var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
	var entity = new THREE.Mesh( geometry, material );
	entity.name = name;
	entity.userData.url = link;
	entity = positionEvent(entity);
	// entity.position.set( Math.random() * 12 - 1, Math.random() * 12 - 1, Math.random() * 12 - 1 );
	// entity.rotation.set( Math.random() * 12 * Math.PI, Math.random() * 12 * Math.PI, Math.random() * 12 * Math.PI );
	entities.add( entity );
};

function resetCamera( zoom ) {
	zoom = zoom ? zoom : 25;
	camera.position.set( 0, 0, zoom );
	camera.lookAt( new THREE.Vector3() );
	if ( group ) {
		group.rotation.y = 0;
		group.rotation.x = 0;
	}
};

function setup() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// CAMERA
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1500 );
	resetCamera();

	// SCENE
	scene = new THREE.Scene();

	// CONTROLS
	controls = new THREE.FlyControls( camera );
	controls.movementSpeed = 5;
	controls.domElement = container;
	// controls.rollSpeed = Math.PI / 24;
	controls.rollSpeed = 0.2;
	controls.autoForward = false;
	controls.dragToLook = true;
	// controls.dragToLook = false;

	// GROUP
	group = new THREE.Group();
	scene.add( group );

	// GRID
	group.add( new THREE.GridHelper( 10, 20, 'turquoise' ) );

	// EVENTS
	entities = new THREE.Group();
	group.add( entities );

	addEvents();

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// RAYCASTER
	raycaster = new THREE.Raycaster();

	// EVENT HANDLERS
	function mouseMoveHandler(event) {
		event.preventDefault();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		MOUSE_CLICKING = false;
	};
	function mouseDownHandler(event) {
		event.preventDefault();
		MOUSE_CLICKING = true;
	};
	function mouseUpHandler(event) {
		event.preventDefault();
		MOUSE_CLICKING = false;
	};
	function windowResizeHandler() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	};

	// EVENTS
	document.addEventListener('mousemove', mouseMoveHandler, false);
	document.addEventListener('mousedown', mouseDownHandler, false);
	document.addEventListener('mouseup', mouseUpHandler, false);

	window.addEventListener( 'resize', windowResizeHandler, false );
};

function stopSpin() {
	SPIN = false;
}

var resetBtn = document.getElementById( 'reset_btn' );
resetBtn.addEventListener( 'click', function( e ) {
	resetCamera();
	stopSpin();
	var events = entities.children;
	for(var i = 0; i < events.length; i++) {
		positionEvent(events[i]);
	}
	// // CLEAR
	// while( entities.children.length ) {
	// 	var entity = entities.children[ 0 ]
	// 	entities.remove( entity );
	// 	entity.geometry.dispose();
	// 	entity.material.map.dispose();
	// }
});

//  MAIN LOOP

function animate() {
	if ( SPIN ) {
		// ROTATE
		group.rotation.y = performance.now() / 6000;
		group.rotation.x = performance.now() / 9000;
	}
	renderer.render( scene, camera );
	requestAnimationFrame( animate );
	var delta = clock.getDelta();
	controls.update( delta );

	///////////////////////////////////////////////////////////////////
	// Use raycasting to determine if user clicks on a rendered object
	///////////////////////////////////////////////////////////////////
	raycaster.setFromCamera( mouse, camera );
	// find intersections
	var intersects = raycaster.intersectObjects( scene.children, true );
	if ( intersects.length > 0 ) {
		document.body.style.cursor = 'pointer';
		if ( MOUSE_CLICKING ) {
			if ( INTERSECTED != intersects[ 0 ].object ) {
				// if ( INTERSECTED ) {
				// 	for (var i = 0; i < entities.children.length; i++) {
				// 		var mesh = entities.children[i];
				// 		mesh.material.color.setRGB(1,1,1);
				// 	}
				// }
				INTERSECTED = intersects[0].object;
				// INTERSECTED.material.color.setRGB(0.6,1.0,1.0);
				console.log('Clicked on:', INTERSECTED);
				window.open(INTERSECTED.userData.url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=1200,height=700');
			}
		}
	} else {
		document.body.style.cursor = 'default';
		INTERSECTED = null;
		// for (var i = 0; i < entities.children.length; i++) {
		// 	var mesh = entities.children[i];
		// 	mesh.material.color.setRGB(1,1,1);
		// }
	}
};
