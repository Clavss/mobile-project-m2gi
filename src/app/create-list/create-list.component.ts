import {Component, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {List} from "../models/list";

@Component({
	selector: 'app-create-list',
	templateUrl: './create-list.component.html',
	styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

	createListForm: FormGroup;

	constructor(private listService: ListService,
							private modalCtrl: ModalController,
							private fb: FormBuilder) {
	}

	ngOnInit() {
		this.createListForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
		})
	}

	dismissModal() {
		this.modalCtrl.dismiss();
	}

	create(): void {
		this.listService.create(new List(this.createListForm.get('name').value));
		this.dismissModal();
	}

	get errorControl() {
		return this.createListForm.controls;
	}

}
