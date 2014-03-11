Game.Play = function() {
    this.currentState;
    this.moving;
    this.createStage = function(width, height, background, platform) {

        game.world.setBounds(0, 0, width, height);

        for (var i = 0; i < width; i = i + 800) {
            game.add.sprite(i, 0, background);
        }
        this.platforms = game.add.group();
        for (var i = 0; i <= width; i = i + 50) {
            this.platforms.create(i, 370, platform);
        }
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.collideWorldBounds', true);

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
        this.player.alive = true;
        this.player.body.gravity.y = 600;
        this.player.body.acceleration.y = 1000;
        this.player.body.collideWorldBounds = false;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    };

    this.createEnemies = function(number, width, sprite) {
        this.enemies = game.add.group();
        for (var i = 0; i < number; i++) {
            var enemy = this.enemies.create((Math.random() * width) + 100, Math.random() * 300, sprite);
            enemy.body.bounce.y =31.0;
          //  enemy.body.collideWorldBounds = true;
           // enemy.body.gravity.y = -10;
          //  enemy.body.acceleration.y = 400;
         /*               game.add.tween(enemy)
                    .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
                    .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
                    .start();*/
        }
    };


    this.createCamera = function(follower) {
        game.camera.follow(follower);
    };


    this.createRandomPlatforms = function(width, height, sprite) {

        // determina a partir de quantos % o inicia a area de criacao de ledges
        var START_LEDGES_AREA = 0.1;

        // determina a altura maxima do salto em pixels
        var JMP_HEIGHT = 120;

        // determina a probabilidade de criar um ledge
        // onde a probabilidalidade real é 1 - PROB
        var PROB = 0.3; // 70%

        // gap max/min no eixo Y para se criar um ledge
        // em relacao ao ledge anterior
        var GAP = 42;

        // determina as dimensoes do sprite
        var WSPRITE = 150;
        var HSPRITE = 7;

        // define a posicao inicial para iniciar a criação 
        // dos ledges, ignorando os primeiros 10% do mapa
        var WSTART = width * START_LEDGES_AREA;

        // determina a posicao x, y do primeiro ledge
        var y = height - (Math.random() * height / 3);
        var x = WSTART;
        this.ledges = game.add.group();
        this.ledges.create(x, y, sprite);

        lastX = x;
        lastY = y;

        for (var i = WSTART; i < width; i += WSPRITE)
        {

            // condicao para a criação de um ledge
            if (Math.random() > PROB) {

                // define o gap onde nao se pode criar ledge
                // de modo a evitar que se crie duas ledges
                // uma do lado da outra
                var minGap = lastY - GAP;
                var maxGap = lastY + GAP;

                // caso o Y seja gerado dentro da area do GAP
                // o ledge é jogado 30px acima ou 30px abaixo
                if (y > minGap && y < lastY) {
                    y -= GAP;
                } else if (y < maxGap && y > lastY) {
                    y += GAP;
                }

                // cria o ledge do canvas
                this.ledges.create(x, y, sprite);

                // cria um backup da posição gerada
                lastX = x;
                lastY = y;
            }

            // recalcula a proxima ledge baseado na ultima ledge criada
            x += WSPRITE;

            // determina a altura minima que pode ser criado o proximo ledge
            // onde se decrementa a altura do salto em relação a posicao do ultimo ledge
            var min = (lastY - JMP_HEIGHT);
            y = Math.random() * (height - min) + min;
        }

        this.ledges.setAll('body.immovable', true);
        this.ledges.setAll('body.collideWorldBounds', true);
    };


    this.createControls = function() {
        cursors = game.input.keyboard.createCursorKeys();
    };


    this.createCollision = function(object1, object2, func) {
        if (func)
        {
            game.physics.collide(object1, object2, func, null, this);
        } else {
            game.physics.collide(object1, object2);
        }

    };



    this.createOverlap = function(object1, object2, func) {
        if (func)
        {
            game.physics.collide(object1, object2, func, null, this);
        } else {
            game.physics.overlap(object1, object2);
        }
    };

    this.killPlayer = function() {
        this.player.alive = false;
        this.player.kill();
    };


    this.killEnemiy = function() {
        this.enemies.getRandom().kill();
    };


    this.killAllEnemies = function() {
        this.enemies.callAll('kill');
    };

    this.createScore = function(text, x, y) {
        game.context.font = "40px Arial";
        game.context.fillStyle = "Black";
        game.context.fillText(text, x, y);
    };

    this.collideLeftRight = function() {
        if (this.player.x < this.player._cache.halfWidth) {
            this.player.x += 1;
            this.player.body.velocity.x *= this.player.body.bounce.x * 10000;
        }
        if (this.player.x > game.world.width - this.player._cache.width) {
            this.player.x -= 1;
            this.player.body.velocity.x *= -this.player.body.bounce.x * 10000;
        }

    };



    this.playerMovement = function() {
        this.player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            this.player.body.velocity.x = -500;
            this.player.animations.play('left');
            this.moving = true;
        }
        else if (cursors.right.isDown)
        {
            this.player.body.velocity.x = 500;
            this.player.animations.play('right');
            this.moving = true;

        }
        else
        {
            this.player.animations.stop();
            this.player.frame = 4;
            this.moving = false;
        }

        if (cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -700;
            this.moving = true;
        }

        if (cursors.down.isDown)
        {
            this.player.body.velocity.y = 700;
            this.moving = true;
        }
    };

    this.createButton = function(spritesheet, width, height, func) {
        button = game.add.button(width, height, spritesheet, func, this, 1, 0, 2);
    };
};
