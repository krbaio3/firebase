import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-angular-firestore-authentication-user-pass',
  templateUrl: './angular-firestore-authentication-user-pass.component.html',
  styleUrls: ['./angular-firestore-authentication-user-pass.component.scss']
})
export class AngularFirestoreAuthenticationUserPassComponent implements OnInit {
  email: string;
  password: string;

  constructor(public afAuth: AngularFireAuth) {}

  ngOnInit() {}

  login() {

    const credential = this.afAuth.auth.EmailAuthProvider.credential(email, password);


    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
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
    this.afAuth.auth.signOut();
  }
}
