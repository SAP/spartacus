import { Component, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  CustomerTicketingFacade,
  STATUS,
  STATUS_NAME,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  ICON_TYPE,
} from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';

import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';
import { CustomerTicketingCloseComponentService } from './customer-ticketing-close-component.service';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}

let mockTicket: TicketDetails = {
  status: {
    id: STATUS.OPEN,
    name: STATUS_NAME.OPEN,
  },
  availableStatusTransitions: [
    {
      id: STATUS.CLOSED,
      name: STATUS_NAME.CLOSED,
    },
  ],
};

class MockCustomerTicketingFacade implements Partial<CustomerTicketingFacade> {
  getTicket(): Observable<TicketDetails | undefined> {
    return of(mockTicket);
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('CustomerTicketingCloseComponent', () => {
  let component: CustomerTicketingCloseComponent;
  let fixture: ComponentFixture<CustomerTicketingCloseComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingCloseComponent, MockCxIconComponent],
      providers: [
        CustomerTicketingCloseComponentService,
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
      ],
    }).compileComponents();
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger open dialog and open close request dialog', () => {
    spyOn(launchDialogService, 'openDialog');
    component.openDialog();

    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.CUSTOMER_TICKETING_CLOSE,
      component.element,
      component['vcr']
    );
  });
});
