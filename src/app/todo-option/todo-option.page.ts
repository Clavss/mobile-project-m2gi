import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Todo} from '../models/todo';
import {ListDetailsPage} from '../pages/list-details/list-details.page';

@Component({
  selector: 'app-todo-option',
  templateUrl: './todo-option.page.html',
  styleUrls: ['./todo-option.page.scss'],
})
export class TodoOptionPage implements OnInit {

  @Input() todo: Todo;
  @Input() parent: ListDetailsPage;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
