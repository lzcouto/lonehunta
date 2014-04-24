Game.TimeAttack = function(game) {
    var count = 0;
    var lifeCount = 0;
    var ENEMYNUMBERS = 7;
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
        this.player.health = 100;
        this.createControls();
        this.createCamera(this.player);
        this.texts = game.add.group();
        this.timeAttack = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'survive');
        this.timeAttack.alpha = 0;
        game.add.tween(this.timeAttack)
                .to({alpha: 1}, 800, Phaser.Easing.Linear.None, true, 0, 0, true)
                .onComplete.add(this.startTimeAttack, this);
        this.location = 1;
    };

    this.update = function() {
        this.createCollision(this.player, this.platforms, null);
        this.createCollision(this.enemies, this.platforms, null);
        this.createCollision(this.player, this.ledges, null);
        this.createCollision(this.enemies, this.ledges, null);
        this.createCollision(this.player, this.enemies, this.killPlayerTimeAttack);
        this.createOverlap(this.player, this.enemies, this.killPlayerTimeAttack);
        this.playerMovement();
        if ((count >= 40) && this.enemies) {
            count = 0;
            game.add.tween(this.enemies.getRandom())
                    .to({x: this.player.x, y: this.player.y}, 1500, Phaser.Easing.Linear.None)
                    .start();
        }
        if ((lifeCount >= 200) && this.enemies){
            lifeCount = 0;
            this.player.damage(10);
            this.collectText("-10");
        };
        if(!this.player.alive){
            this.killPlayerTimeAttack(this.player, this.enemies.getRandom());
        }
        count++;
        lifeCount++;
        if (stateChange)
        {
            game.state.start('End');
        }


    };



    this.render = function() {
        timeNow = new Date().getTime() - timeStart.getTime();
        timeP = new Date(timeNow);
        if (this.player.alive) {
            this.createScore("Time: " + timeP.getUTCHours() + ":" + timeP.getUTCMinutes() + ":" + timeP.getUTCSeconds() + ":" + timeP.getUTCMilliseconds() + " Life: " + this.player.health, 20, 40);
        }
    };

    this.startTimeAttack = function() {
        this.timeAttack.kill();
        this.player.alive = true;
        this.createEnemies(ENEMYNUMBERS, 2990, 'enemy');
    };
};

Game.TimeAttack.prototype = new Game.Play();