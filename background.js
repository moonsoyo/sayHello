const body = document.querySelector("body");

const IMG_NUMBER = 10;


function paintImage(imgNum){
	const image = new Image();
	image.src = `images/${imgNum + 1}.jpg`;
	image.classList.add("backgroundImg");
	body.prepend(image);
}

function generateRand(){
	const number = Math.floor(Math.random() * IMG_NUMBER);
	return number;
}

function init(){
	const randomNumber = generateRand();
	paintImage(randomNumber);
}

init();