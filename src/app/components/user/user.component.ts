import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

import 'firebase/storage';
import * as firebase from 'firebase';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [AuthService]
})
export class UserComponent implements OnInit {
  private usersCollection: AngularFirestoreCollection<User>;
  private userDocs: AngularFirestoreDocument;

  user: Observable<User[]>;
  addUser: User = {
    name: '',
    lastname: '',
    email: '',
    contact: '',
    image: ''
  };

  itemToUpdate: User;
  editState: boolean = false;

  constructor(private afs: AngularFirestore, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.resetUser();
    this.usersCollection = this.afs.collection<User>('users');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    if (this.authSrv.isLoggedIn()) {
      this.user = this.usersCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
    }
  }

  insert() {
    const user: User = this.setUser(
      this.addUser.name,
      this.addUser.lastname,
      this.addUser.email,
      this.addUser.contact,
      this.addUser.image
    );

    this.usersCollection.add(user);

    this.resetUser();
  }

  delete(item: User): void {
    this.userDocs = this.afs.doc(`users/${item}`);
    this.userDocs.delete();
  }

  update(): void {
    const user: User = {
      name: this.itemToUpdate.name,
      lastname: this.itemToUpdate.lastname,
      email: this.itemToUpdate.email,
      contact: this.itemToUpdate.contact,
      image: this.itemToUpdate.image
    };
    this.userDocs = this.afs.doc(`users/${this.itemToUpdate.id}`);
    this.userDocs.update(user);
  }

  edit(item: User) {
    this.editState = true;
    this.itemToUpdate = {
      name: item.name,
      lastname: item.lastname,
      email: item.email,
      contact: item.contact,
      image: item.image,
      id: item.id
    };
  }

  /////////////////////////////////////////

  clearState() {
    this.editState = false;
    this.itemToUpdate = null;
  }

  setUser(
    name: string,
    lastname: string,
    email: string,
    contact: string,
    image: string
  ): User {
    return {
      name,
      lastname,
      email,
      contact,
      image
    };
  }

  resetUser(): User {
    return {
      name: '',
      lastname: '',
      email: '',
      contact: '',
      image: ''
    };
  }
}
