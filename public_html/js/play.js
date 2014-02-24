
Game.Play = function() {    
    this.createGroups = function() {
        this.platforms = game.add.group();
        this.enemies = game.add.group();
    };

    this.createStage = function(width, height, background, platform) {
        game.world.setBounds(0, 0, width, height);

        for (var i = 0; i < width; i = i + 400) {
            game.add.sprite(i, 0, background);
        }
        this.platforms = game.add.group();
        for (var i = 0; i < width; i = i + 50) {
            var ground = this.platforms.create(i, 370, platform);
            ground.body.immovable = true;
        }

    };

    this.createTrophy = function(spawnWidth, spawnHeight) {
        this.trophy = game.add.sprite(spawnWidth, spawnHeight, 'trophy');
        this.trophy.body.gravity.y = 40;
        this.trophy.body.collideWorldBounds = true;
        this.trophy.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.trophy.animations.play('spin');
    };


    this.createPlayer = function(spawnWidth, spawnHeight) {
        this.player = game.add.sprite(spawnWidth, spawnHeight, 'dude');
        this.player.body.gravity.y = 40;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    };

    this.createEnemies = function(number, width, sprite) {
        for (var i = 0; i < number; i++) {
            var enemy = this.enemies.create(Math.random() * width, 0, sprite);
            enemy.body.bounce.y = 1.0;
            enemy.body.collideWorldBounds = true;
            enemy.body.gravity.y = Math.random() * 10;
            game.add.tween(enemy)
                    .to({x: Math.random() * width}, 2000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * width}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * width}, 2000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * width}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * width}, 2000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * width}, 1000, Phaser.Easing.Linear.None)
                    .loop()
                    .start();
        }
    };


    this.createCamera = function(follower) {
        game.camera.follow(follower);
    };


    this.createRandomPlatforms = function(number, width, height, sprite) {
        for (var i = 0; i < number; i++) {
            var ledge = this.platforms.create(Math.random() * width, Math.random() * height, sprite);
            ledge.body.immovable = true;
        }
    };


    this.createControls = function() {
        cursors = game.input.keyboard.createCursorKeys();
    };


    this.createCollision = function(object1, object2) {
        game.physics.collide(object1, object2);
    };

    this.createOverlap = function(object1, object2) {
        game.physics.overlap(object1, object2);
    };

    this.killPlayer = function() {
        this.dead = true;
        this.player.kill();
    };


    this.killEnemiy = function() {
        this.enemies.getRandom().kill();
    };


    this.killAllEnemies = function() {
        this.enemies.callAll('kill');
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
