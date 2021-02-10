import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {CreateListComponent} from "../../create-list/create-list.component";


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		HomePageRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		HomePage,
		CreateListComponent
  ]
})
export class HomePageModule {
}
