const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_STORAGE = "toDoListItems";

let toDoArray = [];

function deleteToDo(event){
	const buttonTarget = event.target;
	const buttonToEliminate = buttonTarget.parentNode;
	toDoList.removeChild(buttonToEliminate);
	const cleanToDos = toDoArray.filter(function(toDo){

		return toDo.id !== parseInt(buttonToEliminate.id);
	});
	toDoArray = cleanToDos;
	saveToDo();
}

function saveToDo(){
	localStorage.setItem(TODO_STORAGE, JSON.stringify(toDoArray));
}

function paintToDo(text){
	const list = document.createElement("li");
	const deleteButton = document.createElement("button");
	deleteButton.innerText = "✔️";
    deleteButton.style.background = "#FA89B7"; 
    deleteButton.style.color = "black"; 
    deleteButton.style.fontSize = "7px";
    deleteButton.style.margin = "5px";

	deleteButton.addEventListener("click", deleteToDo);
	list.style.backgroundColor = "#F2C3F4";
	list.style.padding = "10px";
	const listSpan = document.createElement("span");
	const newID = toDoArray.length + 1;
	listSpan.innerText = text;
	list.appendChild(listSpan);
	list.appendChild(deleteButton);
	list.id = newID;
	toDoList.appendChild(list);
	const toDoObject = {
		text: text,
		id: newID
	};
	toDoArray.push(toDoObject);
	saveToDo();
}

function handleSubmit(event){
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value = "";
}

function showToDoList(){
	const toDoListItems = localStorage.getItem(TODO_STORAGE);
	if(toDoListItems !== null){
		const parsedToDoList = JSON.parse(toDoListItems);
		parsedToDoList.forEach(function(toDo){
			paintToDo(toDo.text);
		});
	}
}

function init(){
	showToDoList();
	toDoForm.addEventListener("submit", handleSubmit);
}

init();