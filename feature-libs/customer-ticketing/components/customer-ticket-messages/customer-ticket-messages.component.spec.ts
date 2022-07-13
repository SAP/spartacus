import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketMessagesComponent } from './customer-ticket-messages.component';

describe('CustomerTicketMessagesComponent', () => {
  let component: CustomerTicketMessagesComponent;
  let fixture: ComponentFixture<CustomerTicketMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTicketMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
