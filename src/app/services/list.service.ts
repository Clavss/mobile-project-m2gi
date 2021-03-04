import {Injectable} from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ListService {

	private listsCollection: AngularFirestoreCollection<List>;
	lists: Observable<List[]>;

	constructor(private db: AngularFirestore) {
		this.listsCollection = db.collection<List>('List');
		this.lists = this.listsCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as List;
				const id = a.payload.doc.id;
				return {id, ...data};
			}))
		);
	}

	getAllLists(): Observable<List[]> {
		return this.lists;
	}

	getOne(id: string): Observable<List> {
		return this.lists
			.pipe(map(
				lists => lists.find(list => list.id === id)
			));
	}

	createList(list: List) {
		this.listsCollection.doc(list.id).set({
			todos: null,
			id: list.id,
			name: list.name
		});
	}

	deleteList(id: string) {
		this.listsCollection.doc(id).delete();
	}

	addTodo(list: List, todo: Todo): void {
		this.listsCollection.doc(list.id).collection('todos').doc(todo.id).set(Object.assign({}, todo));
	}

	deleteTodo(list: List, id: string): void {
		//this.getOne(list.id).todos = this.getOne(list.id).todos.filter(t => t.id != id);
	}

	getAllTodos(id: string): Observable<Todo[]> {
		const todosCollection = this.listsCollection.doc(id).collection<Todo>('todos');
		return todosCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Todo;
				const id = a.payload.doc.id;
				return {id, ...data};
			}))
		);
	}

	getOneTodo(id: string): Observable<Todo> {
		return this.listsCollection.doc("w7bptb1jt7ig56n5i33n")
			.collection<Todo>('todos', ref => ref.where('id', '==', id).limit(1))
			.valueChanges()
			.pipe(flatMap(t => t));
	}

	updateTodo(todo: Todo, name: string, desc: string) {
		//this.getOneTodo(todo.id).name = todo.name;
		//this.getOneTodo(todo.id).description = todo.description;
		//this.getOneTodo(todo.id).isDone = todo.isDone;
	}
}
