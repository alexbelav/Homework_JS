'use strict'

//Спрашиваем у пользователя строку.
let prStr = prompt('Введите палиндром:');
//Функция, проверяющая, что переданная ей фраза является палиндромом.
function isPalindrom(str) {
    //Символы пунктуации RegExp.
    let symbols = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~\s/ьъ]/g;
    //Приводим значение строки в нижний регистр; производим замены: все символы на пустое значение, ё на е, ъ на ь.
    let myString = str.toLowerCase().replace(symbols, '').replace(/[ё]/g, 'е');
    function myPalindrome(myString) {
        if (myString.length <= 1) return true;
        let firstSymbol = myString.charAt(0);
        let lastSymbol = myString.charAt(myString.length - 1);
        if (myString.length === 2) {
            if (firstSymbol === lastSymbol) return true;
                return false;
        }
        if (firstSymbol === lastSymbol) {
            return myPalindrome(myString.substring(1, myString.length - 1))
        } else {
            return false;
        }
    };
    return myPalindrome(myString);
};
//Вызов функции.
alert(isPalindrom(prStr));
