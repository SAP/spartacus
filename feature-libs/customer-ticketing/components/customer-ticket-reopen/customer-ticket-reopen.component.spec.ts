import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketReopenComponent } from './customer-ticket-reopen.component';

describe('CustomerTicketReopenComponent', () => {
  let component: CustomerTicketReopenComponent;
  let fixture: ComponentFixture<CustomerTicketReopenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTicketReopenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketReopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
