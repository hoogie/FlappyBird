window.Pipe = (function() {
   'use strict';

   //var Controls = window.Controls;

   var POINTS = 0;
   var INITIAL_POSITION_X = 0;
   var INITIAL_POSITION_Y = 0;


   var WIDTH = 5;


   function randomNumber(from,to)
   {
       return Math.floor(Math.random()*(to-from+1)+from);
   }

   var Pipe = function(elupper, ellower, game, vers) {

      this.elupper = elupper;
      this.ellower = ellower;
  

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


   
  
   };



   function randomNumber(from,to)
   {
       return Math.floor(Math.random()*(to-from+1)+from);
   }

   /*Pipe.prototype.reset = function() {
      console.log("pipe reset");

   

      this.pos.x = 100;
      this.pos.y = randomNumber(-4, 4); //todo: randomize !!!
      //console.log(this.pos.y);
      //stopper = 0;
   };*/
   var tempGap = 10;

   Pipe.prototype.reset = function() {
 
      if(this.elupper.pos.x < -WIDTH) {
         tempGap = randomNumber(9,13);
         this.elupper.pos.x = 100;
         this.elupper.pos.y = randomNumber(-4, 4);
         this.ellower.pos.x = 100;
         this.ellower.pos.y = this.elupper.pos.y - tempGap;
         console.log(tempGap);
      }


   };

   /*function playerScore() {
   //score += 1;
   //console.log(score);
   //play score sound
   /*soundScore.stop();
   soundScore.play();
   setBigScore();*/


   Pipe.prototype.onFrame = function(delta) {
      
    
      this.elupper.pos.x -= delta * 20;
      this.ellower.pos.x -= delta * 20;
     
         this.reset();
         //playerScore();
      
    
      this.checkCollisionWithPipe();
      this.elupper.css('transform', 'translate(' + this.elupper.pos.x + 'em, ' + this.elupper.pos.y + 'em)');
      this.ellower.css('transform', 'translate(' + this.ellower.pos.x + 'em, ' + this.ellower.pos.y + 'em)');
     
   };



   Pipe.prototype.checkCollisionWithPipe = function() {

      //player height = 6, width = 8
      //pipuhattar  width: 5.2em; height: 2.6em;
      //pipur width 5.2 og height 20
     if(this.vers === 1) {
      if(this.elupper.pos.x > this.game.player.pos.x) {
         console.log(tempGap, "tempGat í check");
         if((this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 > this.game.player.pos.y) ||
            (this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 + tempGap < this.game.player.pos.y)) {
                console.log("----upperbumb----------");
             

                  this.game.player.playerDead();
                  return this.game.gameover()
         }

         
      
      }
   }
 

       if(this.vers === 2) {
           if(this.elupper.pos.x > this.game.player.pos.x) {
       
         if((this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 > this.game.player.pos.y) ||
            (this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 + tempGap < this.game.player.pos.y)) {
                console.log("----upperbumb222222222222222222----------");
             

                  this.game.player.playerDead();
                  return this.game.gameover()
         }
     
 
      }
}
          
       if(this.vers === 3) {
           if(this.elupper.pos.x > this.game.player.pos.x) {
       
         if((this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 > this.game.player.pos.y) ||
            (this.elupper.pos.x < this.game.player.pos.x + 8) && (this.elupper.pos.y + 20 + tempGap < this.game.player.pos.y)) {
                console.log("----upperbumb33333333333333333333----------");
             

                  this.game.player.playerDead();
                  return this.game.gameover()
         }
     
 
      }
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