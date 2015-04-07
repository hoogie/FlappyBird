

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
   var PIPE_WIDTH         = 5.2;
   var OPENING_HEIGHT     = 13; //hafa 10.5
   var MIN_PIPE_HEIGHT    = 15;
   var MAX_PIPE_HEIGHT    = 25;
   var MAX_LOWER_HEIGHT   = 58 - (MIN_PIPE_HEIGHT + OPENING_HEIGHT);
   var counter            = 0;
   var counter2           = 0;
   var counter3           = 0;
   var score              = 0;
   var START_Y            = -20;
   var GAMESTARTED        = 0;

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
   Pipe.prototype.reset = function() {
      counter = 0;
      counter2 = 0;
      counter3 = 0;
      score = 0;
      GAMESTARTED = 0;
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
   //var tempGap = 10;

   Pipe.prototype.reproduce = function() {
 
      if(this.elupper.pos.x < -5) {
         counter = 0;
         counter2 = 0;
         counter3 = 0;
         var tempY = randomNumber(MIN_PIPE_HEIGHT, MAX_PIPE_HEIGHT);
         this.elupper.height = tempY;
         this.elupper.pos.x = 100;
         this.elupper.css("height", tempY + "em");
         this.ellower.pos.x = 100;
         this.ellower.pos.y = START_Y + tempY + OPENING_HEIGHT; 

      }
   };

 


   Pipe.prototype.onFrame = function(delta) {


      if (Controls.keys.space) {
         GAMESTARTED = 1;
         
      }    
      
      if(GAMESTARTED === 1) {
         this.elupper.pos.x -= delta * 20;
         this.ellower.pos.x -= delta * 20;
     
         this.reproduce();
          
         this.checkCollisionWithPipe();

         this.elupper.css('transform', 'translateZ(0) translate(' + this.elupper.pos.x + 'em, ' + this.elupper.pos.y + 'em)');
         this.ellower.css('transform', 'translateZ(0) translate(' + this.ellower.pos.x + 'em, ' + this.ellower.pos.y + 'em)');
    
      }
 
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
      var elLowerHeight = this.ellower.height;
 

      if(playerX + playerWidth > elupperX && playerY < elupperY + elUpperHeight - START_Y - 1 && playerX < elupperX + PIPE_WIDTH ||
         playerX + playerWidth > ellowerX && playerY + 6 > elupperY + elUpperHeight - START_Y + 1 + OPENING_HEIGHT&& playerX < ellowerX + PIPE_WIDTH) {
         this.game.player.playerDead();
         return this.game.gameover();
      }
      if(playerX > elupperX + PIPE_WIDTH) {
         if(this.vers === 1 && counter === 0) {
            counter = 1;
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
      console.log(score, " score");

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