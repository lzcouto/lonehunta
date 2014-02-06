var game = new Phaser.Game(800, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('ground', 'assets/platform.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('background', 'assets/platformer.png');
    game.load.image('ground1', 'assets/ground.png');
    game.load.image('ground2', 'assets/ground2.png');
    game.load.image('enemy', 'assets/ufo.png');
}

var player;
var platforms;
var cursors;
var background;
var enemy;
var text;
var dead;

function create() {
    createBackground();
    createStage();
    createPlayer();
    enemy = game.add.group();
    createEnemies(3);
    createControls();
    createCamera();
}
/* Create Functions */

function createEnemies(number){
    for(var i= 0; i < number; i++){  
    enemies = enemy.create(Math.random() * 2000, 0,'enemy');
    enemies.body.gravity.y = Math.random() * 10;
    enemies.body.bounce.y = 1.0;
    enemies.body.collideWorldBounds = true;
     var tween = game.add.tween(enemies).to({ x: Math.random() * 2000 }, 2000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 2000 }, 1000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 2000 }, 2000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 2000 }, 1000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 2000 }, 2000, Phaser.Easing.Linear.None)
    .to({ x: Math.random() * 2000 }, 1000, Phaser.Easing.Linear.None)
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
    game.world.setBounds(0,0, 2000, 400);
    platforms = game.add.group();
    var ground = platforms.create(0, game.world.height - 32, 'ground');
    ground.scale.setTo(20, 1);
    ground.body.immovable = true;
    createRandomPlatforms(platforms, 10);
}

function createRandomPlatforms(group, number){
    for(var i = 0; i < number; i++){
        var ledge = group.create(Math.random() * 2000, Math.random() * 350, 'ground2');
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
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && dead)
    {
        revivePlayer();
    }
}

/*Update Functions*/
function collision(){
    game.physics.collide(player, platforms);
    game.physics.collide(enemy, platforms);
    game.physics.collide(player,enemy, killPlayer, null, this);
    game.physics.overlap(player,enemy, killPlayer, null, this);
}

function revivePlayer(){
    createPlayer();
    createCamera();
    text.destroy();
    dead = false;
}

function killPlayer(player, enemy){
    player.kill();
    var style = { font: "bold 20pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2 };
    text = game.add.text(player.x - 200 ,100, 'GAMEOVER - Press Spacebar',style );
    dead = true;
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