
Game.End = function(game) {

    this.create = function() {
        /* Create the GAME OVER screen */
        game.world.setBounds(0, 0, 800, 400);
        this.createButton('buttonRestart',600, 20, this.goRestart);
        this.createButton('buttonMenu',600, 110, this.goMenu);
    };

    this.update = function() {

        /* condition to restart the game */
    };
    
    this.goRestart = function(){
        switch(gameState){
            case 1:
                game.state.start('Survival');
                break;
            case 2:
                game.state.start('Casual');
                break;
            case 3:
                game.state.start('TimeAttack');
                break;
            default:
                game.state.start('Menu');
                break;
        }
    };
    
    this.goMenu = function(){
        game.state.start('Menu');
    };
};

Game.End.prototype = new Game.Play();