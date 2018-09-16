
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');


game.state.add('Menu', Menu);


game.state.add('Game', Game);

game.state.start('Menu');

game.state.add('Game_Over', Game_Over);