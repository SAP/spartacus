import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  EventService,
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import {
  CustomerTicketingFacade,
  STATUS,
  TicketDetails,
} from '@spartacus/customer-ticketing/root';
import { Card, CardModule } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
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
      imports: [I18nTestingModule, CardModule],
      declarations: [CustomerTicketingDetailsComponent],
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: CustomerTicketingFacade,
          useClass: MockCustomerTicketingFacade,
        },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: EventService, useClass: MockEventService },
      ],
    }).compileComponents();
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
});
