import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmCustomerMapComponent } from './asm-customer-map.component';

describe('AsmCustomerMapComponent', () => {
  let component: AsmCustomerMapComponent;
  let fixture: ComponentFixture<AsmCustomerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmCustomerMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
