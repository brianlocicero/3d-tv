var opentvui = (function opentvui ($, global) {

	var vodModel = {
		mode: "grid",
	  objects: [],
		targets: { grid: [], deck: [] },
		selectedMovie: 0,
		selectedPos: [0, 0, 0, 0],
		movies: [
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
		]
	}

	var camera, scene, renderer;

	//functions
	var vodMethods = {
		init: function () {

			camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000 );
			camera.position.z = 3000;

			scene = new THREE.Scene();

			//setup
			for (var i = 0; i < vodModel.movies.length; i += 1) {

				//divs
				var element = document.createElement('div');
				if (i === 0) {
					element.className = "movie movie" + i + " selected"
				} else {
					element.className = "movie movie" + i;
				}
				var cover = document.createElement('img');
				cover.src = vodModel.movies[i][1];
				element.appendChild(cover);
	      
	      //css objects
				var object = new THREE.CSS3DObject( element );
				//these positions are the random starting points
				object.position.x = Math.random() * 4000 - 2000;
				object.position.y = Math.random() * 4000 - 2000;
				object.position.z = Math.random() * 4000 - 1000;
				scene.add( object );
				//store a reference to css objects
				vodModel.objects.push(object);
			}

			//grid
			for (var i = 0; i < vodModel.movies.length; i += 1) {
				var object = new THREE.Object3D();
				object.position.x = ( ( i % 5 ) * 400 ) - 800;
				object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
				object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
				vodModel.targets.grid.push( object ); 
			}


			//deck
			for ( var i = 0; i < vodModel.objects.length; i ++ ) {
				var object = new THREE.Object3D();
				object.position.x = 800;
				object.position.y = - (400 + (i * 10));
				object.position.z = 1000;
				object.rotation.x = -1.5;
				vodModel.targets.deck.push( object );
			}

			//renderer
			renderer = new THREE.CSS3DRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.domElement.style.position = 'absolute';
			document.getElementById('container').appendChild( renderer.domElement );

			vodMethods.transform(vodModel.targets.grid, 2000, 'grid');

			window.addEventListener( 'resize', onWindowResize, false );

		},

		transform: function (targets, duration, mode) {

			vodModel.mode = mode;

			TWEEN.removeAll();

			for ( var i = 0; i < vodModel.objects.length; i ++ ) {

				var object = vodModel.objects[i];
				var target = targets[i];

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
				.onComplete( function () {
					if (vodModel.mode === "deck") {
						console.log(vodModel.selectedMovie);
						vodMethods.transformSelected(vodModel.selectedMovie, 500);
					}
				})
				.start();

		},

		transformSelected: function (targetNum, duration) {

			//TWEEN.removeAll();

			vodModel.selectedPos[0] = vodModel.objects[targetNum].position.x;
			vodModel.selectedPos[1] = vodModel.objects[targetNum].position.y;
			vodModel.selectedPos[2] = vodModel.objects[targetNum].position.z;
			vodModel.selectedPos[3] = vodModel.objects[targetNum].rotation.x;

			var object = vodModel.objects[targetNum];

			new TWEEN.Tween( object.position )
				.to( { x: -150, y: 10, z: 2500 }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

			new TWEEN.Tween( object.rotation )
				.to( { x: 0, y: 0, z: 0 }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

			new TWEEN.Tween( this )
			.to( {}, duration * 2 )
			.onUpdate( render )
			.start();

		},

		reverseTransformSelected: function (targetNum, duration, direction) {

			TWEEN.removeAll();

			var object = vodModel.objects[targetNum];

			new TWEEN.Tween( object.position )
				.to( { x: vodModel.selectedPos[0], y: vodModel.selectedPos[1], z: vodModel.selectedPos[2] }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

			new TWEEN.Tween( object.rotation )
				.to( { x: vodModel.selectedPos[3], y: 0, z: 0 }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

			new TWEEN.Tween( this )
			.to( {}, duration * 2 )
			.onUpdate( render )
			.onComplete( function () {
				vodMethods.selector(direction);
				vodMethods.transformSelected(vodModel.selectedMovie+1, 500);
			})
			.start();

		},

		selector: function (direction) {

			var numMovies = $(".movie").length;
			//get currently selected
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

			//set selected
			vodModel.selectedMovie = $(".movie.selected").index();

		}
	}



	//threejs stuff
	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		render();

	}
	function animate() {

		requestAnimationFrame( animate );

		TWEEN.update();

		//controls.update();

	}
	function render() {

		renderer.render( scene, camera );

	}
	function playVideo() {
		$("#videoPlayer").show();
		document.getElementsByTagName("video")[0].play();
	}

	function stopVideo () {
		$("#videoPlayer").hide();
		document.getElementsByTagName("video")[0].pause();
	}

	vodMethods.init();
	animate();

	//DOM events
	document.getElementsByTagName("video")[0].addEventListener("ended", stopVideo);


	$("body").on('keyup', function(e) {

		switch (e.keyCode) {

			//left
			case 37:
			if (vodModel.mode === "grid") {
				vodMethods.selector("left");
			} else if (vodModel.mode === "deck") {
				vodMethods.reverseTransformSelected(vodModel.selectedMovie, 500, "left");
			}
			break;

			//up
			case 38:
			vodMethods.selector("up");
			break;

			//right
			case 39:
			if (vodModel.mode === "grid") {
				vodMethods.selector("right");
			} else if (vodModel.mode === "deck") {
				vodMethods.reverseTransformSelected(vodModel.selectedMovie, 500, "right");
			}
			break;

			//down
			case 40:
			vodMethods.selector("down");
			break;

			//enter
			case 13:
			if (vodModel.mode === "grid") {
				vodMethods.transform(vodModel.targets.deck, 1000, 'deck');
			} else if (vodModel.mode === "deck") {
				playVideo();
			}
			break;

			//escape
			case 27:
			if (vodModel.mode === "deck") {
				vodMethods.transform(vodModel.targets.grid, 1000, 'grid');
			} else {
				stopVideo();
			}
			break;

			default:
			break;

		}

	});



}(jQuery, window));

