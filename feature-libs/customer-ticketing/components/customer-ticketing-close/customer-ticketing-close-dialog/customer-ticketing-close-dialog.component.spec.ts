import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketingCloseDialogComponent } from './customer-ticketing-close-dialog.component';

describe('CustomerTicketingCloseDialogComponent', () => {
  let component: CustomerTicketingCloseDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingCloseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTicketingCloseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCloseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
