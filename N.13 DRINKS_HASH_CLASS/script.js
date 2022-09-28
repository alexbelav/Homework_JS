'use strict'

class HashStorageClass {
	constructor() {
		this.privateStorage = {};
	}
    

    addValue(key, value) {
        this.privateStorage[key] = value;
    };

    getValue(key) {  
        if (key in this.privateStorage) {
            return this.privateStorage[key];
        } return undefined;
    };

    deleteValue(key) {  
        if(key in this.privateStorage) {
            delete this.privateStorage[key];
            return true;
        } return false;
    };

    getKeys() {
        return Object.keys(this.privateStorage);
    };
};


let drinkStorage = new HashStorageClass();
function inInfo() {
    let isName = prompt('Введите название напитка');
    let isAlco = confirm('Напиток содержит алкоголь? Если да, то нажмите "OK", иначе - "ОТМЕНА"');
    let isRecipe = prompt('Введите рецепт напика'); 
    let isTemp = prompt('Введите температуру подачи: (холодная/горячая)');
	let isInfo = {
		alco: isAlco,
		recipe: isRecipe,
		temp: isTemp
	};
    drinkStorage.addValue(isName, isInfo);
};

function getInfo() {
    let isName = prompt('Введите название напитка');
    let isAvail = drinkStorage.getValue(isName);
    if (isAvail) {
        alert('Напиток: ' + isName + '\n' +
              'Алкогольный: ' + (isAvail.alco?'да':'нет') + '\n' +
              'Рецепт приготовления: ' + '\n' +
              isAvail.recipe + '\n' +
              'Температура подачи: ' + isAvail.temp);
    } else {
        alert('Нет такого напитка у нас :(')
    };
};

function deleteInfo() {
    let isName = prompt('Введите название напитка');
    let isDelete = drinkStorage.deleteValue(isName);

    alert(isDelete?'Напиток удалён!':'Нет такого напитка у нас :(');
};

function listInfo() {
    alert(drinkStorage.getKeys());
};
