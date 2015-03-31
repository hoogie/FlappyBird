window.Pipe = (function() {
   'use strict';

   var Controls = window.Controls;

   //var pipeheight = 90;
   //var pipewidth = 52;
   var INITIAL_POSITION_X = 100;
   var INITIAL_POSITION_Y = 500;
   var stopper = 0;

   //var SPEEDpipe = 30; // * 10 pixels per second
   var JUMPpipe = 50;
   //var GRAVITYpipe = 10;
   //var pipe = new Array();

   var Pipe = function(el, game) {
      this.el = el;
      this.game = game;
      this.pos = { x: 0, y: 0 };
   };


   Pipe.prototype.reset = function() {
      console.log("this í reset");
      console.log(this);
      console.log("this í reset");
      this.pos.x = INITIAL_POSITION_X;
      console.log("this.pos.x");
      console.log(this.pos.x);
      this.pos.y = INITIAL_POSITION_Y;
      console.log("this.pos.y");
      console.log(this.pos.y);
      stopper = 0;
   };

   Pipe.prototype.onFrame = function(delta) {
      
      console.log("kem ég inní þetta partí? er inní pipe on Frame");
      
         this.pos.x -= delta * 2;
         //stopper = 1;   
         /*updatePipes();*/
      
      //VELOCITY = GRAVITY * delta;
      //this.pos.y += delta * VELOCITY;


      //this.pos.y += 
      // console.log(delta)
      
     /* if(stopper === 0) {
         this.pos.y = INITIAL_POSITION_Y;
      }

      if (Controls.keys.space) {
         this.pos.y -= delta * JUMP;
         stopper = 1;  
         //updatePipes();
      }

      if(stopper === 1) {
               this.pos.y += delta * GRAVITY;
               this.game.begin();

      }*/


    /*this.checkCollisionWithBounds();

      // Update UI
      console.log("this el css í pipie");
      console.log(this.el.css);*/
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