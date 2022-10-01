'use strict'
//Метод isPalindrom
String.prototype.isPalindrom = function() {
    let symbols = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~\s/ьъ]/g;
    let myString = this.toLowerCase().replace(symbols, '').replace(/[ё]/g, 'е');
    let firstSymbol = 0;
    let lastSymbol = myString.length - 1;
    while (firstSymbol < lastSymbol)
        if (myString.charAt(firstSymbol++) !== myString.charAt(lastSymbol--)) {
            return false;
        }
    return true;
};

//Метод trim2
String.prototype.trim2 = function() {
    let self = this;
    let empty = '';
    let firstSymbol = 0;
	let lastSymbol = self.length - 1;
	for (let i = firstSymbol; i <= lastSymbol; i++) {
		if (self[i] === ' ') {
			firstSymbol++
		} else break
	};
    if (self.length === firstSymbol) {
        return empty;
    } 
    for (let i = lastSymbol; i >= firstSymbol; i--) {
        if (self[i] === ' ') {
            lastSymbol--
        } else break
    };
    if ((lastSymbol - firstSymbol + 1) === self.length) {
        return self;
    } else 
    return self.slice(firstSymbol, lastSymbol + 1); 
};

console.log("Лёша на полке клопа нашел".isPalindrom());
console.log("  h e l l o  ".trim2());

