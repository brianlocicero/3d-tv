var opentvui = (function opentvui ($) {

	var movies = [
		["Avengers", "images/avengers.jpg", 1, 1],
		["Blade Runner", "images/blade_runner.jpg", 2, 1],
		["Brave", "images/brave.jpg", 3, 1],
		["The Hunger Games: Catching Fire", "images/catching_fire.jpg", 4, 1],
		["Django", "images/django.jpg", 5, 1],
		["Finding Nemo", "images/finding_nemo.jpg", 1, 2],
		["The Hobbit", "images/hobbit.jpg", 2, 2],
		["Hotel Transylvania", "images/hotel_transylvania.jpg", 3, 2],
		["Hugo", "images/Hugo.jpg", 4, 2],
		["The Hunger Games", "images/hunger_games.jpg", 5, 2],
		["Iron Man", "images/iron_man.jpg", 1, 3],
		["Les Miserables", "images/les_mis.jpg", 2, 3],
		["Lorax", "images/lorax.jpg", 3, 3],
		["Superman: Man of Steel", "images/man_of_steel_large.jpg", 4, 3],
		["Monsters Inc.", "images/monsters_inc.jpg", 5, 3],
		["Twilight: New Moon", "images/new_moon.jpg", 1, 4],
		["Simpsons: The Movie", "images/simpsons_movie_large.jpg", 2, 4],
		["James Bond: Skyfall", "images/skyfall_large.jpg", 3, 4],
		["Spiderman", "images/spider_man.jpg", 4, 4],
		["Star Trek", "images/star_trek.jpg", 5, 4],
		["How to train your dragon", "images/train_dragon.jpg", 1, 5],
		["Wall-E", "images/wall_e.jpg", 2, 5],
		["Wreak it Ralph", "images/wreck_it_ralph.jpg", 3, 5]
	];

	var camera, scene, renderer;
	var controls;

	var objects = [];
	var targets = { table: [], sphere: [], helix: [], grid: [] };

	init();
	animate();

	function init() {

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 3000;

		scene = new THREE.Scene();

		// table
		for (var i = 0; i < movies.length; i += 1) {

			/*
			var element = document.createElement( 'div' );
			element.className = 'element';
			element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

			var number = document.createElement( 'div' );
			number.className = 'number';
			number.textContent = (i/5) + 1;
			element.appendChild( number );

			var symbol = document.createElement( 'div' );
			symbol.className = 'symbol';
			symbol.textContent = table[ i ];
			element.appendChild( symbol );

			var details = document.createElement( 'div' );
			details.className = 'details';
			details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
			element.appendChild( details );
			*/

			var element = document.createElement('div');
			if (i === 0) {
				element.className = "movie movie" + i + " selected"
			} else {
				element.className = "movie movie" + i;
			}
			var cover = document.createElement('img');
			cover.src = movies[i][1];
			element.appendChild(cover);

			var object = new THREE.CSS3DObject( element );
			object.position.x = Math.random() * 4000 - 2000;
			object.position.y = Math.random() * 4000 - 2000;
			object.position.z = Math.random() * 4000 - 1000;
			scene.add( object );

			objects.push( object );

			//
			var object = new THREE.Object3D();
			object.position.x = ( movies[i][2] * 240 ) - 1130;
			object.position.y = - ( movies[i][3] * 300 ) + 990;

			targets.table.push( object );

		}

		// sphere
		var vector = new THREE.Vector3();
		for ( var i = 0, l = objects.length; i < l; i ++ ) {

			var phi = Math.acos( -1 + ( 2 * i ) / l );
			var theta = Math.sqrt( l * Math.PI ) * phi;

			var object = new THREE.Object3D();

			object.position.x = 800 * Math.cos( theta ) * Math.sin( phi );
			object.position.y = 800 * Math.sin( theta ) * Math.sin( phi );
			object.position.z = 800 * Math.cos( phi );

			vector.copy( object.position ).multiplyScalar( 2 );

			object.lookAt( vector );

			targets.sphere.push( object );

		}

		// helix
		var vector = new THREE.Vector3();
		for ( var i = 0, l = objects.length; i < l; i ++ ) {

			var phi = i * 0.175 + Math.PI;
			var object = new THREE.Object3D();

			object.position.x = 900 * Math.sin( phi );
			object.position.y = - ( i * 8 ) + 450;
			object.position.z = 900 * Math.cos( phi );

			vector.x = object.position.x * 2;
			vector.y = object.position.y;
			vector.z = object.position.z * 2;

			object.lookAt( vector );

			targets.helix.push( object );

		}

		// grid
		for ( var i = 0; i < objects.length; i ++ ) {

			var object = new THREE.Object3D();

			object.position.x = ( ( i % 5 ) * 400 ) - 800;
			object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
			object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;

			targets.grid.push( object );

		}

		//renderer
		renderer = new THREE.CSS3DRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.domElement.style.position = 'absolute';
		document.getElementById( 'container' ).appendChild( renderer.domElement );

		//controls
		controls = new THREE.TrackballControls( camera, renderer.domElement );
		controls.rotateSpeed = 0.5;
		controls.minDistance = 500;
		controls.maxDistance = 6000;
		controls.addEventListener( 'change', render );

		var button = document.getElementById( 'table' );
		button.addEventListener( 'click', function ( event ) {
			transform( targets.table, 2000 );
		}, false );

		var button = document.getElementById( 'sphere' );
		button.addEventListener( 'click', function ( event ) {
			transform( targets.sphere, 2000 );
		}, false );

		var button = document.getElementById( 'helix' );
		button.addEventListener( 'click', function ( event ) {
			transform( targets.helix, 2000 );
		}, false );

		var button = document.getElementById( 'grid' );
		button.addEventListener( 'click', function ( event ) {
			transform( targets.grid, 2000 );
		}, false );

		transform( targets.table, 2000 );

		//

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function transform( targets, duration ) {

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

	function selector(direction) {

		var numMovies = $(".movie").length;
		var myPos = $(".movie.selected").index();


		if (direction === "left" && myPos > 0) {
			$(".movie:eq("+myPos+")").removeClass("selected");
			$(".movie:eq("+(myPos-1)+")").addClass("selected");
		}

		if (direction === "right" && myPos < (numMovies-1)) {
			$(".movie:eq("+myPos+")").removeClass("selected");
			$(".movie:eq("+(myPos+1)+")").addClass("selected");
		}

		//these 2 are hard-coded nn change
		if (direction === "up" && myPos > 4) {
			$(".movie:eq("+myPos+")").removeClass("selected");
			$(".movie:eq("+(myPos-5)+")").addClass("selected");
		}

		//fix
		if (direction === "down" && myPos < (numMovies-3)) {
			$(".movie:eq("+myPos+")").removeClass("selected");
			$(".movie:eq("+(myPos+5)+")").addClass("selected");
		}

	}

	function playVideo() {
		$("#videoPlayer").show();
		document.getElementsByTagName("video")[0].play();
	}

	function stopVideo () {
		$("#videoPlayer").hide();
		document.getElementsByTagName("video")[0].pause();
	}

	document.getElementsByTagName("video")[0].addEventListener("ended", stopVideo);


	$("body").on('keyup', function(e) {

		switch (e.keyCode) {

			//left
			case 37:
			selector("left");
			break;

			//up
			case 38:
			selector("up");
			break;

			//right
			case 39:
			selector("right");
			break;

			//down
			case 40:
			selector("down");
			break;

			//enter
			case 13:
			playVideo();
			break;

			//backspace
			case 8:
			stopVideo();
			break;

			//backspace
			case 27:
			stopVideo();
			break;


			default:
			break;

		}

	});
}(jQuery));

