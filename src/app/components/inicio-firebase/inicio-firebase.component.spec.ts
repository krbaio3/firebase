import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFirebaseComponent } from './inicio-firebase.component';

describe('InicioFirebaseComponent', () => {
  let component: InicioFirebaseComponent;
  let fixture: ComponentFixture<InicioFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
