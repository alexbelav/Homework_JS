"use strict"

function randomDiap(n,m) {
	return Math.floor(Math.random()*(m-n+1))+n;
};

function mood(colorsCount) {
	const colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
	const addColors = {};
	console.log('цветов: ' + colorsCount);
	for (let i = 1; i <= colorsCount; i++) {
		let n = randomDiap(1,7);
		let colorValue = colors[n];
		if (!(colorValue in addColors)) {
            addColors[colorValue] = true;
        } else {
            i--
        }
    };
    console.log(Object.keys(addColors).toString());
};
mood(3);

function moodW(colorsCount) {
    const colors = ['', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый'];
    const addColors = {};
    console.log('цветов: ' + colorsCount);
    let i = 0;
    while(i < colorsCount) {
        let n = randomDiap(1,7);
        let colorValue = colors[n];
        if (!(colorValue in addColors)){
            addColors[colorValue] = true;
            i++;
            console.log(colorValue);
        }
    };
};
moodW(3);
