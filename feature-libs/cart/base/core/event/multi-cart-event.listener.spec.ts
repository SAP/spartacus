import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoadCartEvent, RemoveCartEvent } from '@spartacus/cart/base/root';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { CartActions } from '../store/actions/index';
import { MultiCartEventListener } from './multi-cart-event.listener';

import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();
const mockUserId = 'testUserId';
const mockCartId = 'testCartId';

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`MultiCartEventListener`, () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MultiCartEventListener,
        provideMockStore(),
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    });

    TestBed.inject(MultiCartEventListener);
    store = TestBed.inject(MockStore);

    spyOn(store, 'dispatch').and.stub();
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
