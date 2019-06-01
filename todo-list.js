class ToDoList {
	constructor(id, title, tasks, urgent) {
		this.id = id || Date.now();
		this.title = title;
		this.taskList = taskItems;
		this.urgent = urgent || false;
	}

	saveToStorage() {
		var stringifyData = JSON.stringify(toDoCards);
      	localStorage.setItem("todos", stringfyData);
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
  constructor(content) {
    this.content = content;
    this.taskComplete = false;
    this.id = Date.now();
  }
}