import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from "../../create-list/create-list.component";
import {ListService} from "../../services/list.service";
import {List} from "../../models/list";
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	lists: List[] = [];

	constructor(private listService: ListService,
							private modalController: ModalController,
              private route: Router) {
		this.lists = this.listService.getAll();
	}

	ngOnInit() {
		this.majLists();
	}

	delete(id: string): void {
		this.listService.delete(id);
		this.majLists();
	}

	majLists(): void {
		this.lists = this.listService.getAll();
	}

	async presentModal() {
		const modal = await this.modalController.create({
			component: CreateListComponent,
			swipeToClose: true,
		});
		modal.onWillDismiss().then(() => {
			this.majLists();
		});
		return await modal.present();
	}

	logout(): void {
		firebase.auth().signOut()
      .then(() => this.route.navigate(['/login']))
			.catch((error) => alert(error.message));
	}

}
