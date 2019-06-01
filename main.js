cardArea = document.querySelector('.card-area')
newCard = document.querySelector('.card-area-new-card')

taskItems = [];
var todoCards = JSON.parse(localStorage.getItem("todos")) || [];



window.onload = resizeAllGridItems();
window.addEventListener("resize", resizeAllGridItems);


function findIndex(card){
	var cardId = card.dataset.id;
	return taskItems.find(function(item) {
    return item.id == cardId
}

function appendCard (newTodoCard){
	var card = `
	<article class="card-area-new-card" data-id=${id}> 
		<header class="new-card-header">
			<h2 class="new-card-title">Task Title</h2>
		</header>
		<section class="new-card-items-population-area">
			<ul class= "items-to-populate">
			</ul>
			<footer class="new-card-footer">	
				<div class="new-card-footer-left">
				    <img class="new-card-footer-urgency-button" src="${newTodoCard.urgent ? 'images/urgent-active.svg' : 'images/urgent.svg'}">
					<p>URGENT</p>
				</div>	
				<div class="new-card-footer-right">
					<img class="new-card-footer-delete-button" src="images/delete.svg">
					<p>DELETE</p>
				</div>
			</footer>
		</section>
	</article>
	
	cardArea.insertAdjacentHTML('afterbegin', card)
	taskItems = [];
	`
}





Masory Grid related functions -------------------------------------------------------

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

function resizeInstance(instance){
	newCard = instance.elements[0];
  resizeGridItem(item);
}

allCards = document.querySelectorAll(".card-area-new-card");
for( var i = 0; i < allCards.length; i++){
  imagesLoaded( allCards[i], resizeInstance);
}