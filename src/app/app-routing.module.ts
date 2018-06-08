import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormUploadComponent } from './components/form-upload/form-upload.component';
import { UserComponent } from './components/user/user.component';
import { InicioFirebaseComponent } from './components/inicio-firebase/inicio-firebase.component';
import { AngularFirestoreCollectionComponent } from './angular-firestore-collection/angular-firestore-collection.component';
import { AngularFirestoreDocumentComponent } from './angular-firestore-document/angular-firestore-document.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: AngularFirestoreDocumentComponent
  },
  {
    path: 'fireCollection',
    component: AngularFirestoreCollectionComponent
  },
  {
    path: 'inicio',
    component: InicioFirebaseComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'formUpload',
    component: FormUploadComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
    data: { option: false }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      useHash: true, // quitar para que desaparezca el hash de la ruta
      enableTracing: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
