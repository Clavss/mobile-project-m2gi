import {Injectable} from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";

@Injectable({
	providedIn: 'root'
})
export class ListService {

	private lists: List[];

	constructor() {
		this.lists = [new List('List A')];
	}

	getAll() {
		return this.lists;
	}

	getOne(id: string): List {
		return this.lists.find(l => l.id === id);
	}

	create(list: List) {
		this.lists.push(list);
	}

	delete(id: string) {
		this.lists = this.lists.filter(l => l.id !== id);
	}

	addTodo(list: List, todo: Todo): void {
		this.lists.find(l => l.id === list.id).todos.push(todo);
	}

	deleteTodo(list: List, id: string): void {
		this.getOne(list.id).todos = this.getOne(list.id).todos.filter(t => t.id != id);
	}

	getOneTodo(id: string): Todo {
		// Pas efficace mais pas important pour ce projet tuto
		return this.lists.find(l => l.todos.find(t => t.id === id)).todos.find(t => t.id === id);
	}

	update(todo: Todo) {
		this.getOneTodo(todo.id).name = todo.name;
		this.getOneTodo(todo.id).description = todo.description;
		this.getOneTodo(todo.id).isDone = todo.isDone;
	}
}
