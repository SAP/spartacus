import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketCloseComponent } from './customer-ticket-close.component';

describe('CustomerTicketCloseComponent', () => {
  let component: CustomerTicketCloseComponent;
  let fixture: ComponentFixture<CustomerTicketCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTicketCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
