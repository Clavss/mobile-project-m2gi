import {Component} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import firebase from 'firebase';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private route: Router,
        private menu: MenuController,
    ) {
        this.initializeApp();
        route.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            event = event as NavigationEnd;
            this.todolist = event.url.slice(1) !== 'photo';
        });

    }

    todolist: boolean;

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.todolist = true;
        });
    }

    isLog(): boolean {
        return firebase.auth().currentUser != null;
    }

    logout(): void {
        this.menu.toggle();
        firebase.auth().signOut()
            .then(() => this.route.navigate(['/login']))
            .catch((error) => alert(error.message));
    }

    isTodo(): boolean {
        return this.todolist;
    }

    goTo(go: string): void {
        this.menu.toggle();
        this.route.navigate([go]);
    }

}
