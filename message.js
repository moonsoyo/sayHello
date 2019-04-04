const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_NAME_STORAGE = "userName";
const DISPLAYED = "displayed";

function saveName(text){
	localStorage.setItem(USER_NAME_STORAGE, text);
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = input.value;
	paintName(currentValue);
	saveName(currentValue);
}

function askName(){
	form.classList.add(DISPLAYED);
	form.addEventListener("submit", handleSubmit);
}

function paintName(text){
	form.classList.remove(DISPLAYED);
	greeting.classList.add(DISPLAYED);
	greeting.innerText = `Hello ${text}!`;
}

function showName(){
	const userName = localStorage.getItem(USER_NAME_STORAGE);
	if(userName === null){
		askName();
	} else {
		paintName(userName);

	}

}


function init(){
	showName();

}

init();