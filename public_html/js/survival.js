Game.Survival = function(game) {
    this.create = function() {
        stateChange = false;
        this.time = 0;
        this.createStage(3000, 399, 'background', 'ground');
        this.createRandomPlatforms(3000, 300, 'platform');
        this.createControls();
        this.createPlayer(15, 15);
        this.createCamera(this.player);
        this.createTrophy(2880, 15);
        this.createEnemies(5, 2990, 'enemy');
        
    };

    this.update = function() {
        this.ledges.setAll("body.velocity.y", 0);
        this.createCollision(this.player, this.platforms, null);
        this.createCollision(this.player, this.ledges, null);

        this.createCollision(this.trophy, this.platforms, null);
        this.createCollision(this.trophy, this.ledges, null);
        this.createCollision(this.enemies, this.platforms, null);
        this.createCollision(this.player, this.enemies, this.killPlayer);
        this.createCollision(this.enemies, this.enemies, null);
        this.createCollision(this.enemies, this.ledges, null);

        this.playerMovement();
        this.collideLeftRight();

    
        if (this.player.alive === false) {
            var gameover = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'gameOver');
            gameover.alpha = 0;
            game.add.tween(gameover)
                    .to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true)
                    .onUpdateCallback(function() {
                        stateChange = true;
                    }, this);
        }
        if (stateChange)
        {
            game.state.start('End');
        }


    };

    this.render = function() {
        if (this.player.alive && this.moving)
            this.createScore(this.time++, 20, 60);
        else
            this.createScore(this.time, 20, 60)
        /*  game.debug.renderBodyInfo(debug, 32, 32);
         game.debug.renderSpriteCorners(this.player);
         game.debug.renderSpriteCorners(debug);*/
    };
};

Game.Survival.prototype = new Game.Play();