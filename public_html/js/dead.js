
Game.Dead = function (game) { };

Game.Dead.prototype = {

  create: function () {
      /* Create the GAME OVER screen */
  },

  update: function() {
    
    /* condition to restart the game */
    if (true) {
      game.state.start('Play');
    }
  }

};