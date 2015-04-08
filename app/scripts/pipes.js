window.Pipe = (function() {
    'use strict';

    var Controls = window.Controls;
    var PIPE_WIDTH         = 5.2;
    var OPENING_HEIGHT     = 11; //hafa 10.5
    var MIN_PIPE_HEIGHT    = 15;
    var MAX_PIPE_HEIGHT    = 25;
    var MAX_LOWER_HEIGHT   = 58 - (MIN_PIPE_HEIGHT + OPENING_HEIGHT);
    var counter1           = 0;
    var counter2           = 0;
    var counter3           = 0;
    var score              = 0;
    var START_Y            = -20;
    var GAMESTARTED        = 0;

    function randomNumber(from,to) {
        return Math.floor(Math.random()*(to-from+1)+from);
    }

    function resetCounters() {
        counter1 = 0;
        counter2 = 0;
        counter3 = 0;
    }

    var Pipe = function(elupper, ellower, game, vers) {

        this.elupper = elupper;
        this.ellower = ellower;
        this.game    = game;
        this.vers    = vers;

        this.reset();
    };

    Pipe.prototype.reset = function() {
            resetCounters();
            score = 0;
            GAMESTARTED = 0;
            var x = 105;
            if (this.vers === 2) {
                x = 135;
            } else if (this.vers === 3) {
                x = 165;
            }
      
            var tempY = randomNumber(MIN_PIPE_HEIGHT, MAX_PIPE_HEIGHT);
            this.elupper.height = tempY;
            this.elupper.pos = { x: x, y: START_Y };
            this.elupper.css('height', tempY + 'em');
            var lowerY = START_Y + tempY + OPENING_HEIGHT;
            this.ellower.pos = { x: x, y: lowerY };
            this.ellower.css('height', MAX_LOWER_HEIGHT + 'em');
        };

    Pipe.prototype.reproduce = function() {
 
        if(this.elupper.pos.x < -5) {
            resetCounters();
            var tempY = randomNumber(MIN_PIPE_HEIGHT, MAX_PIPE_HEIGHT);
            this.elupper.height = tempY;
            this.elupper.pos.x = 100;
            this.elupper.css('height', tempY + 'em');
            this.ellower.pos.x = 100;
            this.ellower.pos.y = START_Y + tempY + OPENING_HEIGHT;
        }
    };

    Pipe.prototype.onFrame = function(delta) {

        document.getElementById('currentScore').innerHTML = score;
        if (Controls.keys.space) {
            GAMESTARTED = 1;
         
        }
      
        if(GAMESTARTED === 1) {
            this.elupper.pos.x -= delta * 20;
            this.ellower.pos.x -= delta * 20;
     
            this.reproduce();
          
            this.checkCollisionWithPipe();            
        }
        this.elupper.css('transform', 'translateZ(0) translate(' + this.elupper.pos.x + 'em, ' + this.elupper.pos.y + 'em)');
        this.ellower.css('transform', 'translateZ(0) translate(' + this.ellower.pos.x + 'em, ' + this.ellower.pos.y + 'em)');
    };

    Pipe.prototype.checkCollisionWithPipe = function() {

        var playerX      = this.game.player.pos.x;
        var playerY      = this.game.player.pos.y;
        var elupperX     = this.elupper.pos.x;
        var elupperY     = this.elupper.pos.y;
        var ellowerX     = this.ellower.pos.x;
        var playerWidth  = 8;
        var playerHeight = 6;
        var elUpperHeight = this.elupper.height;
        
        if(playerX + playerWidth > elupperX && playerY < elupperY + elUpperHeight - START_Y - 1 && playerX < elupperX + PIPE_WIDTH ||
           playerX + playerWidth > ellowerX && playerY + playerHeight > elupperY + elUpperHeight - START_Y + 1 + OPENING_HEIGHT && playerX < ellowerX + PIPE_WIDTH) {
            this.game.player.playerDead();
            return this.game.gameover();
        }

        if(playerX > elupperX + PIPE_WIDTH) {
            if(this.vers === 1 && counter1 === 0) {
                counter1 = 1;
                score += 1;
            }
            if(this.vers === 2 && counter2 === 0) {
                counter2 = 1;
                score += 1;
            }
            if(this.vers === 3 && counter3 === 0) {
                counter3 = 1;
                score += 1;
            }
        }
        this.game.getScore(score);
    };

    return Pipe;

})();