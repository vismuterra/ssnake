
var Game = {

    preload: function ()
    {
        //необходимые для игр изображения змейки и яблока
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
          
    },

    create: function ()
    {
        //здесь делаем инициализацию глобальных переменных snake/apple для того чтобы потом функция update могла к ним обратиться
        snake = [];                     
        apple = {};                     
        squareSize = 15;     //длина частей змейки, в данном примере она 15*15       
        score = 0;                      
        speed = 0;                      
        updateDelay = 0;           //переменная для контроля обновлений     
        direction = 'right';        //начальное направление змейки    
        new_direction = null;       //смена направления   
        addNew = false;                //переменная для съеденной еды 

        
        cursors = game.input.keyboard.createCursorKeys();//управление за счет клавиш со стрелками

        game.stage.backgroundColor = '#708090'; //bg игры
//начальное количество элементов змейки 7, на позиции Х=150 Y=150
//увеличение X за каждую итерацию
        for (var i = 0; i < 7; i++) 
        {
            snake[i] = game.add.sprite(300 + i * squareSize, 300, 'snake'); 
        }

        //создаем первое яблоко
        this.generateApple();

        //текст в верхней части игры
        textStyle_Key = { font: "bold 25px sans-serif", fill: "#191970", align: "center" };
        textStyle_Value = { font: "bold 24px sans-serif", fill: "#fff", align: "center" };
        // очки
        game.add.text(50, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(150, 20, score.toString(), textStyle_Value);
        // хаста
        game.add.text(500, 20, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(600, 20, speed.toString(), textStyle_Value);
    },

    update: function ()
    {
        //обработка нажатия клавиш стрелок

        if (cursors.right.isDown && direction != 'left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction != 'right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction != 'down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction != 'up')
        {
            new_direction = 'down';
        }

        //скорость базируется на очках игры(макс. 10)
        speed = Math.min(10, Math.floor(score / 5));
        //обновление отображения скорости на экране
        speedTextValue.text = '' + speed;

       //уменьшаем частоту вызова функции update
       //счетчик увеличивается за каждый взов update

        updateDelay++;

        
        if (updateDelay % (10 - speed) == 0)
        {
            
//управление
            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            
            if (new_direction)
            {
                direction = new_direction;
                new_direction = null;
            }

            
            if (direction == 'right')
            {
                lastCell.x = firstCell.x + 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'left')
            {
                lastCell.x = firstCell.x - 15;
                lastCell.y = firstCell.y;
            }
            else if (direction == 'up')
            {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 15;
            }
            else if (direction == 'down')
            {
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 15;
            }

           
            snake.push(lastCell);
            firstCell = lastCell;

            
            if (addNew)
            {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
                addNew = false;
            }

  
            this.appleCollision();

           
            this.selfCollision(firstCell);

          
            this.wallCollision(firstCell);
        }
    },

    generateApple: function ()
    {
        //выбираем случайное место генерации яблока на игровом поле
        var randomX = Math.floor(Math.random() * 38) * squareSize;
        var randomY = Math.floor(Math.random() * 35) * squareSize;

        //добавляем новое яблоко после съеденного
        apple = game.add.sprite(randomX, randomY, 'apple');
    },
//съедено ли яблоко?
    appleCollision: function ()
    {
       
        for (var i = 0; i < snake.length; i++)
        {
            if (snake[i].x == apple.x && snake[i].y == apple.y)
            {
               
                addNew = true;

                
                apple.destroy();

                this.generateApple();

                
                score++;

                scoreTextValue.text = score.toString();
            }
        }

    },
//проверка на столкновение змейк самой с собой
    selfCollision: function (head)
    {
      
        for (var i = 0; i < snake.length - 1; i++)
        {
            if (head.x == snake[i].x && head.y == snake[i].y)
            {
            
                game.state.start('Game_Over');
            }
        }

    },
//со стеной
    wallCollision: function (head)
    {
       
        if (head.x >= 800 || head.x < 0 || head.y >= 600 || head.y < 0)
        {
            
            game.state.start('Game_Over');
        }
    }
};
