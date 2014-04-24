Game.Casual = function(game) {
    var count = 0;
    var ENEMYNUMBERS = 5;

    this.create = function() {
        this.enemies = null;
        stateChange = false;
        time = 0;
        mult = 1;

        this.createStage(3000, 399, 'backgroundMetal', 'groundMetalFull');
        this.createRandomPlatforms(3000, 270, 'platformMetal');
        this.createPlayer(15, 300);
        this.createControls();
        this.createTrophy(2950, 50);
        this.createCamera(this.player);
        this.texts = game.add.group();
        this.casualy = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'survive');
        this.casualy.alpha = 0;
        game.add.tween(this.casualy)
                .to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0, 0, true)
                .onComplete.add(this.startCasual, this);
        this.location = 1;
    };

    this.update = function() {
        this.createCollision(this.player, this.platforms, null);
        this.createCollision(this.enemies, this.platforms, null);
        this.createCollision(this.trophy, this.platforms);
        this.createCollision(this.player, this.ledges, this.platformPoints);
        this.createCollision(this.enemies, this.ledges, null);
        this.createCollision(this.trophy, this.ledges);
        this.createCollision(this.player, this.enemies, this.killPlayerCasual);
        this.createOverlap(this.player, this.enemies, this.killPlayerCasual);
        this.createCollision(this.player, this.trophy, this.implying);
        this.playerMovement();


        if ((count >= 50) && this.enemies) {
            count = 0;
            game.add.tween(this.enemies.getRandom())
                    .to({x: this.player.x, y: this.player.y}, 1600, Phaser.Easing.Linear.None)
                    .start();
        }

        count++;

        if (stateChange)
        {
            game.state.start('End');
        }


    };



    this.render = function() {
        if (this.player.alive && this.moving) {
            this.createScore("Score: " + (time += 1 * mult) + " " + mult + "x", 20, 40);
        }
        else
            this.createScore("Score: " + (time) + " " + mult + "x", 20, 40);
    };

    this.startCasual = function() {
        this.casualy.kill();
        this.player.alive = true;
        this.createEnemies(ENEMYNUMBERS, 2990, 'enemy');
    };
};

Game.Casual.prototype = new Game.Play();