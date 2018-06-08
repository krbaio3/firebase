import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { FormUploadComponent } from './components/form-upload/form-upload.component';
import { DetailsUploadComponent } from './components/details-upload/details-upload.component';
import { ListUploadComponent } from './components/list-upload/list-upload.component';
import { InicioFirebaseComponent } from './components/inicio-firebase/inicio-firebase.component';
import { AngularFirestoreCollectionComponent } from './angular-firestore-collection/angular-firestore-collection.component';
import { AngularFirestoreDocumentComponent } from './angular-firestore-document/angular-firestore-document.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FormUploadComponent,
    DetailsUploadComponent,
    ListUploadComponent,
    InicioFirebaseComponent,
    AngularFirestoreCollectionComponent,
    AngularFirestoreDocumentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
