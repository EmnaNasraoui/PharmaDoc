import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPharmacyComponent } from './all-pharmacy.component';

describe('AllPharmacyComponent', () => {
  let component: AllPharmacyComponent;
  let fixture: ComponentFixture<AllPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
