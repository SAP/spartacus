import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CheckoutServiceDetailsConnector } from '../connector';
import { CheckoutServiceDetailsService } from './checkout-service-details.service';
import {
  CheckoutServiceDetailsSetEvent,
  ServiceDateTime,
} from '@spartacus/s4-service/root';
import createSpy = jasmine.createSpy;

const mockData = `2222-90-89T67:89:00-04:00`;
const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = createSpy().and.returnValue(of(mockCartId));
  isGuestCart = createSpy().and.returnValue(of(false));
  getEntries() {
    return of([
      {
        product: {
          productTypes: 'NON-SERVICE',
          name: 'non-service 1',
        },
      },
      {
        product: {
          productTypes: 'NON-SERVICE',
          name: 'non-service 2',
        },
      },
      {
        product: {
          productTypes: 'SERVICE',
          name: 'service 1',
        },
      },
    ]);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(mockUserId);
  }
}

class MockEventService implements Partial<EventService> {
  dispatch = createSpy();
}

class MockCheckoutServiceDetailsConnector
  implements Partial<CheckoutServiceDetailsConnector>
{
  setServiceScheduleSlot = createSpy().and.returnValue(of('service-details'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
}

describe(`CheckoutServiceDetailsService`, () => {
  let service: CheckoutServiceDetailsService;
  let connector: CheckoutServiceDetailsConnector;
  let checkoutQuery: CheckoutQueryFacade;
  let eventService: EventService;
  let userService: UserIdService;
  let cartService: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutServiceDetailsService,
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: EventService, useClass: MockEventService },
        {
          provide: CheckoutServiceDetailsConnector,
          useClass: MockCheckoutServiceDetailsConnector,
        },
        { provide: CheckoutQueryFacade, useClass: MockCheckoutQueryFacade },
      ],
    });

    service = TestBed.inject(CheckoutServiceDetailsService);
    connector = TestBed.inject(CheckoutServiceDetailsConnector);
    checkoutQuery = TestBed.inject(CheckoutQueryFacade);
    userService = TestBed.inject(UserIdService);
    eventService = TestBed.inject(EventService);
    cartService = TestBed.inject(ActiveCartFacade);
  });

  it(`should be created`, () => {
    expect(service).toBeTruthy();
  });
  describe(`getSelectedServiceDetailsState`, () => {
    it(`should return the service detail`, (done) => {
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            servicedAt: mockData,
          },
        })
      );

      service
        .getSelectedServiceDetailsState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<ServiceDateTime | undefined>>{
            loading: false,
            error: false,
            data: mockData,
          });
          done();
        });
    });
    it(`should return undefined service detail if no service products are available in cart`, (done) => {
      checkoutQuery.getCheckoutDetailsState = createSpy().and.returnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            servicedAt: mockData,
          },
        })
      );
      spyOn(cartService, 'getEntries').and.returnValue(of([]));

      service
        .getSelectedServiceDetailsState()
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual(<QueryState<ServiceDateTime | undefined>>{
            loading: false,
            error: false,
            data: undefined,
          });
          done();
        });
    });
  });

  describe(`setServiceScheduleSlot`, () => {
    it(`should throw an error if the checkout condition is not met`, (done) => {
      spyOn(userService, 'takeUserId').and.returnValue(of(undefined));
      service
        .setServiceScheduleSlot(mockData)
        .pipe(take(1))
        .subscribe({
          error: (error) => {
            expect(error).toEqual(new Error('Checkout conditions not met'));
            done();
          },
        });
    });

    it(`should call checkoutServiceDetailsConnector.setServiceScheduleSlot`, () => {
      service.setServiceScheduleSlot(mockData);

      expect(connector.setServiceScheduleSlot).toHaveBeenCalledWith(
        mockUserId,
        mockCartId,
        {
          scheduledAt: mockData,
        }
      );
    });

    it(`should dispatch CheckoutServiceDetailsSetEvent`, () => {
      service.setServiceScheduleSlot(mockData);

      expect(eventService.dispatch).toHaveBeenCalledWith(
        { userId: mockUserId, cartId: mockCartId, scheduledAt: mockData },
        CheckoutServiceDetailsSetEvent
      );
    });
  });
  it(`should return the service products if any`, (done) => {
    spyOn(cartService, 'getEntries').and.callThrough();
    service.getServiceProducts().subscribe((result) => {
      expect(result).toEqual(['service 1']);
      done();
    });
  });
});
