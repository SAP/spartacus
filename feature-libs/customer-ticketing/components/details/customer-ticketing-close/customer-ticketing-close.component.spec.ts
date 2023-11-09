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
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}

const mockTicketDetails$ = new BehaviorSubject<TicketDetails>({});

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
    return mockTicketDetails$;
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
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
      ],
    }).compileComponents();

    mockTicketDetails$.next(mockTicket);
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

  describe('enableCloseButton', () => {
    it('should be false if the status is not open or in process', (done) => {
      mockTicket.status = { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED };
      mockTicketDetails$.next(mockTicket);

      component.enableCloseButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be false if available status is not closed', (done) => {
      mockTicket.status = { id: STATUS.OPEN, name: STATUS_NAME.OPEN };
      mockTicket.availableStatusTransitions = [
        { id: STATUS.OPEN, name: STATUS_NAME.OPEN },
      ];
      mockTicketDetails$.next(mockTicket);

      fixture.detectChanges();

      component.enableCloseButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be true if status is open and available status is close', (done) => {
      mockTicket.status = { id: STATUS.OPEN, name: STATUS_NAME.OPEN };
      mockTicket.availableStatusTransitions = [
        { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED },
      ];
      mockTicketDetails$.next(mockTicket);

      fixture.detectChanges();

      component.enableCloseButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(true);
        done();
      });
    });
  });
});
