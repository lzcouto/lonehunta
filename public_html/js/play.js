
Game.Play = function() {
    this.hard = 3;
    this.score = '';
    this.winCount = 0;


    this.createStage = function() {

        game.world.setBounds(0, 0, 3000, 400);

        for (var i = 0; i < 10; i++) {
            game.add.sprite(300 * i, 0, 'background').scale.setTo(1.6, 1.6);
        }

        this.platforms = game.add.group();
        this.enemies = game.add.group();

        var ground = this.platforms.create(0, game.world.height - 32, 'ground');
        ground.scale.setTo(20, 1);
        ground.body.immovable = true;

        this.createRandomPlatforms(this.platforms, 20);
    };

    this.createTrophy = function() {
        this.trophy = game.add.sprite(2990, game.world.height - 150, 'trophy');
        this.trophy.body.gravity.y = 40;
        this.trophy.body.collideWorldBounds = true;
        this.trophy.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.trophy.animations.play('spin');
    };


    this.createPlayer = function() {
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');
        this.player.body.gravity.y = 40;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    };


    this.createScore = function() {
        var style = {
            font: "bold 20pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 2
        };

        this.score = game.add.text(game.camera.x + 10, 10, 'W/D: ' + this.winCount, style);
    };


    this.createEnemies = function(number) {


        for (var i = 0; i < number; i++) {
            var enemy = this.enemies.create(Math.random() * 3000, 0, 'enemy');
            enemy.body.bounce.y = 1.0;
            enemy.body.collideWorldBounds = true;
            enemy.body.gravity.y = Math.random() * 10;

            game.add.tween(enemy)
                    .to({x: Math.random() * 3000}, 2000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3000}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3000}, 2000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3000}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3000}, 2000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3000}, 1000, Phaser.Easing.Linear.None)
                    .loop()
                    .start();
        }
    };


    this.createCamera = function() {
        game.camera.follow(this.player);
    };


    this.createRandomPlatforms = function(group, number) {
        for (var i = 0; i < number; i++) {
            var ledge = group.create(Math.random() * 3000, Math.random() * 350, 'ground2');
            ledge.body.immovable = true;
            ledge.scale.setTo(0.2, 0.2);
        }
    };


    this.createControls = function() {
        cursors = game.input.keyboard.createCursorKeys();
    };


    this.collision = function() {
        game.physics.collide(this.player, this.platforms);
        game.physics.collide(this.trophy, this.platforms);
        game.physics.collide(this.enemies, this.platforms);

        game.physics.collide(this.player, this.enemies, this.killPlayer, null, this);
        game.physics.overlap(this.player, this.enemies, this.killPlayer, null, this);

        game.physics.collide(this.player, this.trophy, this.winGame, null, this);
        game.physics.overlap(this.player, this.trophy, this.winGame, null, this);
    };


    this.checkPlayerDeath = function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.dead) {
            this.revivePlayer();
        }
    };


    this.revivePlayer = function() {
        this.createPlayer();
        this.createCamera();
        this.text.destroy();
        this.createEnemies(1);
        this.dead = false;
    };


    this.checkImpossible = function() {

        if (this.winCount < -20) {

            var style = {
                font: "bold 20pt Arial",
                fill: "#ffffff",
                align: "center",
                stroke: "#000000",
                strokeThickness: 2
            };

            this.text.destroy();
            this.text = game.add.text(game.camera.x + 300, 150, 'NOOB - GameReset!', style);
            this.killAllEnemies();
            this.winCount = 0;
        }
    };


    this.winGame = function(player, trophy) {
        this.player.kill();

        var style = {
            font: "bold 20pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 2
        };

        this.text = game.add.text(game.camera.x + 170, 150, 'YOU WIN! (nothing) - Press Spacebar', style);
        this.dead = true;
        this.killEnemies();
        this.winCount++;
    };


    this.killPlayer = function(player, enemy) {
        var style = {
            font: "bold 20pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 2
        };

        this.text = game.add.text(game.camera.x + 220, 150, 'GAMEOVER - Press Spacebar', style);
        this.dead = true;
        this.winCount--;
        this.player.kill();
    };


    this.killEnemies = function() {
        this.enemies.getRandom().kill();
    };


    this.killAllEnemies = function() {
        this.enemies.callAll('kill');
        this.createEnemies(this.hard);
    };


    this.updateScore = function() {
        this.score.destroy();

        var style = {
            font: "bold 20pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 2
        };

        this.score = game.add.text(game.camera.x + 10, 10, 'W/D: ' + this.winCount, style);
    };

    this.playerMovement = function() {
        this.player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            this.player.body.velocity.x = -500;
            this.player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            this.player.body.velocity.x = 500;
            this.player.animations.play('right');
        }
        else
        {
            this.player.animations.stop();
            this.player.frame = 4;
        }

        if (cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -900;
        }

        if (cursors.down.isDown)
        {
            this.player.body.velocity.y = 1800;
        }
    };

};
