Game.Survival = function(game) {
    this.create = function() {
        this.time = 0;
        this.createStage(3000, 399, 'background', 'ground');
        this.createRandomPlatforms(10,2900,350,'platform');
        this.createControls();
        this.createPlayer(15, 15);
        this.createCamera(this.player);
        this.createTrophy(2880,15);
        this.createEnemies(10,3000,'enemy');
    };

    this.update = function() {
        this.createCollision(this.player, this.platforms, null);
        this.createCollision(this.trophy, this.platforms, null);
        this.createCollision(this.enemies, this.platforms, null);
        this.createCollision(this.player, this.enemies, null);
        this.createCollision(this.enemies, this.enemies, null);

        this.playerMovement();
    };

    this.render = function() {    
         this.createScore(this.time++, 20,60);
    };
   
};

Game.Survival.prototype = new Game.Play();