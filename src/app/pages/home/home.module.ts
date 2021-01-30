import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {CreateListComponent} from "../../create-list/create-list.component";
import {CreateTodoComponent} from "../../create-todo/create-todo.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
      HomePage,
    CreateListComponent,
    CreateTodoComponent,]
})
export class HomePageModule {}
