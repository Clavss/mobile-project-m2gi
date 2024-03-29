import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {List} from '../../models/list';
import {ListService} from '../../services/list.service';
import {ModalController} from '@ionic/angular';
import {CreateTodoComponent} from '../../modals/create-todo/create-todo.component';
import {Todo} from '../../models/todo';

@Component({
	selector: 'app-list-details',
	templateUrl: './list-details.page.html',
	styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

	currentList: List;

	constructor(private route: ActivatedRoute,
							private router: Router,
							private listService: ListService,
							private modalController: ModalController) {
		this.route.params.subscribe((params: Params) => {
			this.listService.getOne(params['list-id']).subscribe(list => {
				if (list != null) {
					this.currentList = list;
					this.currentList.todos = this.listService.getAllTodos(this.currentList?.id);
				}
			});
		});
	}

	ngOnInit() {
	}

	update(todo: Todo, event) {
		this.listService.updateTodoIsDone(this.currentList, todo, event.target.checked);
	}

	delete(todoId: string): void {
		this.listService.deleteTodo(this.currentList.id, todoId);
	}

	async presentModal() {
		const modal = await this.modalController.create({
			component: CreateTodoComponent,
			componentProps: {
				currentList: this.currentList
			},
			swipeToClose: true,
			cssClass: 'auto-height',
		});
		return await modal.present();
	}

	goTodo(todoId: string, sliderIndex: number) {
		this.router.navigate([this.router.url + '/todo-details/' + todoId]);
	}

	isOnlyReader(list: List): boolean {
		return !this.listService.isWriter(list) && !this.listService.isOwner(list);
	}

}
