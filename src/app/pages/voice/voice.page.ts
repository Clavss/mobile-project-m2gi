import {Component, OnInit} from '@angular/core';
import {Plugins} from '@capacitor/core';

const {SpeechRecognition} = Plugins;

@Component({
    selector: 'app-voice',
    templateUrl: './voice.page.html',
    styleUrls: ['./voice.page.scss'],
})
export class VoicePage implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    start() {
        if (SpeechRecognition.available()) {
            if (!SpeechRecognition.hasPermission()) {
                SpeechRecognition.requestPermission();
            }
            SpeechRecognition.start({
                language: 'fr-FR',
                maxResults: 2,
                prompt: 'Say something',
                partialResults: true,
                popup: true,
            });
        }
    }

    end() {

    }

}
