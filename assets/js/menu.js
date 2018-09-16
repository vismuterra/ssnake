var Menu =
    {
        preload: function ()
        {
           //изображение менюшки - он же спрат дял дальнейшей игры
            game.load.image('menu', './assets/images/menu.png');
        },

        create: function ()
        {
            
            this.add.button(0, 0, 'menu', this.startGame, this);
        },

        startGame: function ()
        {
            this.state.start('Game');
        }
    };