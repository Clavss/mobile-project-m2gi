import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import firebase from "firebase";

@Injectable({
	providedIn: 'root'
})

export class VerifyEmailGuard implements CanActivate {

	constructor(public router: Router) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise((resolve) => {
			firebase.auth().onAuthStateChanged((user: firebase.User) => {
				if (user && user.emailVerified) {
					this.router.navigate(['/home']);
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}

}