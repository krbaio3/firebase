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

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private basePath = '/users';

  constructor(private adb: AngularFireDatabase) {}

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
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);
      }
    );
  }

  getFileUpload(numberItems): AngularFireList<FileUpload> {
    return this.adb.list(this.basePath, ref => ref.limitToLast(numberItems));
  }

  deleteFileupload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key).then(() => {});
  }

  //////////////////////////////

  private saveFileData(fileUpload: FileUpload) {
    this.adb.list(`${this.basePath}/`).push(fileUpload);
  }

  private deleteFileDatabase(key: string) {
    return this.adb.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
