var Game_Over = {

    preload: function ()
    {
       
        game.load.image('gameover', './assets/images/gameover.png');
    },

    create: function ()
    {

        this.add.button(0, 0, 'gameover', this.startGame, this);

        game.add.text(280, 350, "LAST SCORE", { font: "bold 25px sans-serif", fill: "#191970", align: "center" });
        game.add.text(480, 350, score.toString(), { font: "bold 24px sans-serif", fill: "#fff", align: "center" });
    },

    startGame: function ()
    {
       
        this.state.start('Game');
    }
};
