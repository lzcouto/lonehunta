Game.Survival = function(game) {
    var count = 0;
    var enemyCount = 0;
    var ENEMYNUMBERS = 1;
    var timeStart;
    var timeNow;
    
    this.create = function() {
        this.enemies = null;
        stateChange = false;
        timeNow = 0;
        timeStart = new Date();
        this.createStage(3000, 399, 'backgroundMetal', 'groundMetalFull');
        this.createRandomPlatforms(3000, 270, 'platformMetal');
        this.createPlayer(15, 300);
        this.createControls();
        this.createCamera(this.player);
        this.texts = game.add.group();
        this.survive = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'survive');
        this.survive.alpha = 0;
        game.add.tween(this.survive)
                .to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0, 0, true)
                .onComplete.add(this.startSurvival, this);
        this.location = 1;
    };

    this.update = function() {
        this.createCollision(this.player, this.platforms, null);
        this.createCollision(this.enemies, this.platforms, null);
        this.createCollision(this.player, this.ledges, null);
        this.createCollision(this.enemies, this.ledges, null);
        this.createCollision(this.player, this.enemies, this.killPlayerSurvival);
        this.createOverlap(this.player, this.enemies, this.killPlayerSurvival);
        this.playerMovement();
        if ((count >= 50) && this.enemies) {
            count = 0;
            game.add.tween(this.enemies.getRandom())
                    .to({x: this.player.x, y: this.player.y}, 1000, Phaser.Easing.Linear.None)
                    .start();
        }
        if((enemyCount >= 500) && this.enemies){
            enemyCount = 0;
            this.addOneEnemy();
        }
        count++;
        enemyCount++;

        if (stateChange)
        {
            game.state.start('End');
        }


    };



    this.render = function() {
        timeNow = new Date().getTime() - timeStart.getTime();
        timeP = new Date(timeNow);
        if (this.player.alive) {
            this.createScore("Time: " + timeP.getUTCHours() + ":" + timeP.getUTCMinutes() + ":" + timeP.getUTCSeconds() + ":" + timeP.getUTCMilliseconds(), 20, 40);
        }
    };

    this.startSurvival = function() {
        this.survive.kill();
        this.player.alive = true;
        this.createEnemies(ENEMYNUMBERS, 2990, 'enemy');
    };
};

Game.Survival.prototype = new Game.Play();