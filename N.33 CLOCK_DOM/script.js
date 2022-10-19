'use strict';
//Разрешаем вводить определенные клавиши
document.querySelector('.myinput').addEventListener('keydown', function(event) {
	//Разрешаем: событие 'click' на enter
    if (event.keyCode == 13) { 
        document.querySelector('.mybutton').click();
    }
    // Разрешаем: backspace, delete, tab и escape
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
		// Разрешаем: Ctrl+A
		(event.keyCode == 65 && event.ctrlKey === true) ||
        // Разрешаем: Ctrl+C
        (event.keyCode == 67 && event.ctrlKey === true) ||
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
    let myClock = document.createElement('div'); //Создаем циферблат 
    let myInput = document.querySelector('.myinput');
    let myBox = document.querySelector('.wrapper');
    let myInputValue = myInput.value;
    myClock.style.width = myInputValue + 'px'; //Ширина циферблата 
    myClock.style.height = myInputValue + 'px'; //Высота циферблата
    let myRadius = myInputValue/2; //Радиус циферблата
    let myButton = document.querySelector('.mybutton');
    myClock.className = '_my-clock';
    document.body.appendChild(myClock);
    let myInputErr = document.querySelector('.err');
    
    //Проверка на правильность ввода значения
    if (myInputValue !== '' && myInputValue >= 200 && myInputValue <= 800) {
        myInputErr.innerHTML = '';
        myBox.style.display = 'none';
        createClockNum();
        createHourMinSec();
    } else {
        myClock.remove();
        myInput.focus();
        document.querySelector('.myinput').value = '';
        myInputErr.innerHTML = 'Введите значение от 200 до 800';
        myInputErr.style.color = 'red';
        myInputErr.style.marginLeft = '10px'
    } 
};

function createClockNum() {
    let myClock = document.querySelector('._my-clock');
    let myInput = document.querySelector('.myinput');
    let myInputValue = myInput.value;
    let myRadius = myInputValue/2;
    const centerX = myRadius;
    const centerY = myRadius;
    const myNumberDistance = myRadius * 0.8; //Расстояние от цента часов до цента круга с числом
    for (let i = 1; i <= 12; i++) {
        let clockNum = document.createElement('div');
        const clockNumSize = myRadius/4; //Размер круга с цифрой
        const clockNumFontSize = myRadius/7; //Размер шрифта цифры
        const clockHourAngle = Math.PI*2/12*i;
        const clockNumX = centerX + myNumberDistance*Math.sin(clockHourAngle);
        const clockNumY = centerY - myNumberDistance*Math.cos(clockHourAngle);
        clockNum.style.left = Math.round(clockNumX - clockNum.offsetWidth - clockNumSize/2) + 'px';
        clockNum.style.top = Math.round(clockNumY - clockNum.offsetHeight - clockNumSize/2) + 'px';
        clockNum.style.width = clockNumSize + 'px'; 
        clockNum.style.height = clockNumSize + 'px'; 
        let clockNumText = document.createTextNode(i); 
        clockNum.appendChild(clockNumText);
        clockNum.className = '_clock-numbers';   
        myClock.appendChild(clockNum);
        clockNum.style.fontSize = clockNumFontSize + 'px'; 
    }
};

function createHourMinSec() {
    let myClock = document.querySelector('._my-clock');
    let myInput = document.querySelector('.myinput');
    let myInputValue = myInput.value;
    let myRadius = myInputValue/2; // Радиус часов

    //Создаем div для стрелок
    let clockHourHand = document.createElement('div'); //Стрелка часов
    let clockMinHand = document.createElement('div'); //Стрелка минут
    let clockSecHand = document.createElement('div'); //Стрелка секунд
    let clockDateNumbers = document.createElement('div');//Время цифрами

    const centerX = myRadius; //Центр X 
    const centerY = myRadius; //Центр Y

    //Создаем часовую стрелку
    const hourHandWidth = myRadius / 20; //Ширина стрелки часов
    const hourHandHeight = myRadius * 0.6; //Длина стрелки часов
    clockHourHand.style.width = hourHandWidth + 'px';
    clockHourHand.style.height = hourHandHeight + 'px';
    clockHourHand.className = '_hour-hand';
    myClock.appendChild(clockHourHand);

    //Позиционируем часовую стрелку
    const hourX = clockHourHand.offsetWidth / 2; // Позиция стрелки часов по X
    const hourY = clockHourHand.offsetHeight * 0.9; // Позиция стрелки часов по Y
    clockHourHand.style.left = centerX - hourX + 'px';
    clockHourHand.style.top = centerY - hourY + 'px';

    //Создаем минутную стрелку
    const minHandWidth = myRadius / 40; //Ширина стрелки минут
    const minHandHeight = myRadius * 0.8; //Длина стрелки минут
    clockMinHand.style.width = minHandWidth + 'px';
    clockMinHand.style.height = minHandHeight + 'px';
    clockMinHand.className = '_minutes-hand';
    myClock.appendChild(clockMinHand);

    //Позиционируем минутную стрелку
    const minX = clockMinHand.offsetWidth / 2; // Позиция стрелки минут по X
    const minY = clockMinHand.offsetHeight * 0.9; // Позиция стрелки минут по Y
    clockMinHand.style.left = centerX - minX + 'px';
    clockMinHand.style.top = centerY - minY + 'px';

    //Создаем секундную стрелку
    const secHandWidth = myRadius / 80; //Ширина стрелки секунд
    const secHandHeight = myRadius * 0.8; //Длина стрелки секунд
    clockSecHand.style.width = secHandWidth + 'px';
    clockSecHand.style.height = secHandHeight + 'px';
    clockSecHand.className = '_second-hand';
    myClock.appendChild(clockSecHand);

    //Позиционируем секундную стрелку
    const secX = clockSecHand.offsetWidth / 2; //Позиция стрелки секунд по X
    const secY = clockSecHand.offsetHeight * 0.9; //Позиция стрелки секунд по Y
    clockSecHand.style.left = centerX - secX + 'px';
    clockSecHand.style.top = centerY - secY + 'px';

    //Создаем время в цифрах
    const dateWidth = 100; //Ширина времени в цифрах 
    const dateFontSize = myClock.offsetHeight / 10; //Размер шрифта времени в цифрах
    clockDateNumbers.style.width = dateWidth + '%';
    clockDateNumbers.style.fontSize = dateFontSize + 'px';
    clockDateNumbers.className = '_clock-date';
    myClock.appendChild(clockDateNumbers);

    //Позиционируем время в цифрах
    const dateX = clockDateNumbers.offsetWidth/2; //Позиция времени по X
    const dateY = centerY/2; //Позиция времение по Y
    clockDateNumbers.style.left = centerX - dateX + 'px';
    clockDateNumbers.style.top = dateY + 'px';

updateClock();
};

//Обновляем время
function updateClock() {
    const timeDate = new Date();
    console.log(timeDate);
    const hours = timeDate.getHours();
    const min = timeDate.getMinutes();
    const sec = timeDate.getSeconds();
    const ms = timeDate.getMilliseconds();

    const hoursAngle = Math.PI*2/12*(hours + min/60);
    const minAngle = Math.PI*2/60*(min + sec/60);
    const secAngle = Math.PI*2/60*sec;

    document.querySelector('._clock-date').innerHTML = timeDate.toLocaleTimeString();
    document.querySelector('._hour-hand').style.transform = 'rotate(' + hoursAngle +'rad)';
    document.querySelector('._minutes-hand').style.transform = 'rotate(' + minAngle +'rad)';
    document.querySelector('._second-hand').style.transform = 'rotate(' + secAngle +'rad)';
    
    setTimeout(updateClock, 1010 - ms);
};


