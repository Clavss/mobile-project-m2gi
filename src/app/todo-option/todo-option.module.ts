import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoOptionPageRoutingModule } from './todo-option-routing.module';

import { TodoOptionPage } from './todo-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoOptionPageRoutingModule
  ],
  declarations: [TodoOptionPage]
})
export class TodoOptionPageModule {}
