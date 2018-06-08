import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-angular-firestore-authentication',
  templateUrl: './angular-firestore-authentication.component.html',
  styleUrls: ['./angular-firestore-authentication.component.scss']
})
export class AngularFirestoreAuthenticationComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
