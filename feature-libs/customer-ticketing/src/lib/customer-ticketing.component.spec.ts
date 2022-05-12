import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketingComponent } from './customer-ticketing.component';

describe('CustomerTicketingComponent', () => {
  let component: CustomerTicketingComponent;
  let fixture: ComponentFixture<CustomerTicketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerTicketingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
