import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';

import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';

describe('CustomerTicketingReopenComponent', () => {
  let component: CustomerTicketingReopenComponent;
  let fixture: ComponentFixture<CustomerTicketingReopenComponent>;

  class MockLaunchDialogService implements Partial<LaunchDialogService> {
    openDialog(
      _caller: LAUNCH_CALLER,
      _openElement?: ElementRef,
      _vcr?: ViewContainerRef
    ) {
      return of();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingReopenComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();
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
