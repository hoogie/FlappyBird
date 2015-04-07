window.Wingup = function() {
	'use strict';
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var Wingup = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	Wingup.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};
};

window.Player = (function() {
	'use strict';

	var Controls = window.Controls;
	var music = document.getElementById('music');
	var deadsound = document.getElementById('deadsound');
	var flappysound = document.getElementById('flappysound');

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var JUMP = 50; // * 10 pixels per second
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
		$('.River .wave.bottom-wave').css('-webkit-animation-play-state', 'running');
		$('.cloud').css('-webkit-animation-play-state', 'running');
		$('.Player.nod').css('-webkit-animation-play-state', 'running');
        $('.Wingup').css('-webkit-animation-play-state', 'running');
        music.play();
        flappysound.play();
	};

	Player.prototype.onFrame = function(delta) {
		
		if(stopper === 0) {
			this.pos.y = INITIAL_POSITION_Y;
		}

		if (Controls.keys.space) {
			this.pos.y -= delta * JUMP;
			stopper = 1;

			flappysound.play();
			$('.Player.nod').css('-webkit-animation-play-state', 'running');
		}
		
		if (!Controls.keys.space){
			flappysound.pause();
			$('.Player.nod').css('-webkit-animation-play-state', 'paused');
		}

		if(stopper === 1) {
			this.pos.y += delta * GRAVITY;
		}

		this.checkCollisionWithBounds();

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
	
	Player.prototype.playerDead = function() {
		$('.cloud').css('-webkit-animation-play-state', 'paused');
		$('.River .wave.bottom-wave').css('-webkit-animation-play-state', 'paused');
		$('.Player.nod').css('-webkit-animation-play-state', 'paused');
		$('.Wingup').css('-webkit-animation-play-state', 'paused');
		music.pause();
		flappysound.pause();
		deadsound.load();
		deadsound.play();
	};

	return Player;

})();

