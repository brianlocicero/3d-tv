var opentvui = (function opentvui ($, global) {

	var vodModel = {
		mode: "grid",
	  objects: [],
		targets: { grid: [], deck: [] },
		rowNum: 7,
		rowValues: [-750, -500, -250, 0, 250, 500, 750],
		numMovies: 23,
		selectedMovie: 0,
		selectedPos: [0, 0, 0, 0],
		transforming: false,
		movies: [
			["Avengers", "images/avengers.jpg", "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.", "2012", "Brian LoCicero", 3],
			["Blade Runner", "images/blade_runner.jpg", "A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.", "1982", "Brian LoCicero", 5],
			["Brave", "images/brave.jpg", "Determined to make her own path in life, Princess Merida defies a custom that brings chaos to her kingdom. Granted one wish, Merida must rely on her bravery and her archery skills to undo a beastly curse.", "2012", "Brian LoCicero", 3],
			["The Hunger Games: Catching Fire", "images/catching_fire.jpg", "Katniss Everdeen and Peeta Mellark become targets of the Capitol after their victory in the 74th Hunger Games sparks a rebellion in the Districts of Panem.", "2013", "Brian LoCicero", 4],
			["Django Unchained", "images/django.jpg", "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.", "2012", "Brian LoCicero", 5],
			["Finding Nemo", "images/finding_nemo.jpg", "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.", "2003", "Brian LoCicero", 2],
			["The Hobbit: An Unexpected Journey", "images/hobbit.jpg", "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug.", "2012", "Brian LoCicero", 1],
			["Hotel Transylvania", "images/hotel_transylvania.jpg", "Dracula, who operates a high-end resort away from the human world, goes into overprotective mode when a boy discovers the resort and falls for the count's teen-aged daughter.", "2012", "Brian LoCicero", 3],
			["Hugo", "images/Hugo.jpg", "Set in 1930s Paris, an orphan who lives in the walls of a train station is wrapped up in a mystery involving his late father and an automaton.", "2011", "Brian LoCicero", 4],
			["The Hunger Games", "images/hunger_games.jpg", "Katniss Everdeen voluntarily takes her younger sister's place in the Hunger Games, a televised fight to the death in which two teenagers from each of the twelve Districts of Panem are chosen at random to compete.", "2012", "Brian LoCicero", 5],
			["Iron Man", "images/iron_man.jpg", "After being held captive in an Afghan cave, an industrialist creates a unique weaponized suit of armor to fight evil.", "2008", "Brian LoCicero", 4],
			["Les Misérables", "images/les_mis.jpg", "In 19th-century France, Jean Valjean, who for decades has been hunted by the ruthless policeman Javert after breaking parole, agrees to care for a factory worker's daughter. The decision changes their lives for ever.", "2012", "Brian LoCicero", 2],
			["Lorax", "images/lorax.jpg", "A 12-year-old boy searches for the one thing that will enable him to win the affection of the girl of his dreams. To find it he must discover the story of the Lorax, the grumpy yet charming creature who fights to protect his world.", "2012", "Brian LoCicero", 4],
			["Man of Steel", "images/man_of_steel_large.jpg", "Clark Kent, one of the last of an extinguished race disguised as an unremarkable human, is forced to reveal his identity when Earth is invaded by an army of survivors who threaten to bring the planet to the brink of destruction.", "2013", "Brian LoCicero", 4],
			["Monsters Inc.", "images/monsters_inc.jpg", "Monsters generate their city's power by scaring children, but they are terribly afraid themselves of being contaminated by children, so when one enters Monstropolis, top scarer Sulley finds his world disrupted.", "2001", "Brian LoCicero", 4],
			["The Twilight Saga: New Moon", "images/new_moon.jpg", "Edward leaves Bella after an attack that nearly claimed her life, and in her depression she falls into yet another paranormal relationship- this time with werewolf Jacob Black.", "2009", "Brian LoCicero", 4],
			["The Simpsons Movie", "images/simpsons_movie_large.jpg", "After Homer accidentally pollutes the town's water supply, Springfield is encased in a gigantic dome by the EPA and the Simpson family are declared fugitives.", "2007", "Brian LoCicero", 4],
			["James Bond: Skyfall", "images/skyfall_large.jpg", "Bond's loyalty to M is tested when her past comes back to haunt her. Whilst MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.", "2012", "Brian LoCicero", 3],
			["The Amazing Spiderman", "images/spider_man.jpg", "After Peter Parker is bitten by a genetically altered spider, he gains newfound, spider-like powers and ventures out to solve the mystery of his parent's mysterious death.", "2012", "Brian LoCicero", 3],
			["Star Trek Into Darkness", "images/star_trek.jpg", "After the crew of the Enterprise find an unstoppable force of terror from within their own organization, Captain Kirk leads a manhunt to a war-zone world to capture a one-man weapon of mass destruction.", "2013", "Brian LoCicero", 1],
			["How to train your dragon", "images/train_dragon.jpg", "A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.", "2010", "Brian LoCicero", 3],
			["Wall-E", "images/wall_e.jpg", "In the distant future, a small waste collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.", "2008", "Brian LoCicero", 3],
			["Wreck it Ralph", "images/wreck_it_ralph.jpg", "A video game villain wants to be a hero and sets out to fulfill his dream, but his quest brings havoc to the whole arcade where he lives", "2012", "Brian LoCicero", 4]
		]
	}

	var camera, scene, renderer;

	//functions
	var vodMethods = {
		init: function () {

			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );
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

				//grid
				var object = new THREE.Object3D();
				object.position.x = vodModel.rowValues[ (i%vodModel.rowNum) ];
				object.position.y = ( - ( Math.floor( i / vodModel.rowNum ) ) * 300 ) + 450;
				object.position.z = 1500;
				vodModel.targets.grid.push( object );

				//deck
				var object = new THREE.Object3D();
				object.position.x = 800;
				object.position.y = - (400 + (i * 5));
				object.position.z = 1300;
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

			vodModel.transforming = true;

			if ( $("#details").hasClass("animated") ) {
				$("#details").addClass("animated fadeOut");
			}

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
						vodMethods.transformSelected(vodModel.selectedMovie, 500);
					} else {
						vodModel.transforming = false;
					}
				})
				.start();

		},

		transformSelected: function (targetNum, duration) {

			vodModel.mode = "details";
			vodModel.transforming = true;

			$("#details").removeClass();

			//store my position so I can reverse it later
			vodModel.selectedPos[0] = vodModel.objects[targetNum].position.x;
			vodModel.selectedPos[1] = vodModel.objects[targetNum].position.y;
			vodModel.selectedPos[2] = vodModel.objects[targetNum].position.z;
			vodModel.selectedPos[3] = vodModel.objects[targetNum].rotation.x;

			var object = vodModel.objects[targetNum];

			new TWEEN.Tween( object.position )
				.to( { x: -180, y: 10, z: 2600 }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

			new TWEEN.Tween( object.rotation )
				.to( { x: 0, y: 0, z: 0 }, Math.random() * duration + duration )
				.easing( TWEEN.Easing.Exponential.InOut )
				.start();

			new TWEEN.Tween( this )
			.to( {}, duration * 2 )
			.onUpdate( render )
			.onComplete( function() {
				$("#details h1.title").text( vodModel.movies[targetNum][0] );
				$("#details p.description").text( vodModel.movies[targetNum][2] );
				$("#details p.releaseDate").text( "Release Date: " + vodModel.movies[targetNum][3] + "");
				$("#details p.director").text( "Director: " + vodModel.movies[targetNum][4] + "");
				$("#details div.rating span").removeClass("checked");
				$("#details div.rating span").each(function( index ) {
				  if (index < vodModel.movies[targetNum][5]) {
				  	$(this).addClass("checked");
				  }
				});
				$("#details").addClass("animated fadeIn");
				vodModel.transforming = false;
			})
			.start();

		},

		reverseTransformSelected: function (targetNum, duration, direction) {

			vodModel.transforming = true;

			$("#details").addClass("animated fadeOut");

			TWEEN.removeAll();

			var object = vodModel.objects[targetNum];
			console.log(object);

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
				vodMethods.transformSelected(vodModel.selectedMovie, 500);
			})
			.start();

		},

		selector: function (direction) {

			//get currently selected
			var myPos = $(".movie.selected").index();
			//fix hard-coded
			var maxDown = 16;

			if (direction === "left" && myPos > 0 ||
				  direction === "up" && myPos > 0 && vodModel.mode === "details") {
				$(".movie:eq("+myPos+")").removeClass("selected");
				$(".movie:eq("+(myPos-1)+")").addClass("selected");
			} else if (direction === "right" && myPos < (vodModel.numMovies-1) ||
				  direction === "down" && myPos < (vodModel.numMovies-1) && vodModel.mode === "details") {
				$(".movie:eq("+myPos+")").removeClass("selected");
				$(".movie:eq("+(myPos+1)+")").addClass("selected");
			} else if (direction === "up" && myPos > (vodModel.rowNum -1)) {
				$(".movie:eq("+myPos+")").removeClass("selected");
				$(".movie:eq("+(myPos-vodModel.rowNum)+")").addClass("selected");
			} else if (direction === "down" && myPos < maxDown) {
				$(".movie:eq("+myPos+")").removeClass("selected");
				$(".movie:eq("+(myPos+vodModel.rowNum)+")").addClass("selected");
			}

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
	}
	function render() {
		renderer.render( scene, camera );
	}
	function playVideo() {
		$("#videoPlayer").removeClass("fadeOut").addClass("animated fadeIn");
		document.getElementsByTagName("video")[0].play();
	}

	function stopVideo () {
		$("#videoPlayer").removeClass("fadeIn").addClass("animated fadeOut");
		document.getElementsByTagName("video")[0].pause();
	}

	vodMethods.init();
	animate();

	//DOM events
	document.getElementsByTagName("video")[0].addEventListener("ended", stopVideo);


	$("body").on('keyup', function(e) {

		//if we're in the middle of a transform
		if (vodModel.transforming) {
			return;
		}

		switch (e.keyCode) {

			//left
			case 37:
			if (vodModel.mode === "grid") {
				vodMethods.selector("left");
			} else if (vodModel.mode === "details") {
				vodMethods.reverseTransformSelected(vodModel.selectedMovie, 500, "left");
			}
			break;

			//up
			case 38:
			if (vodModel.mode === "grid") {
				vodMethods.selector("up");
			} else if (vodModel.mode === "details") {
				vodMethods.reverseTransformSelected(vodModel.selectedMovie, 500, "up");
			}
			break;

			//right
			case 39:
			if (vodModel.mode === "grid") {
				vodMethods.selector("right");
			} else if (vodModel.mode === "details") {
				vodMethods.reverseTransformSelected(vodModel.selectedMovie, 500, "right");
			}
			break;

			//down
			case 40:
			if (vodModel.mode === "grid") {
				vodMethods.selector("down");
			} else if (vodModel.mode === "details") {
				vodMethods.reverseTransformSelected(vodModel.selectedMovie, 500, "down");
			}
			break;

			//enter
			case 13:
			if (vodModel.mode === "grid") {
				vodMethods.transform(vodModel.targets.deck, 1000, 'deck');
			} else if (vodModel.mode === "details") {
				vodModel.mode = "movie";
				playVideo();
				console.log(vodModel.mode);
			}
			break;

			//escape
			case 27:
			if (vodModel.mode === "details") {
				vodMethods.transform(vodModel.targets.grid, 1000, 'grid');
			} else if (vodModel.mode === "movie") {
				vodModel.mode = "details";
				stopVideo();
			}
			break;

			default:
			break;

		}

	});



}(jQuery, window));

