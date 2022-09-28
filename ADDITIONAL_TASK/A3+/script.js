//Спрашиваем у пользователя строку.
let prStr = prompt('Введите палиндром:');
//Функция, проверяющая, что переданная ей фраза является палиндромом.
function palindrom(str) {
    //Символы пунктуации RegExp.
    let symbols = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~\s]/g;
    //Приводим значение строки в нижний регистр; производим замены: все символы на пустое значение, ё на е, ъ на ь.
    let myString = str.toLowerCase().replace(symbols, '').replace(/[ё]/g, 'е').replace(/[ъ]/g, 'ь');
    //Первый символ строки.
    let firstSymbol = 0;
    //Последний символ строки.
    let lastSymbol = myString.length - 1;
    //Выполняем цикл.
    while (firstSymbol < lastSymbol)
    //Условие. Сравниваем первый и последний символы и возвращаем true. (Это палиндром).
        if (myString.charAt(firstSymbol++) !== myString.charAt(lastSymbol--)) {
            return false;
        }
    return true;
};
//Вызов функции.
alert(palindrom(prStr));
