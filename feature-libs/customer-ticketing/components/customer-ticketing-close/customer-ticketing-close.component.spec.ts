import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Status } from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CustomerTicketingDetailsService } from '../customer-ticketing-details.service';

import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';

describe('CustomerTicketingCloseComponent', () => {
  let component: CustomerTicketingCloseComponent;
  let fixture: ComponentFixture<CustomerTicketingCloseComponent>;

  class MockLaunchDialogService implements Partial<LaunchDialogService> {
    openDialog(
      _caller: LAUNCH_CALLER,
      _openElement?: ElementRef,
      _vcr?: ViewContainerRef
    ) {
      return of();
    }
  }

  let mockStatus: Status = {
    id: 'mockId',
    name: 'mockName',
  };

  class MockCustomerTicketingDetailsService
    implements Partial<CustomerTicketingDetailsService>
  {
    getTicketStatus = () => of('OPEN');
    getAvailableTransitionStatus = () => of([mockStatus]);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCloseComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingDetailsService,
          useClass: MockCustomerTicketingDetailsService,
        },
      ],
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
