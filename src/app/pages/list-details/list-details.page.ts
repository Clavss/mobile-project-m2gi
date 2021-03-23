import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {List} from '../../models/list';
import {ListService} from '../../services/list.service';
import {ModalController} from '@ionic/angular';
import {CreateTodoComponent} from '../../create-todo/create-todo.component';
import {Todo} from '../../models/todo';
import {TodoOptionPage} from '../../todo-option/todo-option.page';

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
        this.listService.updateTodo(this.currentList, todo, todo.name, todo.description, event.target.checked);
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

    async showOption(todo: Todo) {
        const modal2 = await this.modalController.create({
            component: TodoOptionPage,
            componentProps: {
                todo,
                parent: this
            },
            swipeToClose: true,
            cssClass: 'auto-height',
        });
        return await modal2.present();
    }

    goTodo(todoId: string, sliderIndex: number) {
        this.router.navigate([this.router.url + '/todo-details/' + todoId]);
    }

}
