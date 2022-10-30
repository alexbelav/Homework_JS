'use strict'

const WIDTH_GAME = 800; //Ширина игрового поля
const HEIGHT_GAME = 500; //Высота игрового поля

const WIDTH_BALL = 30; //Ширина мячика
const HEIGHT_BALL = 30; //Высота мячика
const RADIUS_BALL = WIDTH_BALL/2; //Центр мячика

const WIDTH_BRACKET = 15; //Ширина ракетки
const HEIGHT_BRACKET = 120; //Высота ракетки

//Создаем canvas
let myCanvas = document.createElement('canvas');
myCanvas.width = WIDTH_GAME;
myCanvas.height = HEIGHT_GAME;
myCanvas.id = 'my-canvas';
document.body.appendChild(myCanvas);
let ctx = myCanvas.getContext('2d');

//Очищаем игровое поле
function clearCanvas() {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, myWidth, myHeight);
};

//Игровое поле
let gameH = {
    width: WIDTH_GAME,
    height: HEIGHT_GAME,
    line: 1,
    color: 'rgba(255, 215, 0, 1)',

    update: function() {
        ctx.beginPath();
        ctx.rect(0, 0, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.lineWidth = this.line;
        ctx.fill();
        ctx.stroke();
    },
};


//Мяч
let ballH = {
    posX: WIDTH_GAME/2 - WIDTH_BALL/2,
    posY: HEIGHT_GAME/2 - HEIGHT_BALL/2,
    speedX: 0,
    speedY: 0,
    radius: RADIUS_BALL,
    color: 'rgba(255, 69, 0, 1)',

    update: function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
        ctx.fill();
    },

    updateRun: function() {
        this.posX = WIDTH_GAME/2 - WIDTH_BALL/2;
        this.posY = HEIGHT_GAME/2 - HEIGHT_BALL/2;
        this.speedX = 4;
        this.speedY = -4;
    },

};

//Игрок №1
let player1H = {
    width: WIDTH_BRACKET,
    height: HEIGHT_BRACKET,
    posX: 0,
    posY: HEIGHT_GAME/2 - HEIGHT_BRACKET/2,
    color: 'rgba(0, 100, 0, 1)',
    speedY: 0,
    score: 0,

    update: function() {
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
    },

    updateScore: function() {
        let upScore = document.querySelector('.score-1');
        upScore.innerHTML = this.score;
    },
};

//Игрок №2
let player2H = {
    width: WIDTH_BRACKET,
    height: HEIGHT_BRACKET,
    posX: WIDTH_GAME - WIDTH_BRACKET,
    posY: HEIGHT_GAME/2 - HEIGHT_BRACKET/2,
    color: 'rgba(0, 0, 205, 1)',
    speedY: 0,
    score: 0,

    update: function() {
        ctx.beginPath();
        ctx.rect(this.posX, this.posY, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
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

function startPlay() {
    //Движение ракеток при нажатии
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
    //Обнуляем движение ракеток
    document.onkeyup = function(event) {
        if (event.keyCode === 16 || event.keyCode === 17) {
            player1H.speedY = 0;
        }
        if (event.keyCode === 38 || event.keyCode === 40) {
            player2H.speedY = 0;
        }
    };
};

//Запускаем мяч
function startGame() { 
    if (gameStatus === 0 || gameStatus === 2) {
        ballH.updateRun();
        player2H.posY = HEIGHT_GAME/2 - HEIGHT_BRACKET/2;
        player2H.posX = WIDTH_GAME - WIDTH_BRACKET;
        player1H.posY = HEIGHT_GAME/2 - HEIGHT_BRACKET/2;
        player1H.posX = 0;
        gameStatus = 1;
        startPlay();
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
    if (ballH.posX + ballH.radius > gameH.width) {
        //Останавливаем движение мяча
        ballH.speedX = 0; 
        ballH.speedY = 0;
        //Позиционируем мяч в упор к правой стенке
        ballH.posX = gameH.width - ballH.radius;
        //Прибавляем одно очко игроку 1
        player1H.score++;
        gameStatus = 2;
        document.onkeydown = null;
        player1H.updateScore();
    }

    //Если мяч левее стены
        //Если позиция мяча меньше нуля
    if (ballH.posX - ballH.radius < 0) {
        //Останавливаем движение мяча
        ballH.speedX = 0;
        ballH.speedY = 0;
        //Позиционируем мяч в упор к леовй стенке
        ballH.posX = 0 + ballH.radius;
        //Прибавляем одно очко игроку 2
        player2H.score++;
        gameStatus = 2;
        document.onkeydown = null;
        player2H.updateScore(); 
    }

    //Если мяч ударился о ракетку первого игрока
        //Если координата мяча по X меньше суммы координаты ракетки по X и ширины ракетки
    if (ballH.posX - ballH.radius <= player1H.posX + player1H.width) {
        //Если сумма координаты мяча по Y и высота мяча больше координаты ракетки по Y
        //И координата мяча по Y меньше суммы координаты ракетки по Y и высоты ракетки
        if (ballH.posY + ballH.radius > player1H.posY && ballH.posY - ballH.radius < player1H.posY + player1H.height) {
            //Присваиваем отрицательную скорость мячу
            ballH.speedX =- ballH.speedX
        }
    }

    //Если мяч ударился о ракетку левого игрока
        //Если сумма координаты мяча по оси X и ширины мяча больше координаты ракетки по оси X
        //И координата мяча по оси X меньше суммы координаты ракетки по оси X и ширины ракетки
    if (ballH.posX + ballH.radius > player2H.posX && ballH.posX < player2H.posX + player2H.width) {
        //Если координата мяча по оси Y больше координаты ракетки по оси Y
        //И координата мяча по оси Y меньше суммы координаты ракетки по оси Y и высоты ракетки
        if (ballH.posY > player2H.posY && ballH.posY < player2H.posY + player2H.height) {
            //Присваиваем отрицательную скорость мячу
            ballH.speedX =- ballH.speedX;
        }
    }

    //Если мяч ниже пола
        //Если сумма координаты мяча по оси Y и высоты мяча больше высоты игрового поля
    if (ballH.posY + ballH.radius > gameH.height) {
        //Присваиваем мячу отрицательную скорость по оси Y (отбиваем мяч от нижнего пола)
        ballH.speedY =- ballH.speedY;
        //Прижимаем мяч к полу
        ballH.posY = gameH.height - ballH.radius;
    }

    //Если мяч выше пола
        //Если координата мяча по оси Y меньше нуля
    if (ballH.posY - ballH.radius < 0) {
        //Присваиваем мячу отрицательную скорость по оси Y (отбиваем мяч от верхнего пола)
        ballH.speedY =- ballH.speedY;
        //Прижимаем мяч к полу
        ballH.posY = 0 + ballH.radius;
    }

    gameH.update();
    ballH.update();
    player1H.update();
    player2H.update();
    requestAnimationFrame(tick);
};

//Выстраиваем игровое поле
tick();

