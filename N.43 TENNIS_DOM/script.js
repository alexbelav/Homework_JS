'use strict'

const WIDTH_GAME = 800; //Ширина игрового поля
const HEIGHT_GAME = 500; //Высота игрового поля

const WIDTH_BALL = 30; //Ширина мячика
const HEIGHT_BALL = 30; //Высота мячика

const WIDTH_BRACKET = 15; //Ширина ракетки
const HEIGHT_BRACKET = 120; //Высота ракетки

//Игровое поле
let gameField = document.createElement('div');
gameField.className = 'game';
document.body.appendChild(gameField);

let gameH = {
    width: WIDTH_GAME,
    height: HEIGHT_GAME,

    update: function() {
        let gameH = document.querySelector('.game');
        gameH.style.width = this.width + 'px';
        gameH.style.height = this.height + 'px';
    },
};

//Мяч
let gameBall = document.createElement('div');
gameBall.className = 'ball';
gameField.appendChild(gameBall);

let ballH = {
    width: WIDTH_BALL,
    height: HEIGHT_BALL,
    posX: WIDTH_GAME/2 - WIDTH_BALL/2,
    posY: HEIGHT_GAME/2 - HEIGHT_BALL/2,
    speedX: 0,
    speedY: 0,

    update: function() {
        let ballH = document.querySelector('.ball');
        ballH.style.left = this.posX + 'px';
        ballH.style.top = this.posY + 'px';
        ballH.style.width = this.width + 'px';
        ballH.style.height = this.height + 'px';
    },

    updateRun: function() {
        this.posX = WIDTH_GAME/2 - WIDTH_BALL/2;
        this.posY = HEIGHT_GAME/2 - HEIGHT_BALL/2;
        this.speedX = 4;
        this.speedY = -4;
    },
};

//Игрок №1
let gamePlayer1 = document.createElement('div');
gamePlayer1.className = 'player1';
gameField.appendChild(gamePlayer1);

let player1H = {
    width: WIDTH_BRACKET,
    height: HEIGHT_BRACKET,
    posX: 0,
    posY: HEIGHT_GAME/2 - HEIGHT_BRACKET/2,
    speedY: 0,
    score: 0,

    update: function() {
        let player1H = document.querySelector('.player1');
        player1H.style.left = this.posX + 'px';
        player1H.style.top = this.posY + 'px';
        player1H.style.width = this.width + 'px';
        player1H.style.height = this.height + 'px';
    },

    updateScore: function() {
        let upScore = document.querySelector('.score-1');
        upScore.innerHTML = this.score;
    },
};

//Игрок №2
let gamePlayer2 = document.createElement('div');
gamePlayer2.className = 'player2';
gameField.appendChild(gamePlayer2);

let player2H = {
    width: WIDTH_BRACKET,
    height: HEIGHT_BRACKET,
    posX: WIDTH_GAME - WIDTH_BRACKET,
    posY: HEIGHT_GAME/2 - HEIGHT_BRACKET/2,
    speedY: 0,
    score: 0,

    update: function() {
        let player2H = document.querySelector('.player2');
        player2H.style.left = this.posX + 'px';
        player2H.style.top = this.posY + 'px';
        player2H.style.width = this.width + 'px';
        player2H.style.height = this.height + 'px';
    },

    updateScore: function() {
        let upScore = document.querySelector('.score-2');
        upScore.innerHTML = this.score;
    },
};

//Состояние игрового процесса, где
let gameStatus = 0; 
// 0 - игра только открыта
// 1 - игра идет, мяч летает
// 2 - зафиксирован гол, мяч застыл у стены

//Запускаем мяч
function startGame() { 
    if (gameStatus === 0 || gameStatus === 2) {
        ballH.updateRun()
        player2H.posY = HEIGHT_GAME/2 - HEIGHT_BRACKET/2;
        player2H.posX = WIDTH_GAME - WIDTH_BRACKET;
        player1H.posY = HEIGHT_GAME/2 - HEIGHT_BRACKET/2;
        player1H.posX = 0;
        gameStatus = 1;
    }
};

