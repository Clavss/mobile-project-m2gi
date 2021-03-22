import {Injectable} from '@angular/core';
import {List} from "../models/list";
import {Todo} from "../models/todo";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import firebase from "firebase";

@Injectable({
	providedIn: 'root'
})
export class ListService {

	private listsCollection: AngularFirestoreCollection<List>;
	lists: Observable<List[]>;

	constructor(private db: AngularFirestore) {
		this.reloadData();
	}

	reloadData() {
		const user = firebase.auth().currentUser;
		if (user != null) {
			this.listsCollection = this.db.collection<List>('lists', ref => ref.where('owner', '==', user.email));
			this.lists = this.listsCollection.snapshotChanges().pipe(
				map(actions => actions.map(a => {
					const data = a.payload.doc.data() as List;
					const id = a.payload.doc.id;
					return {id, ...data};
				}))
			);
		}
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

	createList(listName: string, userEmail: string) {
		const list = new List(listName, userEmail);
		this.listsCollection.doc(list.id).set({
			todos: null,
			id: list.id,
			name: list.name,
			owner: list.owner
		});
	}

	deleteList(listId: string) {
		this.listsCollection.doc(listId).delete();
	}

	addTodo(listId: string, todoName: string): void {
		const todo = new Todo(todoName, false);
		this.listsCollection.doc(listId).collection('todos').doc(todo.id).set(Object.assign({}, todo));
	}

	deleteTodo(listId: string, todoId: string): void {
		this.listsCollection.doc(listId).collection('todos').doc(todoId).delete();
	}

	getAllTodos(listId: string): Observable<Todo[]> {
		const todosCollection = this.listsCollection.doc(listId).collection<Todo>('todos');
		return todosCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Todo;
				const id = a.payload.doc.id;
				return {id, ...data};
			}))
		);
	}

	getOneTodo(listId: string, todoId: string): Observable<Todo> {
		return this.listsCollection.doc(listId)
			.collection<Todo>('todos', ref => ref.where('id', '==', todoId).limit(1))
			.valueChanges()
			.pipe(flatMap(t => t));
	}

	updateTodo(list: List, todo: Todo, name: string, desc: string) {
		this.listsCollection.doc(list.id).collection('todos').doc(todo.id).set({
			id: todo.id,
			name: name,
			description: desc,
			isDone: todo.isDone
		});
	}
}
