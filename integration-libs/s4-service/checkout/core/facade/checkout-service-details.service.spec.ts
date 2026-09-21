import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
} from '@spartacus/checkout/base/root';
import {
  EventService,
  OCC_USER_ID_CURRENT,
  ProductTypes,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { CheckoutServiceDetailsConnector } from '../connector';
import { CheckoutServiceDetailsService } from './checkout-service-details.service';
import {
  CheckoutServiceDetailsSetEvent,
  ServiceDateTime,
} from '@spartacus/s4-service/root';

const mockData = `2222-90-89T67:89:00-04:00`;
const mockUserId = OCC_USER_ID_CURRENT;
const mockCartId = 'cartID';

class MockActiveCartService implements Partial<ActiveCartFacade> {
  takeActiveCartId = vi.fn().mockReturnValue(of(mockCartId));
  isGuestCart = vi.fn().mockReturnValue(of(false));
  getEntries() {
    return of([
      {
        product: {
          productTypes: ProductTypes.PHYSICAL,
          name: 'non-service 1',
          code: 'non-service 1',
        },
      },
      {
        product: {
          productTypes: ProductTypes.PHYSICAL,
          name: 'non-service 2',
          code: 'non-service 2',
        },
      },
      {
        product: {
          productTypes: ProductTypes.SERVICE,
          name: 'service 1',
          code: 'service 1',
        },
      },
    ]);
  }
  getDeliveryEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(mockUserId);
  }
}

class MockEventService implements Partial<EventService> {
  dispatch = vi.fn();
}

class MockCheckoutServiceDetailsConnector
  implements Partial<CheckoutServiceDetailsConnector>
{
  setServiceScheduleSlot = vi.fn().mockReturnValue(of('service-details'));
}

class MockCheckoutQueryFacade implements Partial<CheckoutQueryFacade> {
  getCheckoutDetailsState = vi.fn().mockReturnValue(
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
    it(`should return the service detail`, async () => {
      checkoutQuery.getCheckoutDetailsState = vi.fn().mockReturnValue(
        of(<QueryState<CheckoutState>>{
          loading: false,
          error: false,
          data: {
            servicedAt: mockData,
          },
        })
      );

      const result = await firstValueFrom(service.getSelectedServiceDetailsState());
      expect(result).toEqual(<QueryState<ServiceDateTime | undefined>>{
        loading: false,
        error: false,
        data: mockData,
      });
    });
  });

  describe(`setServiceScheduleSlot`, () => {
    it(`should throw an error if the checkout condition is not met`, async () => {
      vi.spyOn(userService, 'takeUserId').mockReturnValue(of(undefined));
      await expect(
        firstValueFrom(service.setServiceScheduleSlot(mockData))
      ).rejects.toEqual(new Error('Checkout conditions not met'));
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
  it(`should return the service products if any`, async () => {
    vi.spyOn(cartService, 'getEntries');
    const result = await firstValueFrom(service.getServiceProducts());
    expect(result).toEqual(['service 1']);
  });
  it(`should return true if the current cart has non-service products`, async () => {
    const orderEntries: OrderEntry[] = [
      { orderCode: 'deliveryEntry1' },
      { orderCode: 'deliveryEntry2' },
    ];
    vi.spyOn(cartService, 'getDeliveryEntries').mockReturnValue(of(orderEntries));
    vi.spyOn(service, 'getServiceProducts').mockReturnValue(of(['service 1']));
    const result = await firstValueFrom(service.hasNonServiceItems());
    expect(result).toEqual(true);
  });
  it(`should return false if the current cart has no non-service products`, async () => {
    const orderEntries: OrderEntry[] = [
      { orderCode: 'deliveryEntry1' },
      { orderCode: 'deliveryEntry2' },
    ];
    vi.spyOn(cartService, 'getDeliveryEntries').mockReturnValue(of(orderEntries));
    vi.spyOn(service, 'getServiceProducts').mockReturnValue(
      of(['service 1', 'service 2'])
    );
    const result = await firstValueFrom(service.hasNonServiceItems());
    expect(result).toEqual(false);
  });
  it(`should return true if the current cart has service products`, async () => {
    vi.spyOn(service, 'getServiceProducts').mockReturnValue(
      of(['service 1', 'service 2'])
    );
    const result = await firstValueFrom(service.hasServiceItems());
    expect(result).toEqual(true);
  });
  it(`should return false if the current cart has no service products`, async () => {
    vi.spyOn(service, 'getServiceProducts').mockReturnValue(of([]));
    const result = await firstValueFrom(service.hasServiceItems());
    expect(result).toEqual(false);
  });
});
