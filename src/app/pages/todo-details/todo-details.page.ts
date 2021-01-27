import { Component, OnInit } from '@angular/core';
import {Todo} from "../../models/todo";
import {ActivatedRoute, Params} from "@angular/router";
import {ListService} from "../../services/list.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  currentTodo: Todo;

  constructor(private route: ActivatedRoute,
              private listService: ListService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.majTodo();
  }

  majTodo(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentTodo = this.listService.getOneTodo(params['id']);
    });
  }

  update() {
    this.listService.update(this.currentTodo);
    this.majTodo();
    this.navCtrl.back();
  }

}
