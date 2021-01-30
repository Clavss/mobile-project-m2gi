import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";
import {Router} from "@angular/router";

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	loginForm: FormGroup;

	constructor(private fb: FormBuilder,
							private auth: AngularFireAuth,
							private route: Router) {
		this.loginForm = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
		});
	}

	ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user !== null) {
				this.route.navigate(['/home']);
			}
		});
	}

	login(email: string, password: string): void {
		this.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password');
        } else if (error.code === 'auth/invalid-email'
									|| error.code === 'auth/user-not-found') {
         this.loginForm.controls['email'].setValue('');
					alert(error.message);
        } else {
					alert(error.message);
				}
		});
	}

	private catchErrorMessages(error): void {
		alert(error.message);
	}

	loginWithGoogle() {
		this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
			.catch(e => this.catchErrorMessages(e));
	}

	loginWithFacebook() {
		this.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
			.catch(e => this.catchErrorMessages(e));
	}

}
