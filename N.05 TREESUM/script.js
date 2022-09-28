"use strict"
//Многоуровневый массив
const treeSum = [ 5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8];

//Функция возврата суммы элементов массива
function arraySum(arr) {
	let sum = 0;
	//Перебираем массив
	for (let i = 0; i < arr.length; i++) {
		//Если элемент - массив, вызываем для него функцию, которая получит его сумму
	  	if (typeof arr[i] == 'object')
			//Присваеваем значение к общей сумме элементов массива
			sum += arraySum(arr[i]);
		//Иначе это примитивный тип - число
	  	else
			//Тогда присваеваем его к общей сумме элементов массива
			sum += arr[i];
	};
	//Возвращаем сумму элементов массива
	return sum;
};
//Выводим в консоль функцию
console.log(arraySum(treeSum));




//Метод Reduce (1)
//Function Expression (arrSum(array))
const arrSum = array =>
	//array.reduce(callback[, initialValue])
	//Значение sum - передает последовательно сумму значений из одного колбэка в другой
	//Значение num - передает каждое последующее значение массива 
	//Если num является массивом, то вызываем функцию, иначе присваеваем значение элемента.
    array.reduce((sum, num) => sum += (Array.isArray(num) ? arrSum(num) : num),0);
	//Выводим в консоль функцию
console.log(arrSum(treeSum));



//Метод Reduce (2)
//Function Declaration
function arrSumReduce(arrr) {
	//Возвращаем сумму массива
	//Если это НЕ массив, тогда присваеваем значение элемента в sum, иначе вызываем функцию.
	return arrr.reduce((sum, num) => sum += (typeof num !== 'object' ? num : arrSumReduce(num)), 0);
};
//Выводим в консоль функцию
console.log(arrSumReduce(treeSum));
