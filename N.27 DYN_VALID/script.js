'use strict';

const myForm = document.querySelector('.form');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const URL_REGEXP = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
const NUMBERS_REGEXP = /^[\d]+$/g;

function myStyle(err) {
    err.style.marginLeft = '10px';
    err.style.color = 'red';
};

//DEV
function validateDev(focusElem) {
    let errCount = 0;
    let devElem = myForm.dev;
    let devValue = devElem.value;
    let devErr = document.querySelector('.empty-dev');
    if (devValue !== '') {
        devErr.innerHTML = '';
    } if (devValue === '') {
        devErr.innerHTML = 'Введите имя разработчиков';
        myStyle(devErr);
        errCount++;
    } if (NUMBERS_REGEXP.test(devValue)) {
        devErr.innerHTML = 'Введите корректное имя';
        myStyle(devErr);
        errCount++;
    }
    if (errCount && focusElem) {
        devElem.focus();
    }
    return errCount;
};

//NAME 
function validateName(focusElem) {
    let errCount = 0;
    let nameElem = myForm.name;
    let nameValue = nameElem.value;
    let nameErr = document.querySelector('.empty-name');
    if (nameValue !== '') {
        nameErr.innerHTML = '';
    } if (nameValue === '') {
        nameErr.innerHTML = 'Введите название сайта';
        myStyle(nameErr);
        errCount++;
    } if (NUMBERS_REGEXP.test(nameValue)) {
        nameErr.innerHTML = 'Введите корректное название';
        myStyle(nameErr);
        errCount++;
    }
    if (errCount && focusElem) {
        nameElem.focus();
    }
    return errCount;
};

//URL 
function validateUrl(focusElem) {
    let errCount = 0;
    let urlElem = myForm.url;
    let urlValue = urlElem.value;
    let urlErr = document.querySelector('.empty-url');
    if (urlValue !== '') {
        urlErr.innerHTML = '';
    } if (!URL_REGEXP.test(urlValue)) {
        urlErr.innerHTML = 'Введите URL сайта';
        myStyle(urlErr);
        errCount++;
    } 
    if (errCount && focusElem) {
        urlElem.focus();
    };
    return errCount;
};

//DATE
function validateDate(focusElem) {
    let errCount = 0;
    let dateElem = myForm.date;
    let dateValue = dateElem.value;
    let dateErr = document.querySelector('.empty-date');
    if (dateValue) {
        dateErr.innerHTML = '';
    } else {
        dateErr.innerHTML = 'Выберите дату';
        myStyle(dateErr);
        errCount++;
        if (errCount && focusElem) {
            dateElem.focus();
        }
    }; 
    return errCount;
};

//VISITORS
function validateVisitors(focusElem) {
    let errCount = 0;
    let visitElem = myForm.visitors;
    let visitValue = visitElem.value;
    let visitErr = document.querySelector('.empty-visitors');
    if (visitValue !== '') {
        visitErr.innerHTML = '';
    } if (!(/^[\d]+$/g).test(visitValue)) {
        visitErr.innerHTML = 'Введите количество посетителей в сутки';
        myStyle(visitErr);
        errCount++;
    }
    if (errCount && focusElem) {
        visitElem.focus();
    }
    return errCount;
};

//EMAIL
function validateEmail(focusElem) {
    let errCount = 0;
    let emailElem = myForm.email;
    let emailValue = emailElem.value;
    let emailErr = document.querySelector('.empty-email');
    if (emailValue !== '') {
        emailErr.innerHTML = '';
    }
    if (!EMAIL_REGEXP.test(emailValue)) {
        emailErr.innerHTML = 'Введите EMAIL для связи';
        myStyle(emailErr);
        errCount++;
        if (errCount && focusElem) {
            emailElem.focus();
        }
    }; 
    return errCount;
};

//RUBRIC
function validateRubric(focusElem) {
    let errCount = 0;
    let rubricElem = myForm.rubric;
    let rubicValue = rubricElem.value;
    let rubricErr = document.querySelector('.empty-rubric');
    if (rubicValue == 0) {
        rubricErr.innerHTML = 'Выберите рубрику';
        myStyle(rubricErr)
        errCount++;
    } else {
        rubricErr.innerHTML = '';
    } 
    if ( errCount && focusElem ) {
        rubricElem.focus();
    }
    return errCount; 
};

//PAID
function validatePaid(focusElem) {
    let errCount = 0;
    let paidElem = myForm.paid;
    let paidValue = paidElem.value;
    let paidErr = document.querySelector('.empty-paid');
    if (paidValue == '') {
        paidErr.innerHTML = 'Выберите способ размещения';
        myStyle(paidErr);
        errCount++;
    } else {
        paidErr.innerHTML = '';
    }
    if ( errCount && focusElem ) {
        paidElem.focus();
    }
    return errCount; 
};

//COMMENTS 
function validateComments(focusElem) {
    let errCount = 0;
    let commentElem = myForm.comment;
    let commentErr = document.querySelector('.empty-comment');
    if (!commentElem.checked) {
        commentErr.innerHTML = 'Выберите разрешить';
        myStyle(commentErr);
        errCount++;
    } else {
        commentErr.innerHTML = ''; 
    }
    if ( errCount && focusElem ) {
        commentElem.focus();
    }
    return errCount; 
};

//DESCRIPTION
function valdiateDes(focusElem) { 
    let errCount = 0;
    let desElem = myForm.description;
    let desValue = desElem.value;
    let desErr = document.querySelector('.empty-description');
    if (desValue === '') {
        desErr.innerHTML = 'Оставьте описание';
        myStyle(desErr);
        errCount++;
    } else {
        desErr.innerHTML = '';
    }
    if ( errCount && focusElem ) {
        desElem.focus();
    }
    return errCount; 
};





myForm.dev.onblur=function() { validateDev(false); }
myForm.name.onblur=function() { validateName(false); }
myForm.url.onblur=function() { validateUrl(false); }
myForm.date.onblur=function() { validateDate(false); }
myForm.visitors.onblur=function() { validateVisitors(false); }
myForm.email.onblur=function() { validateEmail(false); }
myForm.rubric.onchange=function() { validateRubric(false); }
myForm.paid[0].onchange=function() { validatePaid(false); }
myForm.paid[1].onchange=function() { validatePaid(false); }
myForm.paid[2].onchange=function() { validatePaid(false); }
myForm.comment.onchange=function() { validateComments(false); }
myForm.description.onblur=function() { valdiateDes(false); }




function validAll(EO) {
    EO = EO || window.event;
    try {
        let totalErrCount = 0;
        totalErrCount+=validateDev( !totalErrCount );
        totalErrCount+=validateName( !totalErrCount );
        totalErrCount+=validateUrl( !totalErrCount );
        totalErrCount+=validateDate( !totalErrCount );
        totalErrCount+=validateVisitors( !totalErrCount );
        totalErrCount+=validateEmail( !totalErrCount );
        totalErrCount+=validateRubric( !totalErrCount );
        totalErrCount+=validatePaid( !totalErrCount );
        totalErrCount+=validateComments( !totalErrCount );
        totalErrCount+=valdiateDes( !totalErrCount );
        

  
        if ( totalErrCount )
            EO.preventDefault(); // если ошибки были - отменяем отправку формы на сервер
    }
    catch ( err ) {
        EO.preventDefault(); // что-то пошло не так - отменяем отправку формы на сервер
    }
}


myForm.addEventListener('submit', validAll, false);



