import { Component, OnInit } from '@angular/core';
import {Todo} from "../../models/todo";
import {ActivatedRoute, Params} from "@angular/router";
import {ListService} from "../../services/list.service";
import {ModalController, NavController} from "@ionic/angular";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {List} from "../../models/list";

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  currentList: List;
  currentTodo: Todo;
  updateTodoForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private listService: ListService,
              private navCtrl: NavController,
              private fb: FormBuilder) {
    this.route.params.subscribe((params: Params) => {
      this.listService.getOne(params['list-id']).subscribe(list =>
        this.currentList = list
      );
      this.listService.getOneTodo(params['list-id'], params['todo-id']).subscribe(
        todo => this.currentTodo = todo
      );
    });
  }

  ngOnInit() {
    this.updateTodoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(255)]],
    })
  }

  noChange(): boolean {
    return this.updateTodoForm.get('name').value == this.currentTodo.name &&
      this.updateTodoForm.get('description').value == this.currentTodo.description;
  }

  submitForm() {
    const name = this.updateTodoForm.get('name').value;
    const desc = this.updateTodoForm.get('description').value;
    this.listService.updateTodoNameAndDesc(this.currentList, this.currentTodo, name, desc);
    this.navCtrl.back();
  }

  get errorControl() {
    return this.updateTodoForm.controls;
  }

}
