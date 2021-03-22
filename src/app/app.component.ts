import {Component} from '@angular/core';
import {Platform} from '@ionic/angular';
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
    ) {
        this.initializeApp();
        route.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(event => {
            event = event as NavigationEnd;
            if (event.url.slice(1) === 'photo') {
                this.todolist = false;
            } else {
                this.todolist = true;
            }
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
        firebase.auth().signOut()
            .then(() => this.route.navigate(['/login']))
            .catch((error) => alert(error.message));
    }

    isTodo(): boolean {
        return this.todolist;
    }

    goTodo(): void {
        this.route.navigate(['/home']);
    }

    goPhoto(): void {
        this.route.navigate(['/photo']);
    }
}
