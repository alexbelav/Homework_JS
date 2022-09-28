'use strict'

function HashStorageFunc() {
    let self = this;  
    let privateStorage = {};

    self.addValue = function(key, value) {
        privateStorage[key] = value; 
    };

    self.getValue = function(key) {  
        if (key in privateStorage) {
            return privateStorage[key];
        } return undefined;
    };

    self.deleteValue = function(key) {  
        if(key in privateStorage) {
            delete privateStorage[key];
            return true;
        } return false;
    };

    self.getKeys = function() {
        return Object.keys(privateStorage);
    };
};


let drinkStorage = new HashStorageFunc();
function inInfo() {
    let isName = prompt('Введите название напитка');
    let isAlco = confirm('Напиток содержит алкоголь? Если да, то нажмите "OK", иначе - "ОТМЕНА"');
    let isRecipe = prompt('Введите рецепт напика'); 
    let isTemp = prompt('Введите температуру подачи: (холодная/горячая)')

    drinkStorage.addValue(isName, {alco: isAlco, recipe: isRecipe, temp: isTemp});
};

function getInfo() {
    let isName = prompt('Введите название напитка');
    let isAvail = drinkStorage.getValue(isName);
    if (isAvail) {
        alert('Напиток: ' + isName + '\n' +
              'Алкогольный: ' + (isAvail.alco?'да':'нет') + '\n' +
              'Рецепт приготовления: ' + '\n' +
              isAvail.recipe + '\n' +
              'Температупа подачи: ' + isAvail.temp);
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
