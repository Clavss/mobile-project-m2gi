import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ListService} from "../../services/list.service";
import {ModalController} from "@ionic/angular";
import {List} from "../../models/list";

@Component({
	selector: 'app-share-list',
	templateUrl: './share-list.component.html',
	styleUrls: ['./share-list.component.scss'],
})
export class ShareListComponent implements OnInit {

	@Input() currentList: List;
	shareListForm: FormGroup;

	constructor(private listService: ListService,
							private modalCtrl: ModalController,
							private fb: FormBuilder) {
	}

	ngOnInit() {
		this.shareListForm = this.fb.group({
			email: ['', [Validators.required]],
		});
	}

	dismissModal() {
		this.modalCtrl.dismiss();
	}

	share(isReadToggleChecked, isWriteToggleChecked): void {
		if (isWriteToggleChecked) {
			this.listService.updateListNewWriter(this.shareListForm.get('email').value, this.currentList)
		} else if (isReadToggleChecked) {
      this.listService.updateListNewReader(this.shareListForm.get('email').value, this.currentList)
    }

		this.dismissModal();
	}

	get errorControl() {
		return this.shareListForm.controls;
	}

}
