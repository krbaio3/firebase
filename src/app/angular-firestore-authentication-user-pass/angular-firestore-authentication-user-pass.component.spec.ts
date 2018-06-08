import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFirestoreAuthenticationUserPassComponent } from './angular-firestore-authentication-user-pass.component';

describe('AngularFirestoreAuthenticationUserPassComponent', () => {
  let component: AngularFirestoreAuthenticationUserPassComponent;
  let fixture: ComponentFixture<AngularFirestoreAuthenticationUserPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFirestoreAuthenticationUserPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFirestoreAuthenticationUserPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
