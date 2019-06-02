class ToDoList {
	constructor(id, title, tasks, urgent) {
		this.id = id || Date.now();
		this.title = title;
		this.taskList = taskLists;
		this.urgent = urgent || false;
	}

	saveToStorage() {
		var stringifyDataArray = JSON.stringify(todoCards);
      	localStorage.setItem("todos", stringifyDataArray);
    };

	deleteFromStorage() {
		toDoCards.splice(index, 1);
		this.saveToStorage();
	}

	updateToDo() {
		this.urgent = !this.urgent;
		this.saveToStorage(); 

	}

	updateTask(index) {
		this.tasklist[index].taskComplete = !this.tasklist[index].taskComplete
		this.saveToStorage();
	}
}

class Items {
  constructor(body) {
    this.body = body;
    this.taskComplete = false;
    this.id = Date.now();
  }

}