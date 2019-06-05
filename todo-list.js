class ToDoList {
	constructor(id, title, tasks, urgent) {
		this.id = id || Date.now();
		this.title = title;
		this.taskList = tasks;
		this.urgent = urgent || false;
	}

	saveToStorage() {
		var stringifyDataArray = JSON.stringify(todoCards);
      	localStorage.setItem("todos", stringifyDataArray);
    };

	deleteFromStorage(index) {
		todoCards.splice(index, 1);
		this.saveToStorage();
	}

	updateToDo() {
		this.urgent = !this.urgent;
		this.saveToStorage(); 

	}

	updateTask(index) {
		this.taskList[index].taskComplete = !this.taskList[index].taskComplete
		this.saveToStorage();
	}
}

class Items {
  constructor(body, id) {
    this.body = body;
    this.taskComplete = false;
    this.id = id || Date.now();
  }

}