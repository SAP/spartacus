import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketDetailsComponent } from './customer-ticket-details.component';

describe('CustomerTicketDetailsComponent', () => {
  let component: CustomerTicketDetailsComponent;
  let fixture: ComponentFixture<CustomerTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
