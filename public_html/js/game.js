var game = new Phaser.Game(800, 400, Phaser.CANVAS, 'game-container', null, false, false);

game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Menu', Game.Menu);
game.state.add('Credits', Game.Credits);
game.state.add('Survival', Game.Survival);
game.state.add('TimeAttack', Game.TimeAttack);
game.state.add('Casual', Game.Casual);
game.state.add('End', Game.End);

game.state.start('Boot');