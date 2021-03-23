import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ListDetailsPage} from '../pages/list-details/list-details.page';
import {List} from '../models/list';

@Component({
  selector: 'app-todo-option',
  templateUrl: './todo-option.page.html',
  styleUrls: ['./todo-option.page.scss'],
})
export class TodoOptionPage implements OnInit {

  @Input() list: List;
  @Input() parent: ListDetailsPage;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
