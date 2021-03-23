import {Injectable} from '@angular/core';
import {List} from '../models/list';
import {Todo} from '../models/todo';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {combineLatest, Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import firebase from 'firebase';

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
            const byOwner$ = this.listsCollection.snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as List;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );

            const byRead$ = this.db.collection<List>('lists', ref => ref.where('canRead', 'array-contains', user.email)).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as List;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );

            const byWrite$ = this.db.collection<List>('lists', ref => ref.where('canWrite', 'array-contains', user.email)).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as List;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                }))
            );

            this.lists = this.combine2Observable(byOwner$, this.combine2Observable(byRead$, byWrite$));
        }
    }

    private combine2Observable(obs1$: Observable<any>, obs2$: Observable<any>) {
        return combineLatest(obs1$, obs2$, (a, b) => {
            return a.reduce((acc, actual) => {
                if (!acc.some(o => o.id === actual.id)) {
                    acc = [...acc, actual];
                }
                return acc;
            }, [...b]);
        });
    }

    getAllLists(): Observable<List[]> {
        return this.lists;
    }

    updateListNewReader(email: string, list: List) {
        this.listsCollection.doc(list.id).update({
            canRead: [...list.canRead, email]
        });
    }

    updateListNewWriter(email: string, list: List) {
        this.listsCollection.doc(list.id).update({
            canWrite: [...list.canWrite, email]
        });
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
            owner: list.owner,
            canRead: list.canRead,
            canWrite: list.canWrite
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

    updateTodoIsDone(list: List, todo: Todo, isDone: boolean) {
        this.listsCollection.doc(list.id).collection('todos').doc(todo.id).update({
            isDone: isDone
        });
    }

    updateTodoNameAndDesc(list: List, todo: Todo, name: string, desc: string) {
        this.listsCollection.doc(list.id).collection('todos').doc(todo.id).update({
            id: todo.id,
            name: name,
            description: desc
        });
    }
}
