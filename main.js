var tasks = [];
var todoCards = JSON.parse(localStorage.getItem("todos")) || [];

var cardArea = document.querySelector('.card-area')
var newCard = document.querySelector('.card-area-new-card')
var makeTaskListBtn = document.querySelector('.sidebar-form-make-task-btn')
var addToDoListItemBtn = document.querySelector('.sidebar-form-item-btn')
var titleInput = document.querySelector('.sidebar-form-input-title')
var taskListItemsInput = document.querySelector('.sidebar-form-input-item')
var taskListItemsArea = document.querySelector('.sidebar-form-list-items')
var clearAllBtn = document.querySelector('.sidebar-form-clear-all-btn')

window.addEventListener('load', reloadCardsWithData);
titleInput.addEventListener('keyup', enableBtns)
taskListItemsInput.addEventListener('keyup', enableBtns)
makeTaskListBtn.addEventListener('click', makeToDoList)
addToDoListItemBtn.addEventListener('click', addItemsToTaskListArray)
taskListItemsArea.addEventListener('click', deleteToDoListItemFromDom)
clearAllBtn.addEventListener('click', clearDraftTaskList)
cardArea.addEventListener('click', contentHandler)


function enableBtns(e) { 

    if (titleInput.value === '' || tasks.length === 0){

        makeTaskListBtn.disabled = true;
        clearAllBtn.disabled = true;

    } else {

        makeTaskListBtn.disabled = false;
        clearAllBtn.disabled = false;

    };

    if (taskListItemsInput.value === ''){

        addToDoListItemBtn.disabled = true;

    } else {

        addToDoListItemBtn.disabled = false;
    };
};


function contentHandler(e) {

	toggleCheckedItem(e);
	targetDeletingCard(e);
	deleteCard(e);
}

function toggleCheckedItem(e) {
	// if (e.target.className === 'check-off-item') {
		var targetList = findListIndex(e);
		tasks.updateTask(targetList);
		checkItem(e, targetList);
		targetList.saveToStorage(tasks);
		toggleItalics(e);
	}	
// }


//Functions to for sidebar taskLists -----------------------------

function findListIndex(item) {

	var cardId = item.dataset;

	return tasks.findIndex(function(item) {

    	return item.id == cardId;
});
}


function addItemsToTaskListArray(body, taskComplete, id) {	

	item = new Items (taskListItemsInput.value, false, Date.now());

	tasks.push(item)
	addToDoListItemsToDom(item);
	addToDoListItemBtn.disabled = true;
	enableBtns();
};


function deleteToDoListItemFromDom(e) {

	e.target.closest('li').remove();
}


function addToDoListItemsToDom(item) {

	var newTaskListItem = `
		<li class="task-todo-list" data-id =${item.id}> 
			<img class="task-todo-list-delete-btn" src="images/delete.svg" alt="Delete task from draft list on sidebar"/>
			<p class = "task-todo-list-body item">${item.body}</p>
		</li>	
		`

	taskListItemsArea.insertAdjacentHTML('beforeend', newTaskListItem);
	taskListItemsInput.value = '';
};


function clearDraftTaskList(e) {

	var taskList = document.getElementById('list-items') 

	while (taskList.hasChildNodes()) {   
	  taskList.removeChild(taskList.firstChild);
	}

	titleInput.value = '';
	taskListItemsInput.value = '';
} 


function reloadCardsWithData() {

  var newCards = todoCards.map(function(card) {
	return new ToDoList(card.id, card.title, card.taskList, card.urgent);
  });

  todoCards = newCards;
  loadCards(todoCards);

};


function loadCards(cards) { 

  for(var i = 0; i < cards.length; i++){
    appendCard(cards[i]);
  }; 
};


//Functions for turning tasklists into TodoLists ---------------------------

function makeToDoList(e) {

	var newToDoListCard = new ToDoList(Date.now(), titleInput.value, tasks, false);

	todoCards.push(newToDoListCard);
	appendCard(newToDoListCard);
	newToDoListCard.saveToStorage();
	clearDraftTaskList();
};


function appendCard (newToDoListCard) {

	var card =

	`<article class="card-area-new-card" data-id=${newToDoListCard.id}> 
		<div class ="content">
			<header class="new-card-header">
				<h2 class="new-card-title">${newToDoListCard.title}</h2>
			</header>
			<section class="new-card-items-population-area">
				<ul class= "body-to-populate">
				${appendTaskListToCard(newToDoListCard)}
				</ul>
				<footer class="new-card-footer">	
					<div class="new-card-footer-left">
					    <img class="new-card-footer-urgency-btn" src="${newToDoListCard.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'}">
						<p>URGENT</p>
					</div>	
					<div class="new-card-footer-right">
						<img class="new-card-footer-delete-btn" src="images/delete.svg">
						<p>DELETE</p>
					</div>
				</footer>
			</section>
		</div>	
	</article>`
	
	cardArea.insertAdjacentHTML('afterbegin', card)
	tasks = [];
	clearInputFields();
};


function appendTaskListToCard(newTodoCard) {

	var taskIteration = '';

	for (var i = 0; i < newTodoCard.taskList.length; i++){

		var checkedImage = newTodoCard.taskList[i].checked ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
		var italic = newTodoCard.taskList[i].checked ? 'italic' : ''

		taskIteration+=


		`<li class="populate-item check-off-item ${italic}"> 
			<img class="populate-item-delete-btn" src="${checkedImage}" class="check-off-item" id="check-off-item" data-id=${newTodoCard.taskList[i].id} alt="Open circle in order to track progress on whether the task is complete or not"/>
			<p class = "populate-items-body">${newTodoCard.taskList[i].body}</p>
		</li>`
	}

	return taskIteration;
};


function clearInputFields() {

	if(makeTaskListBtn.disabled = true){

        titleInput.value = '';
        taskListItemsInput.value = '';

    };
};


function targetDeletingCard(e) {
	if (e.target.classList.contains('new-card-footer-delete-btn')) {
	var targetCard = e.target.closest('.card-area-new-card');
 	var indexOfTargetCard = findCardIndex(targetCard);
 	removeCardFromDom(e);
	}

}


function findCardIndex(targetCard) {
 	
 	var cardId = targetCard.dataset;

	return index = todoCards.findIndex(function(cardId) {

    	return cardId.id; 
}); 
};


function deleteCard(e) { 
	if (e.target.classList.contains('new-card-footer-delete-btn')) {
	var index = findCardIndex(e)
	todoCards[index].deleteFromStorage(index)
	todoCards.splice(index, 1);
	;
	
};


//check off list items ------------------------------

function checkItem(e, todoList) {
	todoList.taskList.forEach(function(item) {
		if (item.id == e.target.dataset.id) {
		var checkedImage = item.taskComplete ? 'images/checkbox-active.svg' : 'images/checkbox.svg';
		e.target.setAttribute('src', checkedImage);
		}
	});
}


function toggleItalics(e) {
	var classList = e.target.closest('li').classList;
	classList.contains('italic') ? classList.remove('italic') : classList.add('italic');
}
}
