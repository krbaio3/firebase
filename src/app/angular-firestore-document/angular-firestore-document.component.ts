import { Component, OnInit } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { Datos, DatosId } from '../models/datos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-angular-firestore-document',
  templateUrl: './angular-firestore-document.component.html',
  styleUrls: ['./angular-firestore-document.component.scss']
})
export class AngularFirestoreDocumentComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Datos>;
  item: Observable<Datos>;
  id;

  constructor(private afs: AngularFirestore) {
    // Se tiene que crear el identificador con el nombre de la colección  + / + número_id_firebase
    // Para este ejemplo se usa la colección `prueba` y el id `9rGRgMqiCCnmxk2WHx7x` que es Super Lopez
    this.itemDoc = afs.doc<Datos>('prueba/9rGRgMqiCCnmxk2WHx7x');
    this.item = this.itemDoc.valueChanges();
  }

  ngOnInit() {}

  updateItem(item: DatosId) {
    let datos: Datos = { nombre: '', apellido: '' };

    Object.getOwnPropertyNames(item).forEach((value, indice, array) => {
      (item[value] !== undefined && item[value].trim() !== '') ? datos[value] = item[value] : delete datos[value];
    });

    console.log(`Update datos: ${JSON.stringify(datos)}`);
    this.itemDoc.update(datos);
  }

  setItem(item: DatosId) {
    /**
     * Destruye el contenido del documento y setea los datos nuevos
     */
    console.log(`Set item: ${JSON.stringify(item)}`);
    item.id = '9rGRgMqiCCnmxk2WHx7x';
    this.itemDoc.set(item);
  }

  deleteItem() {
    console.log(`Delete`);
    // this.itemDoc.delete();
  }
}
