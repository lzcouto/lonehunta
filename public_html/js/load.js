
Game = {};

//Game.Boot = function (game) { };

Game.Boot = function(game) {

var statechange = false;

this.preload = function() {
    /* load images for Load screen */
    game.load.image('logo', 'assets/logo.png');
    game.load.image('bg', 'assets/boot.png');
};

this.create = function() {
    var bg = game.add.sprite(0, 0, 'bg');
    var logo = game.add.sprite(250, 40, 'logo');
    logo.alpha = 0;
    game.add.tween(logo)
            .to({alpha: 1}, 4000, Phaser.Easing.Linear.None, true)
            .to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
    game.add.tween(bg)
            .to({alpha: 0}, 5000, Phaser.Easing.Linear.None, true);
    
};

this.update = function() {
   setTimeout(function(){statechange = true;},5500);  
   if(statechange)
   {
       game.state.start('Load');
   }
};


};

Game.Load = function(game) {

    this.preload = function() {
        /* Load game resources (images, texts, sprites, etc) */
        game.load.image('enemy', 'assets/ufo.png');
        game.load.image('ground', 'assets/ground.png');
        game.load.image('buttonSurvival', 'assets/survival-button.png');
        game.load.image('buttonCasual', 'assets/casual-button.png');
        game.load.image('buttonAttack', 'assets/tattack-button.png');
        game.load.image('buttonCredits', 'assets/credits-button.png');
        game.load.image('background', 'assets/background.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('trophy', 'assets/coin.png', 32, 32);
    };

    this.create = function() {
        game.state.start('Menu');
    };
};