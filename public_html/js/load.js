
Game = {};

Game.Boot = function (game) { };

Game.Boot.prototype = {

  preload: function () {
    /* load images for Load screen */
  },
  
  create: function() {
    game.state.start('Load');
  }

};

Game.Load = function (game) { };

Game.Load.prototype = {
  
  preload: function () {
    /* Load game resources (images, texts, sprites, etc) */
    game.load.image('enemy',      'assets/ufo.png');
    game.load.image('ground',     'assets/platform.png');
    game.load.image('ground2',    'assets/ground2.png');
    game.load.image('background', 'assets/platformer.png');

    game.load.spritesheet('dude',   'assets/dude.png', 32, 48);
    game.load.spritesheet('trophy', 'assets/coin.png', 32, 32);
  },
  
  create: function () {
    game.state.start('Menu');
  }
};