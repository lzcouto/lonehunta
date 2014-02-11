
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game-container');

game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Play', Game.Play);
game.state.add('Dead', Game.Dead);

game.state.start('Boot');