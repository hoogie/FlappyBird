/*window.Pipe = (function() {
	'use strict';

	var pipeheight = 90;
	var pipewidth = 52;
	var pipe = new Array();


	function updatePipes() {
   console.log("update pipes kall");
   //Do any pipes need removal?
   $(".pipe").filter(function() { return $(this).position().left <= -100; }).remove()
   
   //add a new pipe (top height + bottom height  + pipeheight == 420) and put it in our tracker
   var padding = 80;
   var constraint = 420 - pipeheight - (padding * 2); //double padding (for top and bottom)
   var topheight = Math.floor((Math.random()*constraint) + padding); //add lower padding
   var bottomheight = (420 - pipeheight) - topheight;
   var newpipe = $('<div class="upperPipe" style="height: ' + topheight + 'em;"></div><div class="lowerPipe" style="height: ' + bottomheight + 'em;"></div></div>');
   $("#flyarea").append(newpipe);
   pipes.push(newpipe);
}});*/

window.Wingup = (function() {
	'use strict';
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	Wingup.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	var Wingup = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	}
});

/*function isPointInRect(pt, rect) {

	if (pt.x >= rect.x && 
		pt.x <= rect.x + rect.width &&
		pt.y >= rect.y &&
		pt.y <= rect.y + rect.height) {
		return true;
	}
	return false;
}*/

window.Player = (function() {
	'use strict';

	var Controls = window.Controls;
	var music = document.getElementById('music');
	var deadsound = document.getElementById('deadsound');
	var flappysound = document.getElementById('flappysound');

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var JUMP = 50;
	var GRAVITY = 10;
	var stopper = 0;

	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;


	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		stopper = 0;
		$(".River .wave.bottom-wave").css('-webkit-animation-play-state', 'running');
		$(".cloud").css('-webkit-animation-play-state', 'running');
   		//$(".Player.nod").removeClass('Player nod').addClass('DeadPlayer');
   		//$(".DeadPlayer").removeClass('DeadPlayer');	
   		//$(".DeadPlayer").removeClass('DeadPlayer').addClass('Player nod');
   		$(".Player").show();
   		//$(".Player").addClass('Player');
   		//this.pipe.reset();
   		music.play();
	};

	Player.prototype.onFrame = function(delta) {
		//console.log("kem ég inní þetta partí? inní player");
		
		//VELOCITY = GRAVITY * delta;
		//this.pos.y += delta * VELOCITY;
		/*$( ".Player" ).animate({
		    rotateX: "90",
		    left: "+=50",
		    height: "toggle"
  		}, 5000, function() {
    // Animation complete.
  	});*/
	
		//this.pos.y += 
		// console.log(delta)
		if(stopper === 0) {
			this.pos.y = INITIAL_POSITION_Y;
		}

		if (Controls.keys.space) {
			this.pos.y -= delta * JUMP;
			stopper = 1;

			flappysound.play();
			$(".Player.nod").css('-webkit-animation-play-state', 'running');
			/*updatePipes();*/
		}
		
		if (!Controls.keys.space){
			console.log("ekki speis");
			flappysound.pause
			$(".Player.nod").css('-webkit-animation-play-state', 'paused');

	
						//$('.box').transition({ rotate: '45deg' });
			//$("#player").transition({ y: movey + 'px', rotate: 90}, 1000, 'easeInOutCubic');
			//$(".Player").removeClass('Player').addClass('NotFlyingPlayer');
		}

		if(stopper === 1) {
					this.pos.y += delta * GRAVITY;
					//this.game.begin();

		}

 		//prump
		this.checkCollisionWithBounds();

		// Update UI
		//console.log("this el css í player");
		//console.log(this.el.css);
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			this.playerDead();
			return this.game.gameover();
		}
	};

	/*Player.prototype.collidesWith = function(rect, which) {

		var upperRight = {x: this.pos.x + WIDTH, y: this.pos.y};
		var lowerRight = {x: this.pos.x + WIDTH, y: this.pos.y + HEIGHT};
		console.log("bird height ", HEIGHT);
		console.log("bird width ", WIDTH);
		console.log(rect, " rect");

		if (isPointInRect(upperRight, rect) ||
			isPointInRect(lowerRight, rect)) {
			console.log("UpperRight is: ");
			console.log(upperRight);
			console.log("LowerRight is: ");
			console.log(lowerRight);
			console.log("Rect is:");
			console.log(rect);
			console.log(which)
			return true;
		}

		return false;
	};*/

	Player.prototype.playerDead = function() {
		//$(".animated").css('animation-play-state', 'paused');
		console.log("dead"); 
   		$(".cloud").css('-webkit-animation-play-state', 'paused');
   		$(".River .wave.bottom-wave").css('-webkit-animation-play-state', 'paused');
   		$(".Player.nod").css('-webkit-animation-play-state', 'paused');
   		$(".Wingup").css('-webkit-animation-play-state', 'paused');
   		//$(".Player.nod").removeClass('Player nod').addClass('DeadPlayer');
   		music.pause();
   		flappysound.pause();
   		deadsound.load();
   		deadsound.play();
	};

	return Player;

})();

