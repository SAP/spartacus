import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';

import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';

describe('CustomerTicketingCloseComponent', () => {
  let component: CustomerTicketingCloseComponent;
  let fixture: ComponentFixture<CustomerTicketingCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCloseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
