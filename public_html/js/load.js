
Game = {};

//Game.Boot = function (game) { };

Game.Boot = function(game) {

    this.preload = function() {
        /* load images for Load screen */
    };

    this.create = function() {
        game.state.start('Load');
    };

};

Game.Load = function(game) {

    this.preload = function() {
        /* Load game resources (images, texts, sprites, etc) */
        game.load.image('enemy', 'assets/ufo.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('buttonSurvival', 'assets/survival-button.png');
        game.load.image('buttonCasual', 'assets/casual-button.png');
        game.load.image('buttonAttack', 'assets/tattack-button.png');
        game.load.image('buttonCredits', 'assets/credits-button.png');  
        
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('trophy', 'assets/coin.png', 32, 32);
    };

    this.create = function() {
        game.state.start('Menu');
    };
};