'use strict'

function buildWrapper(wrap) {
    return function setWrap(str, stl) {
        function myReg(myRep) {
            return myRep.replace(/[&]/g, '&amp;').replace(/[<]/g, '&lt;').replace(/[>]/g, '&gt;').replace(/[']/g, '&apos;').replace(/["]/g, '&quot;');
        }
        let myArray = [];
        Object.keys(stl).forEach((key) => {
            myArray.push(key + '=' + "'" + myReg(stl[key]) + "'");
        });
        let myStl = myArray.join(' ');
        let myStr = `<${wrap} ${myStl}>${myReg(str)}</${wrap}>`;
        return myStr;
    };
};

var wrapP =  buildWrapper('P');
var wrapH1 =  buildWrapper('H1');

console.log(wrapP("Однажды в <студёную> зимнюю пору", {lang:"ru"}));
console.log(wrapH1( "СТИХИ", {align:"center", title:"M&M's"}));
