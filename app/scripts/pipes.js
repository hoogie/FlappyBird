window.Pipe = (function() {
   'use strict';

   var pipeheight = 90;
   var pipewidth = 52;
   var INITIAL_POSITION_X = 30;
   var INITIAL_POSITION_Y = 25;
   var stopper = 0;
   //var pipe = new Array();

   var Pipe = function(el, game) {
      console.log(Pipe);
      this.el = el;
      this.game = game;
      this.pos = { x: 0, y: 0 };
   };


   Player.prototype.reset = function() {
      this.pos.x = INITIAL_POSITION_X;
      this.pos.y = INITIAL_POSITION_Y;
      stopper = 0;
   };

   Pipe.prototype.onFrame = function(delta) {
      
      //VELOCITY = GRAVITY * delta;
      //this.pos.y += delta * VELOCITY;


      //this.pos.y += 
      // console.log(delta)
      
      if(stopper === 0) {
         this.pos.y = INITIAL_POSITION_Y;
      }

      if (Controls.keys.space) {
         this.pos.y -= delta * JUMP;
         stopper = 1;  
         /*updatePipes();*/
      }

      if(stopper === 1) {
               this.pos.y += delta * GRAVITY;
               this.game.begin();

      }


      this.checkCollisionWithBounds();

      // Update UI
      this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
   };

  /* Pipe.prototype.checkCollisionWithBounds = function() {
      if (this.pos.x < 0 ||
         this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
         this.pos.y < 0 ||
         this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
         return this.game.gameover();
      }
   };*/

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