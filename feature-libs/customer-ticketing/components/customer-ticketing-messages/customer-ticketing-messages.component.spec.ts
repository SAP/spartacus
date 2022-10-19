import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketingMessagesComponent } from './customer-ticketing-messages.component';

describe('CustomerTicketMessagesComponent', () => {
  let component: CustomerTicketingMessagesComponent;
  let fixture: ComponentFixture<CustomerTicketingMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketingMessagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
