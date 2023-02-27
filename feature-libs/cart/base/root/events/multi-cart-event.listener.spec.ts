import { TestBed } from '@angular/core/testing';
import { createFrom, CxEvent, EventService } from '@spartacus/core';
import { Subject } from 'rxjs';
import { MultiCartFacade } from '../facade/multi-cart.facade';
import { LoadCartEvent, RemoveCartEvent } from './cart.events';
import { MultiCartEventListener } from './multi-cart-event.listener';

import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();
const mockUserId = 'testUserId';
const mockCartId = 'testCartId';

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  removeCart = createSpy();
  loadCart = createSpy();
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

describe(`MultiCartEventListener`, () => {
  let multiCartFacade: MultiCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MultiCartEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: MultiCartFacade,
          useClass: MockMultiCartFacade,
        },
      ],
    });

    TestBed.inject(MultiCartEventListener);
    multiCartFacade = TestBed.inject(MultiCartFacade);
  });

  describe(`onCartAction`, () => {
    it(`LoadCartEvent should call loadCart`, () => {
      mockEventStream$.next(
        createFrom(LoadCartEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );

      expect(multiCartFacade.loadCart).toHaveBeenCalledWith({
        cartId: mockCartId,
        userId: mockUserId,
      });
    });

    it(`RemoveCartEvent should call removeCart`, () => {
      mockEventStream$.next(
        createFrom(RemoveCartEvent, {
          userId: mockUserId,
          cartId: mockCartId,
          cartCode: mockCartId,
        })
      );

      expect(multiCartFacade.removeCart).toHaveBeenCalledWith(mockCartId);
    });
  });
});
