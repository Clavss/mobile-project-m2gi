import {Todo} from "./todo";
import {Observable} from "rxjs";

export class List {

	constructor(name: string) {
		this.name = name;
		this.todos = null;
		this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

	id: string;
	name: string;
	todos: Observable<Todo[]>;

}
