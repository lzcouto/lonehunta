
Game.End = function (game) {

  this.create = function () {
      /* Create the GAME OVER screen */
  };

  this.update = function() {
    
    /* condition to restart the game */
    if (true) {
      game.state.start('Menu');
    }
  };

};