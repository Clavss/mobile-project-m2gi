import {Todo} from "./todo";

export class List {

    constructor(name: string) {
        this.name = name;
        this.todos = [];
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    id: string;
    name: string;
    todos: Todo[];

}
