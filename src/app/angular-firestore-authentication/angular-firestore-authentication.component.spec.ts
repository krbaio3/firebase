import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFirestoreAuthenticationComponent } from './angular-firestore-authentication.component';

describe('AngularFirestoreAuthenticationComponent', () => {
  let component: AngularFirestoreAuthenticationComponent;
  let fixture: ComponentFixture<AngularFirestoreAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFirestoreAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFirestoreAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
