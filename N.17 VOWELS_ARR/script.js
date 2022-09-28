"use strict"


let strValue = prompt('Введите слово:');

//ForEach
function forEachVolwels(str) {
    const VOLWELS_LTRS = ['а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 
					'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э',
					'Э', 'ю', 'Ю', 'я', 'Я'];
    let count = 0;
    let letters = [...str];

    letters.forEach(letter => {
        if(VOLWELS_LTRS.includes(letter)) {
            count++
        }
    });
    return count;
};
console.log(forEachVolwels(strValue));


//Filter
function filterVolwels(str) {
    const VOLWELS_LTRS = ['а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 
                        'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э',
                        'Э', 'ю', 'Ю', 'я', 'Я'];
    let elements = [...str];
    let count = elements.filter(element => VOLWELS_LTRS.includes(element)).length;
    return count;
};
console.log(filterVolwels(strValue));


//Reduce
function reduceVolwels(str) {
    const VOLWELS_LTRS = ['а', 'А', 'е', 'Е', 'ё', 'Ё', 'и', 
                        'И', 'о', 'О', 'у', 'У', 'ы', 'Ы', 'э',
                        'Э', 'ю', 'Ю', 'я', 'Я'];
    let letters = [...str];
    let count = letters.reduce((total, letter) => VOLWELS_LTRS.includes(letter) ? total + 1 : total, 0);
    return count;
};
console.log(reduceVolwels(strValue));
