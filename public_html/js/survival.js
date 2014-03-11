Game.Survival = function(game) {
    var count = 0;
    var ENEMYNUMBERS = 5;

    this.create = function() {
        stateChange = false;
        time = 0;
        this.createStage(3000, 399, 'backgroundMetal', 'groundMetal');
        this.createRandomPlatforms(3000, 300, 'platformMetal');
        this.createControls();
        this.createPlayer(15, 300);
        this.createCamera(this.player);
        this.survive = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'survive');
        this.survive.alpha = 0;
        game.add.tween(this.survive)
                .to({alpha: 1}, 800, Phaser.Easing.Linear.None, true,0,0,true)
                .onComplete.add(this.startSurvive, this);
    };

    this.update = function() {
        this.ledges.setAll("body.velocity.y", 0);
        this.createCollision(this.player, this.platforms, null);
        this.createCollision(this.player, this.ledges, null);
        this.createCollision(this.enemies, this.platforms, null);
        this.createCollision(this.player, this.enemies, this.killPlayer);
        this.createCollision(this.enemies, this.ledges, null);

        this.playerMovement();
        this.collideLeftRight();


        if (this.player.alive === false) {
            var gameover = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'gameOver');
            gameover.alpha = 0;
            game.add.tween(gameover)
                    .to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(function() {
                        stateChange = true;
                    });
        }

        if (count >= 50) {
            count = 0;
            game.add.tween(this.enemies.getRandom())
                    .to({x: this.player.x, y: this.player.y}, 1000, Phaser.Easing.Linear.None)
                    .start();
        }

        count++;

        if (stateChange)
        {
            game.state.start('End');
        }


    };



    this.render = function() {
        if (this.player.alive && this.moving)
            this.createScore(time++, 20, 60);
        else
            this.createScore(time, 20, 60)
        /*  game.debug.renderBodyInfo(debug, 32, 32);
         game.debug.renderSpriteCorners(this.player);
         game.debug.renderSpriteCorners(debug);*/
    };
    
    this.startSurvive = function(){
        this.survive.kill();
        this.createEnemies(ENEMYNUMBERS, 2990, 'enemy');
    };
};

Game.Survival.prototype = new Game.Play();