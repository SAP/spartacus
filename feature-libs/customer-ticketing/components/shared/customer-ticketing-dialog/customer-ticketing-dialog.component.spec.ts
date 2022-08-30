import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerTicketingDialogComponent } from './customer-ticketing-dialog.component';

@Component({
  template: '',
})
class DialogComponent extends CustomerTicketingDialogComponent {}

describe('CustomerTicketingDialogComponent', () => {
  let component: CustomerTicketingDialogComponent;
  let fixture: ComponentFixture<CustomerTicketingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketingDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
