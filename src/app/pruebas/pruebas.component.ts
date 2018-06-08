import { Component, OnInit } from '@angular/core';
import { Datos, DatosId } from '../models/datos';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Datos>;
  // items: Observable<Datos[]>;
  items: Observable<DatosId[]>;
  nombre: string;
  apellido: string;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Datos>('prueba');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    // this.items = this.itemsCollection.valueChanges();

    /**
     * Para usar el ID tenemos que hacer la interface DatosID (más claro)
     * al cambiar tipo de Array de Observable por el DatosID, podemos setearle
     * el objeto de vuelta por firebase.
     *
     * Esto nos interesa cuando tenemos que usar los metadatos como el id de
     * lo que tenemos en firebase, para mostrar una imagen en concreto
     * */
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Datos;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() {}

  addItem(item: DatosId) {
    const id = this.afs.createId();
    item.id = id;
    console.log(item);
    this.itemsCollection.doc(id).set(item);
    // this.itemsCollection.add(item);
    this.resetInput();
  }

  resetInput() {
    this.nombre = null;
    this.apellido = null;
  }
}
