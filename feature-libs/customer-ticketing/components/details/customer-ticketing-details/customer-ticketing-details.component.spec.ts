import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  EventService,
  FeatureConfigService,
  FeatureToggles,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  RoutingService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  STATUS,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Card, CardModule } from '@spartacus/storefront';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from '@spartacus/core/testing/mock-feature-toggles';
import { BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
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
  dispatch = vi.fn();
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
        ...provideMockFeatureToggles({ a11yMessagingListKeyboardFocus: false }),

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
      .overrideProvider(FeatureToggles, {
        useFactory: () => TestBed.inject(MockFeatureTogglesController),
      })
      .overrideProvider(FeatureConfigService, {
        useFactory: () => {
          const controller = TestBed.inject(MockFeatureTogglesController);
          return {
            isEnabled: vi.fn().mockImplementation(
              (feature: string) => !!(controller as Record<string, unknown>)[feature]
            ),
            isLevel: vi.fn().mockReturnValue(false),
          };
        },
      })
      .compileComponents();
    eventService = TestBed.inject(EventService);
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

  it('should prepare content for card', async () => {
    const mockCardContent: Card = {
      text: ['1'],
      title: 'ID',
      customClass: '',
    };
    const result = await firstValueFrom(
      component.prepareCardContent(mockTicketId, 'ID')
    );
    expect(result).toEqual(mockCardContent);
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

    describe('when toggle is OFF (default)', () => {
      it('should render ticket details without role="region"', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', false);
        const f = TestBed.createComponent(CustomerTicketingDetailsComponent);
        f.detectChanges();
        expect(
          f.debugElement.query(By.css('.cx-ticket-details[role="region"]'))
        ).toBeNull();
      });
    });

    describe('when toggle is ON', () => {
      it('should render ticket details with role="region" and aria-label', () => {
        toggleController.set('a11yMessagingListKeyboardFocus', true);
        const f = TestBed.createComponent(CustomerTicketingDetailsComponent);

        f.detectChanges();
        const region = f.debugElement.query(
          By.css('.cx-ticket-details[role="region"]')
        );
        expect(region).toBeTruthy();
        expect(region.attributes['aria-label']).toBeDefined();
      });
    });
  });
});
