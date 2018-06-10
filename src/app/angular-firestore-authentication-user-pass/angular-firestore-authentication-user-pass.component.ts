import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-angular-firestore-authentication-user-pass',
  templateUrl: './angular-firestore-authentication-user-pass.component.html',
  styleUrls: ['./angular-firestore-authentication-user-pass.component.scss'],
  providers: [AuthService]
})
export class AngularFirestoreAuthenticationUserPassComponent implements OnInit {
  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth, private authSrv: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.authSrv.signInWithGoogle(this.email, this.password).then(
      (response) => {
        console.log(`Logeado! ${JSON.stringify(response, null, 4)}`);
        this.router.navigate(['/user']);
      }
    )
    .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  logout() {
    this.authSrv.logout();
  }

  loginPopUp() {
    this.authSrv.signInWithGooglePopUp();
  }
}
