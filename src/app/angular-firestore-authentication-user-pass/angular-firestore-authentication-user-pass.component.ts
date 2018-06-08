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
    this.afAuth.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .catch(error => {
        console.error(error.code);
        console.error(error.message);
      });
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
