export class Todo {

    constructor(name: string, desc: string) {
        this.isDone = false;
        this.description = desc;
        this.name = name;
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    id: string;
    name: string;
    description: string;
    isDone: boolean;
    
}
