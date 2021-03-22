import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
    ],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FontAwesomeModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}), FormsModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
