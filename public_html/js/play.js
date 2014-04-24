Game.Play = function() {
    this.currentState;
    this.moving;

    this.createStage = function(width, height, background, platform) {

        game.world.setBounds(0, 0, width, height);

        for (var i = 0; i < width; i = i + 800) {
            game.add.sprite(i, 0, background);
        }
        /*
         this.platforms = game.add.group();
         for (var i = 0; i <= width; i = i + 50) {
         this.platforms.create(i, 370, platform);
         }
         this.platforms.setAll('body.immovable', true);
         this.platforms.setAll('body.collideWorldBounds', true);
         */

        this.platforms = game.add.sprite(0, 370, platform);
        game.physics.enable(this.platforms, Phaser.Physics.ARCADE);
        this.platforms.body.immovable = true;
        this.platforms.body.collideWorldBounds = true;

    };

    this.createTrophy = function(spawnWidth, spawnHeight) {

        this.trophy = game.add.sprite(spawnWidth, spawnHeight, 'trophy');
        game.physics.enable(this.trophy, Phaser.Physics.ARCADE);
        this.trophy.body.gravity.y = 600;
        this.trophy.body.acceleration.y = 1000;
        //this.trophy.body.collideWorldBounds = true;
        this.trophy.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.trophy.animations.play('spin');
    };


    this.createPlayer = function(spawnWidth, spawnHeight) {
        this.player = game.add.sprite(spawnWidth, spawnHeight, 'dude');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.alive = true;
        this.player.body.gravity.y = 600;
        this.player.body.acceleration.y = 1000;
        this.player.body.collideWorldBounds = true;
        this.player.body.drag.setTo(400, -400);
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        //     this.player.body.setPolygon(5, 10, 25, 10, 21, 25, 21, 38, 8, 38, 9, 25);

    };

    this.createEnemies = function(number, width, sprite) {
        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        for (var i = 0; i < number; i++) {
            var enemy = this.enemies.create((Math.random() * width) + 300, Math.random() * 300, sprite);

            //   enemy.body.bounce.y = 31.0;
            //  enemy.body.collideWorldBounds = true;
            // enemy.body.gravity.y = -10;
            //  enemy.body.acceleration.y = 400;
            /* game.add.tween(enemy)
             .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
             .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
             .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
             .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
             .to({x: Math.random() * 3100}, 1000, Phaser.Easing.Linear.None)
             .start();*/
        }

        // this.enemies.setAll('body.bounce.y',31.0);
        this.enemies.setAll('body.collideWorldBounds', true);
        this.enemies.setAll('body.gravity', -50);
        this.enemies.setAll('body.acceleration.y', 1000);
    };

    this.addOneEnemy = function() {
        this.enemies.create((Math.random() * 2990) + 300, Math.random() * 300, 'enemy');
        this.enemies.setAll('body.collideWorldBounds', true);
        this.enemies.setAll('body.gravity', -50);
        this.enemies.setAll('body.acceleration.y', 1000);
    };


    this.createCamera = function(follower) {
        game.camera.follow(follower);
    };


    this.createRandomPlatforms = function(width, height, sprite) {

        // determina a partir de quantos % o inicia a area de criacao de ledges
        var START_LEDGES_AREA = 0.1;

        // determina a altura maxima do salto em pixels
        var JMP_HEIGHT = 80;

        // determina a probabilidade de criar um ledge
        // onde a probabilidalidade real é 1 - PROB
        var PROB = 0.3; // 70%

        // gap max/min no eixo Y para se criar um ledge
        // em relacao ao ledge anterior
        var GAP = 45;

        // determina as dimensoes do sprite
        var WSPRITE = 150;
        var HSPRITE = 7;

        // define a posicao inicial para iniciar a criação 
        // dos ledges, ignorando os primeiros 10% do mapa
        var WSTART = width * START_LEDGES_AREA;

        // determina a posicao x, y do primeiro ledge
        var y = height - (Math.random() * height / 3) + GAP;
        var x = WSTART;
        this.ledges = game.add.group();
        this.ledges.enableBody = true;
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
            if (y < 100)
                y += 100;
        }
        ;


        this.ledges.setAll('body.immovable', true);
        this.ledges.setAll('body.collideWorldBounds', true);
        this.ledges.setAll('health', 2);
    };


    this.createControls = function() {
        cursors = game.input.keyboard.createCursorKeys();
    };


    this.createCollision = function(object1, object2, func) {
        if (func)
        {
            game.physics.arcade.collide(object1, object2, func, null, this);
        } else {
            game.physics.arcade.collide(object1, object2);
        }
        ;

    };

    this.implying = function(player, trophy) {
        if (this.location === 1) {
            trophy.kill();
            mult++;
            this.createTrophy(10, 50);
            this.location = 2;
            this.ledges.setAll('health', 2);
        } else if (this.location === 2) {
            trophy.kill();
            mult++;
            this.createTrophy(2950, 50);
            this.location = 1;
            this.ledges.setAll('health', 2);
        }
        ;
    };


    this.createOverlap = function(object1, object2, func) {
        if (func)
        {
            game.physics.arcade.overlap(object1, object2, func, null, this);
        } else {
            game.physics.arcade.overlap(object1, object2);
        }
        ;
    };

    this.killPlayerCasual = function(player, enemy) {
        if (player.body.touching.down && enemy.body.touching.up)
        {
            enemy.kill();
            this.enemies.create((Math.random() * 2990) + 100, Math.random() * 300, 'enemy');
            this.collectText("+" + 1000 * mult);
            time += 1000 * mult;
            player.body.velocity.y = -700;
            return;
        } else {
            var gameover = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'gameOver');
            gameover.alpha = 0;
            game.add.tween(gameover)
                    .to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(function() {
                        stateChange = true;
                    });
            player.alive = false;
            player.kill();
        }
        ;
    };

    this.killPlayerSurvival = function(player, enemy) {
        if (player.body.touching.down && enemy.body.touching.up)
        {
            enemy.kill();
            this.enemies.create((Math.random() * 2990) + 100, Math.random() * 300, 'enemy');
            this.collectText("KILL");
            player.body.velocity.y = -700;
            return;
        } else {
            time = timeP;
            var gameover = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'gameOver');
            gameover.alpha = 0;
            game.add.tween(gameover)
                    .to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true)
                    .onComplete.add(function() {
                        stateChange = true;
                    });
            player.alive = false;
            player.kill();
        }
        ;
    };

    this.killPlayerTimeAttack = function(player, enemy) {
        if (player.body.touching.down && enemy.body.touching.up)
        {
            enemy.kill();
            this.enemies.create((Math.random() * 2990) + 100, Math.random() * 300, 'enemy');
            this.collectText("+10HP");
            player.health += 10;
            player.body.velocity.y = -400;
            return;
        } else {
            player.kill();
            player.alive = false;
            if (player.alive === false) {
                time = timeP;
                var gameover = game.add.sprite(game.camera.x + 260, game.camera.y + 75, 'gameOver');
                gameover.alpha = 0;
                game.add.tween(gameover)
                        .to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true)
                        .onComplete.add(function() {
                            stateChange = true;
                        });
            }
        }
        ;
    };


    this.killEnemiy = function() {
        this.enemies.getRandom().kill();
    };

    this.platformPoints = function(player, ledger) {
        if ((this.player.body.touching.down) && (ledger.body.touching.up) && (ledger.health === 2)) {
            ledger.health = 1;
            var temp = ((this.roundTo10(game.world.height - this.player.y) / 10) / 2) * mult;
            var temp = parseInt(temp);
            this.collectText(temp);
            time += temp;
        }
        ;
    };

    this.killAllEnemies = function() {
        this.enemies.callAll('kill');
    };

    this.createScore = function(text, x, y) {
        game.context.font = "25px Arial";
        game.context.fillStyle = "White";
        game.context.fillText(text, x, y);
    };

    this.collectText = function(text) {
        var style = {font: "10pt Arial", fill: "#ffffff", align: "center"};
        var textCollect = game.add.text(this.player.x, this.player.y - 10, text, style);
        this.texts.add(textCollect);
        textCollect.alpha = 0;
        game.add.tween(textCollect)
                .to({alpha: 1, y: this.player.y - 40}, 400, Phaser.Easing.Linear.None, true)
                .onComplete.add(this.clearCollect, this);

    };

    this.roundTo10 = function(number) {
        var temp = number / 10;
        Math.round(temp);
        temp *= temp * 10;
        return temp;
    };

    this.clearCollect = function() {
        this.texts.removeAll();
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
            this.moving = false;
        }
    };

    this.createButton = function(spritesheet, width, height, func) {
        button = game.add.button(width, height, spritesheet, func, this, 1, 0, 2);
    };
};
