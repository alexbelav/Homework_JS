'use strict';

//Образуем разрешение на ввод в поле инпут
document.querySelector('.myinput').addEventListener('keydown', function(event) {
	//Разрешаем: событие 'click' на enter
    if (event.keyCode === 13) { 
        document.querySelector('.mybutton').click();
    }
    // Разрешаем: backspace, delete, tab и escape
	if ( event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 ||
		// Разрешаем: Ctrl+A
		(event.keyCode === 65 && event.ctrlKey === true) ||
        // Разрешаем: Ctrl+C
        (event.keyCode === 67 && event.ctrlKey === true) ||
		// Разрешаем: home, end, влево, вправо
		(event.keyCode >= 35 && event.keyCode <= 39)) {
		// Ничего не делаем
		return;
	} else {
		// Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
		if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
			event.preventDefault();
		}
	}
});

//Создаем часы
function createClock() {
    let myInputErr = document.querySelector('.err');
    let myInput = document.querySelector('.myinput');
    let myBox = document.querySelector('.wrapper');
    let myInputValue = myInput.value;

    let myCanvasBox = document.createElement('div');
    myCanvasBox.className = 'canvas-div';
    document.body.appendChild(myCanvasBox);

    let myCanvas = document.createElement('canvas'); //Создаем canvas
    myCanvas.id = 'clock';
    myCanvas.width = myInputValue;
    myCanvas.height = myInputValue;
    myCanvasBox.appendChild(myCanvas);


    //Проверка на корректность ввода значения
    if (myInputValue !== '' && myInputValue >= 200 && myInputValue <= 800) {
        myInputErr.innerHTML = '';
        myBox.style.display = 'none';
        createClockCanvas();
    } else {
        myCanvasBox.remove();
        myCanvas.remove();
        myInput.focus();
        document.querySelector('.myinput').value = '';
        myInputErr.innerHTML = 'Введите значение от 200 до 800';
        myInputErr.style.color = 'red';
        myInputErr.style.marginLeft = '10px'
    } 
};

