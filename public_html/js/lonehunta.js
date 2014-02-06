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
    createEnemy();
    createControls();
    createCamera();
}
/* Create Functions */

function createEnemy(){
    enemy = game.add.sprite(Math.random() * 2000, Math.random() * 300,'enemy');
    enemy.body.gravity.y = 10;
    enemy.body.collideWorldBounds = true;
    var tween = game.add.tween(enemy).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
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
    player.body.gravity.y = 10;
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
        var ledge = group.create(Math.random() * 2000, Math.random() * 400, 'ground2');
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
    game.physics.collide(enemy,platforms);
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
    text = game.add.text(player.x - 200 ,100, 'GAMEOVER - press spacebar',style );
    dead = true;
}

function playerMovement(){
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
}