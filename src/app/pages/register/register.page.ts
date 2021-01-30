import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	registerForm: FormGroup;
	logged: boolean;

	constructor(private fb: FormBuilder,
							private auth: AngularFireAuth,
							private route: Router) {
		this.registerForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
		});
	}

	ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			this.logged = !!user;
		});
	}

	register(email: string, password: string): void {
		this.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
          	alert('Please check your verification email');
          	this.route.navigate(['/home']);
					})
          .catch((error) => alert(error.message));
    })
      .catch((error) => alert(error.message));
	}

	logout(): void {
		firebase.auth().signOut()
			.then(() => this.route.navigate(['/login']))
			.catch((error) => alert(error.message));
	}

}
