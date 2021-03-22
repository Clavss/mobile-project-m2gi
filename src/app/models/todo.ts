export class Todo {

	constructor(name: string, isDone: boolean) {
		this.isDone = isDone;
		this.description = "";
		this.name = name;
		this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	}

	id: string;
	name: string;
	description: string;
	isDone: boolean;

}
