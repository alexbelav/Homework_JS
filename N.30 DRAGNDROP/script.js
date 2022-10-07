"use strict";
 
window.addEventListener('load', posElem, false);
function posElem(EO) {
    EO = EO || window.event;

    let elems = document.getElementsByTagName('img');

    for (let i = 0; i < elems.length; i++) {
        var elem = elems[i];
        elem.style.left = elem.offsetLeft + 'px';
        elem.style.top = elem.offsetTop + 'px';
    }

    for (let k = 0; k < elems.length; k++) {
        let elem = elems[k];
        elem.style.position = 'absolute';
        elem.style.cursor = 'pointer';
        elem.onmousedown = myMouseDown;
        elem.onmouseup = myMouseUp;
    }

    function myMouseDown(EO) {
        EO = EO || window.event;
        let elemTarget = EO.target;
        let elemPosLeft = EO.pageX - elemTarget.offsetLeft;
        let elemPosTop = EO.pageY - elemTarget.offsetTop;
        
        document.body.appendChild(elemTarget);

        window.onmousemove = myMouseMove; 
        function myMouseMove(EO) {
            EO = EO || window.event;
            EO.preventDefault();
            elemTarget.style.top = (EO.pageY - elemPosTop) + 'px';
            elemTarget.style.left = (EO.pageX - elemPosLeft) + 'px';
        };
    };

    function myMouseUp(EO) {
        EO = EO || window.event;
        window.onmousemove = null; 
    };
};
