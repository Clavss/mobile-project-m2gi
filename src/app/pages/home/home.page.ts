import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from '../../create-list/create-list.component';
import {ListService} from '../../services/list.service';
import {List} from '../../models/list';
import {Observable} from 'rxjs';
import firebase from 'firebase';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	lists: Observable<List[]>;
	mapSize: Map<string, number> = new Map();
	mapSizeValid: Map<string, number> = new Map();

	constructor(private listService: ListService,
							private modalController: ModalController) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user !== null) {
				this.listService.reloadData();
				this.lists = this.listService.getAllLists();
				this.lists.subscribe(l => {
					l.forEach((todolist) => {
						listService.getAllTodos(todolist.id).subscribe(
							(todos) => {
								let c = 0;
								todos.forEach((todo) => {
									if (todo.isDone) {
										c += 1;
									}
								});
								this.mapSize.set(todolist.id, todos.length);
								this.mapSizeValid.set(todolist.id, c);
							});
					});
				});
			}
		});
	}

	getTodoNumber(list: List): number {
		if (!this.mapSize.has(list.id)) {
			return 0;
		}
		return this.mapSize.get(list.id);
	}

	getTodoNumberValid(list: List): number {
		if (!this.mapSizeValid.has(list.id)) {
			return 0;
		}
		return this.mapSizeValid.get(list.id);
	}

	delete(id: string): void {
		this.listService.deleteList(id);
	}

	async presentModal() {
		const modal = await this.modalController.create({
			component: CreateListComponent,
			swipeToClose: true,
			cssClass: 'auto-height',
		});
		return await modal.present();
	}

}
