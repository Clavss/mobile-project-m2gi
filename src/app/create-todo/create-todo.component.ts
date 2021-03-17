import {Component, Input, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {ModalController} from "@ionic/angular";
import {List} from "../models/list";
import {Todo} from "../models/todo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-create-todo',
	templateUrl: './create-todo.component.html',
	styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {

	@Input() currentList: List;
	createTodoForm: FormGroup;

	constructor(private listService: ListService,
							private modalCtrl: ModalController,
							private fb: FormBuilder) {
	}

	ngOnInit() {
		this.createTodoForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
		})
	}

	dismissModal() {
		this.modalCtrl.dismiss();
	}

	addTodo(): void {
		this.listService.addTodo(this.currentList.id, this.createTodoForm.get('name').value);
		this.dismissModal();
	}

	get errorControl() {
		return this.createTodoForm.controls;
	}

}
