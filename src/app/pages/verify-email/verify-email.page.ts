import {Component, OnInit} from '@angular/core';
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.page.html',
	styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

	constructor(private route: Router) {
	}

	ngOnInit() {
	}

	resendEmail(): void {
		firebase.auth().currentUser.sendEmailVerification()
			.then(() => alert('Please check your verification email again'))
			.catch((error) => alert(error.message));
	}

	logout(): void {
		firebase.auth().signOut()
			.then(() => this.route.navigate(['/login']))
			.catch((error) => alert(error.message));
	}

}
