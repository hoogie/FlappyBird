window.Pipe = (function() {
   'use strict';

   var Controls = window.Controls;

   //var pipeheight = 90;
   //var pipewidth = 52;
   var INITIAL_POSITION_X = 0;
   var INITIAL_POSITION_Y = 0;
   var stopper = 0;
   var WIDTH = 110;

   //var SPEEDpipe = 30; // * 10 pixels per second
   var JUMPpipe = 50;
   //var GRAVITYpipe = 10;
   //var pipe = new Array();

   var Pipe = function(el, game, vers) {

      this.el = el;
      //this.el2 = el;
      //this.el3 = el;
      this.game = game;
      this.vers = vers;
      if(this.vers === 1) {
               this.pos = { x: 10, y: 0 };
      }
      if(this.vers === 2) {
               this.pos = { x: 40, y: 0 };
      }
      if(this.vers === 3){
               this.pos = { x: 70, y: 0 };

      }
      //this.el2.pos = { x: 4, y: 0 };
      //this.el3.pos = { x: 3, y: 0 };

   
  
   };

   /*var Pipe2 = function(el, game) {
      console.log(Pipe2);
      this.el = el;
      this.game = game;
      this.pos = { x: -4, y: 0 };
  
   };*/

   function randomNumber(from,to)
   {
       return Math.floor(Math.random()*(to-from+1)+from);
   }

   Pipe.prototype.reset = function() {
      //console.log("pipe reset");

   

      this.pos.x = 5;
      this.pos.y = randomNumber(-4, 4); //todo: randomize !!!
      //console.log(this.pos.y);
      stopper = 0;
   };

   Pipe.prototype.recycle = function() {
      //console.log("fer inní recygcle");
      //console.log(this.pos.x);
      if(this.pos.x < -WIDTH) {
         //console.log("inní 1");
         //console.log(this.vers);
         //return this.reset();
         this.pos.x = 5;
         this.pos.y = randomNumber(-4, 4);
      }
     /* if(this.el2.pos.x < -WIDTH) {
         console.log("inní 2");
         //return this.reset();
         this.el2.pos.x = 5;
         this.el2.pos.y = randomNumber(-4, 4);
      }
      if(this.el3.pos.x < -WIDTH) {
         console.log("inní 3");
         //return this.reset();
         this.el3.pos.x = 5;
         this.el3.pos.y = randomNumber(-4, 4);
      }*/
   };

   Pipe.prototype.onFrame = function(delta) {
      
      //console.log("kem ég inní þetta partí? er inní pipe on Frame");
      this.pos.x -= delta * 30;
      //console.log(this.vers);
         //this.el1.pos.x -= delta * 10;
         //this.el2.pos.x -= delta * 5;
         //this.el3.pos.x -= delta * 3;

         /* if(this.vers === 1) {
            console.log("vers 1, hraði 10");
            console.log(this.vers);
            console.log("vers 1, hraði 10");

               this.el1.pos.x -= delta * 1;

            }

          if(this.vers === 2) {
            console.log("vers 2, hraði 5");
                console.log(this.vers);
                console.log("vers 2, hraði 10");

               this.el1.pos.x -= delta * 1;

            }
         else {
                this.el1.pos.x -= delta * 3;
                console.log("vers 3, hraði 5");
                console.log(this.vers);
                console.log("vers 3, hraði 10");


            }*/
         //Pipe2.pos.x -= delta * 10;
         //stopper = 1;   
         /*updatePipes();*/
         /*if(this.pos.x < -WIDTH){
            return this.reset();
         }*/
         //console.log("element1");
         //console.log(this.el1);
         this.recycle();
      
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
      this.checkCollisionWithPipe();
      this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
      //this.el2.css('transform', 'translate(' + this.el2.pos.x + 'em, ' + this.el2.pos.y + 'em)');
      //this.el3.css('transform', 'translate(' + this.el3.pos.x + 'em, ' + this.el3.pos.y + 'em)');

      //prump
   };

   Pipe.prototype.checkCollisionWithPipe = function() {
      console.log(this.pos.x);
      console.log("this.pos.x");
      console.log(this.game.player.pos.x);
      console.log("this.gamel.player");
      if(this.pos.x <= this.game.player.pos.x && this.pos.y <= this.game.player.pos.y ) {
        //return this.game.gameover();
        console.log("chek collision");
       }
      
      };



     /* if (this.pos.x < 0 ||
         this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
         this.pos.y < 0 ||
         this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
         return this.game.gameover();
      } */
   

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