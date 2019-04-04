import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingledoctorComponent } from './singledoctor.component';

describe('SingledoctorComponent', () => {
  let component: SingledoctorComponent;
  let fixture: ComponentFixture<SingledoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingledoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingledoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
