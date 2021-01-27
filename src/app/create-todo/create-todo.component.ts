import {Component, Input, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {ModalController} from "@ionic/angular";
import {List} from "../models/list";
import {Todo} from "../models/todo";

@Component({
	selector: 'app-create-todo',
	templateUrl: './create-todo.component.html',
	styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {

	@Input() currentList: List;
	newTodo: Todo = new Todo("", "");

	constructor(private listService: ListService,
							private modalCtrl: ModalController) {
	}

	ngOnInit() {
	}

	addTodo(): void {
		this.listService.addTodo(this.currentList, this.newTodo);
		this.modalCtrl.dismiss();
	}

}
