import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {List} from "../../models/list";
import {ListService} from "../../services/list.service";
import {ModalController} from "@ionic/angular";
import {CreateTodoComponent} from "../../create-todo/create-todo.component";

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.page.html',
    styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

    currentList: List;

    constructor(private route: ActivatedRoute,
                private listService: ListService,
                private modalController: ModalController) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.currentList = this.listService.getOne(params['id']);
        });
    }

    majList(): void {
        this.currentList = this.listService.getOne(this.currentList.id);
    }

    delete(id: string): void {
        this.listService.deleteTodo(this.currentList, id);
        this.majList();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CreateTodoComponent,
            componentProps: {
              currentList: this.currentList
            },
            swipeToClose: true,
        });
        modal.onWillDismiss().then(() => {
            this.majList();
        });
        return await modal.present();
    }

}
