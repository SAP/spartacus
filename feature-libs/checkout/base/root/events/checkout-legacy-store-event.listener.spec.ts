import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CartActions } from '@spartacus/cart/base/core';
import { LoadCartEvent, RemoveCartEvent } from '@spartacus/cart/base/root';
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
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();
const mockUserId = 'testUserId';
const mockCartId = 'testCartId';

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`CheckoutPaymentEventListener`, () => {
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

    spyOn(store, 'dispatch').and.stub();
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

  describe(`onCartAction`, () => {
    it(`should dispatch CartActions.LoadCart`, () => {
      mockEventStream$.next(
        createFrom(LoadCartEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.LoadCart({ userId: mockUserId, cartId: mockCartId })
      );
    });

    it(`should dispatch CartActions.RemoveCartEvent`, () => {
      mockEventStream$.next(
        createFrom(RemoveCartEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        new CartActions.RemoveCart({ cartId: mockCartId })
      );
    });
  });
});
