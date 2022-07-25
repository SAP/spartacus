import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTicketingReopenDialogComponent } from './customer-ticketing-reopen-dialog.component';

describe('CustomerTicketingReopenDialogComponent', () => {
  let component: CustomerTicketingReopenDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingReopenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTicketingReopenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingReopenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
