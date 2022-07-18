import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CustomerTicketingListHeaderComponent } from './customer-ticketing-list-header.component';

describe('CustomerTicketingListHeaderComponent should init', () => {
  let component: CustomerTicketingListHeaderComponent;
  let fixture: ComponentFixture<CustomerTicketingListHeaderComponent>;

  beforeEach(() => {
    await TestBed.configureTestingModule({
      declarations: [CustomerTicketingListHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingListHeaderComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
