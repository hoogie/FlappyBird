
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe = new window.Pipe(this.el.find('#pipe1upper'), this.el.find('#pipe1lower'), this, 1);
		this.pipe2 = new window.Pipe(this.el.find('#pipe2upper'), this.el.find('#pipe2lower'), this, 2);
		this.pipe3 = new window.Pipe(this.el.find('#pipe3upper'), this.el.find('#pipe3lower'), this, 3);
		
		this.isPlaying = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;
         


		// Update game entities.
		this.player.onFrame(delta);

		//reyna að setja inn pípuhatt
		this.pipe.onFrame(delta);
		this.pipe2.onFrame(delta);
		this.pipe3.onFrame(delta);
		

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	Game.prototype.begin = function() {
		this.el.addClass('gamestarted');
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		

		this.player.reset();
		this.pipe.reset();
		this.pipe2.reset();
		this.pipe3.reset();
		
	};

	var scoreNow = 0;
	Game.prototype.getScore = function(score) {
	
		scoreNow = score;

	};
	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
		
		document.getElementById('Scoreboard').innerHTML = scoreNow;
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


