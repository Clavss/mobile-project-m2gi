import {Component, OnInit} from '@angular/core';
import {ListService} from "../services/list.service";
import {List} from "../models/list";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

    list: List = new List('');

    constructor(private listService: ListService,
                private modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    create(): void {
        this.listService.create(this.list);
        this.modalCtrl.dismiss();
    }

}
