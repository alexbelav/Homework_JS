"use strict"

//Prompt
let myString = prompt('Введите Ваш город:');
//PureFunction
function pureStr(myStr) {
	let firstSymbol = 0;
	let lastSymbol = myStr.length - 1;
	let whiteSpaces = 'space';
	let word = 'word';
    let empty = '';
	for (let i = firstSymbol; i <= lastSymbol; i++) {
		if (myStr[i] === ' ') {
			firstSymbol++
		} else break
	};
    if (myStr.length === firstSymbol) {
        console.log(whiteSpaces);
        return empty;
    } 
    for (let i = lastSymbol; i >= firstSymbol; i--) {
        if (myStr[i] === ' ') {
            lastSymbol--
        } else break
    };
    if ((lastSymbol - firstSymbol + 1) === myStr.length) {
        console.log(word);
        return myStr;
    } else 
    return myStr.slice(firstSymbol, lastSymbol + 1);
};
//Alert
alert(`${'<'}${pureStr(myString)}${'>'}`);
