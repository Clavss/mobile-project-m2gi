import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import firebase from "firebase";

@Injectable({
	providedIn: 'root'
})

export class OnlyLoggedAuthGuard implements CanActivate {

	constructor(public router: Router) {
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		return new Promise((resolve) => {
			firebase.auth().onAuthStateChanged((user: firebase.User) => {
				if (!user) {
					this.router.navigate(['/login']);
					resolve(false);
				} else {
					resolve(true);
				}
			});
		});
	}

}