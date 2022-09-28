"use strict"

//Фамилия
var lastName = prompt('Ваша Фамилия: ');
while (lastName === null || lastName === '' || Number(lastName)) {
	lastName = prompt('Введите Фамилию Правильно: ');
};
//Имя 
var firstName = prompt('Ваше Имя: ');
while (firstName === null || firstName === '' || Number(firstName)) {
	firstName = prompt('Введите Имя Правильно: ');
};
//Отчество
var surName = prompt('Ваше Отчество: ');
while (surName === null || surName === '' || Number(surName)) {
	surName = prompt('Введите Отчество Правильно: ');
};
//ФИО
var userInfo = (`Ваше ФИО: ${lastName} ${firstName} ${surName}`);

//Возрат

do {
	var ageStr = prompt('Введите ваш возраст:');
	var age = Number(ageStr);
} while (isNaN(age) || ageStr === null || ageStr === '');

//Возраст в годах
var ageYears = (`Ваш возраст в годах:  ${age}`);
//Возраст в днях
var ageDays = (`Ваш возраст в днях: ${age*360}`);
//Возраст через 5 лет
var ageAfter = (`Через 5 лет Вам будет: ${age+5}`);

//Пенсия
var pension = ('Вы на пенсии:');
var pensionYes = (pension + ' Да');
var pensionNo = (pension + ' Нет');

//Гендер
var gender = confirm('Ваш пол - мужской? Если да, то нажмите "OK", если нет - нажмите "ОТМЕНА"');
var genderYX = ('Ваш пол: ');
var genderM = (genderYX + 'Мужской');
var genderF = (genderYX + 'Женский');
var genderMen = age>=60?pensionYes:pensionNo;
var genderFem = age>=55?pensionYes:pensionNo;
var genderMax = gender?genderM:genderF;
var genderMenFem = gender?genderMen:genderFem;

alert(`${userInfo}
	   ${ageYears}
	   ${ageDays}
	   ${ageAfter}
	   ${genderMax}
	   ${genderMenFem}`);
