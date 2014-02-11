var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('background', 'assets/platformer.png');
    game.load.image('ground2', 'assets/ground2.png');
    game.load.image('enemy', 'assets/ufo.png');
    game.load.spritesheet('trophy', 'assets/coin.png',32, 32);
}

var player;
var trophy;
var platforms;
var cursors;
var background;
var enemy;
var text;
var dead;
var winCount = 0;
var score = '';
var hard = 3;

function create() {
    createBackground();
    createStage();
    createTrophy();
    createPlayer();
    createScore();
    enemy = game.add.group();
    createEnemies(hard);
    createControls();
    createCamera();   
}
/* Create Functions */

function createTrophy(){
    trophy = game.add.sprite(2990, game.world.height - 150, 'trophy');
    trophy.body.gravity.y = 40;
    trophy.body.collideWorldBounds = true;
    trophy.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
    trophy.animations.play('spin');
}

function createScore(){
    var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 };
    score = game.add.text(game.camera.x + 10 , 10, 'W/D: ' + winCount, style);
}

function createEnemies(number){
    for(var i= 0; i < number; i++){  
    enemies = enemy.create(Math.random() * 3000, 0,'enemy');
    enemies.body.gravity.y = Math.random() * 10;
    enemies.body.bounce.y = 1.0;
    enemies.body.collideWorldBounds = true;
    var tween = game.add.tween(enemies).to({ x: Math.random() * 3000 }, 2000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 3000 }, 1000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 3000 }, 2000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 3000 }, 1000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 3000 }, 2000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 3000 }, 1000, Phaser.Easing.Linear.None)
    .loop()
    .start();
    }
}

function createBackground(){
    for(var i = 0; i < 10; i++){
    background = game.add.sprite(300*i,0,'background');
    background.scale.setTo(1.6,1.6);
    }
}
function createCamera(){
    game.camera.follow(player);
}
function createPlayer(){
    
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    //player.body.bounce.y = 0.2;
    player.body.gravity.y = 40;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
}

function createStage(){
    game.world.setBounds(0,0, 3000, 400);
    platforms = game.add.group();
    var ground = platforms.create(0, game.world.height - 32, 'ground');
    ground.scale.setTo(20, 1);
    ground.body.immovable = true;
    createRandomPlatforms(platforms, 20);
}

function createRandomPlatforms(group, number){
    for(var i = 0; i < number; i++){
        var ledge = group.create(Math.random() * 3000, Math.random() * 350, 'ground2');
        ledge.body.immovable = true;
        ledge.scale.setTo(0.2,0.2);
    }
}

function createControls(){
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    collision();
    playerMovement();
    checkPlayerDeath();
    updateScore();
    checkImpossible();
}

/*Update Functions*/

function checkPlayerDeath(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && dead)
    {
        revivePlayer();
    }
}

function collision(){
    game.physics.collide(player, platforms);
    game.physics.collide(enemy, platforms);
    game.physics.collide(trophy,platforms);
    game.physics.collide(player,enemy,killPlayer, null, this);
    game.physics.overlap(player,enemy,killPlayer, null, this);
    game.physics.collide(player,trophy,winGame,null,this);
    game.physics.overlap(player,trophy,winGame, null, this);
}

function revivePlayer(){
    createPlayer();
    createCamera();
    text.destroy();
    createEnemies(1);
    dead = false;
}

function checkImpossible(){
    if(winCount < -20){
        text.destroy();
        var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 };
        text = game.add.text(game.camera.x + 300, 150, 'NOOB - GameReset!', style);
        killAllEnemies();
        winCount = 0;
    }
}

function winGame(player, trophy){
    player.kill();
    var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 };
    text = game.add.text(game.camera.x + 170, 150, 'YOU WIN! (nothing) - Press Spacebar', style);
    dead = true;
    killEnemies();
    winCount++;
}

function killPlayer(player, enemy){
    player.kill();
    var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 };
    text = game.add.text(game.camera.x + 220 ,150, 'GAMEOVER - Press Spacebar',style );
    dead = true;
    winCount--;
}

function killEnemies(){
    enemy.getRandom().kill();
}

function killAllEnemies(){
    enemy.callAll('kill');
    createEnemies(hard);
}

function updateScore(){
     score.destroy();
     var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 };
     score = game.add.text(game.camera.x + 10 , 10, 'W/D: ' + winCount, style);
}

function playerMovement(){
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -500;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 500;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -900;
    }
    
    if(cursors.down.isDown){
        player.body.velocity.y = 900;
    }
}