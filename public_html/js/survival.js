Game.Survival = function(game) {
    this.create = function() {
        stateChange = false;
        this.time = 0;
        this.createStage(3000, 399, 'background', 'ground');
        this.createRandomPlatforms(15, 3200, 350, 'platform');
        this.createControls();
        this.createPlayer(15, 15);
        this.createCamera(this.player);
        this.createTrophy(2880, 15);
        this.createEnemies(10, 3000, 'enemy');
    };

    this.update = function() {
        
        this.createCollision(this.player, this.platforms, null);
        this.createCollision(this.trophy, this.platforms, null);
        this.createCollision(this.enemies, this.platforms, null);
        this.createCollision(this.player, this.enemies, this.killPlayer);
        this.createCollision(this.enemies, this.enemies, null);

        this.playerMovement();

        if (this.player.alive === false) {
            var gameover = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'gameOver');
            gameover.alpha = 0;
            game.add.tween(gameover)
                    .to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true)
                    .onUpdateCallback(function() {stateChange = true;}, this);
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
    };
};

Game.Survival.prototype = new Game.Play();