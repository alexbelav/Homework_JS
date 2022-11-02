'use strict';

// let formDef1=
//   [
//     {label:'Название сайта:',kind:'longtext',name:'sitename'},
//     {label:'URL сайта:',kind:'longtext',name:'siteurl'},
//     {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
//     {label:'E-mail для связи:',kind:'shorttext',name:'email'},
//     {label:'Рубрика каталога:',kind:'combo',name:'division',
//         variants:[
//             {text:'здоровье',value:1},
//             {text:'домашний уют',value:2},
//             {text:'бытовая техника',value:3}
//         ]
//     },
//     {label:'Размещение:',kind:'radio',name:'payment',
//         variants:[
//             {text:'бесплатное',value:1},
//             {text:'платное',value:2},
//             {text:'VIP',value:3}
//         ]
//     },
//     {label:'Разрешить отзывы:',kind:'check',name:'votes'},
//     {label:'Описание сайта:',kind:'memo',name:'description'},
//     {label:'Опубликовать:',kind:'submit'},
//   ];

// let formDef2=
//   [
//     {label:'Фамилия:',kind:'longtext',name:'lastname'},
//     {label:'Имя:',kind:'longtext',name:'firstname'},
//     {label:'Отчество:',kind:'longtext',name:'secondname'},
//     {label:'Возраст:',kind:'number',name:'age'},
//     {label:'Зарегистрироваться:',kind:'submit'},
//   ];
let formDef1 = '';
let formDef2 = '';

const FORM_DEF1_JSON = 'https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json';
const FORM_DEF2_JSON = 'https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json';

function getData() {
    if(!formDef1) {
        $.ajax(FORM_DEF1_JSON,
        {type:'GET', dataType:'json', success:loadData, error:errorHandler});
    return;
    }

    if(!formDef2) {
        $.ajax(FORM_DEF2_JSON,
        {type:'GET', dataType:'json', success:loadData, error:errorHandler});
    return;
    }

function loadData(data) {
    if (!formDef1) {
        formDef1 = data;
        getData();
    } else {
        formDef2 = data;
        getData();
    }
};

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
};

function createForm(arr, form) {
    let myArray = arr;
    let myForm = form;

    for(let i = 0; i < myArray.length; i++) {
        let e = myArray[i];
        function createInput(type) {
            let input = document.createElement('input');
            let label = document.createElement('label');
            let labelText = document.createTextNode(e.label);
            input.type = type;
            input.name = e.name;
            label.appendChild(labelText);
            myForm.appendChild(label).appendChild(input);
        };
    if(e.kind === 'longtext') {
        createInput('text');
    } else if (e.kind === 'number') {
        createInput('text');
    } else if (e.kind === 'shorttext') {
        createInput('email');
    } else if (e.kind === 'combo') {
        let options = e.variants;
        let label = document.createElement('label');
        let labelText = document.createTextNode(e.label);
        let select = document.createElement('select');

        select.name = e.name;
        label.appendChild(labelText);
        myForm.appendChild(label).appendChild(select);
  
        options.forEach(e => {
            let option = document.createElement('option');
            let optionText = document.createTextNode(e.text);

            option.value = e.value;
            select.appendChild(option).appendChild(optionText);
        });
  
    } else if (e.kind === 'radio') {
        let myRadio = e.variants;
        let label = document.createElement('label');
        let labelText = document.createTextNode(e.label);
        myForm.appendChild(label).appendChild(labelText);
  
        myRadio.forEach(e =>  {
            let input = document.createElement('input');
            let labelRadio = document.createElement('label');
            let labelRadioText = document.createTextNode(e.text);
    
            input.type = 'radio';
            input.name = e.name;
            input.value = e.value;
    
            labelRadio.appendChild(labelRadioText);
            label.appendChild(labelRadio).appendChild(input);
        });
  
      } else if (e.kind === 'check') {
        createInput('checkbox');
  
      } else if (e.kind === 'memo') {
        let label = document.createElement('label');
        let labelText = document.createTextNode(e.label);
        let textarea = document.createElement('textarea');

        textarea.name = e.name;
        label.appendChild(labelText);
        myForm.appendChild(label).appendChild(textarea);

      } else if (e.kind === 'submit') {
        let input = document.createElement('input');
        input.type = 'submit';
        myForm.appendChild(input);
      }
    };
};
createForm(formDef1, form1);
createForm(formDef2, form2);
};
getData();
