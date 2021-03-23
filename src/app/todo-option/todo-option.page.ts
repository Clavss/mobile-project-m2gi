import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ListDetailsPage} from '../pages/list-details/list-details.page';
import {List} from '../models/list';
import {ListService} from '../services/list.service';

@Component({
    selector: 'app-todo-option',
    templateUrl: './todo-option.page.html',
    styleUrls: ['./todo-option.page.scss'],
})
export class TodoOptionPage implements OnInit {

    @Input() list: List;
    @Input() parent: ListDetailsPage;

    error: boolean;

    constructor(public modalCtrl: ModalController,
                private listService: ListService) {

    }

    ngOnInit() {
        this.error = false;
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    checkEmail(v: string) : boolean {

        return true;
    }

    addWrite(v: string) {
        this.listService.updateListNewWriter(v, this.list);
    }

    addRead(v: string) {
        this.listService.updateListNewReader(v, this.list);
    }


}
