var cardArea = document.querySelector('.card-area')
var newCard = document.querySelector('.card-area-new-card')
var makeTaskListBtn = document.querySelector('.sidebar-form-make-task-btn')
var addToDoListItemBtn = document.querySelector('.sidebar-form-item-btn')
var title = document.querySelector('.sidebar-form-input-title')
var listItems = document.querySelector('.sidebar-form-input-item')
var listItemsArea = document.querySelector('.sidebar-form-list-items')
var temporaryTaskItems = [];
var todoCards = JSON.parse(localStorage.getItem("todos")) || [];


makeTaskListBtn.addEventListener('onclick', makeTaskListBtnHelper)
addToDoListItemBtn.addEventListener('onclick', addToDoListItemBtnHelper)
title.addEventListener('keyup', enableBtns)
listItems.addEventListener('keyup', enableBtns)

function enableBtns() {
    if (title.value === ''){
        makeTaskListBtn.disabled = true;
    } else {
        makeTaskListBtn.disabled = false;
    };

    if (listItems.value === ''){
        addToDoListItemBtn.disabled = true;
    } else {
        addToDoListItemBtn.disabled = false;
    };
};

function addToDoListItemBtnHelper(e){
	e.preventDefault();
	addItemsToTemporaryArray();
	
}

function addToDoListItemToDom(){
	var newListItem = `
		<li class="temporary-todo-list item" data-id ="${newListItem.id}> 
			<img class="temporary-todo-list-delete-btn item" src="images/delete.svg" alt="Delete task from temporary sidebar"/>
			<p class = "temporary-todo-list-content item">'${newListItem.content}</p>
		</li>	
		`
	listItemsArea.insertAdjacentHTML('beforeend', newListItem);
	listItems.value = '';
}

function addItemsToTemporaryArray(){
	var newTemporaryListItem = new Items(listItems.value);
	temporaryTaskItems.push(newTemporaryListItem)
	addToDoListItemToDom(newTemporaryListItem);
}

function makeTaskListBtnHelper(e){
	e.preventDefault();
	makeTaskList();
	appendCard(todoList);
	clearInputFields();
	saveToStorage();
}

function clearInputFields(){
	if(makeTaskListBtn.disabled = true){
        titleInput.value = '';
        listItems.value = '';
    };
};


function makeTaskList(){
var todoList = new ToDoList(Date.now(), title.value, listItems.value, false,);
todoCards.push(todoList);
}

function findIndex(card){
	var cardId = card.dataset.id;
	return taskItems.find(function(item) {
    return item.id == cardId;
});

function appendCard (newTodoCard){
	var card = `
	<article class="card-area-new-card" data-id=${id}> 
		<div class ="content">
			<header class="new-card-header">
				<h2 class="new-card-title">Task Title</h2>
			</header>
			<section class="new-card-items-population-area">
				<ul class= "items-to-populate">
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
	taskItems = [];
}





//Masory Grid related functions -------------------------------------------------------

function resizeGridItem(newCard){
  grid = cardArea[0];
  rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  rowSpan = Math.ceil((item.querySelector('.new-card-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}

function resizeAllGridItems(){
  for (var i = 0 ; i < allItems.length; i++){
    resizeGridItem(newCard[i]);
  }
}
window.onload = resizeAllGridItems();
window.addEventListener('resize', resizeAllGridItems);

function resizeInstance(instance){
	newCard = instance.elements[0];
  resizeGridItem(item);
}

allCards = document.querySelectorAll(".card-area-new-card");
for( var i = 0; i < allCards.length; i++){
  imagesLoaded(allCards[i], resizeInstance);
}
}