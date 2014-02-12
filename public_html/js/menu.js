
//Game.Menu = function (game) { };

Game.Menu = function(game){

  this.create = function () {
    /* Create menu screen (images, sounds, animations, etc) */
  };

  this.update = function() {

    /* condition to start the game */
    if (true) {
      game.state.start('Survival');
    }
  };

};