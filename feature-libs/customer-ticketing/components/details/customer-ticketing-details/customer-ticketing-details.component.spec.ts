import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CxDatePipe,
  EventService,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  DATE_FORMAT,
  DATE_FORMAT_A11Y,
  STATUS,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Card, CardModule } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { CustomerTicketingDetailsComponent } from './customer-ticketing-details.component';

const mockTicketId = '1';
const mockTicketDetails: TicketDetails = {
  id: mockTicketId,
  subject: 'mockTicket',
  status: { id: 'OPEN', name: 'Open' },
};
const routerParam$: BehaviorSubject<{
  [key: string]: string;
}> = new BehaviorSubject({});

class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}

class MockCustomerTicketingFacade implements Partial<CustomerTicketingFacade> {
  getTicket(): Observable<TicketDetails | undefined> {
    return of(mockTicketDetails);
  }
}

class MockRoutingService implements Partial<RoutingService> {
  getParams = () => routerParam$.asObservable();
}

class MockEventService implements Partial<EventService> {
  dispatch<T extends object>(_event: T): void {}
}

describe('CustomerTicketingDetailsComponent', () => {
  let component: CustomerTicketingDetailsComponent;
  let fixture: ComponentFixture<CustomerTicketingDetailsComponent>;
  let eventService: EventService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        CardModule,
        CustomerTicketingDetailsComponent,
      ],
      providers: [
        provideMockFeatureToggles({ a11yMessagingListKeyboardFocus: false }),
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: EventService, useClass: MockEventService },
      ],
    })
      .overrideComponent(CustomerTicketingDetailsComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe],
        },
      })
      .compileComponents();
    eventService = TestBed.inject(EventService);
    spyOn(eventService, 'dispatch').and.callThrough();
    routerParam$.next({ ticketCode: '1' });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTicketingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prepare content for card', (done) => {
    const mockCardContent: Card = {
      text: ['1'],
      title: 'ID',
      customClass: '',
    };
    component
      .prepareCardContent(mockTicketId, 'ID')
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toEqual(mockCardContent);
        done();
      });
  });

  describe('getStatusClass', () => {
    function assertStatusClassByStatusId(
      expectedClass: string,
      statusId: string | undefined
    ) {
      const result = component.getStatusClass(statusId);
      expect(result).toEqual(expectedClass);
    }

    it('should return open class when the status is open', () => {
      assertStatusClassByStatusId('cx-text-green', STATUS.OPEN);
    });

    it('should return close class when the status is close', () => {
      assertStatusClassByStatusId('cx-text-grey', STATUS.CLOSED);
    });

    it('should return empty if the id is not passed', () => {
      assertStatusClassByStatusId('', '');
    });

    it('should return empty if the id is undefined', () => {
      assertStatusClassByStatusId('', undefined);
    });
  });

  it('should reload data if the ticket code does not match with the url ticket code', () => {
    const mockParams = { ticketCode: '11' };
    routerParam$.next(mockParams);
    component['reloadOnRedirection']();

    expect(eventService.dispatch).toHaveBeenCalled();
  });

  it('should not reload data if the ticket code is matches with the url ticket code', () => {
    const mockParams = { ticketCode: '1' };
    routerParam$.next(mockParams);
    component['reloadOnRedirection']();

    expect(eventService.dispatch).not.toHaveBeenCalled();
  });

  describe('a11yMessagingListKeyboardFocus feature toggle', () => {
    let toggleController: MockFeatureTogglesController;

    beforeEach(() => {
      toggleController = TestBed.inject(MockFeatureTogglesController);
    });

    function createComponent(): CustomerTicketingDetailsComponent {
      const f = TestBed.createComponent(CustomerTicketingDetailsComponent);
      f.detectChanges();
      return f.componentInstance;
    }

    describe('when toggle is OFF (default)', () => {
      it('should expose DATE_FORMAT and DATE_FORMAT_A11Y on the component', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', false);
        const c = createComponent();
        expect(c.dateFormat).toBe(DATE_FORMAT);
        expect(c.dateFormatA11y).toBe(DATE_FORMAT_A11Y);
      });

      it('should render ticket details without role="region"', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', false);
        const f = TestBed.createComponent(CustomerTicketingDetailsComponent);
        f.detectChanges();
        expect(
          f.nativeElement.querySelector('.cx-ticket-details[role="region"]')
        ).toBeNull();
      });
    });

    describe('when toggle is ON', () => {
      it('should expose DATE_FORMAT and DATE_FORMAT_A11Y on the component', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', true);
        const c = createComponent();
        expect(c.dateFormat).toBe(DATE_FORMAT);
        expect(c.dateFormatA11y).toBe(DATE_FORMAT_A11Y);
      });

      it('should render ticket details with role="region" and aria-label', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', true);
        const f = TestBed.createComponent(CustomerTicketingDetailsComponent);
        f.detectChanges();
        const region = f.nativeElement.querySelector(
          '.cx-ticket-details[role="region"]'
        );
        expect(region).toBeTruthy();
        expect(region.hasAttribute('aria-label')).toBeTrue();
      });
    });
  });
});
