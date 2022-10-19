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
    let myInputErr = document.querySelector('.err');
    let myInputValue = myInput.value;
    myClock.style.width = myInputValue + 'px'; //Ширина циферблата 
    myClock.style.height = myInputValue + 'px'; //Высота циферблата
    let myClockSvgWH = myInputValue + 'px';
    let myRadius = myInputValue/2; //Радиус циферблата
    let myButton = document.querySelector('.mybutton');
    myClock.className = '_my-clock';
    document.body.appendChild(myClock);
    
    let clockSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    clockSvg.setAttribute('width', myInputValue);
    clockSvg.setAttribute('height', myInputValue);
    clockSvg.id = 'my-clock';
    myClock.appendChild(clockSvg);
    
    
    //Проверка на правильность ввода значения
    if (myInputValue !== '' && myInputValue >= 200 && myInputValue <= 800) {
        myInputErr.innerHTML = '';
        myBox.style.display = 'none';
        createClockSvg();
        // createHourMinSec();
    } else {
        myClock.remove();
        myInput.focus();
        document.querySelector('.myinput').value = '';
        myInputErr.innerHTML = 'Введите значение от 200 до 800';
        myInputErr.style.color = 'red';
        myInputErr.style.marginLeft = '10px'
    } 
};
//Создаем циферблат часов
function createClockSvg() {
    let myInput = document.querySelector('.myinput');
    let myClockSvg = document.getElementById('my-clock');
    let myInputValue = myInput.value;
    const myRadius = myInputValue/2;
    const centerX = myRadius;
    const centerY = myRadius;

    //Создаем круг циферблата
    let circleSvg = document.createElementNS('http://www.w3.org/2000/svg','circle');
    let circleSvgColor = 'rgb(210, 182, 55)';
    circleSvg.setAttribute('fill', circleSvgColor);
    circleSvg.setAttribute('cx', centerX);
    circleSvg.setAttribute('cy', centerY);
    circleSvg.setAttribute('r', myRadius);
    myClockSvg.appendChild(circleSvg);

    //Создаем цифры 
    for (let i = 1; i <=12; i++) {
        let clockNumberGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
        clockNumberGroup.setAttribute('class', 'num-group');
        myClockSvg.appendChild(clockNumberGroup);

        let clockNumber = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const myNumberDistance = myRadius * 0.8; //Расстояние от цента часов до цента круга с числом
        const clockNumSize = myRadius/8; //Размер круга с цифрой
        const clockNumFontSize = myRadius/7; //Размер шрифта цифры
        const clockHourAngle = Math.PI*2/12*i;
        const clockNumX = centerX + myNumberDistance*Math.sin(clockHourAngle);
        const clockNumY = centerY - myNumberDistance*Math.cos(clockHourAngle);
        let clockNumberColor = 'rgb(47, 114, 75)'
        clockNumber.setAttribute('fill', clockNumberColor);
        clockNumber.setAttribute('cx', clockNumX);
        clockNumber.setAttribute('cy', clockNumY);
        clockNumber.setAttribute('r', clockNumSize);
        clockNumberGroup.appendChild(clockNumber);

        let clockNumberText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        clockNumberText.setAttribute('x', clockNumX);
        clockNumberText.setAttribute('y', clockNumY + clockNumSize/2.5);
        clockNumberText.setAttribute('text-anchor', 'middle');
        clockNumberText.setAttribute('font-size', clockNumFontSize);
        clockNumberText.textContent = [i];
        clockNumberGroup.appendChild(clockNumberText);
    }

    //Создаем часовую стрелку
    let clockHourHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const hourHandWidth = myRadius / 20; //Ширина стрелки часов
    const hourHandHeight = myRadius * 0.8/2; //Длина стрелки часов
    const hourHandCenter = centerY/0.95; //Центр вращение стрелки часов
    clockHourHand.setAttribute('stroke', 'black');
    clockHourHand.setAttribute('stroke-width', hourHandWidth);
    clockHourHand.setAttribute('stroke-linecap', 'round');
    clockHourHand.setAttribute('x1', centerX);
    clockHourHand.setAttribute('y1', hourHandHeight);
    clockHourHand.setAttribute('x2', centerX);
    clockHourHand.setAttribute('y2', hourHandCenter);
    clockHourHand.id = '_hour-hand';
    myClockSvg.appendChild(clockHourHand);

    //Создаем минутную стрелку 
    let clockMinHand = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    const minHandWidth = myRadius / 40; //Ширина стрелки минут
    const minHandHeight = myRadius * 0.6/2; //Длина стрелки минут
    const minHandCenter = centerY/0.95; //Центр вращение стрелки минут
    clockMinHand.setAttribute('stroke', 'black');
    clockMinHand.setAttribute('stroke-width', minHandWidth);
    clockMinHand.setAttribute('stroke-linecap', 'round');
    clockMinHand.setAttribute('x1', centerX);
    clockMinHand.setAttribute('y1', minHandHeight);
    clockMinHand.setAttribute('x2', centerX);
    clockMinHand.setAttribute('y2', minHandCenter);
    clockMinHand.id = '_minutes-hand';
    myClockSvg.appendChild(clockMinHand);

    //Создаем секундную стрелку
    let clockSecHand = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    const secHandWidth = myRadius / 80; //Ширина стрелки секунд
    const secHandHeight = myRadius * 0.6/2; //Длина стрелки секунд
    const secHandCenter = centerY/0.95; //Центр вращение стрелки секунд
    clockSecHand.setAttribute('stroke', 'black');
    clockSecHand.setAttribute('stroke-width', secHandWidth);
    clockSecHand.setAttribute('stroke-linecap', 'round');
    clockSecHand.setAttribute('x1', centerX);
    clockSecHand.setAttribute('y1', secHandHeight);
    clockSecHand.setAttribute('x2', centerX);
    clockSecHand.setAttribute('y2', secHandCenter);
    clockSecHand.id = '_second-hand';
    myClockSvg.appendChild(clockSecHand);

    //Создаем время в цифрах
    let clockDate = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const dateCenter = centerY/1.5; //Ширина времени в цифрах 
    const dateFontSize = myRadius / 6; //Размер шрифта времени в цифрах
    clockDate.setAttribute('x', centerX);
    clockDate.setAttribute('y', dateCenter);
    clockDate.setAttribute('text-anchor', 'middle');
    clockDate.setAttribute('font-size', dateFontSize);
    clockDate.id = '_clock-date';
    myClockSvg.appendChild(clockDate);

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

    const hoursAngle = 360/12*(hours + min/60);
    const minAngle = 360/60*(min + sec/60);
    const secAngle = 360/60*sec;

    let myClockSvg = document.getElementById('my-clock');
    let clockX = myClockSvg.getAttribute('width')/2;
    let clockY = myClockSvg.getAttribute('height')/2;
    
    document.getElementById('_clock-date').textContent = timeDate.toLocaleTimeString();
    document.getElementById('_hour-hand').setAttribute('transform', 'rotate('+hoursAngle+' '+clockX+' '+clockY+')');
    document.getElementById('_minutes-hand').setAttribute('transform', 'rotate('+minAngle+' '+clockX+' '+clockY+')');
    document.getElementById('_second-hand').setAttribute('transform', 'rotate('+secAngle+' '+clockX+' '+clockY+')')
    
    setTimeout(updateClock, 1010 - ms);
};
