import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {ModalController} from '@ionic/angular';
import firebase from "firebase";

@Component({
	selector: 'app-photo',
	templateUrl: './photo.page.html',
	styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

	// <url, name>
	urlsDict: Map<string, string> = new Map();

	constructor(public photoService: PhotoService, public modalController: ModalController) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user !== null) {
				this.photoService.reloadData();
				this.photoService.getAllPhotos()
					.subscribe((photos) => {
						this.urlsDict = new Map();
						photos.forEach((photo) => {
							firebase.storage().ref('images/').child(photo.name).getDownloadURL()
								.then((url) => {
									if (!this.urlsDict.has(url)) {
										this.urlsDict.set(url, photo.name);
									}
								})
								.catch((error) => console.log(error.message));
						})
					});
			}
		});
	}

	photoDict: Map<number, boolean>;

	ngOnInit() {
		this.photoDict = new Map();
	}

	addPhotoToGallery() {
		this.photoService.addNewToGallery();
	}

	supprPhoto(index: number, url: string) {
		this.photoDict.set(index, false);
		this.photoService.removeFromGallery(this.urlsDict.get(url));
	}

	showButton(position: number) {
		this.photoDict.forEach(
			(v, k, m) => {
				if (k !== position) {
					m.set(k, false);
				}
			}
		);
		this.photoDict.set(position, !this.photoDict.get(position));
	}

	buttonState(position: number): boolean {
		if (!this.photoDict.has(position)) {
			this.photoDict.set(position, false);
		}
		return this.photoDict.get(position);
	}

}
