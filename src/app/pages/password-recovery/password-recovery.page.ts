import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  passwordRecoveryForm: FormGroup;

  constructor(private fb: FormBuilder,
              public auth: AngularFireAuth) {
    this.passwordRecoveryForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
  }

  passwordRecovery(email: string): void {
    this.auth.sendPasswordResetEmail(email)
      .then(() => alert('Please check your password reset email'))
      .catch((error) => alert(error.message));
  }

}
