var gameState = 0;
var stateChange = false;
var time = 0;
var mult = 1;
var timeP = new Date();
Game = {};

//Game.Boot = function (game) { };

Game.Boot = function(game) {

    var statechange = false;
    // var statechange = true;

    this.preload = function() {
        game.load.image('logo', 'assets/logo.png');
        game.load.image('bg', 'assets/boot.png');
        game.load.image('loadingbg', 'assets/load1.png');
        game.load.image('loadingbar', 'assets/load2.png');
        game.load.spritesheet('loadingtxt', 'assets/load3.png', 150, 50);
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
        setTimeout(function() {
            statechange = true;
        }, 5500);
        
        if (statechange)
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
        game.load.image('groundMetal', 'assets/groundStreet.png');
        game.load.image('groundMetalFull', 'assets/groundStreetFull.png');
        game.load.image('platform', 'assets/platform.png');
        game.load.image('platformMetal','assets/platformMetal.png');
        game.load.image('buttonSurvival', 'assets/survival-button.png');
        game.load.image('buttonCasual', 'assets/casual-button.png');
        game.load.image('buttonAttack', 'assets/tattack-button.png');
        game.load.image('buttonCredits', 'assets/credits-button.png');
        game.load.image('buttonMenu', 'assets/menu-button.png');
        game.load.image('buttonRestart', 'assets/restart-button.png');
        game.load.image('background', 'assets/background.png');
        game.load.image('backgroundMetal','assets/backgroundCityNight.png');
        game.load.image('gameOver', 'assets/gameover.png');
        game.load.image('survive', 'assets/survive.png');



        game.load.spritesheet('dude', 'assets/ninja.png', 32, 38);
        game.load.spritesheet('trophy', 'assets/coin.png', 32, 32);

        this.preloadBG = this.add.sprite(330, 250, 'loadingtxt');
        this.preloadBG.alpha = 0;
        game.add.tween(this.preloadBG)
                .to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
        this.preloadBG.animations.add('load', [0, 1, 2], 3, true);
        this.preloadBG.animations.play('load');
        this.preloadBar = this.add.sprite(260, 200, 'loadingbar');
        this.preloadBar.alpha = 0;
        game.add.tween(this.preloadBar)
                .to({alpha: 1}, 500, Phaser.Easing.Linear.None, true);
        this.load.setPreloadSprite(this.preloadBar);

    };

    this.create = function() {
        game.state.start('Menu');
    };


};