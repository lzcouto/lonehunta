
//Game.Menu = function (game) { };

Game.Menu = function(game) {


    this.create = function() {

        this.createStage(800, 400, 'background', 'ground');
        this.createControls();
        this.createPlayer(15, 15);
        this.createButton('buttonSurvival', 600, 20, this.goSurvival);
        this.createButton('buttonCasual', 600, 110, this.goCasual);
        this.createButton('buttonAttack', 600, 200, this.goTimeAttack);
        this.createButton('buttonCredits', 600, 290, this.goCredits);
    };

    this.update = function() {
        this.createCollision(this.player, this.platforms);
        this.playerMovement();
    };
    
    this.goSurvival = function(){
        gameState = 1;
        game.state.start('Survival');
    };
    
    this.goCasual = function(){
        gameState = 2;
       game.state.start('Casual');
    };
    
    this.goTimeAttack = function(){
        gameState = 3;
        game.state.start('TimeAttack');
    };
    
    this.goCredits = function(){
        game.state.start('Credits');
    };
};

Game.Menu.prototype = new Game.Play();

