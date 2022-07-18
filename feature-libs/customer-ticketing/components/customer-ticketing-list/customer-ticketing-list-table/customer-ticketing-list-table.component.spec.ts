import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CustomerTicketingListTableComponent } from './customer-ticketing-list-table.component';

describe('CustomerTicketingListTableComponent should init', () => {
  let component: CustomerTicketingListTableComponent;
  let fixture: ComponentFixture<CustomerTicketingListTableComponent>;

  beforeEach(() => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketingListTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingListTableComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
