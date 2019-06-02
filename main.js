// document.addEventListener("DOMContentLoaded", function(event) {
//     // Your code to run since DOM is loaded and ready
// });

var cardArea = document.querySelector('.card-area')
var newCard = document.querySelector('.card-area-new-card')
var makeTaskListBtn = document.querySelector('.sidebar-form-make-task-btn')
var addToDoListItemBtn = document.querySelector('.sidebar-form-item-btn')
var titleInput = document.querySelector('.sidebar-form-input-title')
var taskListItemsInput = document.querySelector('.sidebar-form-input-item')
var taskListItemsArea = document.querySelector('.sidebar-form-list-items')
var taskLists = [];
var todoCards = JSON.parse(localStorage.getItem("todos")) || [];
var clearAllBtn = document.querySelector('.sidebar-form-clear-all-btn')


titleInput.addEventListener('keyup', enableBtns)
taskListItemsInput.addEventListener('keyup', enableBtns)
makeTaskListBtn.addEventListener('click', makeToDoList)
addToDoListItemBtn.addEventListener('click', addItemsToTaskListArray)



function enableBtns(e){ // works
    if (titleInput.value === ''){
        makeTaskListBtn.disabled = true;
    } else {
        makeTaskListBtn.disabled = false;
    };

    if (taskListItemsInput.value === ''){
        addToDoListItemBtn.disabled = true;
    } else {
        addToDoListItemBtn.disabled = false;
    };
};

function findIndex(card){
	var cardId = card.dataset.id;
	return taskLists.find(function(item) {
    return item.id == cardId;
});
}


//Functions to for sidebar taskLists -----------------------------

function addItemsToTaskListArray(){	
	//Does this need to be on the todo-list.js?
	item = new Items (taskListItemsInput.value);
	taskLists.push(item)
	addToDoListItemsToDom(item);
};

function addToDoListItemsToDom(item){
	var newTaskListItem = `
		<li class="task-todo-list item" data-id ="${item.id}> 
			<img class="task-todo-list-delete-btn item" src="images/delete.svg" alt="Delete task from draft list on sidebar"/>
			<p class = "task-todo-list-body item">'${item.body}</p>
		</li>	
		`
	taskListItemsArea.insertAdjacentHTML('beforeend', newTaskListItem);
	taskListItemsInput.value = '';
};


//Functions for turning tasklists into TodoLists ---------------------------

function makeToDoList(){
	var newToDoListCard = new ToDoList(titleInput.value, taskLists);
	todoCards.push(newToDoListCard);
	appendCard(newToDoListCard);
};

function appendCard (newTodoCard){
	var card = `
	<article class="card-area-new-card" data-id=${newTodoCard.id}> 
		<div class ="content">
			<header class="new-card-header">
				<h2 class="new-card-title">${newTodoCard.title}</h2>
			</header>
			<section class="new-card-items-population-area">
				<ul class= "body-to-populate">
				${appendTaskListToCard(newTodoCard)}
				</ul>
				<footer class="new-card-footer">	
					<div class="new-card-footer-left">
					    <img class="new-card-footer-urgency-btn" src="${newTodoCard.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'}">
						<p>URGENT</p>
					</div>	
					<div class="new-card-footer-right">
						<img class="new-card-footer-delete-btn" src="images/delete.svg">
						<p>DELETE</p>
					</div>
				</footer>
			</section>
		</div>	
	</article>
	`
	cardArea.insertAdjacentHTML('afterbegin', card)
	taskLists = [];
	clearInputFields();
};

function appendTaskListToCard(newTodoCard){
	// for this array of task list items, i need to take each item and append it to the new card
	var taskIteration = '';
	for (var i = 0; i , taskLists.length; i++){
		taskIteration++
		`<li class="populate-item item" data-id =${item.id}> 
			<img class="populate-item-delete-btn item" src="images/delete.svg" alt="Delete task from draft list in sidebar"/>
			<p class = "populate-items-body item">${item.body}</p>
		</li>`
	} return taskIteration;
};

function clearInputFields(){
	if(makeTaskListBtn.disabled = true){
        titleInput.value = '';
        taskListItemsInput.value = '';
    };
};


//Masory Grid related functions -------------------------------------------------------

// function resizeGridItem(newCard){
//   grid = cardArea[0];
//   rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
//   rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
//   rowSpan = Math.ceil((item.querySelector('.body-to-populate').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
//     item.style.gridRowEnd = "span "+rowSpan;
// }

// function resizeAllGridItems(){
//   for (var i = 0 ; i < taskLists.length; i++){
//     resizeGridItem(newCard[i]);
//   }
// };

// var allCards = document.querySelectorAll(".card-area-new-card");
// 	for (var i = 0; i < todoCards.length; i++){
//   	imagesLoaded(todoCards[i], resizeInstance);
// 	};

// window.onload = resizeAllGridItems();
// window.addEventListener('resize', resizeAllGridItems);


// function resizeInstance(instance){
// 	newCard = instance.elements[0];
//   	resizeGridItem(item);
// };

