import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmCustomerSectionComponent } from './asm-customer-section.component';

describe('AsmCustomerSectionComponent', () => {
  let component: AsmCustomerSectionComponent;
  let fixture: ComponentFixture<AsmCustomerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmCustomerSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsmCustomerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
