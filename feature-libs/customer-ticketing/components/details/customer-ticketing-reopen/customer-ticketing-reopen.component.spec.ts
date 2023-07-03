import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  CustomerTicketingFacade,
  STATUS,
  STATUS_NAME,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';

describe('CustomerTicketingReopenComponent', () => {
  let component: CustomerTicketingReopenComponent;
  let fixture: ComponentFixture<CustomerTicketingReopenComponent>;
  let launchDialogService: LaunchDialogService;

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

  class MockCustomerTicketingFacade
    implements Partial<CustomerTicketingFacade>
  {
    getTicket(): Observable<TicketDetails | undefined> {
      return mockTicketDetails$;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CustomerTicketingReopenComponent],
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
    fixture = TestBed.createComponent(CustomerTicketingReopenComponent);
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
      LAUNCH_CALLER.CUSTOMER_TICKETING_REOPEN,
      component.element,
      component['vcr']
    );
  });

  describe('enableReopenButton', () => {
    it('should be false if the status is not closed', (done) => {
      mockTicket.status = { id: STATUS.OPEN, name: STATUS_NAME.OPEN };
      mockTicketDetails$.next(mockTicket);

      component.enableReopenButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be false if available status is not open or in process', (done) => {
      mockTicket.status = { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED };
      mockTicket.availableStatusTransitions = [
        { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED },
      ];
      mockTicketDetails$.next(mockTicket);

      fixture.detectChanges();

      component.enableReopenButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });

    it('should be true if status is close and available status is open or in process', (done) => {
      mockTicket.status = { id: STATUS.CLOSED, name: STATUS_NAME.CLOSED };
      mockTicket.availableStatusTransitions = [
        { id: STATUS.OPEN, name: STATUS_NAME.OPEN },
      ];
      mockTicketDetails$.next(mockTicket);

      fixture.detectChanges();

      component.enableReopenButton$.pipe(take(1)).subscribe((data) => {
        expect(data).toEqual(true);
        done();
      });
    });
  });
});
