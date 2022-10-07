import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmCustomerSupportTicketsComponent } from './asm-customer-support-tickets.component';

describe('AsmCustomerSupportTicketsComponent', () => {
  let component: AsmCustomerSupportTicketsComponent;
  let fixture: ComponentFixture<AsmCustomerSupportTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmCustomerSupportTicketsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmCustomerSupportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
