window.Pipe = (function() {
   'use strict';

   //var Controls = window.Controls;

   //var pipeheight = 90;
   //var pipewidth = 52;
   var INITIAL_POSITION_X = 0;
   var INITIAL_POSITION_Y = 0;
   //var stopper = 0;
   var WIDTH = 5;

   //var SPEEDpipe = 30; // * 10 pixels per second
   //var JUMPpipe = 50;
   //var GRAVITYpipe = 10;
   //var pipe = new Array();
   function randomNumber(from,to)
   {
       return Math.floor(Math.random()*(to-from+1)+from);
   }

   var Pipe = function(elupper, ellower, game, vers) {

      this.elupper = elupper;
      this.ellower = ellower;
      //this.el2 = el;
      //this.el3 = el;
      this.game = game;
      this.vers = vers;
      if(this.vers === 1) {
               var tempY = randomNumber(-4, 4);
               this.elupper.pos = { x: 100, y: tempY };
               this.ellower.pos = { x: 100, y: tempY - randomNumber(9, 13) };
      }
      if(this.vers === 2) {
               var tempY = randomNumber(-4, 4);
               this.elupper.pos = { x: 130, y: tempY };
               this.ellower.pos = { x: 130, y: tempY - randomNumber(9, 13) };
      }
      if(this.vers === 3){
               var tempY = randomNumber(-4, 4);
               this.elupper.pos = { x: 160, y: tempY };
               this.ellower.pos = { x: 160, y: tempY - randomNumber(9, 13) };

      }
      //this.el2.pos = { x: 4, y: 0 };
      //this.el3.pos = { x: 3, y: 0 };

   
  
   };



   function randomNumber(from,to)
   {
       return Math.floor(Math.random()*(to-from+1)+from);
   }

   Pipe.prototype.reset = function() {
      console.log("pipe reset");

   

      this.pos.x = 100;
      this.pos.y = randomNumber(-4, 4); //todo: randomize !!!
      //console.log(this.pos.y);
      //stopper = 0;
   };

   Pipe.prototype.recycle = function() {
      //console.log("fer inní recygcle");
      //console.log(this.pos.x);
      if(this.elupper.pos.x < -WIDTH) {
         //console.log("inní 1");
         //console.log(this.vers);
         //return this.reset();
         this.elupper.pos.x = 100;
         this.elupper.pos.y = randomNumber(-4, 4);
         this.ellower.pos.x = 100;
         this.ellower.pos.y = this.elupper.pos.y - randomNumber(9, 13);
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
      
    
      this.elupper.pos.x -= delta * 20;
      this.ellower.pos.x -= delta * 20;
     
         this.recycle();
      
    
      this.checkCollisionWithPipe();
      this.elupper.css('transform', 'translate(' + this.elupper.pos.x + 'em, ' + this.elupper.pos.y + 'em)');
      this.ellower.css('transform', 'translate(' + this.ellower.pos.x + 'em, ' + this.ellower.pos.y + 'em)');
     
   };

   Pipe.prototype.checkCollisionWithPipe = function() {
     if(this.vers === 1) {
         console.log(this.ellower.pos.x);
         console.log("this.pos.x");
         console.log(this.game.player.pos.x);

         console.log("this.gamel.player");
      }
      

      //player height = 6, width = 8
      //pipuhattar  width: 5.2em; height: 2.6em;
      //pipur width 5.2 og height 20
     if(this.vers === 1 && (this.elupper.pos.x > this.game.player.pos.x)) {
         if((this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 > this.game.player.pos.y)) {
                console.log("----upperbumb----------");

                  this.game.player.playerDead();
                  return this.game.gameover()
         }
        /* if((this.ellower.pos.x < this.game.player.pos.x + 8) && (this.ellower.pos.y < this.game.player.pos.y + 6))
         {
            console.log("----lowerbumb----------");
            this.game.player.playerDead();
            //return this.game.gameOver();
         }*/
      }
    /*  if(this.vers === 2) {
         if((this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 > this.game.player.pos.y)) {
                console.log("--------------------------------------------------------------------");

                  this.game.player.playerDead();
        //return this.game.gameover();
        //this.game.player.gameOver();
         }
      }
      if(this.vers === 2) {
         if((this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 > this.game.player.pos.y)) {
                console.log("--------------------------------------------------------------------");

                  this.game.player.playerDead();
        //return this.game.gameover();
        //this.game.player.gameOver();
         }
      }*/

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