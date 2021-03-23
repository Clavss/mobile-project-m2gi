import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoOptionPage } from './todo-option.page';

const routes: Routes = [
  {
    path: '',
    component: TodoOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoOptionPageRoutingModule {}
