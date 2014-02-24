Game.Survival = function(game) {
    this.create = function() {
        this.createStage(3000, 399, 'background', 'ground');
        this.createControls();
        this.createPlayer(15, 15);
        this.createCamera(this.player);

    };

    this.update = function() {
        this.createCollision(this.player, this.platforms);
        this.playerMovement();
    };

    this.render = function() {
          game.context.fillStyle = "#00FFAA";
          game.context.font = "20px Arial";
          game.context.fillText("Time: ",30 ,30);
    };

};

Game.Survival.prototype = new Game.Play();