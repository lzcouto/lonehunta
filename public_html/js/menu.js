
Game.Menu = function (game) { };

Game.Menu.prototype = {

  create: function () {
    /* Create menu screen (images, sounds, animations, etc) */
  },

  update: function() {

    /* condition to start the game */
    if (true) {
      game.state.start('Play');
    }
  }

};