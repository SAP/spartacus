import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';

describe('CustomerTicketingReopenComponent', () => {
  let component: CustomerTicketingReopenComponent;
  let fixture: ComponentFixture<CustomerTicketingReopenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTicketingReopenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingReopenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
