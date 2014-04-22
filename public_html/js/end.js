
Game.End = function(game) {
    var s;
    
    this.create = function() {
        /* Create the GAME OVER screen */
        game.world.setBounds(0, 0, 800, 400);
        this.createButton('buttonRestart', 600, 20, this.goRestart);
        this.createButton('buttonMenu', 600, 110, this.goMenu);
        if(typeof time === "object"){
          var text = "Time: " + time.getUTCHours() + ":" + time.getUTCMinutes() + ":" + time.getUTCSeconds() + ":" + time.getUTCMilliseconds();
      }
      else
          var text = "Score: " + time;
        var style = {font: "bold 40pt Arial", fill: "#000000", align: "center", stroke: "#ffffff", strokeThickness: 8};

        s = game.add.text(game.world.centerX, game.world.centerY, text, style);
        s.anchor.setTo(0.5, 0.5);
    };

    this.update = function() {
        s.angle += 1;
    };

    this.goRestart = function() {
        switch (gameState) {
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

    this.goMenu = function() {
        game.state.start('Menu');
    };
};

Game.End.prototype = new Game.Play();