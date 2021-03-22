import {Injectable} from '@angular/core';
import {CameraPhoto, CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Photo} from "../models/photo";
import firebase from "firebase";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

const {Camera, Filesystem, Storage} = Plugins;

@Injectable({
	providedIn: 'root'
})
export class PhotoService {

	private photosCollection: AngularFirestoreCollection<Photo>;
	photos: Observable<Photo[]>;

	constructor(private db: AngularFirestore) {
		this.reloadData();
	}

	reloadData() {
		const user = firebase.auth().currentUser;
		this.photosCollection = this.db.collection<Photo>('photos', ref => ref.where('owner', '==', user.email));
		this.photos = this.photosCollection.snapshotChanges().pipe(
			map(actions => actions.map(a => {
				const data = a.payload.doc.data() as Photo;
				const id = a.payload.doc.id;
				return {id, ...data};
			}))
		);
	}

	getAllPhotos() {
		return this.photos;
	}

	public async addNewToGallery() {
		// Take a photo
		const capturedPhoto = await Camera.getPhoto({
			resultType: CameraResultType.Uri,
			source: CameraSource.Camera,
			quality: 100
		});

		const id = this.db.createId();

		// upload to firebase storage
		const ref = firebase.storage().ref('images/' + id);
		ref.put(this.dataURItoBlob(await this.readAsBase64(capturedPhoto)))
			.then(() => {
				// upload to firestore collection
				const newPhoto = new Photo(id, firebase.auth().currentUser.email);
				this.photosCollection.doc(id).set({
					name: newPhoto.name,
					owner: newPhoto.owner,
				});
			});
	}

	removeFromGallery(id: string) {
		// delete from firestore collection
		this.photosCollection.doc(id).delete();

		// delete from firebase storage
		const ref = firebase.storage().ref('images/' + id);
		ref.delete();
	}

	private async readAsBase64(cameraPhoto: CameraPhoto) {
		// Fetch the photo, read as a blob, then convert to base64 format
		const response = await fetch(cameraPhoto.webPath!);
		const blob = await response.blob();

		return await this.convertBlobToBase64(blob) as string;
	}

	convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
		const reader = new FileReader;
		reader.onerror = reject;
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(blob);
	});

	private dataURItoBlob(dataURI: string): Blob {
		// convert base64/URLEncoded data component to raw binary data held in a string
		let byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataURI.split(',')[1]);
		else
			byteString = encodeURI(dataURI.split(',')[1]);

		// separate out the mime component
		const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		const ia = new Uint8Array(byteString.length);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], {type: mimeString});
	}

}