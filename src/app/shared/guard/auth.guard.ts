import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(public router: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (!user && next.routeConfig.path === 'password-recovery') {
          resolve(true);
        } else if (!user && next.routeConfig.path !== 'login') {
          this.router.navigate(['/login']);
          resolve(false);
        } else if (user && !user.emailVerified && next.routeConfig.path !== 'verify-email') {
          this.router.navigate(['/verify-email']);
          resolve(false);
        } else if (user && (next.routeConfig.path == 'login' || next.routeConfig.path == 'password-recovery')) {
          this.router.navigate(['/home']);
          resolve(false);
        } else if (user && user.emailVerified && next.routeConfig.path === 'verify-email') {
          this.router.navigate(['/home']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

}