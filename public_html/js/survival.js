Game.Survival = function(game) {
    
    //Game.Play.apply(this,game);
    
    this.create = function() {
         this.createStage();
    this.createTrophy();
    this.createPlayer();
    this.createScore();
    this.createEnemies(this.hard);
    this.createControls();
    this.createCamera();
    };

    this.update = function() {
       this.collision();
       this.playerMovement();
       this.checkPlayerDeath();
       this.updateScore();
       this.checkImpossible();
    };
};

Game.Survival.prototype = new Game.Play();