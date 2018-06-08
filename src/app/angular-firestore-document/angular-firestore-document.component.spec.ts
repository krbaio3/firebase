import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFirestoreDocumentComponent } from './angular-firestore-document.component';

describe('AngularFirestoreDocumentComponent', () => {
  let component: AngularFirestoreDocumentComponent;
  let fixture: ComponentFixture<AngularFirestoreDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFirestoreDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFirestoreDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
