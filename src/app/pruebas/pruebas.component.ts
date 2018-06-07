import { Component, OnInit } from '@angular/core';
import { Datos } from '../models/datos';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss']
})
export class PruebasComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Datos>;
  items: Observable<Datos[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Datos>('prueba');
    this.items = this.itemsCollection.valueChanges();
   }

  ngOnInit() {
  }

  addItem( item: Datos) {
    const id = this.afs.createId();
    item.id = id;
    console.log(item);
    this.itemsCollection.doc(id).set(item);
    // this.itemsCollection.add(item);
  }

}
