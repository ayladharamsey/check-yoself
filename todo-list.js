class ToDoList {
	constructor(title, id, tasks, urgent) {
		this.title = title;
		this.id = id || Date.now();
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

	updateTask() {
		// this.completeStatus = !this.completeStatus; 
		// this.saveToStorage();

	}
}