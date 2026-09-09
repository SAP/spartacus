import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  createFrom,
  CxEvent,
  EventService,
  LoadUserAddressesEvent,
  LoadUserPaymentMethodsEvent,
  UserActions,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import { CheckoutLegacyStoreEventListener } from './checkout-legacy-store-event.listener';

const mockEventStream$ = new Subject<CxEvent>();
const mockUserId = 'testUserId';

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockReturnValue(mockEventStream$.asObservable());
  dispatch = vi.fn();
}

describe(`CheckoutLegacyStoreEventListener`, () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckoutLegacyStoreEventListener,
        provideMockStore(),
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(CheckoutLegacyStoreEventListener);
    store = TestBed.inject(MockStore);

    vi.spyOn(store, 'dispatch').mockImplementation(() => {});
  });

  describe(`onUserAddressAction`, () => {
    it(`should dispatch UserActions.LoadUserAddresses`, () => {
      mockEventStream$.next(
        createFrom(LoadUserAddressesEvent, { userId: mockUserId })
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserAddresses(mockUserId)
      );
    });
  });

  describe(`onUserPaymentAction`, () => {
    it(`should dispatch UserActions.LoadUserPaymentMethods`, () => {
      mockEventStream$.next(
        createFrom(LoadUserPaymentMethodsEvent, { userId: mockUserId })
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new UserActions.LoadUserPaymentMethods(mockUserId)
      );
    });
  });
});
