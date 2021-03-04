import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CreateListComponent} from "../../create-list/create-list.component";
import {ListService} from "../../services/list.service";
import {List} from "../../models/list";
import firebase from "firebase";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	lists: Observable<List[]>;

	constructor(private listService: ListService,
							private modalController: ModalController,
							private route: Router) {
	}

	ngOnInit() {
		this.lists = this.listService.getAllLists();
	}

	delete(id: string): void {
		this.listService.deleteList(id);
	}

	async presentModal() {
		const modal = await this.modalController.create({
			component: CreateListComponent,
			swipeToClose: true,
			cssClass: 'auto-height',
		});
		return await modal.present();
	}

	logout(): void {
		firebase.auth().signOut()
			.then(() => this.route.navigate(['/login']))
			.catch((error) => alert(error.message));
	}

}