//Создаем циферблат часов
function createClockCanvas() {
    let myCanvas = document.getElementById('clock');
    let myContext = myCanvas.getContext('2d');
    let myInput = document.querySelector('.myinput');
    let myInputValue = myInput.value;
    const myRadius = myInputValue/2; //Радиус
    const centerX = myRadius; //Центра по X
    const centerY = myRadius; //Цента по Y
    const myWidth = myInputValue; //Ширина фигуры
    const myHeight = myInputValue; //Высота фигуры

    let cirlceColor = 'rgb(210, 182, 55)'; //Цвет циферблата
    let circleNumColor = 'rgb(47, 114, 75)'; //Цвет кружка с цфирой
    let circleNumTextColor = 'rgb(0, 0, 0)'; //Цвет цифры в кружке
    let circleNumTextFontW = '400'; //Шрифт
    let circleNumTextFont = 'sans-serif'; //Шрифт

    //Закрашиваем canvas на всю его ширину и высотку
    myContext.fillStyle = 'rgb(255, 255, 255)';
    myContext.fillRect(0, 0, myWidth, myHeight);

    //Создаем циферблат часов
    myContext.beginPath(); //Запускаем новый путь
    myContext.fillStyle = cirlceColor; //Задаем цвет фигуре
    myContext.arc(centerX, centerY, myRadius, 0, Math.PI*2); //Рисуем дугу
    myContext.fill(); //Закрашиваем фигуру

    //Создаем цифры и кружки
    for (let i = 0; i <= 12; i++) {
        const myNumberDistance = myRadius * 0.8; //Расстояние от цента часов до цента круга с числом
        const clockNumSize = myRadius/8; //Размер круга с цифрой
        const clockNumFontSize = myRadius/7; //Размер шрифта цифры
        const clockNum = clockNumFontSize/2; //Половина размера шрифта цифры
        const clockHourAngle = Math.PI*2/12*i; //Угол расположения кружков
        const clockNumX = centerX + myNumberDistance*Math.sin(clockHourAngle); //Центр X
        const clockNumY = centerY - myNumberDistance*Math.cos(clockHourAngle); //Центр Y
        const clockNumTextX = clockNumX - clockNum/2; //Координаты чисел по X (1-9)
        const clockNumTextXX = clockNumX - clockNum/0.9 //Координаты чисел по X (10-12)
        const clockNumTextY = clockNumY + clockNum/1.5 //Координаты чисел по Y
        //Создаем кружки
        myContext.beginPath();
        myContext.fillStyle = circleNumColor;
        myContext.arc(clockNumX, clockNumY, clockNumSize, 0, Math.PI*2);
        myContext.fill();
        
        //Создаем цифры
        myContext.beginPath();
        myContext.fillStyle = circleNumTextColor;
        myContext.font = +circleNumTextFontW+ ' ' +clockNumFontSize+ 'px' + ' ' +circleNumTextFont;
        if (i <= 9) {
            myContext.fillText(i, clockNumTextX, clockNumTextY);
        } else {
            myContext.fillText(i, clockNumTextXX, clockNumTextY);
        }  
    }
    //Обновляем время
    const timeDate = new Date();
    console.log(timeDate);
    const hours = timeDate.getHours();
    const min = timeDate.getMinutes();
    const sec = timeDate.getSeconds();
    const ms = timeDate.getMilliseconds();

    const hoursAngle = hours/12*360 + min/60;
    const minAngle = min/60*360 + sec/60;
    const secAngle = sec/60*360;
    // const hoursAngle = (timeDate.getHours()%12)/12*360+timeDate.getMinutes()/60*30; //Угол часовой стрелки
    // const minAngle = 360/60*(min + sec/60); //Угол минутной стрелки
    // const secAngle = 360/60*sec; //Угол секундной стрелки

    const secHandHeight = myRadius * 0.7; //Длина стрелки секунд
    const minHandHeight = myRadius * 0.7; //Длина стрелки минут
    const hourHandHeight = myRadius * 0.6; //Длина стрелки часов

    const secHandWidth = myRadius / 80; //Ширина стрелки секунд
    const minHandWidth = myRadius / 40; //Ширина стрелки минут
    const hourHandWidth = myRadius / 20; //Ширина стрелки часов

    //Создаем стрелку часовую
    myContext.beginPath();
    myContext.lineWidth = hourHandWidth;
    myContext.lineCap = 'round';
    myContext.moveTo(centerX , centerY);
    myContext.lineTo((centerX) + hourHandHeight*Math.cos(Math.PI/2 - hoursAngle*(Math.PI/180)),
    (centerY) - hourHandHeight*Math.sin(Math.PI/2 - hoursAngle*(Math.PI/180)));
    myContext.stroke();
    myContext.closePath();

    //Создаем стрелку минутную
    myContext.beginPath();
    myContext.lineWidth = minHandWidth;
    myContext.lineCap = 'round';
    myContext.moveTo(centerX , centerY);
    myContext.lineTo((centerX) + minHandHeight*Math.cos(Math.PI/2 - minAngle*(Math.PI/180)),
    (centerY) - minHandHeight*Math.sin(Math.PI/2 - minAngle*(Math.PI/180)));
    myContext.stroke();
    myContext.closePath();

    //Создаем стрелку секундную
    myContext.beginPath();
    myContext.lineWidth = secHandWidth;
    myContext.lineCap = 'round';
    myContext.moveTo(centerX , centerY);
    myContext.lineTo((centerX) + secHandHeight*Math.cos(Math.PI/2 - secAngle*(Math.PI/180)),
    (centerY) - secHandHeight*Math.sin(Math.PI/2 - secAngle*(Math.PI/180)));
    myContext.stroke();
    myContext.closePath();

    setTimeout(createClockCanvas, 1010 - ms);
};




