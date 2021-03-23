import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from '../../create-list/create-list.component';
import {ListService} from '../../services/list.service';
import {List} from '../../models/list';
import {Observable} from 'rxjs';
import firebase from "firebase";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    lists: Observable<List[]>;

    constructor(private listService: ListService,
                private modalController: ModalController) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.listService.reloadData();
                this.lists = this.listService.getAllLists();
            }
        });
    }

    private getTodosLength(list: List): number {
        //this.listService.getAllTodos(list.id).subscribe(res => this.length = res.length);
        return 0;
    }

    private getTodosDoneLength(list: List): number {
        return 0;
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
