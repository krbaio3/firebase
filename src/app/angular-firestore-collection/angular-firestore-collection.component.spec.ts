import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFirestoreCollectionComponent } from './angular-firestore-collection.component';

describe('PruebasComponent', () => {
  let component: AngularFirestoreCollectionComponent;
  let fixture: ComponentFixture<AngularFirestoreCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFirestoreCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFirestoreCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
