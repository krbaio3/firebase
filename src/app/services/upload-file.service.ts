import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import * as firebase from 'firebase';
import { FirebaseStorage } from '@firebase/storage-types';

import { FileUpload } from '../models/fileUpload';
import { User } from '../models/user';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  profileURL: Observable<string | null>;

  private basePath = 'users';
  private usersCollection: AngularFirestoreCollection<User>;
  private userDocs: AngularFirestoreDocument;

  constructor(
    private afs: AngularFirestore,
    private adb: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileStorage(fileUpload: FileUpload, progress: { porcentaje: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef
      .child(`${this.basePath}/${fileUpload.file.name}`)
      .put(fileUpload.file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        //in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.porcentaje = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
      },
      error =>
        // fail
        console.error(`ERROR in ${error}`),
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      }
    );
  }

  getFileUpload(numberItems): AngularFireList<FileUpload> {
    return this.adb.list(this.basePath, ref => ref.limitToLast(numberItems));
  }

  deleteFileupload(user: User) {
    this.deleteFileDatabase(user.id)
      .then(() => {
        console.log('Borrado FileDataBase');
        this.deleteFileStorage(user.image);
      })
      .catch(error => console.error(`ERROR: ${error}`));
  }

  deleteFileDatabase(key: string) {
    return this.afs.doc(`${this.basePath}/${key}`).delete();
  }

  deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef
      .child(`${this.basePath}/${name}`)
      .delete()
      .then(() => console.log(`Se ha borrado ${name}`))
      .catch(error => console.error(`Error: ${error}`));
  }

  downloadProfileUrl(profileImg: string): Observable<string>  {
    const ref = this.storage.ref(`${this.basePath}/${profileImg}`);
    this.profileURL = ref.getDownloadURL();
    return this.profileURL;
  }

  //////////////////////////////

  private saveFileData(fileUpload: FileUpload) {
    this.adb.list(`${this.basePath}/`).push(fileUpload);
  }
}
