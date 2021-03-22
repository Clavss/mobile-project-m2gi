import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.page.html',
    styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

    constructor(public photoService: PhotoService, public modalController: ModalController) {
    }

    photoDict: Map<number, boolean>;

    ngOnInit() {
        this.photoDict = new Map();
    }

    addPhotoToGallery() {
        this.photoService.addNewToGallery();
    }

    supprPhoto(index: number) {
        this.photoDict.set(index, false);
        this.photoService.removeFromGallery(index);
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