//Запускаем игру
function tick() {

    //Движение мячика
    ballH.posX += ballH.speedX;
    ballH.posY += ballH.speedY;

    //Движение игроков
    player1H.posY += player1H.speedY;
    player2H.posY += player2H.speedY;

    //Если ракета первого игрока выше стены
    if (player1H.posY <= 0) {
        player1H.posY = 0;
    }
    //Если ракета второго игрока выше стены
    if (player2H.posY <= 0) {
        player2H.posY = 0;
    }

    //Если ракетка первого игрока ниже стены
        //Если сумма координаты ракетки по оси Y и высоты ракетки больше самой высоты игрового поля
    if (player1H.posY + player1H.height > gameH.height) {
        //То положение ракетки равно высоте поля с вычетом высоты самой ракетки (упрется в пол)
        player1H.posY = gameH.height - player1H.height;
    }

    //Если ракетка второго игрока ниже стены
    if (player2H.posY + player2H.height > gameH.height) {
        player2H.posY = gameH.height - player2H.height;
    }

    //Если мяч правее стены
        //Если сумма координаты мяча по оси X и ширины мяча больше самой ширины игрового поля
    if (ballH.posX + ballH.width > gameH.width) {
        //Останавливаем движение мяча
        ballH.speedX = 0; 
        ballH.speedY = 0;
        //Позиционируем мяч в упор к правой стенке
        ballH.posX = gameH.width - ballH.width;
        //Прибавляем одно очко игроку 1
        player1H.score++;
        gameStatus = 2;
        player1H.updateScore();
    }

    //Если мяч левее стены
        //Если позиция мяча меньше нуля
    if (ballH.posX < 0) {
        //Останавливаем движение мяча
        ballH.speedX = 0;
        ballH.speedY = 0;
        //Позиционируем мяч в упор к леовй стенке
        ballH.posX = 0;
        //Прибавляем одно очко игроку 2
        player2H.score++;
        gameStatus = 2;
        player2H.updateScore(); 
    }

    //Если мяч ударился о ракетку первого игрока
        //Если координата мяча по X меньше суммы координаты ракетки по X и ширины ракетки
    if (ballH.posX <= player1H.posX + player1H.width) {
        //Если сумма координаты мяча по Y и высота мяча больше координаты ракетки по Y
        //И координата мяча по Y меньше суммы координаты ракетки по Y и высоты ракетки
        if (ballH.posY + ballH.height > player1H.posY && ballH.posY < player1H.posY + player1H.height) {
            //Присваиваем отрицательную скорость мячу
            ballH.speedX =- ballH.speedX
        }
    }

    //Если мяч ударился о ракетку левого игрока
        //Если сумма координаты мяча по оси X и ширины мяча больше координаты ракетки по оси X
        //И координата мяча по оси X меньше суммы координаты ракетки по оси X и ширины ракетки
    if (ballH.posX + ballH.width > player2H.posX && ballH.posX < player2H.posX + player2H.width) {
        //Если координата мяча по оси Y больше координаты ракетки по оси Y
        //И координата мяча по оси Y меньше суммы координаты ракетки по оси Y и высоты ракетки
        if (ballH.posY > player2H.posY && ballH.posY < player2H.posY + player2H.height) {
            //Присваиваем отрицательную скорость мячу
            ballH.speedX =- ballH.speedX;
        }
    }

    //Если мяч ниже пола
        //Если сумма координаты мяча по оси Y и высоты мяча больше высоты игрового поля
    if (ballH.posY + ballH.height > gameH.height) {
        //Присваиваем мячу отрицательную скорость по оси Y (отбиваем мяч от нижнего пола)
        ballH.speedY =- ballH.speedY;
        //Прижимаем мяч к полу
        ballH.posY = gameH.height - ballH.height;
    }

    //Если мяч выше пола
        //Если координата мяча по оси Y меньше нуля
    if (ballH.posY < 0) {
        //Присваиваем мячу отрицательную скорость по оси Y (отбиваем мяч от верхнего пола)
        ballH.speedY =- ballH.speedY;
        //Прижимаем мяч к полу
        ballH.posY = 0;
    }

    //Движение ракеток при нажатии
    if (gameStatus === 1) {
        document.onkeydown = function(event) {
            //Shift - ввер
            if (event.keyCode === 16) {
                player1H.speedY = -10;
            }
            //Ctrl - вниз 
            if (event.keyCode === 17) {
                player1H.speedY = 10;
            }
            //PgUp - вверх
            if (event.keyCode === 38) {
                player2H.speedY = -10;
            }
            //PgDn - вниз
            if (event.keyCode === 40) {
                player2H.speedY = 10;
            }
        } 
    } else {
        gameStatus = 2;
        document.onkeydown = null;
    }
    
        //Обнуляем движение ракеток
        document.onkeyup = function(event) {
            if (event.keyCode === 16 || event.keyCode === 17) {
                player1H.speedY = 0;
            }
            if (event.keyCode === 38 || event.keyCode === 40) {
                player2H.speedY = 0;
            }
        };

    requestAnimationFrame(tick);
    ballH.update();
    player1H.update();
    player2H.update();
    
};

//Выстраиваем игровое поле
tick();
gameH.update();

