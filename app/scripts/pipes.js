

/*function generateRect(el) {
   return {
      x: el.pos.x,
      y: el.pos.y,
      width: parseInt(el.css("width")) / 10,
      height: parseInt(el.css("height")) / 10
   };
}*/

window.Pipe = (function() {
   'use strict';

   var POINTS             = 0;
   var INITIAL_POSITION_X = 0;
   var INITIAL_POSITION_Y = 0;
   var WIDTH              = 5;
   var OPENING_HEIGHT     = 10;
   var MIN_PIPE_HEIGHT    = 15;
   var MAX_PIPE_HEIGHT    = 25;
   var MAX_LOWER_HEIGHT   = 58 - (MIN_PIPE_HEIGHT + OPENING_HEIGHT);

   var START_Y            = -20;

   function randomNumber(from,to) {
       return Math.floor(Math.random()*(to-from+1)+from);
   }

   var Pipe = function(elupper, ellower, game, vers) {

      this.elupper = elupper;
      this.ellower = ellower;
      this.game    = game;
      this.vers    = vers;

      var x = 100;
      if (this.vers === 2) {
         x = 130;
      } else if (this.vers === 3) {
         x = 160;
      }

      var tempY = randomNumber(MIN_PIPE_HEIGHT, MAX_PIPE_HEIGHT);
      this.elupper.height = tempY;
      console.log(this.elupper.height, " el upper = temp");
      this.elupper.pos = { x: x, y: START_Y };
      this.elupper.css("height", tempY + "em");

      var lowerY = START_Y + tempY + OPENING_HEIGHT;
      this.ellower.pos = { x: x, y: lowerY };
      this.ellower.css("height", MAX_LOWER_HEIGHT + "em");
   };

/*

   function randomNumber(from,to)
   {
       return Math.floor(Math.random()*(to-from+1)+from);
   }
*/
   /*Pipe.prototype.reset = function() {
      console.log("pipe reset");

   

      this.pos.x = 100;
      this.pos.y = randomNumber(-4, 4); //todo: randomize !!!
      //console.log(this.pos.y);
      //stopper = 0;
   };*/
   //var tempGap = 10;

   Pipe.prototype.reset = function() {
 
      if(this.elupper.pos.x < -WIDTH) {
         var tempY = randomNumber(MIN_PIPE_HEIGHT, MAX_PIPE_HEIGHT);
         this.elupper.height = tempY;
         this.elupper.pos.x = 100;
         this.elupper.css("height", tempY + "em");
         this.ellower.pos.x = 100;
         this.ellower.pos.y = START_Y + tempY + OPENING_HEIGHT; 
      }
   };

 


   Pipe.prototype.onFrame = function(delta) {
          
      this.elupper.pos.x -= delta * 20;
      this.ellower.pos.x -= delta * 20;
     
      this.reset();
          
      this.checkCollisionWithPipe();

      this.elupper.css('transform', 'translateZ(0) translate(' + this.elupper.pos.x + 'em, ' + this.elupper.pos.y + 'em)');
      this.ellower.css('transform', 'translateZ(0) translate(' + this.ellower.pos.x + 'em, ' + this.ellower.pos.y + 'em)');
     
   };

   Pipe.prototype.checkCollisionWithPipe = function() {

      //player height = 6, width = 8
      //pipuhattar  width: 5.2em; height: 2.6em;
      //pipur width 5.2 og height 20

      /*var rectUpper = generateRect(this.elupper);
      var rectLower = generateRect(this.ellower);

      if (this.game.player.collidesWith(rectUpper, "upper") ||
         this.game.player.collidesWith(rectLower, "lower")) {
            this.game.player.playerDead();
            return this.game.gameover();
      }*/
      var playerX      = this.game.player.pos.x;
      var playerY      = this.game.player.pos.y;
      var elupperX     = this.elupper.pos.x;
      var elupperY     = this.elupper.pos.y;
      var ellowerX     = this.ellower.pos.x;
      var ellowerY     = this.ellower.pos.y;
      var playerWidth  = 8;
      var playerHeight = 6;
      var elUpperHeight = this.elupper.height;
      console.log(elUpperHeight, "elupperheight");
      console.log(this.elupper.height, "this.el.upper");
    /* console.log(playerX, "player X");
      console.log(playerY, "player Y");
      console.log(elupperX, "upper X");
      console.log(elupperY + elUpperHeight - START_Y, "upper Y");*/

      if(playerX + 8 > elupperX && playerY < elupperY + elUpperHeight - START_Y && playerX < elupperX + 5.2) {
         this.game.player.playerDead();
         return this.game.gameover();
      }

   };

   return Pipe;

/*function updatePipes()
{
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
}*/
})();